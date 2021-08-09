# Whoa

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/angular:lib my-lib` to generate a library.
> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@whoa/mylib`.

Feature Lib: all business logic, interaction with services etc goes here. Run below command to generate feature module 
nx g @nrwl/angular:lib shell --style=less --directory=web/auth/feature --tags=type:feature --simpleModuleName=true --flat
nx g @nrwl/angular:lib login --style=less --directory=web/auth/feature --tags=type:feature --simpleModuleName=true --flat

UI lib: All dumb components goes here. These components has UI renderning logic and takes input & output paramers. Run below command to generate UI coponents
nx g @nrwl/angular:lib login-form --style=less --directory=web/auth/ui --tags=type:ui --simpleModuleName=true --flat

Data-access lib: all services and backend interaction goes here.  Run below command to generate data-access lib
nx g @nrwl/angular:lib data-access --style=less --directory=web/auth --tags=type:data-access --simpleModuleName=true --flat

Utils lib: guards, interceptors and any utility class goes here. Run below command to generate utils lib
nx g @nrwl/angular:lib utils --style=less --directory=web/auth --tags=type:utils --simpleModuleName=true --flat

## Code scaffolding

Run `nx g component my-component --project=my-app` to generate a new component.

To generate component
nx g @nrwl/angular:component login --project=web-auth-feature-login --style=less --flat --export
nx g @nrwl/angular:component login-form --project=web-auth-ui-login-form --style=less --flat --export

To generate guard
nx g @nrwl/angular:guard auth --implements=CanActivate --project=web-auth-utils 

To generate service
nx g service services/auth --project=web-auth-data-access

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
