var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('default', ['styles', 'watch']);

// styles task
gulp.task('styles', function() {
  return gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./server/public/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./server/public/css/'));
});

// watch task
gulp.task('watch', function() {
  gulp.watch('./src/*.scss', ['styles']);
});
