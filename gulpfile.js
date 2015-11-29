var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
gulp.task('serve', function () {
	browserSync({
		files: '**',
		server: {
			baseDir: 'app',
			routes: {
				'/bower_components': 'bower_components',
				'/dist': 'dist'
			}
		}
	});
});
gulp.task('compressjs', function() {
	return gulp.src('app/resume/**/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('dist/resume/'));
});
gulp.task('compresscss', function() {
	return gulp.src('app/resume/**/*.css')
		.pipe($.minifyCss())
		.pipe(gulp.dest('dist/resume/'));
});
gulp.task('compresshtml', function() {
	return gulp.src('app/resume/**/*.html')
		.pipe($.minifyHtml({loose: true}))
		.pipe(gulp.dest('dist/resume/'));
});
gulp.task('compressresume', ['compressjs', 'compresscss', 'compresshtml']);