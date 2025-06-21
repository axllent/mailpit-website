---
title: Code quality & linting
description: Code quality & linting requirements when submitting code changes to Mailpit
section: development
weight: 3
---

Mailpit is primarily developed in Go for the backend (main application) and utilizes Vue and Sass (Bootstrap) for the frontend web UI.

To maintain consistency and minimize common errors in the code, it is essential that all Go and Vue/JavaScript code adhere to specific linting standards. At a minimum, the code must pass the following linting tests:

-   [gofmt](https://pkg.go.dev/cmd/gofmt) for Go
-   [ESLint](https://eslint.org/) for Vue/JavaScript
-   [Prettier](https://prettier.io/) for Vue/JavaScript

{{< tip "warning" >}}
When reviewing pull requests on GitHub, please ensure that your code changes comply with the linting requirements outlined below.
{{< /tip >}}

### Linting in VS Code

Enabling automatic linting in your editor can be extremely beneficial, as it typically identifies and highlights errors in real-time and applies formatting upon saving your work.

If you are using [VS Code](https://code.visualstudio.com/), it is highly recommended to install the following extensions for seamless integration:

-   [Go extension](https://marketplace.visualstudio.com/items?itemName=golang.Go)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Linting via the Command Line

Linting can also be performed directly from the command line, which executes the same checks required in continuous integration (CI) before code can be merged.

-   For Go linting: `gofmt -s -l -d .`
-   For Vue/JavaScript linting:
    -   To check for warnings and errors: `npm run lint`
    -   To automatically fix some warnings: `npm run lint-fix`
