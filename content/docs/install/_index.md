---
title: Installation
weight: 1
description: Mailpit installation instructions via different methods including Brew and Docker
---

{{< tip >}}
Mailpit listens by default on port `8025` for the web UI, and port `1025` for SMTP.
{{< /tip >}}

Mailpit runs as a single binary and can be installed in different ways:

## Install via package managers

- **Mac**: `brew install mailpit` (to run automatically in the background: `brew services start mailpit`)
- **Arch Linux**: available in the AUR as `mailpit`
- **FreeBSD**: `pkg install mailpit`

## Install via script (Linux & Mac)

Linux & Mac users can install it directly to `/usr/local/bin/mailpit` with:

```shell
sudo sh < <(curl -sL https://raw.githubusercontent.com/axllent/mailpit/develop/install.sh)
```

You can also change the install path to something else by setting the `INSTALL_PATH` environment variable, for example:

```shell
sudo INSTALL_PATH=/usr/bin sh < <(curl -sL https://raw.githubusercontent.com/axllent/mailpit/develop/install.sh)
```

## Download static binary (Windows, Linux, and Mac)

Static binaries can always be found on the [releases](https://github.com/axllent/mailpit/releases/latest) page. The `mailpit` binary can be extracted and copied to your `$PATH`, or simply run as `./mailpit`.

## Docker

See [Docker instructions](./docker/) for 386, amd64, and arm64 images.

## Compile from source

To build Mailpit from source, see [building from source](./source/).

## Running Mailpit automatically on your system

Please refer to the [systemd integration](./systemd/) page for more information.
