// Karma configuration
// Generated on Tue Apr 07 2015 15:31:55 GMT-0700 (PDT)


module.exports = function(config) {
  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './bower_components/jquery/dist/jquery.js',

      './bower_components/angular/angular.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './bower_components/moment/moment.js',
      './bower_components/angular-bootstrap-datetimepicker-directive/angular-bootstrap-datetimepicker-directive.js',
      './bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',



      './src/client/app/*.module.js', // need to load the module first
      './src/client/app/*.js',

      './src/client/test/data/**/*.js',
      './src/client/test/unit/**/*mock.js',
      './src/client/test/unit/**/*unit.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'spec'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['spec'],
    reporters: ['progress'],

    //plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-spec-reporter'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
