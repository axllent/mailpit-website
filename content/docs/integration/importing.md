---
title: Importing messages
description: Ingest a message or folder of messages into Mailpit
---

Existing bulk messages can be ingested (imported) using `mailpit ingest <file|folder>`. By default, this will read the message(s) on disk and send them via SMTP to `localhost:1025`, however you can specify a different host/port using the `--smtp-addr` flag.

{{< tip "warning" >}}
Ingested messages must be individual email files and not mbox format (ie: not all messages in one file)
{{< /tip >}}

This can be useful for transferring an entire mailbox of messages directly into Mailpit, and can be coupled with `--recent <x>` to only consider messages modified within the last `x` days. If you are regularly "syncing" a folder to Mailpit, then this, combined with Mailpit's `--ignore-duplicate-ids` flag will prevent any duplicate messages being added.
