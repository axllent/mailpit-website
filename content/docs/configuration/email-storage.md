---
title: Email storage
Description: Mailpit stores messages in either a permanent or temporary SQLite database
section: configuration
---

By default, Mailpit stores all email data in a **local** SQLite database. This provides an embedded, low-memory, and fast storage mechanism for writing (SMTP) and reading (API).

Mailpit can alternatively use [rqlite](#remote-storage-rqlite) if you require a distributed network database.

## Local storage (SQLite)

{{< tip "warning" >}}
Please be aware that Mailpit, by default, activates [Write-Ahead Logging](https://sqlite.org/wal.html) (WAL) in SQLite.
This feature may not function reliably with some filesystems like **mergerfs**, or network file systems like **NFS** or **Samba**.
If you plan to use these, you should include the `--disable-wal` flag (or set the environment variable `MP_DISABLE_WAL=true`).
Additionally, it's important to consider the [caveats and considerations](https://sqlite.org/useovernet.html)
associated with using network file systems with SQLite.

Samba/CIFS clients should include the `nobrl` mount option to prevent the client from sending byte range lock requests to the server,
which can lead to SQLite locking errors.
{{< /tip >}}

### Performance

Testing has shown that Mailpit can store between 100–200 emails per second over SMTP, depending on CPU, disk speed, network speed, and email size.
The database has been tested with over 135,000 emails and still performs well.

By default, raw messages are stored compressed (zstd) in the database to conserve space, but this comes at the cost of additional RAM and CPU usage to process the data.
The level of compression can be adjusted, including an option to disable message compression altogether ([see docs](../compression/)).

### Temporary vs. persistent storage

Mailpit stores both an email summary and the raw email (compressed with zstd) in the database, and has two storage options:

#### Temporary storage (default)

By default, Mailpit creates a temporary database to store its data. When the application exits, the temporary database is deleted from disk.

#### Persistent storage

Mailpit allows you to provide a path to a file for persistent database storage, for example `--database /path/to/database.db` (or environment variable `MP_DATABASE=/path/to/database.db`).
This file will not be deleted when the application terminates, and restarting Mailpit with the same `--database` will reload previously stored messages.

{{< tip "warning" >}}
In Mailpit versions older than v0.16.0, the database flag and environment variable were `--db-file` and `MP_DATA_FILE`. These were renamed to be more consistent with their purpose.
{{< /tip >}}

### Automated message pruning

Although Mailpit can easily handle tens of thousands of emails, it will by default automatically prune old messages, keeping the most recent 500 emails.
This value can be adjusted using the `--max <value>` flag (or environment variable `MP_MAX_MESSAGES=<value>`), or set to `0` to disable this entirely.

Another option is to automatically delete messages after a certain time using the `--max-age <value>` flag (or environment variable `MP_MAX_AGE=<value>`), where `<value>` is either a value in hours (e.g., `36h`) or days (e.g., `14d`). The `h` or `d` is required in the value.
This option can be used together with, or instead of, the `--max` option.

Mailpit will also automatically VACUUM your database when required, after 5 minutes of database inactivity.

## Remote storage (rqlite)

{{< tip >}}
[**rqlite**](https://rqlite.io/) is a distributed relational database that combines the simplicity of SQLite with the robustness of a fault-tolerant, highly available cluster.
{{< /tip >}}

To use rqlite for database storage, you must have a connectable rqlite database already running, and connect to it by specifying the HTTP address and port of the server (e.g., `--database http://localhost:4001`). If you use authentication, this can be set using the `http://<user>:<password>@<host>:<port>` syntax.

If you plan to run **rqlite behind a load balancer, or on Kubernetes in particular**, you must also disable _Cluster Discovery_ using the `http://localhost:4001?disableClusterDiscovery=true` syntax. This will instruct Mailpit to leave cluster-connection control to the load balancer.

When sharing the same rqlite database between different Mailpit instances, you may wish to set a unique [tenant ID](#tenant-id) to isolate data.

### rqlite performance

Performance of rqlite is generally very good, although database writes (storing messages received via SMTP) are slower compared to local SQLite storage (see above). This is in part due to the [raft](https://raft.github.io/) protocol used by rqlite to ensure consistency between rqlite nodes (even if you are just using a single node).

Performance should not be an issue with regular use of Mailpit, but may be a factor when dealing with large volumes of SMTP messages where you wish to maximize input speeds.

### Database maintenance

Unlike local storage (see above), the rqlite database is **not** automatically VACUUMED by Mailpit. However, rqlite does have a startup flag to run this automatically at fixed intervals ([see docs](https://rqlite.io/docs/guides/performance/#vacuum)).

## Tenant ID

SQLite (both local storage and rqlite) does not support the concept of multiple databases; it is just one database containing tables. In order to share a database between different Mailpit instances, each having their own data, you must specify a tenant ID using the `--tenant-id <value>` flag (or environment variable `MP_TENANT_ID=<value>`). This will prefix all Mailpit tables, isolating all data from other Mailpit instances.

This tenant ID could, for instance, be the hostname of the Mailpit server or some other unique identifier. Mailpit will not remove or alter any data created by other tenants.
