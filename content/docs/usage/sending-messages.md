---
title: Sending mail
description: Methods used to send email to Mailpit, including SMTP & an HTTP API
section: usage
weight: 8
---

There are two methods to send emails to Mailpit:

## Send via SMTP

Mailpit acts like any compliant SMTP server, by default listening unencrypted and without authentication on port 1025. The listening port, optional TLS/STARTTLS security & SMTP authentication can be configured via [runtime options](../../configuration/runtime-options/#smtp-server).


## Send via the HTTP API

Messages can alternatively be sent to Mailpit via the HTTP API in JSON format, useful for applications that do not natively support SMTP (see [API documentation](../../api-v1/view.html#post-/api/v1/send)). This API endpoint provides most common functionality for building a message, similar to other popular services.
