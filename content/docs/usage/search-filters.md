---
title: Using search filters
description: Advanced search filtering in Mailpit via the web UI and API
section: usage
weight: 1
---

The Mailpit search has a number of features that include filtering by `To`, `From`, `Subject`, read/unread status, attachment status, as well as excluding terms by prefixing the term with either a `!` or `-`. Searches are **not** case sensitive ([see note](#search-casing)).


## Examples

- `john doe` - contains the words "john" and "doe" (any order)
- `"john doe"` - contains the phrase "john doe" (exact match)
- `to:"john doe"` - has "john doe" in the "To" field
- `from:"john doe"` - has "john doe" in the "From" field
- `cc:"john doe"` - has "john doe" in the "Cc" field
- `bcc:"john doe"` - has "john doe" in the "Bcc" field
- `reply-to:"john doe"` - has "john doe" in the "Reply-To" field
- `addressed:"john doe"` - has "john doe" in any of the "From", "To", "Cc", "Bcc" or "Reply-To" fields
- `subject:"john doe"` - has "john doe" in the subject line
- `message-id:12345.678910.JavaMail.j2ee@localhost` - search by Message-Id
- `tag:host-1` - messages tagged with `host-1`


## Combining filters

Search filters can be combined:

- `john !doe` - contains "john" but not "doe"
- `subject:invoice !from:admin@example.com is:tagged` - contains "invoice" in the subject, which has at least one tag, but excludes any from "admin@example.com"


## Special filters

- `is:read` - with read status
- `is:unread` - with unread status (same as `!is:read`)
- `has:attachment` - contains an attachment
- `!has:attachment` - does not contain an attachment
- `is:tagged` - messages having at least one tag
- `!is:tagged` - messages having no tags
- `before:2024/04/01` - messages before 1 April 2024 ([see notes](#searching-by-date))
- `after:2024/04/01` - messages after 1 April 2024 ([see notes](#searching-by-date))


## Searching by date

Mailpit can filter for messages older (`before:<date>`) or newer (`after:<date>`) than dates, however there are a few important things to note. Whilst date (and optional time) formatting is fairly flexible ([see examples](https://github.com/araddon/dateparse?tab=readme-ov-file#extended-example)), a date like `01/04/2024` is interpreted in the US format (ie: `mm/dd/yyyy`). To prevent confusion it is advised to use the `yyyy/mm/dd` format.

The web UI will also pass on your local [timezone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) set by your PC as there is no guarantee that the Mailpit server is running in the same timezone as you (eg: Docker runs by default in UTC unless manually set).
The timezone identifier can be changed in the Mailpit web UI settings.

Invalid date formats are ignored and logged in the Mailpit log.


## Search casing

Searches are not case sensitive, however there is one limitation: SQLite only understands upper/lower case for ASCII characters. **This does not impact general searches** (ie: `"Diese Äpfel"` will find `"diese äpfel"`), however when searching specific headers (eg `subject:"Diese Äpfel"`) the unicode character searched must match the searched header for that character. This is a limitation of the embedded SQLite engine which does not contain full unicode support. This impacts only unicode characters for example `Ä` `ä` `Æ` `æ` `Ö` `ö` `Ü` `ü` etc.
