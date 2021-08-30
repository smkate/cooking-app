// const { errorHandler } = require('errorhandler');
const notify = require('gulp-notify');
const { resolve } = require('path');

const build = resolve(__dirname, '../build');

module.exports = {
  output: build,
  notify: {
    errorHandler(err) {
      notify.onError({
        title: 'Error',
        message: err.message
      })(err);
      this.emit('end');
    }
  },
  server: {
    watch: `build`
  },
  scripts: {
    input: resolve(__dirname, '../src/assets/scripts/main.ts'),
    watch: [
      `src/assets/**/*.{js,ts}`,
      `src/blocks/**/*.{js,ts}`,
      `src/components/**/*.{js,ts}`
    ],
    output: resolve(__dirname, '../build/scripts')
  },
  styles: {
    input: `src/assets/styles/app.scss`,
    watch: [
      `src/assets/styles/**/*.scss`,
      `src/blocks/**/*.scss`,
      `src/components/**/*.scss`
    ],
    output: `build/css`
  },
  pages: {
    input: `src/pages/*.twig`,
    watch: [
      `src/assets/layout/*.twig`,
      `src/pages/**/*.twig`,
      `src/blocks/**/*.twig`,
      `src/components/**/*.twig`,
    ],
    temp: `temp`,
    output: `build/`
  },
  fonts: {
    input: `src/assets/fonts/**/*.{ttf,eot,svg,woff,woff2}`,
    output: `build/fonts/`
  },
  favicons: {
    input: `src/favicons/*.{ico,png,svg}`,
    output: `build/favicons/`
  },
  img: {
    input: `src/img/**/*.{jpg,png,jpeg,webp,svg}`,
    output: `build/img/`
  },
  video: {
    input: `src/video/**/*.{mp4,avi,mov}`,
    output: `build/video/`
  },
  svg: {
    input: `src/components/**/*.svg`,
    output: `build/icons/`
  },
  svgsprite: {
    input: `src/img/sprite/svg/*.svg`,
    output: `build/img/sprite/`,
    viewhtml: `build/`,
    watch: [`src/img/sprite/svg/*.svg`]
  },
  copyStatic: {
    input: `src/static/**/*.*`,
    output: `build/`,
    watch: [`src/static/**/*.*`]
  },
  NODE_ENV: process.env.NODE_ENV || 'development', // or production
  isProduction: this.NODE_ENV === 'production'
};
