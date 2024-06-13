---
title: SMTP server
description: Configuring SMTP (including STARTTLS or SSL/TLS)
section: configuration
aliases:
- /docs/configuration/smtp-authentication/
weight: 3
---

By default the Mailpit SMTP server listens on port `1025` and does not use encryption or authentication. 
There are several options you can set to enable both authentication as well as STARTTLS or SSL/TLS encryption.


## SMTP with STARTTLS

When you add a TLS certificate and key to Mailpit, it enables (but does not require) the STARTTLS protocol.
STARTTLS is the default protocol encryption used in Mailpit (as opposed to TLS). 
A client connects via plain text (unencrypted protocol) to the SMTP server and then can optionally negotiate a TLS upgrade.

To configure Mailpit to serve SMTP with STARTTLS, a TLS certificate and private key ([see certificates](../certificates/))
must be provided via either the command flags or environment when starting Mailpit, for example:

```shell
mailpit --smtp-tls-cert /path/to/cert.pem --smtp-tls-key /path/to/key.pem 
```

(env: `MP_SMTP_TLS_CERT=/path/to/cert.pem MP_SMTP_TLS_KEY=/path/to/key.pem`)

This option allows for both plain text and STARTTLS and therefore has the most flexibility for email clients.

If you **require** the client to use STARTTLS then you can add the `--smtp-require-starttls` (env: `MP_SMTP_REQUIRE_STARTTLS=true`).


## SMTP with SSL/TLS

TLS (often referred to as SSL/TLS) is a different protocol that requires **all** protocol communication to be done over TLS.
This is slightly more secure than STARTTLS, but requires a SMTP client with fill SSL/TLS support. 
To start the SMTP with TLS an additional flag `--smtp-require-tls` (env: `MP_SMTP_REQUIRE_TLS=true`) must be added:

```shell
mailpit --smtp-tls-cert /path/to/cert.pem --smtp-tls-key /path/to/key.pem --smtp-require-tls
```

Note: this option disables STARTTLS support entirely as the two cannot run together on the same port.


## Adding SMTP authentication

You can set a [password file](../passwords/) using the `--smtp-auth-file <file>` flag (@env: `MP_SMTP_AUTH_FILE=<file>`). 
Mailpit will accept either the `PLAIN` or `LOGIN` authentication mechanisms.

{{< tip "warning" >}}
The last paragraph of [RFC 4954](https://www.rfc-editor.org/rfc/rfc4954#section-4) states:

*A server implementation MUST implement a configuration in which
it does NOT permit any plaintext password mechanisms, unless either
the STARTTLS [SMTP-TLS] command has been negotiated or some other
mechanism that protects the session from password snooping has been
provided.  Server sites SHOULD NOT use any configuration which
permits a plaintext password mechanism without such a protection
mechanism against password snooping.*
{{< /tip >}}

This means that, by default, SMTP authentication must be configured together with a TLS certificate to enable & require either STARTTLS or SSL/TLS encryption.
For testing purposes Mailpit does include a `--smtp-auth-allow-insecure` flag (@env: `MP_SMTP_AUTH_ALLOW_INSECURE=true`) to allow SMTP authentication over a plain text connection (ie: not encrypted).


{{< tip >}}
For testing purposes, Mailpit also allows you to accept any username & password (or none) by using the `--smtp-auth-accept-any` flag. This will literally accept any username & password (or none).
{{< /tip >}}


### Passwords via environment

If you do not wish to use a password file then you can optionally export the `MP_SMTP_AUTH` environment variable with a space-separated list of your credentials, eg: `MP_SMTP_AUTH="user1:password1 user2:password"`.
For security reasons this option is not available as a cli flag.


## SMTP with STARTTLS

To configure Mailpit to serve SMTP with STARTTLS, a TLS certificate and private key must be provided via either the command flags or environment when starting Mailpit, for example:

```shell
mailpit --smtp-tls-cert /path/to/cert.pem --smtp-tls-key /path/to/key.pem 
```

Certificates can be both [self-signed/generated](../certificates/) or official certificates (if you have a valid domain name) obtained via sources like [Let's Encrypt](https://letsencrypt.org/).
