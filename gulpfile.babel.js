/* eslint-disable import/no-extraneous-dependencies */
import shell from "gulp-shell";
import gulp from "gulp";
import bump from "gulp-bump";
import babel from "gulp-babel";
import documentation from "gulp-documentation";
import eslint from "gulp-eslint";
import del from "del";
import webpack from "webpack-stream";
import mocha from "gulp-mocha";
import "ignore-styles";
import rename from "gulp-rename";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "autoprefixer";
import cssBase64 from "gulp-css-base64";
import runSequence from "run-sequence";
import { argv } from "yargs";

import webpackConfig from "./webpack.config.babel.prod";
import mergeLocales from "./src/client/api/merge-locales";

const paths = {
  allSrcJs: "src/**/*.js?(x)",
  serverSrcJs: "src/server/**/*.js?(x)",
  sharedSrcJs: "src/shared/**/*.js?(x)",
  clientEntryPoint: "src/client/app.jsx",
  clientBundle: "dist/client-bundle.js?(.map)",
  gulpFile: "gulpfile.babel.js",
  webpackFile: "webpack.config.babel.prod.js",
  libDir: "lib",
  distDir: "dist",
  allLibTests: "src/**/*.test.js?(x)",
  karmaConf: "src/karma.conf.js",
};

// @TODO write documentation about this
gulp.task("locale", () => {
  mergeLocales();
});

const test = () => {
  gulp.src(paths.allLibTests)
    .pipe(mocha({}));
};

gulp.task("test", ["build"], () => test());
gulp.task("dev-test", () => test()); // skips build for speediness

gulp.task("start-server", shell.task([
  "http-server dist",
]));

gulp.task("sass-compile", () =>
  gulp.src("./src/client/sass/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(rename("main.css"))
    .pipe(gulp.dest("./dist/css"))
);

//  TODO: write more documentation about this
//  Usage: gulp cssBase64 --css="./path/to/sass/resource.scss"
//  convert url(/path/to/resource.gif) to data url attribute.
//  you can ignore specific resources in the target css file by adding an inline comment e.g.
// background: url(image.png); /*base64:skip*/
gulp.task("cssBase64", () =>
  gulp.src(argv.css)
    .pipe(cssBase64({
      maxWeightResource: 100000,
      extensionsAllowed: [".gif", ".jpg"],
    }))
    .pipe(gulp.dest(argv.css.substring(0, argv.css.lastIndexOf("/") + 1), { overwrite: true }))
);

gulp.task("autoprefixer", () =>
  gulp.src("./dist/css/main.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
);

gulp.task("sass", () =>
 runSequence("sass-compile", "autoprefixer")
);

// For bumping the semver of our package.json
gulp.task("bump", () =>
  gulp.src("./package.json")
    .pipe(bump())
    .pipe(gulp.dest("./"))
);

gulp.task("documentation", () =>
  gulp.src("./src/**")
    .pipe(documentation("html"))
    .pipe(gulp.dest("html-documentation"))
);

gulp.task("lint", () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("clean", () => del([
  paths.libDir,
  paths.clientBundle,
]));

gulp.task("build", ["sass", "lint", "clean"], () =>
// gulp.task("build", ["clean"], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel({ presets: ["react", "es2015", "stage-0"], plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"] }))
    .pipe(gulp.dest(paths.libDir))
);

gulp.task("main", ["test"], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
);

gulp.task("watch", () =>
  gulp.watch(paths.allSrcJs, ["main"])
);

gulp.task("default", ["main", "start-server"]);