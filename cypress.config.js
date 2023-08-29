const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    env: { grepFilterSpecs: true, grepOmitFiltered: true },
    preserveOriginalScreenshot: true,
    viewportmobile: {
      device: "iphone-xr",
    },
    viewportdesktop: {
      device: "macbook-16",
    },
  },
  e2e: {
    baseUrl: "https://www.edenentradas.com.ar/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      require("@bahmutov/cy-grep/src/plugin")(config);
      require("cypress-image-diff-js/dist/plugin")(on, config);
      // IMPORTANT: return the config object
      return config;
    },
  },
  video: false,
});
