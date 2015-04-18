
// /Users/justin/Documents/Dev/Ang/Todo/todo/protractor-conf.js
exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'src/client/test/e2e/*.test-e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  seleniumAddress: null,

  seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

  chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver'
};


// seleniumAddress: 'http://localhost:4444/wd/hub',
// seleniumAddress: 'http://localhost:4444/wd/hub',
//
