---
title: Web UI & API server
description: Configuration options for the web UI & API, including HTTPS
section: configuration
keywords: [authentication, password, login, ssl, security, https, cors, dns rebinding, allowed hosts]
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

- The send API endpoint (`/api/v1/send`) requires the credentials from the send API endpoint password file.
- All other API endpoints and the web UI follow the standard UI authentication rules.
- Send API endpoint credentials cannot be used to access other API endpoints or the web UI.

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

Please note that if your hostnames include port numbers, you should include the port number when configuring CORS. For example, to allow requests from `http://example.com:8080`, you would use:

```shell
mailpit --api-cors "example.com:8080"
```

If you set your CORS to a `*` then Mailpit will allow requests from **any** origin and port. Use this option with caution, as it may expose your Mailpit instance to potential security risks. You cannot use origins containing wildcards for subdomains (e.g., `*.example.com`).

## DNS rebinding mitigation

Because Mailpit is normally accessed under whichever hostname the operator chooses (CI service names, container hostnames, reverse proxies, intranet DNS), the built-in same-origin check accepts any request whose `Origin` header matches its `Host` header. Both of those headers are supplied by the browser, so a page under an attacker-controlled DNS name can be tricked (via DNS rebinding) into sending matching `Host` and `Origin` values pointing at a reachable Mailpit instance, which would otherwise satisfy the same-origin branch of the CORS check.

Starting in **v1.31.1**, Mailpit supports an optional `Host` header allowlist that is evaluated **before** the CORS check. When configured, any request whose `Host` header falls outside the allowlist is rejected with `403 Forbidden`, regardless of the `Origin` header. This anchors the trust decision on a value the operator has independently declared trustworthy, which a rebinding attacker cannot forge.

To enable it, pass `--allowed-hosts` (or set `MP_ALLOWED_HOSTS`) as a comma-separated list of the hostnames you expect to see in the `Host` header:

```shell
mailpit --allowed-hosts "mailpit.example.com,mailpit.internal:8025"
```

Matching rules:

- Entries that include a port match `host:port` **exactly**. `mailpit.internal:8025` will not match a request to `mailpit.internal:9000`.
- Entries **without** a port match any port. `mailpit.example.com` matches both `mailpit.example.com` and `mailpit.example.com:8025`.
- Matching is case-insensitive.
- Loopback names and addresses (`localhost`, `127.0.0.1`, `::1`) are **always** allowed regardless of what you configure, so local development flows continue to work. DNS rebinding cannot target these, as no attacker controls DNS for loopback.
- Requests whose `Host` header is a raw IP address (e.g., `192.168.1.5:8025` or `[2001:db8::1]:8025`) are also **always** allowed. DNS rebinding produces a `Host` header containing the attacker's DNS name, never a raw IP, and a cross-origin fetch that targets an IP directly is already stopped by the CORS same-origin check on the `Origin` header. Direct-IP access to Mailpit from your LAN or Docker network therefore continues to work without listing the IP explicitly.

When `--allowed-hosts` is unset (the default), the previous behaviour is preserved and any `Host` header is accepted, so existing CI, docker, proxy and intranet deployments continue to work without changes.

{{< tip >}}
Mailpit will log a warning at startup when it is bound to a non-loopback interface without either `--allowed-hosts` or `--ui-auth-file` set. For any deployment reachable from an untrusted network, we recommend enabling one of the two, or both.
{{< /tip >}}
