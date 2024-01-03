const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '9c6bem',
  chromeWebSecurity: false, // for working with iframes
  e2e: {
    // baseUrl: 'https://www.allabouterik.com',
    baseUrl: 'http://localhost:3000',
    // baseUrl: 'https://all-about-erik-nuxt3.netlify.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 90000,
    // To fix isseu with blank page loading
    // ref: https://stackoverflow.com/questions/73312653/blank-page-after-running-cypress-tests
    // docs: https://docs.cypress.io/guides/core-concepts/test-isolation
    testIsolation: false,
  },
});
