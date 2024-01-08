# OpEngine Monorepo PoC

This is the OpEngine monorepo Poc and playground for experiments.

## Pre-requisites

Make sure you have Node >=18 and PNPM installed globally on your system. Check the root `package.json` for more details on whats versions are allowed.
Alternatively, if you prefer to use Docker, check the root Makefile for the available Docker commands.

Copy the `.env.example` and rename it to `.env`.

```sh
cp .env.example .env
```

> **Note:** If using VS Code as your editor of choice, you might be prompted to install a few recommended extensions. If prompted, it is recommended that you install them in order to correctly enforce linting and code style rules.

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

- `website1` (Port: 3100): example website 1
- `website2` (Port: 3200): example website 2

- `opengine-core` (Port: 3010): not in use at the moment. To be used for server side functions, utility libraries, APIs, etc.
- `opengine-components` (Port: 3020): shared Nuxt UI component library
- `opengine-template` (Port: 3030): website template. All websites should extend this package.
- `eslint-config`: `eslint` configurations (includes `library` and `nuxt`)
- `typescript-config`: Typescript config templates used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Adding/removing/updating NPM packages in a package/app project

To add, remove or update a NPM package in a package or website, you can either go into the package/website's folder and run the usual pnpm commands `add/uninstall/update` or you can run them in the monorepo root directory using the `--filter` option, where `<workspace>` corresponds to the name of the package/website which is defined in the `name` property of the `package.json` file:

```sh
pnpm add <package> --filter <workspace>

pnpm uninstall <package> --filter <workspace>

pnpm update <package> --filter <workspace>
```

Examples:

```sh
cd packages/website-template
pnpm add @nuxtjs/tailwindcss

# Or using the --filter option

pnpm add @nuxtjs/tailwindcss --filter @netmanagement/opengine-template
# or
pnpm add @nuxtjs/tailwindcss --filter opengine-template
# or instead of a <space> between --filter and the project name, you can also use the = sign
pnpm add @nuxtjs/tailwindcss --filter=opengine-template
```

## Start the project (Development mode)

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

> **Note:** Whenever you switch from local to Docker development, or vice-versa, you might run into an issue where the PNPM asks confirmation to reinstall all the packages.
If you encounter this issue, the easisest way to solve this is to delete the `node_modules` folder and try again.

## Build and Preview

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

To build AND preview a specific app or package, run:

```sh
pnpm preview --filter=website1
```

> The `--filter` option takes one value correspondent to the name property of the app/package specified in the `package.json` file

## Adding a new Website

To add a new site, create a new Nuxt project under the `/apps` folder by running:

```sh
cd apps
pnpm dlx nuxi@latest init <new-project-name>
# Package manager: pnpm
# Init git repo: No

# Install TailwindCSS
cd <new-project-name>
pnpm add @nuxtjs/tailwindcss
```

In the `package.json` file:

- Change the name of the project to the website's name
- Assign a unique port number in the `dev` script
- Add `@netmanagement/opengine-template` to the list of dev dependencies (to use the custom OpEngine website starter template and take advantage of shared configuration)

`./apps/<new-website>/package.json:`

```json
  {
    "name": "new-project-name",
    ...
    "scripts": {
      "dev": "nuxt dev --port=3200",
      ...
    },
    "devDependencies": {
      "@netmanagement/opengine-template": "workspace:^",
      ...
    }
  }
```

Next we need to extend the `opengine-template` in `nuxt.config.ts` and add the Tailwind Nuxt module.

`./apps/<new-website>/nuxt.config.ts:`

```ts
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
  presets: [require('../../opengine-template/tailwind.config.cjs')],
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

Lastly, copy the `packages/website-template/.eslintrc.cjs` file into the root of your new website folder.

Now you can install the new dependencies and run your new project in development mode:

```sh
pnpm install
pnpm dev --filter <new-project-name>
```

## Releasing a package (Example workflow) - WIP (NOT TESTED)

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

Monorepo introduction and main concepts:

- [Monorepo Handbook](https://turbo.build/repo/docs/handbook)

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
