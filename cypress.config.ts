import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      options: {
        projectConfig: {
          buildOptions: {
            tsConfig: './tsconfig.cypress.json',
            sourceMap: false,
          },
          root: "",
          sourceRoot: "",
        },
      },
    },
    specPattern: "**/*.cy.ts",
  },

  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
