---
title: Link check
description: Link check will test all message links
section: usage
weight: 5
---

Link check scans your message HTML and text for all unique links, images and linked stylesheets. It then does a HTTP `HEAD` request to each link, 5 at a time, to test whether the link/image/stylesheet exists. 

## What are "301" and "302" links?

These are links that redirect you to another URL, for example newsletters often use redirect links to track user clicks.

By default Link check will not follow these links, however you can turn this on via the settings and Link check will "follow" those redirects. 


## Some links returning an error but work in my browser? 

This may be due to various reasons, for instance:

- The Mailpit server cannot resolve (DNS) the hostname of the URL.
- Mailpit is not allowed to access the URL.
- The webserver is blocking requests that don't come from authenticated web browsers.
- The webserver or doesn't allow HTTP HEAD requests.

{{< tip "warning" >}}
Mailpit will by default require valid HTTPS certificates for outbound HTTPS links. You can disable this using `--allow-untrusted-tls` (or the `MP_ALLOW_UNTRUSTED_TLS=true` environment setting).
{{< /tip >}}
