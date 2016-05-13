var gulp = require('gulp');
var minify = require('gulp-cssnano');
var stylelint = require( 'stylelint' );
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var flatten = require( 'gulp-flatten' );
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var postcss = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var reporter = require( 'postcss-reporter' );
var scss = require( 'postcss-scss' );

gulp.task('default', ['sass-watch'], function() {
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
		.pipe( postcss( [
			stylelint( {
				'extends': 'stylelint-config-standard',
				'rules': {
					'indentation': 'tab',
					'number-leading-zero': null
				}
			} ),
			reporter( { clearMessages: true } )
		], {
			syntax: scss
		} ) )
		.pipe(sass({
				includePaths: [
					'bower_components/normalize.scss/sass',
					'bower_components/support-for/sass'
				],
				outputStyle: 'expanded'
			}).on( 'error', sass.logError ))
		.pipe( flatten() )
		.pipe( postcss( [
			autoprefixer( {
				browsers: ['last 2 versions'],
				cascade: true,
				remove: true
			 } )
		] ) )
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
	.pipe( flatten() )
	.pipe( postcss( [
		autoprefixer( {
			browsers: ['last 2 versions'],
			cascade: true,
			remove: true
		 } )
	] ) )
	.pipe(minify({
		discardComments: {
				removeAll: true
			}
		}))
	.pipe(gulp.dest('stylesheets'));
});
