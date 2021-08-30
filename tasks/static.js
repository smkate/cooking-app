/* eslint-disable import/no-extraneous-dependencies */
const {src, dest} = require('gulp');
const plumber = require('gulp-plumber');
const config = require('./config');

// https://www.npmjs.com/package/gulp-filenames

const copyStatic = () => {
  return src(config.copyStatic.input)
    .pipe(plumber(config.notify))
    .pipe(dest(config.copyStatic.output));
};

exports.copyStatic = copyStatic;
