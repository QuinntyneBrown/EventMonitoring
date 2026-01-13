# EventMonitoringComponents

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build event-monitoring-components
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/event-monitoring-components
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with Vitest, use the following command:

```bash
npm run test:lib
```

## Storybook

This library includes [Storybook](https://storybook.js.org/) for component development and documentation. All components have corresponding `.stories.ts` files that demonstrate their usage.

### Running Storybook

To start the Storybook development server from the workspace root, run:

```bash
npm run storybook
```

The Storybook interface will be available at `http://localhost:6006/`, where you can:
- Browse all components in isolation
- Test different component states and props
- View component documentation
- Interact with components using controls

### Building Storybook

To build a static version of Storybook for deployment, run:

```bash
npm run build-storybook
```

The built Storybook will be output to the `dist/storybook/` directory.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
