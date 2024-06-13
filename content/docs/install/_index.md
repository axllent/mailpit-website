---
title: Installation
weight: 1
description: Mailpit installation instructions via different methods including Brew and Docker
tags:
  - blaah
  - bleep
---
{{< tip >}}
Mailpit listens by default on port `8025` for the web UI, and port `1025` for SMTP.
{{< /tip >}}

Mailpit runs as a single binary and can be installed in different ways:


## Install via package managers

- **Mac**: `brew install mailpit` (to run automatically in background: `brew services start mailpit`)
- **Arch Linux**: available in the AUR as `mailpit`
- **FreeBSD**: `pkg install mailpit`


## Install via bash script (Linux & Mac)

Linux & Mac users can install it directly to `/usr/local/bin/mailpit` with:

```bash
sudo bash < <(curl -sL https://raw.githubusercontent.com/axllent/mailpit/develop/install.sh)
```


## Download static binary (Windows, Linux and Mac)

Static binaries can always be found on the [releases](https://github.com/axllent/mailpit/releases/latest). The `mailpit` binary can extracted and copied to your `$PATH`, or simply run as `./mailpit`.


## Docker

See [Docker instructions](./docker/) for 386, amd64 & arm64 images.


## Compile from source

To build Mailpit from source see [building from source](./source/).


## Running Mailpit automatically on your system

Please refer to the [systemd integration](./systemd-integration/) page for more information.
