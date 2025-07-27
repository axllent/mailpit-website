---
title: SMTP relaying
description: Configure message relaying (release) in Mailpit
section: configuration
weight: 10
---

Configuring an SMTP relay enables the message "release" feature, which allows you to relay the message via another pre-configured SMTP server.

**Note**: This differs significantly from [SMTP forwarding](../smtp-forward/) which sends a copy to a predefined email address (or addresses).

To enable SMTP relaying, the configuration file (yaml syntax) must be provided to Mailpit either via `--smtp-relay-config <config-file>` or the environment variable `MP_SMTP_RELAY_CONFIG=<config-file>`.

## SMTP relay configuration

```yaml
host: <hostname-or-ip> # required - SMTP host or IP to send via
port: <port> # optional - SMTP port, default 25
starttls: <true|false> # optional - connect using STARTTLS, default false
tls: <true|false> # optional - connect using TLS, default false
allow-insecure: <true|false> # optional - do not validate TLS certificate, default false
auth: <none|plain|login|cram-md5> # optional - default none
username: <username> # required for plain, login and cram-md5 auth
password: <password> # required for plain & login auth
secret: <cram-secret> # required for cram-md5 auth
return-path: <bounce-address> # optional - overrides Return-Path for all released emails
override-from: <email-address> # optional - overrides the From email address
allowed-recipients: '@example\.com$' # optional - limit allowed relay addresses or domains
blocked-recipients: '@example2\.com$' # optional - prevent relating to addresses or domains
preserve-message-ids: <true|false> # optional - preserve the original Message-IDs when relaying, default false
```

### Notes

By default, messages relayed via the web UI / API are assigned a new, unique `Message-ID`.
This helps when testing with services like Gmail, which may silently drop or hide emails with duplicate Message-IDs.
To preserve (keep) the original Message-IDs when relaying, set `preserve-message-ids: true` in your configuration.

The `return-path` configuration option will add or overwrite the `Return-Path` for all messages relayed via the web UI and API.
This is useful for providing a valid email address to catch any accidental bounces and prevent SPF errors for email domain names.
Servers such as Gmail have become very strict about the mail they accept, and unresolvable Return-Path addresses, or unauthorised Return-Path addresses (SPF / DMARC) get rejected very easily.
Also see [Override From](#override-from) to change the `From` email address on all relayed messages.

#### Override From

Some SMTP servers require any messages to come from a specific address.
If you set the `override-from` value, Mailpit will overwrite the original `From` **email address** (leaving the name intact where possible) and add a new `X-Original-From` header containing the original value.

For example, if set to `me@mydomain.com`, then this will change

```shell
From: "Original Recipient" <original@example.com>
```

to

```shell
X-Original-From: original@example.com
From: "Original Recipient" <me@mydomain.com>
```

#### Allowed recipients

The optional `allowed-recipients` allows you to set a regular expression (Go format) to restrict which addresses or domains can be manually released to via the web UI and API. This option does not apply to `--smtp-relay-all` or `--smtp-relay-matching` (see below).

Please note that the regular expression should be written in the Go format and quoted with single apostrophes (`'`) to avoid parsing errors. You can use https://regex101.com/r/mfbicW/1 as a playground to test your expression.

#### Blocked recipients

The optional `blocked-recipients` allows you to set a regular expression (Go format) to prevent relaying to addresses or domains via the web UI and API. This option also applies to the `--smtp-relay-all` and `--smtp-relay-matching` (see below).

Please note that the regular expression should be written in the Go format and quoted with single apostrophes (`'`) to avoid parsing errors. You can use https://regex101.com/r/mfbicW/1 as a playground to test your expression.

#### Setting via environment

For convenience, the entire relay configuration can be set via environment variables. The only required value is the `MP_SMTP_RELAY_HOST` field, otherwise all other values are ignored.

```shell
MP_SMTP_RELAY_HOST=<hostname-or-ip>                # required
MP_SMTP_RELAY_PORT=<port>                          # optional - default 25
MP_SMTP_RELAY_STARTTLS=<true|false>                # optional - connect using STARTTLS, default false
MP_SMTP_RELAY_TLS=<true|false>                     # optional - connect using TLS, default false
MP_SMTP_RELAY_ALLOW_INSECURE=<true|false>          # optional - do not validate TLS certificate, default false
MP_SMTP_RELAY_AUTH=<none|plain|login|cram-md5>     # optional - default none
MP_SMTP_RELAY_USERNAME=<username>                  # required for plain, login and cram-md5 auth
MP_SMTP_RELAY_PASSWORD=<password>                  # required for plain & login auth
MP_SMTP_RELAY_SECRET=<cram-secret>                 # required for cram-md5 auth
MP_SMTP_RELAY_RETURN_PATH=<bounce-address>         # optional - overrides Return-Path for all released emails
MP_SMTP_RELAY_OVERRIDE_FROM=<email-address>        # optional - overrides the From email address
MP_SMTP_RELAY_ALLOWED_RECIPIENTS="@example\.com$"  # optional - regex to limit allowed relay addresses or domains via web UI & API
MP_SMTP_RELAY_BLOCKED_RECIPIENTS="@example2\.com$" # optional - regex to prevent relaying to addresses or domains via web UI & API
MP_SMTP_RELAY_PRESERVE_MESSAGE_IDS=<true|false>    # optional - preserve the original Message-IDs when relaying, default false
```

For security reasons, these options are not available as CLI flags.

## Automatically relay all messages

The `--smtp-relay-all` flag (or `MP_SMTP_RELAY_ALL=true` environment variable) can be set to automatically relay all incoming messages via the configured SMTP relay server.

This means that Mailpit will act like a caching proxy server, and automatically send any incoming email to all original recipients and store a local copy.
The incoming email is not modified (unlike releasing via the web UI / API), and the message is simply passed through as-is. This option should be used with caution! If you only wish to relay messages to some recipients, then [see below](#automatically-relay-some-messages).

This option cannot be used in conjunction with `--smtp-relay-matching`, and ignores the `allowed-recipients` option in your SMTP relay configuration.

Any addresses matching `blocked-recipients` (if set) are silently ignored, however other remaining addresses (if any) will still be sent the message.

## Automatically relay some messages

The `--smtp-relay-matching` flag (or `MP_SMTP_RELAY_MATCHING` environment variable) allows you to selectively relay messages to a pre-configured regular expression. An example would be `--smtp-relay-matching '(user1@host1\.com|user2@host2\.com|@host3\.com)$'` to only relay messages intended for recipients in that expression.

This option cannot be used in conjunction with `--smtp-relay-all`, and ignores the `allowed-recipients` option in your SMTP relay configuration.

Any addresses matching `blocked-recipients` (if set) are silently ignored, however other remaining addresses will still be sent the message provided they match the `--smtp-relay-matching`.
