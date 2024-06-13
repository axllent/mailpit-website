# Mailpit website

This is the codebase for the [Mailpit website](https://mailpit.axllent.org/), built using [Hugo](https://gohugo.io/).


### Project layout

- Page content is written in Markdown format and can be found in `content/`.
- CSS (scss) is located in `assets/css/`
- JavaScript is located in is located in `assets/js/`


## Install dependencies

Node is required to install and manage the JavaScript assets.

In the project folder run the following command to install the JavaScript dependencies:

```shell
npm install
```


## Run Hugo

You must have the hugo **EXTENDED** version on your system which you can download from [Github releases](https://github.com/gohugoio/hugo/releases/latest) page.

In the project folder run:

```shell
hugo server
```

This will start hugo and by default listen on `http://localhost:1313/`.
