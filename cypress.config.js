const { defineConfig } = require('cypress');

module.exports = defineConfig({

  e2e: {   
    setupNodeEvents(on, config) {    
return config;
    }
  },

  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false, 
    json: true 
  },

  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',

  screenshotOnRunFailure: true,
  video: true,

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,

  retries: {
    runMode: 2, 
    openMode: 0 
  }
});
