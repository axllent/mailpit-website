---
title: Web UI & API server
description: Configuration options for the web UI & API, including HTTPS
section: configuration
keywords: [authentication, password, login, ssl, security, https]
aliases:
- /docs/configuration/https/
- /docs/configuration/http-authentication/
weight: 2
---

The web UI & [API](../../api-v1/) share the same options as they are in fact both part of the HTTP server, ie: adding basic authentication or HTTPS includes both. 

By default Mailpit web UI & API listens on port `8025` (eg: `http://localhost:8025`, depending on your environment).

When Mailpit is running, you should be able to open `http://localhost:8025` in your browser to view the web UI.

## Adding HTTPS

HTTPS can be enabled for the web UI & API simply by providing Mailpit with an SSL key & certificate, depending on your requirements. Alternatively you could use a [HTTP proxy](../proxy/) if you are technically inclined.

For this you require **both** the SSL certificate and private key set in the Mailpit flags or environment variables, for example:

```shell
mailpit --ui-tls-cert /path/to/cert.pem --ui-tls-key /path/to/key.pem 
```

Certificates can be both [self-signed/generated](../certificates/) or signed certificates (if you have a valid domain name) obtained via sources like [Let's Encrypt](https://letsencrypt.org/).

{{< tip >}}
You can also use a webserver to proxy requests through to Mailpit, [see here](../proxy/) for more details.
{{< /tip >}}


## Adding basic authentication

To add basic authentication login you must provide Mailpit with a valid [password file](../passwords/) using the `--ui-auth-file <password-file>` flag (@env: `MP_UI_AUTH_FILE=<password-file`), for example:


```shell
mailpit --ui-auth-file /path/to/password-file
```

### Passwords via environment

You can optionally export the `MP_UI_AUTH` environment variable with a space-separated list of your credentials, eg: `MP_UI_AUTH="user1:password1 user2:password2"`. For security reasons this option is not available as a cli flag.
