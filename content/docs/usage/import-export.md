---
title: Importing & exporting
description: Bulk import or export messages to Mailpit
section: usage
weight: 15
---

Normally Mailpit will receive messages sent via various applications over SMTP, however there may be a need to bulk import (ingest) or export (dump) messages.
There has two separate command-line utilities to facilitate this.


## Ingesting (importing) messages

You can ingest an entire folder of individual messages (such as those stored in maildir folders) using the `mailpit ingest <file-or-folder>` subcommand. 
This can be useful for bulk-loading messages, benchmark testing or restoring a previous backup.

If a folder is specified, then ingestion will scan the folder for messages and attempt to send each one over SMTP to a **running** Mailpit instance. 
The SMTP server defaults to `localhost:1025` (Mailpit's default SMTP port), however can be manually specified by passing the `--smtp-addr <host>:<port>` syntax.

{{< tip "warning" >}}
Please note that neither SMTP authentication nor TLS encryption is supported for ingesting messages.

Please also ensure you do not use a live SMTP server's address!
{{< /tip >}}

It is also possible to only import messages modified within the last X days by adding the `--recent <days>` flag. 
Note that this uses the file modification date, and **not** the message date.


## Dumping messages

It is also possible to dump (export) all messages from Mailpit, storing the individual messages in a local folder. This can be used to back up messages
if you do not have the ability to back up the actual database file.

Messages can be dumped from a running Mailpit instance (local or remote), or directly from a local Mailpit database file.

Stored messages are named `<folder>/<message-id>.eml`, and have the file timestamp that they were originally received by Mailpit. 
Each message is stored as a separate file (plain text), and existing messages in the backup are skipped (this will speed up repeated backups of the same mailbox).

Existing dumps are only appended to, and no messages are ever deleted from either the Mailpit database or the local backup folder.


### Dump via network / API

If you wish to dump messages from a running Mailpit instance (local or remote), you can export all messages over HTTP (via the API). 
The HTTP host & port must be supplied via the `--http` flag, and should not include the path to the API. If you have configured your
Mailpit with `--webroot`, then this should be included in the URL.

```shell
mailpit dump --http http://localhost:8025 <output-folder>
```

{{< tip >}}
If your server uses basic auth (eg: `--ui-auth-file`), then the username and password should be supplied as part of the URL, for instance
`mailpit dump --http http://user:password@localhost:8025 <output-folder>`
{{< /tip >}}


### Dump from local database

To dump messages directly from an existing local Mailpit database file. This method requires direct access to the database, 
and can cause temporary database locks while the dump is in progress.

```shell
mailpit dump --database <database-file> <output-folder>
```

If your database is using a tenant ID, then this can be set by adding the `--tenant-id <id>` to the command.

{{< tip "warning" >}}
If your local Mailpit server is potentially very active at the time of the dump, then it is recommended to use the API method (see below).
{{< /tip >}}
