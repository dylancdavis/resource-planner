# resource-planner

Web application for visualizing raw and intermediate resources required to produce a final product.
Built with [Vue](https://vuejs.org/) and [Vite](https://vite.dev/). Package management performed with [`pnpm`](https://pnpm.io/).

## Installing / Getting started

To run a local server, execute the following:

```shell
cd resource-planner
pnpm install
pnpm dev
```

The web server can then be accessed at http://localhost:5173/.

## Building & Deploying

The application can be built by running `pnpm build`, which will compile the project into `dist/`.

The repository will automatically run a script to deploy any changes to GitHub Pages on pushes to the `main` branch.

