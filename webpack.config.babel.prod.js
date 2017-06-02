/**
 * PROD WEBPACK BUNDLER
 */
import { webpack } from "webpack-stream";
import path from "path";

export default {
  entry: [
    // "babel-polyfill",
    // "whatwg-fetch",
    // "./src/client/app",
  ],
  output: {
    filename: "bundle.js",
  },
  devtool: "source-map",
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [{
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              "es2015",
              "stage-0",
              "react",
            ],
            plugins: [
              "transform-decorators-legacy",
              "transform-object-rest-spread",
              "transform-es2015-destructuring",
              "transform-async-to-generator",
              "transform-runtime",
              [
                "react-intl", {
                  messagesDir: "./dist/messages",
                  enforceDescriptions: false,
                },
              ],
            ],
          },
        }],
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.json$/,
        use: [{ loader: "json-loader" }],
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: [{ loader: "url-loader" }],
      },
    ],
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        jquery: "jquery",
      }),
      new webpack.ProvidePlugin({
        Promise: "es6-promise-promise",
      }),
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};