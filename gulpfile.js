const gulp = require('gulp')
const gutil = require('gulp-util')
const uglify = require('gulp-uglify')
const browserify = require('gulp-browserify')
const browserSync = require('browser-sync')

gulp.task('js', function () {
  return gulp.src('src/*.js')
          .pipe(browserify())
          .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
          .pipe(uglify())
          .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
          .pipe(gulp.dest('dist/js'));
})

gulp.task('reload', function (done) {
  browserSync.reload()
  done()
})

gulp.task('default', ['js'], function () {
  // serve files
  browserSync.init({
    server: {
      baseDir: './site'
    }
  })

    // watch js files for changes
  gulp.watch([`src/*.js`], ['js'])
  gulp.watch([`site/**/*.*`], ['reload'])
})
