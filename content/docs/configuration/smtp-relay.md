---
title: SMTP relaying
description: Configure message relaying (release) in Mailpit
section: configuration
weight: 10
---

Configuring an SMTP relay enables the message "release" feature, which allows you to "forward" the message onto a pre-configured SMTP server.

To enable this feature, the configuration file (yaml syntax) must be provided to Mailpit either via `--smtp-relay-config <config-file>` or the environment variable `MP_SMTP_RELAY_CONFIG=<config-file>`.

## SMTP relay configuration

```yaml
host:                <hostname-or-ip>            # required
port:                <port>                      # optional - default 25
starttls:            <true|false>                # optional - default false
allow-insecure:      <true|false>                # optional - default false
auth:                <none|plain|login|cram-md5> # optional - default none
username:            <username>                  # required for plain, login and cram-md5 auth
password:            <password>                  # required for plain & login auth
secret:              <cram-secret>               # required for cram-md5 auth
return-path:         <bounce-address>            # optional - overrides Return-Path for all released emails
allowed-recipients:  '@example\.com$'            # optional - limit allowed relay addresses or domains
```

### Notes
Messages relayed via the web UI / API get assigned a new unique `Message-Id`. This is to enable testing via services such as Gmail which will silently drop / hide incoming emails containing the same message ID. 

The `return-path` configuration option will add / overwrite the `Return-Path` for all messages relayed via the web UI and API.
This is useful to provide a valid email address to catch any accidental bounces and prevent SPF errors for email domain names.
Servers such as Gmail have become very pedantic about the mail they accept, and unresolvable Return-Path addresses, or unauthorised Return-Path addresses (SPF / DMARC) get rejected very easily.


#### Allowed recipients

The optional `allowed-recipients` allows you to set a regular expression (Go format) to restrict which addresses or domains can be manually released to via the web UI and API. This option does not apply to `--smtp-relay-all` or `--smtp-relay-matching` (see below).

Please note that the regular expression should be quoted with single apostrophes (`'`) to avoid parsing errors. You can use https://regex101.com/r/mfbicW/1 as a playground to test your expression.


#### Setting via environment

For convenience the entire relay configuration can be set via environment variables. The only required value is the `MP_SMTP_RELAY_HOST` field, otherwise all other values are ignored.

```shell
MP_SMTP_RELAY_HOST=<hostname-or-ip>               # required
MP_SMTP_RELAY_PORT=<port>                         # optional - default 25
MP_SMTP_RELAY_STARTTLS=<true|false>               # optional - default false
MP_SMTP_RELAY_ALLOW_INSECURE=<true|false>         # optional - default false
MP_SMTP_RELAY_AUTH=<none|plain|login|cram-md5>    # optional - default none
MP_SMTP_RELAY_USERNAME=<username>                 # required for plain, login and cram-md5 auth
MP_SMTP_RELAY_PASSWORD=<password>                 # required for plain & login auth
MP_SMTP_RELAY_SECRET=<cram-secret>                # required for cram-md5 auth
MP_SMTP_RELAY_RETURN_PATH=<bounce-address>        # optional - overrides Return-Path for all released emails
MP_SMTP_RELAY_ALLOWED_RECIPIENTS="@example\.com$" # optional - regex to limit allowed relay addresses or domains via web UI & API (see below)
```

For security reasons there options are not available as a cli flags.


## Automatically relay all messages

The `--smtp-relay-all` flag (or `MP_SMTP_RELAY_ALL=true` environment variable) can be set to automatically relay all incoming messages via the configured SMTP relay server. 

This means that Mailpit will act like a caching proxy server, and automatically send any incoming email to all original recipients and store a local copy.
The incoming email is not modified (unlike releasing via the web UI / API), and the message is simply passed through as-is. This option should be used with caution! If you only wish to relay messages to some recipients, then [see below](#automatically-relay-some-messages). 

This option cannot be used in conjunction with `--smtp-relay-matching`, and ignores the `allowed-recipients` option in your SMTP relay configuration.


## Automatically relay some messages

The `--smtp-relay-matching` flag (or `MP_SMTP_RELAY_MATCHING` environment variable) allows you to selectively relay messages to a pre-configured regular expression. An example would be `--smtp-relay-matching '(user1@host1\.com|user2@host2\.com|@host3\.com)$'` to only relay messages intended for recipients in that expression.

This option cannot be used in conjunction with `--smtp-relay-all`, and ignores the `allowed-recipients` option in your SMTP relay configuration.
