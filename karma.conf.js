module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter

    // mocha - http://mochajs.org/#getting-started
    // chai - http://chaijs.com/api/bdd/
    // sinon - http://sinonjs.org/docs/
    // fixture - https://github.com/billtrik/karma-fixture
    frameworks: ['jspm', 'mocha', 'sinon-chai', 'fixture'],

    // list of files / patterns to load in the browser
    jspm: {
      config: 'config.js',
      loadFiles: ['compiled-tests/**/*.js', 'test/**/*.html'],
      serveFiles: ['build/**/*']
    },
    proxies: {
      '/jspm_packages': '/base/jspm_packages',
      '/compiled-tests': '/base/compiled-tests/',
      '/base': '/base/build/'
    },
    // list of files to exclude
    exclude: [],
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.html': ['html2js']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'beep', 'coverage'],
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    coverageReporter: {
      reporters: [{
        type: 'lcov',
        dir: 'reports',
        subdir: 'coverage'
      }]
    }

  });
};
