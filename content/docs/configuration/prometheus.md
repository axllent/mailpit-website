---
title: Prometheus metrics
description: Monitor Mailpit performance and statistics with Prometheus
weight: 12
section: configuration
keywords: [prometheus, metrics, monitoring, statistics]
---

Mailpit includes optional Prometheus metrics support to monitor mail server performance and usage statistics.

## Enabling Prometheus metrics

Prometheus metrics are disabled by default. To enable them, use either the command line flag or environment variable:

### Integrated mode

Serve metrics on the main web UI port inheriting all configuration such as TLS and authentication at `/metrics`:

```bash
# Using command line flag
mailpit --enable-prometheus true

# Using environment variable  
export MP_ENABLE_PROMETHEUS=true
mailpit
```


### Separate server mode

Run a dedicated metrics server on a custom port without TLS or authentication:

```bash
# Custom listen address for separate server
mailpit --enable-prometheus 0.0.0.0:9091

# Using environment variable
export MP_ENABLE_PROMETHEUS="0.0.0.0:9091"
mailpit
```

## Available metrics

Mailpit exposes the following metrics:

#### Message statistics
- **`mailpit_messages`** (gauge) - Total number of messages in the database
- **`mailpit_messages_unread`** (gauge) - Number of unread messages
- **`mailpit_messages_deleted_total`** (counter) - Total number of messages deleted

#### SMTP statistics
- **`mailpit_smtp_accepted_total`** (counter) - Total SMTP messages accepted
- **`mailpit_smtp_rejected_total`** (counter) - Total SMTP messages rejected
- **`mailpit_smtp_ignored_total`** (counter) - Total SMTP messages ignored (duplicates)
- **`mailpit_smtp_accepted_size_bytes_total`** (counter) - Total size of accepted SMTP messages in bytes

#### System statistics
- **`mailpit_database_size_bytes`** (gauge) - Database size in bytes
- **`mailpit_uptime_seconds`** (gauge) - Mailpit uptime in seconds
- **`mailpit_memory_usage_bytes`** (gauge) - Current memory usage in bytes

#### Tag statistics
- **`mailpit_tag_messages`** (gauge) - Number of messages per tag, labeled by tag name

## Prometheus configuration

To configure Prometheus to scrape Mailpit metrics, add the following to your `prometheus.yml`:

### For integrated mode
```yaml
scrape_configs:
  - job_name: 'mailpit'
    static_configs:
      - targets: ['localhost:8025']
    scrape_interval: 30s
    metrics_path: '/metrics'
```

### For separate server mode
```yaml
scrape_configs:
  - job_name: 'mailpit'
    static_configs:
      - targets: ['localhost:9091']  # Use your custom port
    scrape_interval: 30s
    metrics_path: '/metrics'
```
