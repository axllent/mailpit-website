---
title: 'About Mailpit'
description: 'About the Mailpit SMTP & email testing tool, history and Docker stats'
layout: about
---

<p class="lead">
Mailpit was developed to provide a performant, modern, open source utility to test emails and SMTP delivery.
It provides an intuitive web user interface to view messages, and an API for integration testing.
</p>

Whilst other similar solutions already existed, they either lacked features, lacked support (eg: no longer maintained),
did not perform well under load, or could not handle a significant number of emails (10k+). At the time we needed a testing 
solution that would handle large bursts of mail and handle attachments (well), but nothing seemed to fit.

The project was originally **inspired** by MailHog, which makes it a somewhat compatible (SMTP & HTTPS ports) as a drop-in replacement, however that is about where the similarities end.
Mailpit now contains an [extensive set](../docs/) of unique web UI & API features to assist email testing, packed into [a single binary](../docs/install/) with no system dependencies.

Mailpit was first released on July 30 2022, and despite being one of the newest players on the block, it did not take long for it to gain traction. 
Mailpit has become the go-to solution for SMTP capture & email testing in several popular web development frameworks such as [Laravel](https://laravel.com/docs/11.x/sail#previewing-emails) 
and [DDEV](https://ddev.com/), and is playing a large role in CI/CD pipelines and gaining native package support for various [*nix platforms](https://repology.org/project/mailpit/versions).
