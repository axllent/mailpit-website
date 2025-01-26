---
title: Chaos
description: Use Mailpit's Chaos feature to artificially trigger SMTP errors to test application resilience
keywords: [jim, chaos, monkey]
section: configuration
---

{{< tip >}}
[Chaos engineering](https://en.wikipedia.org/wiki/Chaos_engineering) is the discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production.
{{< /tip >}}

Mailpit's **Chaos** feature (added in `v1.20.0`) allows you to set SMTP failures to return error response codes at various stages in a SMTP transaction in order to test application resilience. The failure rates are based on a configurable probability (% chance) allowing you to trigger random or consistent failures, depending on the probability set.

The configurable Chaos triggers in an SMTP transaction are:
- `Sender` - triggers when the sender information is sent
- `Recipient` - triggers when the recipients are sent
- `Authentication` - triggers on authentication (authentication must be configured in Mailpit, else this is ignored)

When an error is triggered, Mailpit's SMTP server will return a `<code> Chaos <trigger> error` error, where `code` is the configured error code, and `stage` is the stage which triggered the error, for example `451 Chaos recipient error`.


## Enabling Chaos

**Chaos is disabled by default**, and when disabled then it cannot be enabled or configured while the application is running.

To enable Chaos, Mailpit must be started with the `--enable-chaos` (@env `MP_ENABLE_CHAOS=true`) flag, or alternatively started with `--chaos-triggers` (@env `MP_CHAOS_TRIGGERS`) which enables Chaos *and* sets a custom configuration (see below).

Once enabled, Chaos triggers can be configured via three methods: as a runtime flag / environment variable, via the web UI, or via the API.
The web UI & API can dynamically update the Chaos triggers without requiring a Mailpit restart.


### Set Chaos triggers via runtime flag

Chaos can be enabled in Mailpit using the `--enable-chaos` flag (or `MP_ENABLE_CHAOS=true` environment variable). Note that this simply allows Chaos triggers to be configured while Mailpit is running, however the default probability for each trigger is `0` meaning it will not reject anything.

To start Mailpit with Chaos enabled **and** a custom trigger configuration, start Mailpit using `--chaos-triggers <options>` (or `MP_CHAOS_TRIGGERS=<options>` environment variable). The Chaos runtime trigger syntax is a comma-separated (no spaces) `<trigger>:<error-code>:<probability>`, where:

- **trigger** is either `Sender`, `Recipient` or `Authentication`, depending where you want to trigger an error
- **error-code** is the returned error code from `400` to `599`
- **probability** is an an integer from `0` to `100`, which the likely chance this error will be triggered

An example would be `--chaos-triggers Sender:451:50,Recipients:451:50` which would configure Chaos to reject approximately 50% of SMTP transactions based on sender, and 50% based on recipients. Please note that this example does **not** mean 100% of SMTP connections get rejected (50+50%), it means there is a 50/50 chance for both triggers. If you want to guarantee rejection, then set the probability of a trigger `100`, eg `--chaos-triggers Sender:451:100`.


### Set Chaos triggers via web UI

Mailpit must first be started with either `--enable-chaos` or `--chaos-triggers <options>` (see above) to enable Chaos. In the web UI, open settings (icon at the bottom left) and select the `Chaos` tab. The configuration can be changed at any point while Mailpit is running, and restarting Mailpit will reset the triggers.


### Set Chaos options via the API

Mailpit must first be started with either `--enable-chaos` or `--chaos-triggers <options>` (see above) to enable Chaos. Please refer to the [API documentation](../../api-v1/view.html#get-/api/v1/chaos).
