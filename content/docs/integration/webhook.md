---
title: Webhook
description: Mailpit can optionally call a webhook URL of your choosing when receiving new messages
---

You can optionally set a webhook URL which will be called when a message is received, allowing Mailpit to trigger events in other web services. Mailpit has been tested with [n8n](https://n8n.io/), but should work equally well with any service allowing webhook configuration.

Mailpit will do a JSON POST to this URL with a [message summary](https://github.com/axllent/mailpit/blob/develop/docs/apiv1/Message.md) of the received message.

To set a webhook URL use the `--webhook-url <URL>` option.


## Notes:

- You can use basic authentication by adding the user and password to the webhook URL (eg: `https://user:password@example.com/webhook`).
- Only received messages will trigger the webhook (ie: not deleted messages etc).
- The JSON data contains the message summary only and cannot be modified.
- Webhook calls are by default limited to 1 request per second. When the limit is reached, any subsequent messages are ignored (not queued) until the time period is reached.
- Failed webhook calls are not retried.


## Rate limiting

By default Mailpit will rate-limit webhook calls to one request second to prevent unintended DOS attacks when a burst of messages is received. You can increase the rate limit using `--webhook-limit 5` option to allow one call every 5 seconds, or if you do not wish to rate limit at all set `--webhook-limit 0`.
