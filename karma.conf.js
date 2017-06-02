var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.test.jsx',
      'src/**/*.test.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/test/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.jsx': ['webpack', 'sourcemap'],
      'src/test/**/*.jsx': ['webpack', 'sourcemap']
    },

    webpack: {
      entry: function () {
        return {};
      },
      devtool: "inline-eval-cheap-source-map",
      node: {
        fs: "empty"
      },
      module: {
        noParse: [
          /\/sinon.js/
        ],
        rules: [
          {
            test: /\.js|.jsx$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['airbnb', 'react', 'es2015', 'stage-0'],
                  plugins: ['react-html-attrs',
                    'transform-class-properties',
                    'transform-decorators-legacy',
                    'transform-async-to-generator'
                  ],
                },
              }
            ],
          },
          {
            test: /\.json$/,
            use: [{loader: "json-loader"}]
          },
        ],
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      plugins: [
        new webpack.ProvidePlugin({
          Promise: 'es6-promise-promise'
        }),
      ],
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
  })
};