---
title: Spam check
description: Spam check will test a message for "spamminess" using a running SpamAssassin or Rspamd server
section: usage
weight: 5
aliases:
    - /docs/usage/spamassassin/
    - /docs/usage/spam-analysis/
---

![Mailpit](/images/spamassassin.png)

Mailpit can optionally integrate with SpamAssassin (both versions 3 and 4) and/or [Rspamd](https://rspamd.com/) to provide insight into the "spamminess" of your messages.
Each time Mailpit checks the scores for a message, it sends (posts) your complete message (including attachments) to a running SpamAssassin or Rspamd server and then displays the results returned by that server.

Please refer to the configuration documentation to see how to enable [SpamAssassin](../../configuration/spamassassin/) or [Rspamd](../../configuration/rspamd/) integration.
Both can be enabled at the same time, in which case Mailpit shows a separate "SpamAssassin" and "Rspamd" tab for each.

## Notes on SpamAssassin

The default spam threshold is `5`, meaning any score lower than 5 is considered ham (not spam), and any score of 5 or above is spam.
SpamAssassin will also return the rules that are triggered by the message. These rules can differ depending on the configuration of your SpamAssassin server. The total of this score makes up the "spamminess" of the message.

Mailpit does not manipulate the results nor determine the "spamminess" of your message. The result is what SpamAssassin returns, and it is entirely dependent on how SpamAssassin is set up and optionally trained.
This tool is simply provided as an aid to assist you. If you are running your own instance of SpamAssassin, then you should look into your SpamAssassin configuration. If you are using the Postmark service, then the results are what they are (you cannot change that).

For a list of default SpamAssassin tests run, please [see this](https://spamassassin.apache.org/old/tests_3_3_x.html). The SpamAssassin report will only return tests triggered by the message.

## Notes on Rspamd

Rspamd returns a recommended action (such as "no action", "greylist", "add header" or "reject") based on the score of the message.
Mailpit considers a message to be spam when Rspamd's action is "add header", "rewrite subject" or "reject", and displays the score relative to the "add header" threshold (`6` by default, but this depends on your Rspamd configuration).
Rspamd will also return the symbols that are triggered by the message, which Mailpit lists with the highest scores first. Symbols can have a negative score, which lowers the total score of the message.

As with SpamAssassin, Mailpit does not manipulate the results. The result is what Rspamd returns, and it is entirely dependent on how Rspamd is configured and trained. For more information about symbols, please refer to the [Rspamd documentation](https://docs.rspamd.com/).
