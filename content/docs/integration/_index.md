---
title: Integration testing
description: Mailpit contains a REST API for integration testing
weight: 5
---

Depending on your requirements, frontend integration testing can be achieved via two different approaches:

1. Pull data via the API (see [API documentation](../api-v1/)).
2. Return a rendered HTML or text version of an API via the web UI (see below).


## Return a rendered text or HTML message part

To view either only the HTML or text versions of an email, append a `.html` or `.txt` to the URL generated via the frontend. This would typically be something like 
`http://localhost:8025/view/b50f5a85-f0b6-4be7-8517-2c58d337b3b3.html` or `http://localhost:8025/view/b50f5a85-f0b6-4be7-8517-2c58d337b3b3.txt`

The format is `<Mailpit URL>/view/<ID>.(html|txt)`


## Return the latest text or HTML message part

For ease of use, you can also substitute the `<ID>` with `latest` to return the latest message instead, eg: `http://localhost:8025/view/latest.html` or `http://localhost:8025/view/latest.txt`.

You can optionally apply a [search filter](../usage/search-filters/) to return the latest message matching a search by appending `?query=<search>`, for example `http://localhost:8025/view/latest.html?query=from:user@example.com`.

{{< tip "warning" >}}
1. The HTML & text versions only return the message part, not any other data such as mail headers or attachments (you need to use the API for that).
2. Inline images paths in the HTML part are modified to reference the Mailpit API so they load correctly on the frontend.
3. If no message is found then a 404 is returned.
4. If requesting the HTML part for an existing message without an HTML part, then a 404 is returned.
{{< /tip >}}


## Cypress Mailpit Package

For those using Cypress for integration testing, there is a convenient [Cypress Mailpit package](https://www.npmjs.com/package/cypress-mailpit) available. This package allows you to easily interact with Mailpit within your Cypress tests, providing seamless integration and simplifying your testing workflows.
