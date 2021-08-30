// -----------------------------------------------------------------------------
//  CONFIG: CRITICAL CSS
// -----------------------------------------------------------------------------
//
//  We use the "critical" npm module for extracting critical CSS.
//  See https://www.npmjs.com/package/critical for more options.
//

module.exports = {
  base: 'build/',
  inline: true,
  minify: true,
  width: 1920,
  height: 1080,
  css: ['build/css/style.css'],
  ignore: ['@font-face', /url\(/]
};
