var gulp = require('gulp'),
		minifyCSS = require('gulp-cssnano'),
		watch = require('gulp-watch'),
		plumber = require('gulp-plumber'),
		sass = require('gulp-sass'),
		livereload = require('gulp-livereload'),
		notify = require('gulp-notify');

gulp.task('default', function() {
	gulp.watch('./scss/**/*.scss', ['sass-watch']);
});

gulp.task('sass-watch', function() {
	return gulp.src('./scss/**/*.scss')
		.pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
		.pipe(sass({
				includePaths: [
					'bower_components/normalize.scss/sass',
					'bower_components/support-for/sass'
				],
		    sourcemap: true,
		    sourcemapPath: '../scss'
		  }))
		.pipe(gulp.dest('stylesheets'))
		.pipe(notify("Compiled <%= file.relative %>"))
    .pipe(livereload());
});

gulp.task('production', function() {
	gulp.src('./scss/*.scss')
  .pipe(sass({
  	includePaths: [
			'bower_components/normalize.scss/sass',
			'bower_components/support-for/sass'
		],
  	sourcemap: false
  }))
  .pipe(minifyCSS())
  .pipe(gulp.dest('stylesheets'));
});