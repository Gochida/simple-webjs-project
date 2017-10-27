const gulp = require('gulp')
const gutil = require('gulp-util')
const uglify = require('gulp-uglify')
const browserify = require('gulp-browserify')
const browserSync = require('browser-sync')
const less = require('gulp-less')
const path = require('path')

// Generalized error handling.
function handleError(err, self) {
  // Prettily print the error
  gutil.log(gutil.colors.red('[Error]'), err.toString()) 
  // we emit 'error' so the task is closed out
  // otherwise the task will block future executions
  self.emit('end')
}

// Handle transpiling Node.js code to browser compatible code that's been minified
gulp.task('js', function () {
  let isErr = false
  return gulp.src('src/*.js')
    .pipe(browserify())
    .on('error', function (err) { 
      handleError(err, this)
      isErr = true
    })
    .pipe(uglify())
    .on('error', function (err) { 
      handleError(err, this)
      isErr = true
    })
    // we check if  isErr - if true something went wrong and we do a no-op
    // instead of trying to pipe files that are likely undefined due to errors anyways
    .pipe(isErr ? gutil.noop() : gulp.dest('site/scripts'))

})

// transpile CSS Less to classic CSS 
gulp.task('less', function () {
  console.log('Doing less!')
  let isErr = false
  return gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .on('error', function(err) {
      handleError(err, this)
      isErr = true
    })
    .pipe( isErr ? gutil.noop() : gulp.dest('./site/css')) 

})

// Reloads the webpage in the browser
gulp.task('reload', function (done) {
  browserSync.reload()
  done()
})

// run as the gulp startup task
gulp.task('default', ['js'], function () {
  // serve files
  browserSync.init({
    server: {
      baseDir: './site'
    }
  })

    // watch js files for changes
  gulp.watch([`src/js/*.js`], ['js'])
  gulp.watch(['src/less/*.less'], ['less', 'reload'])
  gulp.watch([`site/**/*.*`], ['reload'])
})
