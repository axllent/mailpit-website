---
title: Runtime options
description: Mailpit runtime flags & environment variables
weight: 1
section: configuration
keywords: [flags, options]
---

## General

{{< option flag="database" env="MP_DATABASE" >}}
Specify the local database filename to store persistent data. The default is a local temporary file which is auto-deleted when Mailpit exists.
You can optionally use a remote rqlite database by specifying a "http address". ([See docs](../email-storage/)).
{{< /option >}}

{{< option flag="label" env="MP_LABEL" >}}
Set an optional label to identify this Mailpit instance. This adds the label to the web UI, SMTP and POP3 servers.
{{< /option >}}

{{< option flag="tenant-id" env="MP_TENANT_ID" >}}
Set a tenant ID (table prefix). This is used to isolate the data from other Mailpit instances sharing the same data file ([see docs](../email-storage/)).
{{< /option >}}

{{< option flag="max" env="MP_MAX_MESSAGES" default="500" >}}
Maximum number of messages to store. Mailpit will periodically delete the oldest messages if greater than this.
Set to `0` to disable auto-deletion.
{{< /option >}}

{{< option flag="use-message-dates" env="MP_USE_MESSAGE_DATES" default="false" >}}
Use message header date as the Mailpit received date & time instead of the SMTP-received date & time.
{{< /option >}}

{{< option flag="ignore-duplicate-ids" env="MP_IGNORE_DUPLICATE_IDS" default="false" >}}
Ignore duplicate messages based on Message-Ids.
{{< /option >}}

{{< option flag="log-file" env="MP_LOG_FILE" >}}
Log Mailpit output to file instead of stdout. eg: `--log-file /path/to/logfile.log`
{{< /option >}}

{{< option flag="quiet" env="MP_QUIET" default="false" >}}
Quiet logging (errors only)
{{< /option >}}

{{< option flag="verbose" env="MP_VERBOSE" default="false" >}}
Verbose logging (debug)
{{< /option >}}


## Web UI & API

{{< option flag="listen" env="MP_UI_BIND_ADDR" default="0.0.0.0:8025" >}}
HTTP bind interface and port for UI.
{{< /option >}}

{{< option flag="webroot" env="MP_WEBROOT" default="/" >}}
Set the webroot for web UI & API, for example `mail` would result in `http://0.0.0.0:8025/mail/`.
{{< /option >}}

{{< option flag="ui-auth-file" env="MP_UI_AUTH_FILE" >}}
Specify a password file for web UI & API basic authentication ([see docs](../http/)).
{{< /option >}}

{{< option flag="ui-tls-cert" env="MP_UI_TLS_CERT" >}}
TLS certificate for web UI & API (ie: [HTTPS](../http/)). This option requires the `--ui-tls-key` argument or `MP_UI_TLS_KEY` environment variable to be set.
{{< /option >}}

{{< option flag="ui-tls-key" env="MP_UI_TLS_KEY" >}}
TLS key for web UI & API (ie: [HTTPS](../http/)). This option requires the `--ui-tls-cert` argument or `MP_UI_TLS_CERT` environment variable to be set.
{{< /option >}}

{{< option flag="api-cors" env="MP_API_CORS" >}}
Set API CORS Access-Control-Allow-Origin header if you require cross-domain browser requests.
{{< /option >}}

{{< option flag="block-remote-css-and-fonts" env="MP_BLOCK_REMOTE_CSS_AND_FONTS" default="false" >}}
Block all browser access to remote CSS and fonts imported via message stylesheets. 
Mailpit uses the HTTP Content Security Policy (CSP) method to block these. This does not block remote images or clicking on external link.
{{< /option >}}

{{< option flag="enable-spamassassin" env="MP_ENABLE_SPAMASSASSIN" >}}
Enable SpamAssassin integration for message spamminess score ([see docs](../spamassassin/)).
{{< /option >}}

{{< option flag="allow-untrusted-tls" env="MP_ALLOW_UNTRUSTED_TLS" default="false" >}}
Do not verify HTTPS certificates for either link checker & screenshot generation.
{{< /option >}}


## SMTP server

{{< option flag="smtp" env="MP_SMTP_BIND_ADDR" default="0.0.0.0:1025" >}}
SMTP bind interface and port.
{{< /option >}}

{{< option flag="smtp-auth-file" env="MP_SMTP_AUTH_FILE" >}}
Specify a password file for SMTP authentication ([see docs](../smtp/)).
{{< /option >}}


{{< option flag="smtp-auth-accept-any" env="MP_SMTP_AUTH_ACCEPT_ANY" default="false" >}}
Accept any SMTP username and password, including none. Use this to basically allow anything.
{{< /option >}}

{{< option flag="smtp-tls-cert" env="MP_SMTP_TLS_CERT" >}}
TLS certificate for SMTP STARTTLS. This option requires the `--smtp-tls-key` argument or `MP_SMTP_TLS_KEY` environment variable to be set.
{{< /option >}}

{{< option flag="smtp-tls-key" env="MP_SMTP_TLS_KEY" >}}
TLS key for SMTP STARTTLS. This option requires the `--smtp-tls-cert` argument or `MP_SMTP_TLS_CERT` environment variable to be set.
{{< /option >}}

{{< option flag="smtp-require-starttls" env="MP_SMTP_REQUIRE_STARTTLS" default="false" >}}
Require all SMTP clients to use STARTTLS encryption. If set to true, the only allowed commands are 
NOOP, EHLO, STARTTLS and QUIT (as specified in RFC 4954) until the connection is upgraded to STARTTLS.
{{< /option >}}

{{< option flag="smtp-require-tls" env="MP_SMTP_REQUIRE_TLS" default="false" >}}
Require all SMTP clients to use SSL/TLS encryption. If set to true, all connections to the SMTP server must be
handled over TLS. This is different to STARTTLS which requires the initial connection to be unencrypted. 
Note that this option disables STARTTLS and may reduce client compatibility.
{{< /option >}}

{{< option flag="smtp-auth-allow-insecure" env="MP_SMTP_AUTH_ALLOW_INSECURE" default="false" >}}
Typically either STARTTLS or TLS is enforced for all SMTP authentication. This option allows insecure PLAIN & LOGIN SMTP authentication when using STARTTLS. 
{{< /option >}}

{{< option flag="smtp-strict-rfc-headers" env="MP_SMTP_STRICT_RFC_HEADERS" default="false" >}}
Force Mailpit to return an SMTP error if message headers contain `\n` instead to `\r\n` line breaks.
By default Mailpit will silently fix incorrect line breaks generated by some broken sendmail clients (see related [Github issue](https://github.com/axllent/mailpit/issues/87)).
{{< /option >}}

{{< option flag="smtp-max-recipients" env="MP_SMTP_MAX_RECIPIENTS" default=100 >}}
Maximum number of SMTP recipients allowed per message.
{{< /option >}}

{{< option flag="smtp-allowed-recipients" env="MP_SMTP_ALLOWED_RECIPIENTS" >}}
Only allow SMTP recipients matching a regular expression. Use this to restrict incoming mail to only those sent to a pre-defined list.
An example would be `--smtp-allowed-recipients '@example.com$'` to only allow emails sent to recipients ending in `@example.com`.
{{< /option >}}

{{< option flag="smtp-disable-rdns" env="MP_SMTP_DISABLE_RDNS" default="false" >}}
Disable SMTP reverse DNS lookups.
SMTP will by default try resolve the hostname of the IP address of the connecting client, however in test networks this can sometimes be problematic
causing delays for every message delivered.
{{< /option >}}


## SMTP relay

{{< option flag="smtp-relay-config" env="MP_SMTP_RELAY_CONFIG" >}}
SMTP configuration file to enable message relay/release ([see docs](../smtp-relay/)). Alternatively the entire configuration can be passed via [environment variables](../smtp-relay/#setting-via-environment).
{{< /option >}}

{{< option flag="smtp-relay-all" env="MP_SMTP_RELAY_ALL" default="false" >}}
**Automatically** relay **all** incoming messages via external SMTP server ([see docs](../smtp-relay/#automatically-relay-all-messages)).
Use with extreme caution!
{{< /option >}}

{{< option flag="smtp-relay-matching" env="MP_SMTP_RELAY_MATCHING" >}}
**Automatically** relay some incoming messages to **matching** recipients via external SMTP server ([see docs](../smtp-relay/#automatically-relay-some-messages)).

This will only relay to recipients matching a regular expression, and cannot be used in conjunction with `--smtp-relay-all`.
An example would be `--smtp-relay-matching '(user1@host1\.com|user2@host2\.com|@host3\.com)$'`.
{{< /option >}}


## POP3 server

{{< option flag="pop3" env="MP_POP3_BIND_ADDR" default="0.0.0.0:1110" >}}
POP3 server bind interface and port.
{{< /option >}}

{{< option flag="pop3-auth-file" env="MP_POP3_AUTH_FILE" >}}
Specify a password file for POP3 authentication ([see docs](../pop3/)). 

**Note**: this option is required to enable the POP3 server, or alternatively credentials can be specified via an [environment variable](../pop3/).
{{< /option >}}

{{< option flag="pop3-tls-cert" env="MP_POP3_TLS_CERT" >}}
TLS certificate for POP3 SSL/TLS. This option requires the `--pop3-tls-key` argument or `MP_POP3_TLS_KEY` environment variable to be set.
{{< /option >}}

{{< option flag="pop3-tls-key" env="MP_POP3_TLS_KEY" >}}
TLS key for POP3 SSL/TLS. This option requires the `--pop3-tls-cert` argument or `MP_POP3_TLS_CERT` environment variable to be set.
{{< /option >}}


## Tagging

{{< option flag="tag" env="MP_TAG" >}}
Auto-tag new messages matching filters ([see docs](../../usage/tagging/#set-filters-using---tag)).
{{< /option >}}

{{< option flag="tags-config" env="MP_TAGS_CONFIG" >}}
Load tags filters from yaml configuration file ([see docs](../../usage/tagging/#set-filters-using-a-config)).
{{< /option >}}

{{< option flag="tags-title-case" env="MP_TAGS_TITLE_CASE" default="false" >}}
Enforces TitleCasing for all newly-created tags ([see docs](../../usage/tagging/#enforcing-titlecase)).
{{< /option >}}

{{< option flag="tags-disable" env="MP_TAGS_DISABLE" >}}
Disable specific auto-tagging. This option takes a comma-separated list of options ([see docs](../../usage/tagging/#disable-auto-tagging)).
{{< /option >}}


## Webhook

{{< option flag="webhook-url" env="MP_WEBHOOK_URL" >}}
Call a webhook when new messages are received ([see docs](../../integration/webhook/)), eg: `--webhook-url https://example.com/webhook.php`.
{{< /option >}}

{{< option flag="webhook-limit" env="MP_WEBHOOK_LIMIT" default="1" >}}
Rate limited webhook requests per second.
To prevent potentially overloading the webhook server, this is rate limited by default to a maximum of 1 request per second ([see docs](../../integration/webhook/)).
{{< /option >}}
