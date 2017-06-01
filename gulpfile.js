var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    browserSync = require('browser-sync');

gulp.task('js', function(){
    return gulp.src('src/*.js')
            .pipe(browserify()
            .pipe(uglify())
            .pipe(gulp.dest('dist/js')));
})

gulp.task('reload', ['js'], function(done) {
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
    gulp.watch(["src/*.js", "dist/*.html"], ['reload']);
})