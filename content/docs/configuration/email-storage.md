---
title: Email storage
Description: Mailpit stores messages in either a permanent or temporary SQLite database
section: configuration
---

By default Mailpit stores all email data in a local SQLite database. This provides an embedded, low-memory fast storage mechanism for writing (SMTP) and reading (API). 

Mailpit also provides the ability to use rqlite instead (see below) if you require a distributed database.


## Local storage (SQLite)

### Performance

Testing has revealed that SMTP can store between 100-200 emails per second over SMTP depending on CPU, network speed & email size. The database has been tested with over 125,000 emails which still performs well.

### Temporary vs: persistent storage

Mailpit stores both an email summary and the raw email (compressed with zstd) in the database, and has two storage options:


#### Temporary storage (default)

Mailpit will by default create a temporary database to store its data. When the applications exits, the temporary database is deleted from disk.


#### Persistent storage

Mailpit allows you to provide a path to a file for persistent database storage, for example `--database /path/to/database.db` (@env `MP_DATABASE=/path/to/database.db`). 
This file will not get deleted when the application terminates, and restarting Mailpit with the same `--database` will reload previous stored messages.

{{< tip "warning" >}}
In Mailpit versions older than to v.16.0, the database flag & environment variable was to be `--db-file` & env `MP_DATA_FILE`. These got renamed to be more consistent with their purpose.
{{< /tip >}}


### Automated message pruning

Although mailpit can easily handling tens of thousands of emails, it will by default automatically prune old messages, keeping the most recent 500 emails. 
This value can be adjusted by using the `--max <value>` flag (@env: `MP_MAX_MESSAGES=<value>`), or set to `0` to disable this entirely.

Another option is to automatically delete messages after a certain time using the `--max-age <value>` (@env `MP_MAX_AGE=<value>`) where `<value>` is either a value in hours (eg: `36h`) or days (eg: `14d`). The `h` or `d` is required in the value.
This option can be used together with, or instead of, the `--max` option.

Mailpit will also automatically VACUUM your database when required after 5 minutes of database inactivity.


## Remote storage (rqlite)

{{< tip >}}
**rqlite** is a distributed relational database that combines the simplicity of SQLite with the robustness of a fault-tolerant, highly available cluster.
{{< /tip >}}

Mailpit can optionally use [rqlite](https://rqlite.io/) instead of a local database. 

To use rqlite for database storage you must have a connectable rqlite database already running, and connect to it by specifying the http address and port of the server (eg: `--database http://localhost:4001`). If you use authentication then this can be set using the `http://<user>:<password>@<host>:<port>` syntax.

When sharing the same rqlite database between different Mailpit instances, you may with to set a unique [tenant ID](#tenant-id) to isolate data.


### rqlite performance

Performance of rqlite is generally very good, although database writes (storing messages received via SMTP) is slower compared to local SQLite storage (see above). This is in part due to the [raft](https://raft.github.io/) protocol used by rqlite to ensure consistency between rqlite nodes (even if you are just using a single node).

Performance should not be an issue with regular use of Mailpit, but may be a factor in your choices when dealing with large volumes of SMTP messages where you wish to maximize input speeds.


### Database maintenance

Unlike local storage (see above) the rqlite database is **not** automatically VACUUMED by Mailpit, however rqlite does have a startup flag to run this automatically at fixed intervals ([see docs](https://rqlite.io/docs/guides/performance/#vacuum)).


## Tenant ID

SQLite (both local storage and rqlite) does not support the concept of databases, it is just one database containing tables. In order to share a database between different Mailpit instances, each having their own data, you must specify a tenant ID using the `--tenant-id <value>` flag (@env: `MP_TENANT_ID=<value>`). This will prefix all Mailpit tables, isolating all data from other Mailpit instances. 

This tenant ID could, for instance, be the hostname of the Mailpit server or some other unique identifier. Mailpit will not remove or alter any data created by other tenants.
