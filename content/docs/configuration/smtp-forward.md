---
title: SMTP forwarding
description: Automatically auto-forward all messages to another email address
section: configuration
weight: 10
---

Mailpit can **automatically forward** a copy of **all** incoming messages to a **predefined** email address (or addresses) via another SMTP server.
This can be useful if you wish to process (or keep a copy of) all emails in another mailbox.

**Note**: This differs significantly from [SMTP relaying](../smtp-relay/) which sends a copy to the addresses defined in the email itself.

To enable SMTP forwarding, the configuration file (yaml syntax) must be provided to Mailpit either via `--smtp-forward-config <config-file>` or the environment variable `MP_SMTP_FORWARD_CONFIG=<config-file>`.

## SMTP forward configuration

```yaml
to: <email-address> # required - comma-separated list of email addresses
host: <hostname-or-ip> # required - SMTP host or IP to send via
port: <port> # optional - SMTP port, default 25
starttls: <true|false> # optional - connect using STARTTLS, default false
tls: <true|false> # optional - connect using TLS, default false
allow-insecure: <true|false> # optional - do not validate TLS certificate, default false
auth: <none|plain|login|cram-md5> # optional - default none
username: <username> # required for plain, login and cram-md5 auth
password: <password> # required for plain & login auth
secret: <cram-secret> # required for cram-md5 auth
return-path: <bounce-address> # optional - overrides Return-Path for all forwarded emails
override-from: <email-address> # optional - overrides the From email address
```

### Notes

The `return-path` configuration option will add or overwrite the `Return-Path` for all forwarded messages.
This is useful for providing a valid email address to catch any accidental bounces and prevent SPF errors for email domain names.
Servers such as Gmail have become very strict about the mail they accept, and unresolvable Return-Path addresses, or unauthorised Return-Path addresses (SPF / DMARC) get rejected very easily.

Also see [Override From](#override-from) to change the `From` email address on all forwarded messages.

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

#### Setting via environment

For convenience, the entire forwarding configuration can be set via environment variables. The only required values are the `MP_FORWARD_TO` & `MP_SMTP_FORWARD_HOST` fields.

```shell
MP_SMTP_FORWARD_TO=<email-address>                   # required - comma-separated list of email addresses top forward to
MP_SMTP_FORWARD_HOST=<hostname-or-ip>                # required - SMTP host or IP to send via
MP_SMTP_FORWARD_PORT=<port>                          # optional - default 25
MP_SMTP_FORWARD_STARTTLS=<true|false>                # optional - connect using STARTTLS, default false
MP_SMTP_FORWARD_TLS=<true|false>                     # optional - connect using TLS, default false
MP_SMTP_FORWARD_ALLOW_INSECURE=<true|false>          # optional - do not validate TLS certificate, default false
MP_SMTP_FORWARD_AUTH=<none|plain|login|cram-md5>     # optional - default none
MP_SMTP_FORWARD_USERNAME=<username>                  # required for plain, login and cram-md5 auth
MP_SMTP_FORWARD_PASSWORD=<password>                  # required for plain & login auth
MP_SMTP_FORWARD_SECRET=<cram-secret>                 # required for cram-md5 auth
MP_SMTP_FORWARD_RETURN_PATH=<bounce-address>         # optional - overrides Return-Path for all released emails
MP_SMTP_FORWARD_OVERRIDE_FROM=<email-address>        # optional - overrides the From email address
```

For security reasons, these options are not available as CLI flags.
