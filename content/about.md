---
title: "About Mailpit"
description: "About the Mailpit SMTP & email testing tool, history and Docker stats"
layout: about
---

<p class="lead">
Mailpit was developed to provide a performant, modern, open-source utility for testing emails and SMTP delivery.
It provides an intuitive web user interface for viewing messages and an API for integration testing.
</p>

Mailpit serves as a local SMTP server, allowing developers to view emails without sending them to real email addresses.

## Key features of Mailpit include:

1. **Web interface**: Mailpit provides a user-friendly web interface where you can view, search, and inspect the emails that have been captured, including their content and headers. Additional tooling provides insight into email client compatibility and "spamminess".

2. **SMTP server**: It acts as a local SMTP server, which means you can configure your application to send emails directly to Mailpit instead of a real email server.

3. **Easy setup**: Mailpit is easy to install and can be run using Docker or as a standalone application, making it convenient for various development environments.

4. **Real-time email capture**: It captures emails in real-time, allowing developers to see the results of their email-sending functionality immediately, either via the web UI or API.

5. **Lightweight and fast**: Mailpit is designed to be lightweight and fast, running natively or in Docker, making it suitable for quick testing scenarios.

Overall, Mailpit is a valuable tool for developers looking to test email functionality in their applications without the risk of sending emails to real users or dealing with email delivery issues.

## History

While other similar solutions already existed, they either lacked features, lacked support (e.g., were no longer maintained), did not perform well under load, or could not handle a significant number of emails (10,000+). At the time, we needed a testing solution that could handle large bursts of mail and attachments well, but nothing seemed to fit.

The project was originally **inspired** by MailHog, which makes it somewhat compatible (SMTP & HTTPS ports) as a drop-in replacement; however, that is about where the similarities end.
Mailpit now contains an [extensive set](../docs/) of web UI and API features to assist with email testing, packed into [a single binary](../docs/install/) with no system dependencies.
There are also compact multi-architecture Docker images available.

Mailpit was first released on July 30, 2022, and despite being one of the newest players on the block, it quickly gained popularity.
Mailpit has become the go-to development solution for SMTP capture & email testing for many popular projects such as [Laravel](https://laravel.com/docs/11.x/sail#previewing-emails),
[DDEV](https://ddev.com/), [Quarkus](https://quarkus.io/) & [Saleor](https://saleor.io/) (just to name a few). It is playing a large role in CI/CD pipelines, and
gaining native package support for various [\*nix platforms](https://repology.org/project/mailpit/versions).
