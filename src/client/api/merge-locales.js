/* eslint-disable */
import * as fs from "fs";
import { sync as globSync } from "glob";
import { sync as mkdirpSync } from "mkdirp";
import deepExtend from "deep-extend";

const filePattern = "./src/client/**/locale-*.json";
const outputLanguageDataDir = "./src/client/locale/";

export default function () {
  // inspired from https://gist.github.com/iam-peekay/5a4e9431c9c785d3e62e584503619ecc#file-reactintl9-js
  // Aggregates the default messages that were extracted from the example app"s
  // React components via the React Intl Babel plugin. An error will be thrown if
  // there are messages in different components that use the same `id`. The result
  // is a flat collection of `id: message` pairs for the app"s default locale.

  let appLocale = {};
  globSync(filePattern)
    .map((filename) => fs.readFileSync(filename, "utf8"))
    .map((file) => JSON.parse(file))
    .map((collection /*, descriptors*/) => {
      appLocale = deepExtend(appLocale, collection);
    }, {});

  console.error("@ appLocale", appLocale);
  mkdirpSync(outputLanguageDataDir);
  fs.writeFileSync(outputLanguageDataDir + "main.json", JSON.stringify(appLocale, null, 2));
}