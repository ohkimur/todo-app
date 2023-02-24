# Monorepo Template

## Table of Contents

- [Technologies](#technologies)
- [Workspaces](#workspaces)
- [Development](#development)
- [Build](#build)

## Technologies

### General
- [pnpm](https://pnpm.io/)
- [Turborepo](https://turbo.build/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky)
- [Changesets](https://github.com/changesets/changesets)
- [Zod](https://zod.dev/)

### Frontend
- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand/)
- [React Hook Form](https://react-hook-form.com/)

### Backend
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Sequelize Typescript](https://www.npmjs.com/package/sequelize-typescript)
- [Postgres](https://www.postgresql.org/)

## Workspaces

The project is organized as a [monorepo](https://monorepo.tools/) using [workspaces](https://pnpm.io/workspaces). All apps are placed under the `apps` folder. All packages are placed under the `packages` folder.

```
./
├── apps
│     ├── frontend
│     └── backend
└── packages
      ├── config
      └── shared
```

**INFO**: 
- The `config` package contains all the configuration files in one place.
- The `shared` package contains everything that must be shared between different packages and/or apps.

## Install dependencies
```sh
pnpm install
```

## Development

### Everything
```sh
pnpm dev
```

### Frontend
```sh
pnpm dev:frontend
```

### Backend
```sh
pnpm dev:backend
```


## Build

### Everything
```sh
pnpm build
```

### All apps
```sh
pnpm build:apps
```

### Frontend
```sh
pnpm build:frontend
```


### Backend
```sh
pnpm build:backend
```
