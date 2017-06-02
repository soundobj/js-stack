/**
 * HOT RELOADING DEVELOPMENT CONFIGURATION
 */
var path = require("path");
var webpack = require("webpack");

console.error("@ ENV ", __dirname);

module.exports = {
  // devtool: "cheap-module-eval-source-map",
  // devtool: "inline-eval-cheap-source-map",
  devtool: "inline-source-map",
  entry: [
    "webpack-hot-middleware/client",
    "babel-polyfill",
    "whatwg-fetch",
    "./src/client/app"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: "es6-promise-promise"
    }),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [{
          loader: "react-hot-loader"
        }, {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              "es2015",
              "stage-0",
              "react"
            ],
            plugins: [
              "transform-decorators-legacy",
              "transform-object-rest-spread",
              "transform-es2015-destructuring",
              "transform-async-to-generator",
              "transform-runtime",
              [
                "react-intl", {
                  "messagesDir": "./dist/messages",
                  "enforceDescriptions": false
                }
              ],
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.json$/,
        use: [{ loader: "json-loader" }]
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: [{loader: "url-loader"}]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              data: '@import "variables";', // inherit app global variables
              includePaths: [
                path.resolve(__dirname, "./src/client/sass/")
              ]
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  }
};