---
title: API (v1)
weight: 8
description: Mailpit API documentation and Swagger/OpenAPI 2.0 file
---

Mailpit provides a simple REST API to access, search and delete stored messages.
It also allows you to send messages via HTTP, modify message tags, and release messages via a preconfigured SMTP relay server.

<p>
{{< button "view.html" "Open the online API documentation" "btn-primary btn-lg" >}}
</p>

There is also some documentation about receiving message notifications via the [websocket endpoint](./websocket/), however this is not part of the official API.

{{< tip "warning" >}}
If the Mailpit server is set to use Basic Authentication, then all API requests must use Basic Authentication too.

**Send API Authentication (v1.26.0):** The Send API endpoint (`/api/v1/send`) can have [separate authentication](../configuration/http/#send-api-separate-authentication) configured, independent of other API endpoints. When separate Send API authentication is configured, the Send API will use its own credentials, while all other API endpoints continue to use UI authentication.
{{< /tip >}}

{{< tip >}}
You can also view the **interactive** API documentation directly within Mailpit by going to `http://localhost:8025/api/v1/` (you may need to adjust to the IP address of your Mailpit instance).
{{< /tip >}}

{{< tip >}}
The auto-generated Mailpit Swagger 2.0 file (aka OpenAPI 2.0) can be found [here](https://raw.githubusercontent.com/axllent/mailpit/master/server/ui/api/v1/swagger.json).
{{< /tip >}}
