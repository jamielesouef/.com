"use strict";

var gulp = require('gulp'),
  usemin = require('gulp-usemin'),
  uglify = require('gulp-uglify'),
  webserver = require('gulp-webserver'),
  minifyCss = require('gulp-minify-css'),
  minifyHtml = require('gulp-minify-html'),
  rev = require('gulp-rev'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  debug = require('gulp-debug'),
  path = require('path');

var lessGlob = path.resolve(__dirname, 'app/styles/src/**/*.less');
var normalize = path.resolve(__dirname, 'app/bower_components/normalize.css/normalize.css');

console.log(normalize);

gulp.task('usemin', function () {
  return gulp.src('app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))

});

gulp.task('less', function() {
  return gulp.src([normalize, lessGlob])
//    .pipe(debug({verbose: true}))
    .pipe(less())
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(path.resolve(__dirname, './app/styles/')));
});

gulp.task('watch', function () {
  gulp.watch([lessGlob], ['less']);
});

gulp.task('serve', function () {
  gulp
    .src('app')
    .pipe(webserver({
      livereload: true
    }));
})
