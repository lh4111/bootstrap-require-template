var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	gulpIf = require('gulp-if'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	runSequence = require('run-sequence'),
	autoprefixer = require('gulp-autoprefixer')
	
var paths = {
	indexHtml: 'src/index.html',
	baseCss : 'src/scss/base.scss',
	devCss : 'src/css/',
	distCss: 'dist/css',
	devJs: 'src/js/**/*.js',
	distJs: 'dist/js',
	devDir: 'src',
	distDir: 'dist'
}

// DISTRIBUTION MODE /////////////////////////////////////////////////////////////////////

// Sets the distribution environment
// from cmd line argument
// distmode is false by default
// run gulp --dist in the cmd line 
// sets distmode to true
// opens server to dist folder
// minifies and copies assets

var distMode = (process.argv.indexOf("--dist") !== -1) ? true : false

// Browser sync runs server
// server root is app folder by default
// server root is dist folder if distmode

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: (distMode) ? paths.distDir : paths.devDir
    },
  })
})

// STYLES TASK ///////////////////////////////////////////////////////////////////////////

// Sass task to compile styles
// if distMode = true
// styles are minified
// and deployed to the dist folder

gulp.task('sass', function(){
	return gulp.src(paths.baseCss)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulpIf(distMode, minifyCss())) // minifiy if in distmode
		.pipe(gulpIf(distMode, gulp.dest(paths.distCss), gulp.dest(paths.devCss)))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// HTML TASK ////////////////////////////////////////////////////////////////////////////

// html task copies index.html to dist
// if distMode returns true

gulp.task('html', function(){
	return gulp.src(paths.indexHtml)
		.pipe(gulpIf(distMode, gulp.dest(paths.distDir)))
		.pipe(browserSync.reload({
			stream: true
		}))
})

// JS TASK /////////////////////////////////////////////////////////////////////////////

// js task deploys minified
// optimised js files
// to dist folder
// if distmode returns true

gulp.task('js', function(){
	return gulp.src(paths.devJs)
		.pipe(gulpIf(distMode, uglify()))
		.pipe(gulpIf(distMode, gulp.dest(paths.distJs)))
		.pipe(browserSync.reload({
			stream: true
		}))
})

// CLEAN TASK //////////////////////////////////////////////////////////////////////////

// Clean task deletes 
// dist folder if
// distmode returns true

gulp.task('clean', function(){
	gulpIf(distMode, del('dist'));
})

// BUILD TASK //////////////////////////////////////////////////////////////////////////

// Build task uses runsequence 
// first runs clean task
// then runs build sequence

gulp.task('build', function(){
	runSequence('clean', 'browserSync', 'sass', 'html', 'js');
})

// WATCH TASK //////////////////////////////////////////////////////////////////////////

// Watches for changes in
// html, js or sass files
// uses browsersync
// to refresh browser

gulp.task('watch', ['browserSync'], function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/js/**/*.js', ['js']);
})

gulp.task('default', ['build', 'watch']);