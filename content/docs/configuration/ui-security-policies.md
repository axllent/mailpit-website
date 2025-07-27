---
title: UI security policies
description: Various privacy & security policies enforced by Mailpit
section: configuration
---

## Content security policy

HTML content can embed JavaScript or iframes, or link to remote scripts, stylesheets, and fonts. While email programs usually have either no or very limited support for such features, web browsers will typically load everything. Mailpit removes any base tags (`<base href="....">`) from HTML emails to ensure embedded images are displayed correctly; however, the remainder is left intact.

The Mailpit UI enforces a strict `Content-Security-Policy` header, which prevents your browser from loading any remote content except for images, stylesheets, and fonts. This means your web browser will block all iframes and both inline and remote JavaScript within the UI.

To disable remote CSS stylesheets and fonts (e.g., Google Fonts), use the `--block-remote-css-and-fonts` [runtime option](../runtime-options/).

This security measure should not impact how an email displays and is for your privacy and protection. Emails should not use these features anyway, as they are predominantly blocked by both email and webmail clients.

## Referrer policy

The Mailpit UI also uses a `Referrer-Policy: no-referrer`, meaning that any remote requests (when loading remote images) will not provide the remote server with the origin of the request (i.e., your Mailpit UI web address).

## Tracking images

Tracking images (e.g., in campaign emails) are not blocked. If you wish to block these, you will need to use a browser ad-blocker. All remote images are allowed.

## External links

External links from HTML emails will always open in a new window/tab automatically (`target="_blank"`), regardless of whether a `target` is set in the anchor link.
