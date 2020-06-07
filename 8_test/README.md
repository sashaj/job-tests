# vuex_shop

This is a test project for understading how data travels with Vue.js

this project uses json-server for rest-api services.
to install go to:https://www.npmjs.com/package/json-server

to run the server use this command:
'json-server --watch db.json'.

However, it also works without the json server

### Previewing Locally

The dist directory is meant to be served by an HTTP server (unless you've configured publicPath to be a relative value), so it will not work if you open dist/index.html directly over file:// protocol. The easiest way to preview your production build locally is using a Node.js static file server, for example serve:

npm install -g serve
serve -s dist

    -s flag means serve it in Single-Page Application mode
    which deals with the routing problem below

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
