---
title: Updating Swagger spec
description: How to regenerate the Swagger spec using Docker
section: development
weight: 6
---

Mailpit uses [go-swagger](https://github.com/go-swagger/go-swagger) to automatically generate the Swagger (v2) JSON file.
This file is then used to display the API documentation within Mailpit typically visible on `http://localhost:8025/api/v1/`.
You can view this from within the Mailpit web UI by clicking on the "About" (bottom left) and then "OpenAPI / Swagger API documentation".

Go-swagger uses specific inline comments within Mailpit's Go code to generate this spec file.
For ease of use, I use a self-created Docker image (which ensures consistency) using the following command:

```shell
docker run --rm -it \
    -u $(shell id -u):$(shell id -g) \
    -v "${PWD}:/source" \
    axllent/go-swagger generate spec -m -i ./server/apiv1/swagger-config.yml \
    -o ./server/ui/api/v1/swagger.json
```
