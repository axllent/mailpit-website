---
title: Webhook
description: Mailpit can optionally call a webhook URL of your choosing when receiving new messages
---

You can optionally set a webhook URL to be called when a message is received, allowing Mailpit to trigger events in other web services.
Mailpit has been tested with [n8n](https://n8n.io/), but it should work equally well with any service that allows webhook configuration.

Mailpit will send a JSON POST to this URL with a [message summary](https://mailpit.axllent.org/docs/api-v1/view.html#get-/api/v1/message/-ID-) (see Response -> Schema) of the received message.

To set a webhook URL, use the `--webhook-url <URL>` (@env `MP_WEBHOOK_URL=<url>`) option.

## Notes:

-   You can use basic authentication by adding the user and password to the webhook URL (e.g., `https://user:password@example.com/webhook`).
-   Only received messages will trigger the webhook (i.e., not deleted messages, etc.).
-   The JSON data contains only the message summary and cannot be modified.
-   Webhook calls are, by default, limited to 1 request per second. When the limit is reached, any subsequent messages are ignored (not queued) until the time period is reached.
-   Failed webhook calls are not retried.
-   If a Mailpit label has been specified, a `Mailpit-Label` header is automatically added to the webhook request.

## Rate limiting

By default, Mailpit will rate-limit webhook calls to one request per second to prevent unintended DoS attacks when a burst of messages is received.
You can increase the rate limit using the `--webhook-limit 5` (@env `MP_WEBHOOK_LIMIT=5`) option to allow one call every 5 seconds, or if you do not wish to rate limit at all, set `--webhook-limit 0`.
