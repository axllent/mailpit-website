---
title: Tagging messages
description: Tag messages with one or more tags via the web UI, API or automatically when received
section: usage
keywords: [labels, tagging, tags, folders, group, keyword, disable]
weight: 2
---

Mailpit allows you to add tags (labels) to messages. Message tags can be added, edited and deleted via the web UI when viewing a message, as well as automatically applied when receiving new messages.

Tags can then be seen in the web UI and filtered by in [the search](../search-filters/) using `tag:"Tag name"`, or you can can simply click on a tag name.
To filter by more than one tag at once, hold the `Ctrl` button down and click the tag names on the left hand side which will either append or remove the tag from the current search.

Individual message tags can be edited inline when viewing a message in the web UI.

Existing tags can also be renamed or deleted globally in the web UI (clicking on `Tags` -> `Edit tags` in the side navigation). Please note that renaming an existing tag will not prevent a tag with the original name from being created again via auto-tagging of new messages.


## Allowed tag names

Tags are limited to the following characters: `a-z`, `A-Z`, `0-9`, `-`, `.`, spaces & `_`, and must be a minimum of 1 character.


## Enforcing TitleCase

TitleCasing will capitalize the first letter in each word in a tag (for new auto-generated tags only). This is not enabled by default and only applies to newly created tags generated from [plus-addresses](#plus-addressing) and [X-Tag](#x-tags-header) headers.

To enable TitleCasing for new tags, you can set the `--tags-title-case` or set the `MP_TAGS_TITLE_CASE=true` environment variable.


## Automatically tag messages

Messages can be automatically tagged using any combination of three methods: setting an `X-Tags` email header, using "plus addressing", and via word/phrase matches (filtering) when receiving emails.


### Disable auto-tagging

Auto-tagging using the X-Tags header and plus-addressing is enabled by default. You can disable either (or both) of these by setting the `--tags-disable <types>` (@env `MP_TAGS_DISABLE="<types>"`) where `<types>` is a comma-separated list of `plus-addresses` and `x-tags`.

```shell
--tags-disable plus-addresses,x-tags
```


### X-Tags header

Mailpit will automatically apply tags from a comma-separated `X-Tags` message header (unless disabled via the [--tags-disable](#disable-auto-tagging) option), for example:

```text
X-keywords: Tag 1, Tag 2, hostname
```

New tags will be automatically [TitleCased](#enforcing-titlecase) if the option is set.


### Plus addressing

Plus addressing (also known as "sub-addressing") uses the email syntax `<name>+<tag>@<domain>`, for example `user+debug@example.com` would get the `debug` tag applied. 
Any email received having a "plus address" in the From, To, Cc or Bcc fields will automatically get the tag(s) detected applied to the message (unless disabled via the [--tags-disable](#disable-auto-tagging) option).

To apply multiple tags you can use the `<name>+<tag1>+<tag2>@<domain>` format.

New tags will be automatically [TitleCased](#enforcing-titlecase) if the option is set.


### Tag filters

New messages can be automatically tagged using filters. Tag matches can also include the same search filters as [regular search](../search-filters/), with the exception of `is:tagged` or `tag:` (it isn't been tagged yet), or `is:read` (it's always unread when received) filters.

Unlike regular searching though, tag filters also try match a 1:1 on any part of the message, including all headers (for instance if you wanted to match by a particular hostname), whereas search only searches in certain header fields and body content. Messages can have multiple tags, and duplicate tags are ignored.

Tag filters can be set in Mailpit via two different methods:


#### Set filters using a config

You can set your tag filters using a yaml configuration file using `--tags-config <file>` (@env `MP_TAGS_CONFIG=<file>`). 

The structure of the yaml file should be as follows:

```yaml
filters:
  - match: this is a match
    keywords: Tag 1
  - match: addressed:test@example.com
    keywords: Tag 2
  - match: from:from@example.com
    keywords: Tag 1, Tag 2
```

Tags are comma-separated, so multiple tags can optionally be assigned per match.


#### Set filters using `--tag`

The `--tag "<syntax>"` (@env `MP_TAG="<syntax>"`) accepts a space-separated string format: `<tag>=<match> <tag>=<match>`, where `<tag>` is the name of the tag you wish to apply matching messages, and `<match>` is what to match on.

```shell
--tag 'user=user@example.com user2=from:user2@example.com "Scanned with antivirus"="X-Antivirus: "'
```

In the above example all messages containing `user@example.com` are tagged with `user`, all messages **from** `user2@example.com` are tagged with `user2`, and all messages containing `X-Antivirus: ` are tagged with `Scanned with antivirus`.

Tags are split by a comma, so multiple tags can be assigned for a match using the following format: `"Tag 1, Tag2"="this is the match"`.
