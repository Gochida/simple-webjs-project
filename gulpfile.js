var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    browserSync = require('browser-sync');

gulp.task('js', function(){
    return gulp.src('src/*.js')
            .pipe(browserify())
            .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
            .pipe(uglify())
            .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
            .pipe(gulp.dest('dist/js'));
})

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});


gulp.task('default', ['js'], function(){
    //serve files
    browserSync.init({
        server: {
            baseDir:"./dist"
        }
    });

    //watch js files for changes
    gulp.watch(["src/*.js"], ['js'])
    gulp.watch(["dist/**/*.*"], ['reload']);
})
