# OpEngine Monorepo PoC

This is the OpEngine monorepo Poc and playground for experiments.

## Pre-requisites

Make sure you have Node >=18 and PNPM installed globally on your system.
Alternatively, if you prefer to use Docker, check the root Makefile for the available Docker commands.

## Installation

Install the project with (preferred method):

```sh
pnpm install
```

Or using Docker:

```sh
make start
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `website1`: example website 1
- `website2`: example website 2

- `opengine-components`: shared UI component library
- `opengine-core`: not in use at the moment. To be used for server side functions, utility libraries, APIs, etc.
- `opengine-template`: website template. All websites should extend this package.
- `eslint-config`: `eslint` configurations (includes `library` and `nuxt`)
- `typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Build

To build all apps and packages, run the following command:

```sh
pnpm build

# If using Docker, run this instead:
make build
```

To build a specific app or package, use the `--filter` option:

```sh
pnpm build --filter=website1

# Building multiple specific apps/packages simultaneously
pnpm build --filter=website1 --filter=opengine-components
```

> The `--filter` option takes one value correspondent to the name property of the app/package specified in the `package.json`

## Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev

# If using Docker, run this instead:
make dev
```

To develop a specific app or package, use the `--filter` option:

```sh
pnpm dev --filter=website1

# Developing multiple specific apps/packages simultaneously
pnpm dev --filter=website1 --filter=opengine-components
```

## Adding a new Website

To add a new site, create a new Nuxt project under the `/apps` folder by running:

```sh
cd apps
pnpm dlx nuxi@latest init <project-name>

# Install TailwindCSS
pnpm install @nuxtjs/tailwindcss
```

Next, in order to take advantage of shared configuration and use the custom OpEngine starter template, we need to add our `@netmanagement/opengine-template` package to the new site's `package.json` and extend it in the `nuxt.config.ts`.

```json
// ./apps/new-website/package.json

  "devDependencies": {
    "@netmanagement/opengine-template": "workspace:^",
  }
```

```ts
// ./apps/new-website/nuxt.config.ts

export default defineNuxtConfig({
  extends: ['../../packages/opengine-template'],
  modules: ['@nuxtjs/tailwindcss'],
})
```

Create a `tailwind.config.cjs` and extend the shared Tailwind configuration. You can override the template configuration with your own website branding by extending it or replacing it altogether.

Example `tailwind.config.cjs`:

```ts
/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require('@netmanagement/opengine-template/tailwind.config.cjs')],
  content: ['./**/*.{html,js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        black: 'red',
        white: 'yellow',
      },
    },
  },
}
```

## Releasing a package (Example workflow) - WIP

> [Changesets](https://github.com/changesets/changesets) is a tool to manage CI package deployments and changelog.

1. Run `pnpm install --frozen-lockfile` to install all dependencies
2. After you've made your changes, run `pnpm changeset`
3. Select the packages which have changes you want to commit, select the version that they should be bumped by and write a summary for the changes
4. Commit the file generated by `changeset` along with your changes in the feature branch
5. When ready to merge into `main`, a new PR should be created with an update to the changelog of each selected package
6. When this PR is merged into main, your changes will be packaged & published into the specific package repository

## Upcoming features

- Update the Docker setup to spin up a specific app/website, instead of all apps (WIP)
- Automate new website creation via [Turborepo's Code Generation](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation) feature to create new sites without the extra configuration steps.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
