var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    cssmin  = require('gulp-minify-css'),
    rename  = require("gulp-rename"),
    sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    bs      = require('browser-sync').create();

// default task
gulp.task('default', ['styles', 'watch', 'nodemon']);

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
  gulp.watch('./src/*.scss', ['styles', 'browserSync']);
});

// browserSync task
gulp.task('browserSync', function() {
  bs.init(null, {
    notify: false,
    proxy: 'http://localhost:3000',
    port: 5000,
    ui: {
      port: 5001
    }
  });
});

// nodemon task
gulp.task('nodemon', ['browserSync'], function() {
  return nodemon({
    script: 'server/app.js',
    ext: 'html js',
    ignore: 'gulpfile.js'
  }).on('start', function() {
    setTimeout(function() {
      bs.reload();
    }, 1000);
  });
});
