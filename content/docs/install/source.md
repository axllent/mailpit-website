---
title: Building from source
description: How to install Mailpit from source, including steps to build the frontend and sendmail binary
weight: 4
tags: [npm, node, compile, install]
---

Mailpit's source code can be downloaded from https://github.com/axllent/mailpit.

Go (>= version 1.20) and npm are required to compile Mailpit.

```shell
git clone git@github.com:axllent/mailpit.git
cd mailpit
```

## Building the UI

The Mailpit web user interface is built with node. 
In the project's root (top) directory run the following to install the required node modules:


### Installing the node modules

```shell
npm install
```


### Building the web UI

```shell
npm run build
```

You can also run `npm run watch` which will watch for changes and rebuild the HTML/CSS/JS automatically when changes are detected.
Please note that you must restart Mailpit (`go run .`) and refresh your browser to load with the changes.


## Build the Mailpit binary

One you have the assets compiled, you can build Mailpit as follows:

```shell
go build -ldflags "-s -w"
```

## Building a stand-alone sendmail binary

If you do not intend to either symlink `sendmail` to mailpit or configure your existing sendmail to route mail to 
Mailpit ([see instructions](../sendmail/)), you can optionally build a stand-alone sendmail binary.
Please note that this is not intended for use with anything other than Mailpit.

```shell
cd sendmail
go build -ldflags "-s -w"
```
