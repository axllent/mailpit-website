---
title: Web UI & API server
description: Configuration options for the web UI & API, including HTTPS
section: configuration
keywords: [authentication, password, login, ssl, security, https, cors]
aliases:
    - /docs/configuration/https/
    - /docs/configuration/http-authentication/
weight: 2
---

The web UI and [API](../../api-v1/) share the same configuration options, as both are part of the HTTP server. For example, enabling basic authentication or HTTPS applies to both.

By default, the Mailpit web UI and API listen on port `8025` (e.g., `http://localhost:8025`, depending on your environment).

When Mailpit is running, you should be able to open `http://localhost:8025` in your browser to access the web UI.

## Adding HTTPS

HTTPS can be enabled for the web UI and API by providing Mailpit with an SSL certificate and private key, depending on your requirements. Alternatively, you can use an [HTTP proxy](../proxy/) if you are technically inclined.

You must provide **both** the SSL certificate and private key using Mailpit flags or environment variables. For example:

```shell
mailpit --ui-tls-cert /path/to/cert.pem --ui-tls-key /path/to/key.pem
```

Certificates can be [self-signed/generated](../certificates/) or signed by a certificate authority (if you have a valid domain name), such as those obtained from [Let's Encrypt](https://letsencrypt.org/).

{{< tip >}}
You can also use a web server to proxy requests to Mailpit. [See here](../proxy/) for more details.
{{< /tip >}}

## Adding basic authentication

To add basic authentication, provide Mailpit with a valid [password file](../passwords/) using the `--ui-auth-file <password-file>` flag (or environment variable `MP_UI_AUTH_FILE=<password-file>`). For example:

```shell
mailpit --ui-auth-file /path/to/password-file
```

### Passwords via environment

You can optionally export the `MP_UI_AUTH` environment variable with a space-separated list of credentials, e.g., `MP_UI_AUTH="user1:password1 user2:password2"`. For security reasons, this option is not available as a CLI flag.

## Send API endpoint dedicated authentication

Starting in **v1.26.0**, Mailpit supports dedicated authentication for the send message endpoint (`/api/v1/send`), allowing you to configure different authentication requirements for sending messages versus accessing other API endpoints or the web UI.

This feature provides three configuration options:

### Dedicated send API endpoint credentials

You can configure separate credentials specifically for the send API endpoint using a [password file](../passwords/):

```shell
mailpit --send-api-auth-file /path/to/send-api-password-file
```

When configured this way:

-   The send API endpoint (`/api/v1/send`) requires the credentials from the send API endpoint password file.
-   All other API endpoints and the web UI follow the standard UI authentication rules.
-   Send API endpoint credentials cannot be used to access other API endpoints or the web UI.

### Accept any credentials for send API

For testing environments, you can configure the send API endpoint to accept any credentials (or no credentials at all):

```shell
mailpit --send-api-auth-accept-any
```

This option bypasses all authentication requirements for the send API endpoint only, while other API endpoints and the web UI continue to require proper authentication if configured.

### Fallback to UI authentication

If no send endpoint authentication is specifically configured, the endpoint will fall back to using the same authentication requirements as the web UI and other API endpoints.

### Environment variables

You can also configure the send API endpoint authentication via environment variables:

```shell
# Set dedicated send API endpoint credentials
MP_SEND_API_AUTH_FILE=/path/to/send-api-password-file

# Or provide credentials directly (space-separated list)
MP_SEND_API_AUTH="senduser1:password1 senduser2:password2"

# Or accept any credentials for Send API
MP_SEND_API_AUTH_ACCEPT_ANY=true
```

{{< tip "warning" >}}
The `--send-api-auth-file` and `--send-api-auth-accept-any` options cannot be used together. Mailpit will refuse to start if both are configured.
{{< /tip >}}

## CORS configuration

Cross-Origin Resource Sharing (CORS) for the Mailpit API and websocket can be configured using the `--api-cors "<hostname>"` flag (or environment variable `MP_API_CORS="<hostname>"`).
Mailpit will always allow requests from the same origin (domain) as the web UI, so this option is only necessary if you are accessing the API or websocket from a different origin.

Allowed hostnames must be provided as a comma-separated list. For example, to allow requests from `http://example.com` and `http://anotherdomain.com`, you would start Mailpit with:

```shell
mailpit --api-cors "example.com,anotherdomain.com"
```

If you set this to a `*` then Mailpit will allow requests from **any** origin. Use this option with caution, as it may expose your Mailpit instance to potential security risks. You cannot use origins containing wildcards for subdomains (e.g., `*.example.com`).
