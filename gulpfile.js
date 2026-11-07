// Variables
const { src, dest, watch, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const dartSass = require('gulp-dart-sass');
const { optimizeStyles } = require('./scripts/optimize-styles');

// Compile main SASS
function sassTask() {
  return src('sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(dartSass())
    .pipe(dest('css')) // concatinated css file
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

// Compile responsive SASS
function responsiveTask() {
  return src('sass/responsive.scss')
    .pipe(sourcemaps.init())
    .pipe(dartSass())
    .pipe(dest('css')) // concatinated css file
    .pipe(concat('responsive.min.css'))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

// Compile icons
function iconTask() {
  return src('sass/icon/icon.scss')
    .pipe(sourcemaps.init())
    .pipe(dartSass())
    .pipe(dest('css')) // concatinated css file
    .pipe(concat('icon.min.css'))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

// Compile vendor styles
function vendorsTask() {
  return src('sass/vendors/vendors.scss')
    .pipe(sourcemaps.init())
    .pipe(dartSass())
    .pipe(dest('css')) // concatinated css file
    .pipe(concat('vendors.min.css'))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

// Concat + minify vendor JS
function concatVendorsTask() {
  return src('js/vendors/*.js')
    .pipe(concat('vendors.min.js'))
    .pipe(terser({ output: { comments: /^!/ } }))
    .pipe(dest('js'))
    .pipe(browserSync.stream());
}

function minifySiteScriptsTask() {
  return src(['js/main.js', 'js/khatwa-i18n.js'], { base: 'js' })
    .pipe(terser())
    .pipe(dest('js/min'))
    .pipe(browserSync.stream());
}

async function optimizeStylesTask() {
  await optimizeStyles();
  browserSync.reload();
}

// BrowserSync
function browserSyncTask() {
  browserSync.init({
    server: { baseDir: './' },
    port: 3002,
    // Watch served assets only, rather than node_modules, Git and build output.
    watch: false,
    files: ['*.html', 'css/site.min.css', 'js/jquery.js', 'js/vendors.min.js',
      'js/khatwa-layout.js', 'js/redirect.js', 'js/min/*.js'],
    online: false,
    ui: false,
    notify: false,
    open: false,
    ghostMode: false
  });
}

// Watch files
function watchTask() {
  watch('sass/**/*.scss', series(parallel(sassTask, iconTask, vendorsTask, responsiveTask), optimizeStylesTask));
  watch(['css/corporate.css', '*.html', 'js/khatwa-layout.js', 'js/main.js'], optimizeStylesTask);
  watch(['js/main.js', 'js/khatwa-i18n.js'], minifySiteScriptsTask);
  watch('js/vendors/*.js', concatVendorsTask);
}

// Build task for CI / GitHub Pages
const build = series(parallel(
  sassTask,
  iconTask,
  vendorsTask,
  concatVendorsTask,
  responsiveTask,
  minifySiteScriptsTask
), optimizeStylesTask);

exports.build = build;

exports.minifySiteScripts = minifySiteScriptsTask;

// Default task for local development
exports.default = series(build, parallel(browserSyncTask, watchTask));
