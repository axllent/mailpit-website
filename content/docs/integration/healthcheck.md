---
title: Healthcheck endpoints
description: Docker & Kubernetes endpoints for health checks
---

Mailpit has two healthcheck HTTP endpoints that can be used for Docker or [Kubernetes](https://kubernetes.io/docs/reference/using-api/health-checks/): `/livez` and `/readyz`. Both endpoints should return a "200" response if Mailpit is running correctly.
