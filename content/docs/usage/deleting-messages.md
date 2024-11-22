---
title: Deleting messages
description: Manually and automatically deleting messages
section: usage
weight: 2
---

To conserve space and maintain [database performance](../../configuration/email-storage/) on busy Mailpit instances, Mailpit automatically prunes the database.
This can of course be configured to suit your storage and/or privacy requirements.


## Maximum number of messages

**By default** Mailpit keeps only the latest 500 messages, silently deleting the oldest messages at regular intervals once this total number is reached. 
This limit is configurable in the [runtime options](../../configuration/runtime-options/), and can be disabled entirely by setting `--max 0` (@env `MP_MAX_MESSAGES=0`) if
you wish to keep messages indefinitely, or alternatively set to a value that suits your requirements.

Mailpit can easily store more than 100,000 messages and still perform relatively well, however some actions such as searching will become gradually slower as your database grows. 


## Delete by age

Mailpit can also be optionally configured to automatically delete messages after a set period of time by using the `--max-age <age>` flag (@env `MP_MAX_AGE=<age>`)
where `<age>` is specified either in hours (`h`) or in days (`d`). An example would be `--max-age 6h` to delete messages after 6 hours, or `--max-age 7d` after 7 days.


## Manually deleting messages

There are various ways to manually delete messages:

1. Individual messages can be deleted by clicking the `Delete` button while previewing a message.
2. Select one or more messages by holding down `Ctrl`/`Cmd` or `Shift` and clicking on a the messages in the list. These can then be deleted via the `Delete selected` button, or alternatively marked as read/unread.
3. In the Inbox (main) view, the `Delete all` button will delete all messages (everything).
4. While filtering messages, either by a search or viewing a tag, clicking the `Delete all` button will delete all matching results.
