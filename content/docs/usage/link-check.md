---
title: Link check
description: Link check will test all message links
section: usage
weight: 5
---

Link check scans your message HTML and text for all unique links, images, and linked stylesheets. It then makes an HTTP `HEAD` request to each link, 5 at a time, to test whether the link, image, or stylesheet exists.

{{< tip "warning" >}}
For security reasons, link check will (by default) **block** all HTTP requests to internal (non-public) networks, including loopback, private, unicast & multicast addresses. This is to prevent SSRF (Server-Side Request Forgery) attacks, which can be used to access internal services or resources that are not intended to be exposed. If you trust all traffic to your Mailpit instance, or use authentication to restrict access to your Mailpit instance, you can disable this using `--allow-internal-http-requests` (or the `MP_ALLOW_INTERNAL_HTTP_REQUESTS=true` environment setting).
{{< /tip >}}

{{< tip "warning" >}}
Link check will, by default, require valid HTTPS certificates for any HTTPS links. You can disable this using `--allow-untrusted-tls` (or the `MP_ALLOW_UNTRUSTED_TLS=true` environment setting).
{{< /tip >}}

## What are "301" and "302" links?

These are links that redirect you to another URL. For example, newsletters often use redirect links to track user clicks.

By default, Link check will not follow these links; however, you can turn this on via the settings, and Link check will "follow" those redirects.

## Some links return an error but work in my browser?

This may be due to various reasons, for instance:

- The Mailpit server cannot resolve (DNS) the hostname of the URL.
- Mailpit is not allowed to access the URL.
- The webserver is blocking requests that don't come from authenticated web browsers.
- The webserver does not allow HTTP HEAD requests.
