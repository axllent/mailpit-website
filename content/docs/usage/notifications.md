---
title: Message notifications
description: Get notified when Mailpit receives new messages
section: usage
weight: 2
---

Depending on your requirements, Mailpit contains various methods to notify you when new messages are received.

{{< tip "warning" >}}
Please note that notifications require a working websocket connection to the Mailpit server. If you are using a proxy to access Mailpit, then please ensure your websocket is routing through correctly.
{{< /tip >}}




## Favicon counter

The browser tab favicon includes an unread message counter which will automatically update when new messages are received. This is available on desktop browsers only, and when any open tab is running Mailpit.


## Message toast

When new messages arrive Mailpit will display a clickable toast (element) at the bottom right of the page which displays a brief summary of the message. Clicking on this will open the message. This is only visible when viewing the Mailpit web UI, and the toasts automatically disappear after a few seconds. This feature is automatically disabled if [browser notifications](#browser-notifications) are enabled.


## Browser notifications

You can optionally enable browser notifications by clicking on the "bell" icon at the bottom left. If enabled, toast notifications are disabled. You must have Mailpit open in any tab for notifications to work.


{{< tip >}}
Browser notifications are only enabled if viewing the web UI via the `localhost` hostname, or if accessing the web UI via [HTTPS](/docs/configuration/http/). This is not a Mailpit limitation but rather due to standard web browser security features.
{{< /tip >}}


## Webhooks

You can integrate third party tools by setting a webhook for Mailpit to call when new messages arrive. See [webhook integration](/docs/integration/webhook/) for more information.
