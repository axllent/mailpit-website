---
title: Runtime options
description: Mailpit runtime flags & environment variables
weight: 1
section: configuration
tags:
  - flags
  - options
---

## General

{{< option database MP_DATABASE >}}
Specify the local database filename to store persistent data. The default is a local temporary file which is auto-deleted when Mailpit exists.
You can optionally use a remote rqlite database by specifying a "http address". ([See docs](../email-storage/)).
{{< /option >}}

{{< option tenant-id MP_TENANT_ID >}}
Set a tenant ID (table prefix). This is used to isolate the data from other Mailpit instances sharing the same data file ([see docs](../email-storage/)).
{{< /option >}}

{{< option max MP_MAX_MESSAGES "500" >}}
Maximum number of messages to store. Mailpit will periodically delete the oldest messages if greater than this.
Set to `0` to disable auto-deletion.
{{< /option >}}

{{< option use-message-dates MP_USE_MESSAGE_DATES "false" >}}
Use message header date as the Mailpit received date & time instead of the SMTP-received date & time.
{{< /option >}}

{{< option ignore-duplicate-ids MP_IGNORE_DUPLICATE_IDS "false" >}}
Ignore duplicate messages based on Message-Ids.
{{< /option >}}

{{< option log-file MP_LOG_FILE >}}
Log Mailpit output to file instead of stdout. eg: `--log-file /path/to/logfile.log`
{{< /option >}}

{{< option quiet MP_QUIET "false" >}}
Quiet logging (errors only)
{{< /option >}}

{{< option verbose MP_VERBOSE "false" >}}
Verbose logging (debug)
{{< /option >}}


## Web UI & API

{{< option listen MP_UI_BIND_ADDR "0.0.0.0:8025" >}}
HTTP bind interface and port for UI.
{{< /option >}}

{{< option webroot MP_WEBROOT "/" >}}
Set the webroot for web UI & API, for example `mail` would result in `http://0.0.0.0:8025/mail/`.
{{< /option >}}

{{< option ui-auth-file MP_UI_AUTH_FILE >}}
Specify a password file for web UI & API basic authentication ([see docs](../http/)).
{{< /option >}}

{{< option ui-tls-cert MP_UI_TLS_CERT >}}
TLS certificate for web UI & API (ie: [HTTPS](../http/)). This option requires the `--ui-tls-key` argument or `MP_UI_TLS_KEY` environment variable to be set.
{{< /option >}}

{{< option ui-tls-key MP_UI_TLS_KEY >}}
TLS key for web UI & API (ie: [HTTPS](../http/)). This option requires the `--ui-tls-cert` argument or `MP_UI_TLS_CERT` environment variable to be set.
{{< /option >}}

{{< option api-cors MP_API_CORS >}}
Set API CORS Access-Control-Allow-Origin header if you require cross-domain browser requests.
{{< /option >}}

{{< option block-remote-css-and-fonts MP_BLOCK_REMOTE_CSS_AND_FONTS "false" >}}
Block all browser access to remote CSS and fonts imported via message stylesheets. 
Mailpit uses the HTTP Content Security Policy (CSP) method to block these. This does not block remote images or clicking on external link.
{{< /option >}}

{{< option enable-spamassassin MP_ENABLE_SPAMASSASSIN >}}
Enable SpamAssassin integration for message spamminess score ([see docs](../spamassassin/)).
{{< /option >}}

{{< option allow-untrusted-tls MP_ALLOW_UNTRUSTED_TLS "false" >}}
Do not verify HTTPS certificates for either link checker & screenshot generation.
{{< /option >}}


## SMTP server

{{< option smtp MP_SMTP_BIND_ADDR "0.0.0.0:1025" >}}
SMTP bind interface and port.
{{< /option >}}

{{< option smtp-auth-file MP_SMTP_AUTH_FILE >}}
Specify a password file for SMTP authentication ([see docs](../smtp/)).
{{< /option >}}


{{< option smtp-auth-accept-any MP_SMTP_AUTH_ACCEPT_AN "false"Y >}}
Accept any SMTP username and password, including none. Use this to basically allow anything.
{{< /option >}}

{{< option smtp-tls-cert MP_SMTP_TLS_CERT >}}
TLS certificate for SMTP STARTTLS. This option requires the `--smtp-tls-key` argument or `MP_SMTP_TLS_KEY` environment variable to be set.
{{< /option >}}

{{< option smtp-tls-key MP_SMTP_TLS_KEY >}}
TLS key for SMTP STARTTLS. This option requires the `--smtp-tls-cert` argument or `MP_SMTP_TLS_CERT` environment variable to be set.
{{< /option >}}

{{< option smtp-require-starttls MP_SMTP_REQUIRE_STARTTLS "false" >}}
Require all SMTP clients to use STARTTLS encryption. If set to true, the only allowed commands are 
NOOP, EHLO, STARTTLS and QUIT (as specified in RFC 4954) until the connection is upgraded to STARTTLS.
{{< /option >}}

{{< option smtp-require-tls MP_SMTP_REQUIRE_TLS "false" >}}
Require all SMTP clients to use SSL/TLS encryption. If set to true, all connections to the SMTP server must be
handled over TLS. This is different to STARTTLS which requires the initial connection to be unencrypted. 
Note that this option disables STARTTLS and may reduce client compatibility.
{{< /option >}}

{{< option smtp-auth-allow-insecure MP_SMTP_AUTH_ALLOW_INSECURE "false" >}}
Typically either STARTTLS or TLS is enforced for all SMTP authentication. This option allows insecure PLAIN & LOGIN SMTP authentication when using STARTTLS. 
{{< /option >}}

{{< option smtp-strict-rfc-headers MP_SMTP_STRICT_RFC_HEADERS "false" >}}
Force Mailpit to return an SMTP error if message headers contain `\n` instead to `\r\n` line breaks.
By default Mailpit will silently fix incorrect line breaks generated by some broken sendmail clients (see related [Github issue](https://github.com/axllent/mailpit/issues/87)).
{{< /option >}}

{{< option smtp-max-recipients MP_SMTP_MAX_RECIPIENTS 100 >}}
Maximum number of SMTP recipients allowed per message.
{{< /option >}}

{{< option smtp-allowed-recipients MP_SMTP_ALLOWED_RECIPIENTS >}}
Only allow SMTP recipients matching a regular expression. Use this to restrict incoming mail to only those sent to a pre-defined list.
An example would be `--smtp-allowed-recipients '@example.com$'` to only allow emails sent to recipients ending in `@example.com`.
{{< /option >}}

{{< option smtp-disable-rdns MP_SMTP_DISABLE_RDNS "false" >}}
Disable SMTP reverse DNS lookups.
SMTP will by default try resolve the hostname of the IP address of the connecting client, however in test networks this can sometimes be problematic
causing delays for every message delivered.
{{< /option >}}


## SMTP relay

{{< option smtp-relay-config MP_SMTP_RELAY_CONFIG >}}
SMTP configuration file to allow releasing messages ([see docs](../smtp-relay/)). Alternatively configuration can be passed via [environment variables](../smtp-relay/).
{{< /option >}}

{{< option smtp-relay-all MP_SMTP_RELAY_ALL "false" >}}
**Automatically** relay **all** incoming messages via external SMTP server - ([see docs](../smtp-relay/#automatically-relay-all-messages)).
Use with extreme caution!
{{< /option >}}

{{< option smtp-relay-matching MP_SMTP_RELAY_MATCHING >}}
**Automatically** relay some incoming messages to **matching** recipients via external SMTP server ([see docs](../smtp-relay/#automatically-relay-some-messages)).

This will only relay to recipients matching a regular expression, and cannot be used in conjunction with `--smtp-relay-all`.
An example would be `--smtp-relay-matching '(user1@host1\.com|user2@host2\.com|@host3\.com)$'`.
{{< /option >}}


## POP3 server

{{< option pop3 MP_POP3_BIND_ADDR "0.0.0.0:1110" >}}
POP3 server bind interface and port.
{{< /option >}}

{{< option pop3-auth-file MP_POP3_AUTH_FILE >}}
Specify a password file for POP3 authentication ([see docs](../pop3/)). 

**Note**: this option is required to enable the POP3 server, or alteratively credentials can be specified via an [environment variable](../pop3/).
{{< /option >}}

{{< option pop3-tls-cert MP_POP3_TLS_CERT >}}
TLS certificate for POP3 SSL/TLS. This option requires the `--pop3-tls-key` argument or `MP_POP3_TLS_KEY` environment variable to be set.
{{< /option >}}

{{< option pop3-tls-key MP_POP3_TLS_KEY >}}
TLS key for POP3 SSL/TLS. This option requires the `--pop3-tls-cert` argument or `MP_POP3_TLS_CERT` environment variable to be set.
{{< /option >}}


## Tagging

{{< option tag MP_TAG >}}
Auto-tag new messages matching filters ([see docs](../../usage/tagging/)).
{{< /option >}}

{{< option tags-config MP_TAGS_CONFIG >}}
Load tags filters from yaml configuration file ([see docs](../../usage/tagging/)).
{{< /option >}}

{{< option tags-title-case MP_TAGS_TITLE_CASE "false" >}}
Enforces TitleCasing for all newly-created tags ([see docs](../../usage/tagging/)).
{{< /option >}}


## Webhook

{{< option webhook-url MP_WEBHOOK_URL >}}
Call a webhook when new messages are received ([see docs](../../integration/webhook/)), eg: `--webhook-url https://example.com/webhook.php`.
{{< /option >}}

{{< option webhook-limit MP_WEBHOOK_LIMIT "1" >}}
Rate limited webhook requests per second.
To prevent potentially overloading the webhook server, this is rate limited by default to a maximum of 1 request per second ([see docs](../../integration/webhook/)).
{{< /option >}}
