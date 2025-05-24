---
title: Docker images
description: Examples of how to run Mailpit within Docker
weight: 3
---

The official Docker images can be found on on [https://hub.docker.com/r/axllent/mailpit](https://hub.docker.com/r/axllent/mailpit).

For convenience, a [mirror copy](https://github.com/axllent/mailpit/pkgs/container/mailpit) of Docker images can also be found on ghcr.io.


## Supported tags

- The latest release can always be found using `axllent/mailpit` or `axllent/mailpit:latest`
- Stable releases are tagged with both the release tag (eg: `axllent/mailpit:v.1.2.3`) as well as the minor release (eg: `axllent/mailpit:v1.2`).
- Development builds include unreleased features and are tagged using the `axllent/mailpit:edge` tag. These should not be used in production.


## Usage

A basic example of running Mailpit within Docker:

```shell
docker run -d \
--restart unless-stopped \
--name=mailpit \
-p 8025:8025 \
-p 1025:1025 \
axllent/mailpit
```
You need to ensure you map the correct ports (default Web UI on 8025 and SMTP on 1025). 


## Setting Mailpit options

View all [runtime options](/docs/configuration/runtime-options/) (flags & environment variables). Environment variables can be set using the `-e` flag when starting your docker container, for instance:

```shell
docker run -d \
--name=mailpit \
--restart unless-stopped \
-v /path/to/mailpit-data:/data \
-e MP_DATABASE=/data/mailpit.db \
-e MP_UI_AUTH_FILE=/data/authfile \
-e TZ=Europe/London \
-p 8025:8025 \
-p 1025:1025 \
axllent/mailpit
```


## Docker compose example

The following example exposes both the web UI port (8025) and SMTP port (1025) to the entire host network. If your Docker compose is running multi-container applications and does not require (for instance) 1025 to be open to the host, then you can omit `- 1025:1025` which will then only expose it to the other containers within the specified services.

```yaml
services:
  mailpit:
    image: axllent/mailpit
    container_name: mailpit
    restart: unless-stopped
    volumes:
      - ./data:/data
    ports:
      - 8025:8025
      - 1025:1025
    environment:
      MP_MAX_MESSAGES: 5000
      MP_DATABASE: /data/mailpit.db
      MP_SMTP_AUTH_ACCEPT_ANY: 1
      MP_SMTP_AUTH_ALLOW_INSECURE: 1
```
