import { defineConfig } from 'cypress'

export default defineConfig({
  nodeVersion: 'system',
  fixturesFolder: false,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
  },
})
