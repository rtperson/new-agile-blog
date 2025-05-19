import { defineConfig } from "cypress";
//import { devServer } from "@cypress/vite-dev-server";

export default defineConfig({
    fixturesFolder: false,
    video: false,
    e2e: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {},
        supportFile: false,
    },
});
