---
title: POP3 server
description: Enable the POP3 server (with or without TLS)
section: configuration
weight: 7
---

{{< tip "warning" >}}
To enable the POP3 server, you must configure [POP3 authentication](#adding-pop3-authentication).
{{< /tip >}}

Mailpit can run a POP3 server, allowing you to download captured messages into your email client. By default, it runs on port `1110` and does not use encryption. However, the port can be set with `--pop3 <interface>:<port>`, and SSL/TLS encryption can also be enabled (see below).

## Notes about the POP3 server

1. Messages deleted via POP3 by the client are also deleted from the Mailpit server.
2. Downloading messages will _not_ mark those messages as read in Mailpit.
3. For performance reasons, only the latest 100 messages are available via POP3. If this is a problem for you and you have a valid reason for accessing more, please [open an issue](https://github.com/axllent/mailpit/issues) on GitHub to discuss this further.
4. The POP3 server will run either unencrypted _or_ using SSL/TLS encryption, but not both.

## Adding POP3 authentication

To enable the POP3 server, a valid [password file](../passwords/) must be provided with the startup flag `--pop3-auth-file <file>` or the `MP_POP3_AUTH_FILE=<file>` environment variable.
Alternatively, you can set the `MP_POP3_AUTH` environment variable (only) to provide a space-separated list of credentials (see below).

To run Mailpit with POP3 authentication:

```shell
mailpit --pop3-auth-file /path/to/password-file
```

### Setting via environment

You can optionally export the `MP_POP3_AUTH` environment variable with a space-separated list of your credentials, e.g., `MP_POP3_AUTH="user1:password1 user2:password2"`. For security reasons, this option is not available as a CLI flag.

## Enabling SSL/TLS POP3

By default, the POP3 server runs unencrypted on port `1110`. If you wish to enable SSL/TLS encryption, you must provide both the TLS certificate and key:

```shell
mailpit \
--pop3-auth-file /path/to/password-file \
--pop3-tls-cert /path/to/cert.pem \
--pop3-tls-key /path/to/key.pem
```

Certificates can be either [self-signed/generated](../certificates/) or official certificates (if you have a valid domain name) obtained from sources like [Let's Encrypt](https://letsencrypt.org/).
