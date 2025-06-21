---
title: Getting started
description: Installing project requirements, new features & submitting pull requests
section: development
weight: 2
---

To develop with Mailpit, a basic understanding of Go (often referred to as "Golang"), JavaScript, and Vue is essential. Additionally, you need to have Go and Node.js installed on your system.

## Building the JavaScript

Mailpit does not come with precompiled JavaScript in the source code; it only includes the necessary source files for generating it. Therefore, to build a functional version of Mailpit from the source, you must first install and compile the frontend assets.

In the top-level project folder, run the following commands:

```shell
npm install
npm run build
```

You can also set up a "watch" mode for the JavaScript, which will automatically rebuild the assets whenever changes to the JavaScript or Vue files are detected. Use the command `npm run watch` for this. However, keep in mind that this does not reload the JavaScript in a running Mailpit instance, so you will need to manually restart Mailpit after Node.js finishes recompiling (see below).

## Running Mailpit in development

Go allows you to run the application directly from the project folder without needing to build a new binary each time you make a change:

```shell
go run .
```

You can append Mailpit arguments to this command, such as `go run . -h`.

Please note that if you modify the Go code or recompile the JavaScript assets, you will need to restart Mailpit.

There are useful third-party development tools, like [entr](https://github.com/eradman/entr), that can be used as a "wrapper" to automatically restart Mailpit when any file changes are detected. You can use the following command:

```shell
find cmd/ config/ internal/ proxy/ sendmail/ server/ | entr -s -r 'go run . <options>'
```
