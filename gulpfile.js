var gulp = require('gulp'),
		minifyCSS = require('gulp-minify-css'),
		watch = require('gulp-watch'),
		plumber = require('gulp-plumber'),
		sass = require('gulp-ruby-sass'),
		livereload = require('gulp-livereload'),
		notify = require('gulp-notify');

gulp.task('default', function() {
	gulp.watch('./scss/**/*.scss', ['sass-watch']);
});

gulp.task('sass-watch', function() {
	return gulp.src('./scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
		    compass: true,
		    sourcemap: true,
		    sourcemapPath: '../scss'
		  }))
		.pipe(plumber.stop())
		.pipe(gulp.dest('stylesheets'))
		.pipe(notify("Compiled <%= file.relative %>"))
    .pipe(livereload());
});

gulp.task('production', function() {
	gulp.src('./scss/*.scss')
  .pipe(sass({
  	compass: true,
  	sourcemap: false
  }))
  .pipe(minifyCSS())
  .pipe(gulp.dest('stylesheets'));
});