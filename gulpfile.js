/**
 * # Task Runner - Gulp 4
 * Syntax 01
 *
 * ## Run (all)
 * npx gulp
 *
 * ## Run (watch only with browser-sync)
 * npx gulp watch
 *
 */
// Gulp (https://www.npmjs.com/package/gulp)
const gulp        = require('gulp')
// Compile scss to css (https://www.npmjs.com/package/gulp-sass)
const sass        = require('gulp-sass')
// Rename file (https://www.npmjs.com/package/gulp-rename)
const rename      = require('gulp-rename')
// Minify JS with UglifyJS3 (https://www.npmjs.com/package/gulp-uglify)
const uglify      = require('gulp-uglify')
// Minify CSS (https://www.npmjs.com/package/gulp-clean-css)
const cleancss    = require('gulp-clean-css')
// Concat all file, in one (https://www.npmjs.com/package/gulp-concat)
const concat      = require('gulp-concat')
// Images size more small (https://www.npmjs.com/package/gulp-imagemin)
const imagemin    = require('gulp-imagemin')
// Notification on your Mac/PC (https://www.npmjs.com/package/gulp-notify)
const notify      = require('gulp-notify')
// Write ES6 > compile to ES5 (https://www.npmjs.com/package/gulp-babel)
//const babel     = require('gulp-babel')

// Browser Sync (for live render -  (https://www.npmjs.com/package/browser-sync))
const browsersync = require('browser-sync').create()
// Clean folder (https://www.npmjs.com/package/del)
const del         = require('del')
// SourceMaps, add path impacted file (https://www.npmjs.com/package/gulp-sourcemaps)
const sourcemaps  = require('gulp-sourcemaps')

const reload      = browsersync.reload;

// PATH
const paths = {
  css: {
    src: ['./styles/scss/styles.scss'],
    dest: './dist/'
  },
  html: {
    src: ['./*.html']
  }
}

// BROWSER SYNC (live)
const browserSyncWatch = () => {
  browsersync.init({
    server: { baseDir: "./" },
    port: 3000
  })
}

const fileWatcher = () => {
  gulp.watch(["*.html", "**/*.html", "**/*.css", "**/*.js"]).on("change", reload);
}

// CLEAN FOLDER
const clean = () => del(['dist'])

// CSS
const styles = () =>
  gulp.src(paths.css.src, {"allowEmpty": true})
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleancss({debug: true, compatibility: 'ie8'}, (details) => {
      console.log(`${details.name} (original size): ${details.stats.originalSize}`);
      console.log(`${details.name} (minify size): ${details.stats.minifiedSize}`);
    }))
    .pipe(concat('styles22.css'))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browsersync.stream())
//.pipe(notify("Css ok !"))// JS

// WATCH
const watchFiles = () =>
  gulp.watch('./styles/scss/**/*.scss', styles)

// PROCESS :
const watcher = gulp.parallel(watchFiles, browserSyncWatch, fileWatcher)
const build = gulp.series(clean, gulp.parallel(styles));

// EXPORT TASK
// exports.clean = clean        // exec with : npx gulp clean
// exports.scripts = scripts    // exec with : npx gulp scripts
// exports.styles = styles      // exec with : npx gulp styles
// exports.images = images      // exec with : npx gulp images
exports.watch = watcher         // exec with : npx gulp watcher
exports.default = build         // exec with : npx gulp

//gulp.task('default', styles)
