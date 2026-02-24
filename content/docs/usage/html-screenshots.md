---
title: HTML screenshots
description: Taking screenshots of HTML messages via the web UI
section: usage
weight: 7
---

The Mailpit web UI has the ability to take screenshots of HTML messages (see the `Download` button when previewing an HTML message).
However, there are a few limitations to be aware of:

1. Screenshots rely on the web browser and are therefore limited to the web UI only. Screenshot generation cannot be automated via the API.
2. Due to browser security features, fetching remote data (images, fonts, etc.) is prohibited when rendering a canvas (the technique used to create the screenshots). For this reason, all remote requests are proxied via Mailpit instead. This means that Mailpit must be able to resolve the remote hostnames where the assets are being fetched from.
3. Email clients such as Outlook insert custom "html" elements (e.g., `<o:p>`) into HTML messages. This breaks the screenshot utility. To work around this, all HTML elements matching `<o:...` are either rewritten as regular elements or removed, depending on whether they contain any data. This may result in slightly different line spacing than what you see in your preview.

{{< tip "warning" >}}
For security reasons, Mailpit will (by default) **block** all proxied requests to internal (non-public) networks, including loopback, private, unicast & multicast addresses. This is to prevent SSRF (Server-Side Request Forgery) attacks, which can be used to access internal services or resources that are not intended to be exposed. If you trust all traffic to your Mailpit instance, or use authentication to restrict access to your Mailpit instance, you can disable this using `--allow-internal-http-requests` (or the `MP_ALLOW_INTERNAL_HTTP_REQUESTS=true` environment setting).
{{< /tip >}}

{{< tip "warning" >}}
Mailpit will, by default, require valid HTTPS certificates for all assets (images, etc.) contained within an HTML message. You can disable this using `--allow-untrusted-tls` (or the `MP_ALLOW_UNTRUSTED_TLS=true` environment setting).
{{< /tip >}}
