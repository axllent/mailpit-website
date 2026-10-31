---
title: Rspamd
description: Integrate Mailpit with Rspamd to test "spamminess" of messages
section: configuration
weight: 8
---

Mailpit can optionally integrate with [Rspamd](https://rspamd.com/) to display the "spamminess" of messages.
This is an opt-in feature that must be enabled when starting Mailpit, and requires a running instance of Rspamd.

Rspamd can be enabled together with [SpamAssassin](../spamassassin/). When both are enabled, Mailpit shows a separate tab for each.

## Enabling Rspamd integration

To enable this feature, you must:

1. Be running an instance of Rspamd that Mailpit can connect to over HTTP or HTTPS. Mailpit uses the `/checkv2` endpoint, which is served by both the Rspamd normal worker (default port `11333`) and the controller (default port `11334`).
2. Start Mailpit with either the `--enable-rspamd <address>` flag or set the environment variable `MP_ENABLE_RSPAMD=<address>`.

The address can be either:

- `<host>:<port>`, for example `rspamd.example.com:11333`, which is assumed to be plain HTTP, or
- a full URL, for example `https://rspamd.example.com:11334`, which allows you to connect to Rspamd via HTTPS.

### Rspamd password

If your Rspamd server requires a password, include it in the address, either as `https://password@host:port` or `https://:password@host:port` (Rspamd has no username).
For example:

```shell
MP_ENABLE_RSPAMD=https://mypassword@rspamd.example.com:11334 mailpit
```

If your password contains special characters (such as `@`, `:` or `/`), they must be [percent-encoded](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding) in the address.
The password is sent to Rspamd in the `Password` header, and is not included in Mailpit's logs.

Whether a password is required depends on your Rspamd configuration (see the Rspamd [controller worker](https://docs.rspamd.com/workers/controller) documentation).
If your server does not require one, leave it out.

{{< tip "warning" >}}
If you connect using plain HTTP, the password is sent unencrypted.
Use HTTPS if the connection is not on a trusted network.
{{< /tip >}}

## Setting up Rspamd

Rspamd is not provided by Mailpit. Please refer to the [Rspamd documentation](https://docs.rspamd.com/) for installation and configuration instructions.
