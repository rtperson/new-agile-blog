// Karma configuration
// Generated on Fri Dec 27 2019 19:23:29 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["mocha", "chai", "karma-typescript"],

        // list of files / patterns to load in the browser
        files: ["src/client/**/*.ts"],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "**/*.ts": "karma-typescript"
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["progress", "karma-typescript", "mocha", "coverage"],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ["Chrome", "Edge", "Firefox"],
        browsers: ["Chrome", "Firefox"],

        plugins: ["karma-chrome-launcher",
                "karma-firefox-launcher",
                "karma-edge-launcher",
                "karma-typescript",
                "karma-mocha",
                "karma-chai",
                "karma-coverage",
                "karma-mocha-reporter"
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        loggers: [
            { type: 'console' }
        ],

        karmaTypescriptConfig: {
            compilerOptions: {
                allowJs: true,
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                moduleResolution: "node",
                module: "commonjs",
                target:  "es2017",
            },
        },
    });
};
