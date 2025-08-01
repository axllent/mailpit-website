---
title: SpamAssassin
description: Integrate Mailpit with SpamAssassin to test "spamminess" of messages
section: configuration
weight: 7
---

Mailpit can optionally integrate with [SpamAssassin](https://spamassassin.apache.org/) (both version 3 and 4) to display the "spamminess" of messages.
This is an opt-in feature that must be enabled when starting Mailpit, and requires either a running instance of SpamAssassin or, alternatively, the use of the free hosted [Postmark service](https://spamcheck.postmarkapp.com/) (see below).

## Enabling SpamAssassin integration

To enable this feature with a self-hosted SpamAssassin instance, you must:

1. Be running an instance of SpamAssassin with an open port (default `783`) that Mailpit can connect to.
2. Start Mailpit with either the `--enable-spamassassin <ip:port>` flag or set the environment variable `MP_ENABLE_SPAMASSASSIN=<ip:port>` to match the IP (or hostname) and port of the running SpamAssassin instance.

Alternatively, if you prefer not to run your own SpamAssassin instance, Mailpit can integrate with the free hosted [Postmark service](https://spamcheck.postmarkapp.com/).
To enable this, use `postmark` without any port: `--enable-spamassassin postmark` or set the environment variable `MP_ENABLE_SPAMASSASSIN=postmark`.

## Setting up SpamAssassin

For your convenience, you can use a lightweight pre-configured [Docker image](https://hub.docker.com/r/axllent/spamassassin) of SpamAssassin (assuming you use Docker).
This Docker image disables all DNS testing (by default), which greatly improves performance, but DNS testing can be enabled (see the Docker image documentation).

If you are installing SpamAssassin yourself via other means, refer to the relevant installation documentation not provided here.

## Notes on using Postmark

Your email data is [posted](https://spamcheck.postmarkapp.com/doc/) (over HTTPS) to their service for every check.
Mailpit has no control over this service, and this integration (i.e., privacy) is provided purely for your convenience (see their [terms](https://postmarkapp.com/terms-of-service-spamcheck)).

Postmark can also be fairly slow, as the service includes DNS and rDNS (reverse DNS) tests for all IP addresses contained within the message (reputation), which can take a few seconds to run for each message.
