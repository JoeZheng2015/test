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
	return gulp.src('app/**/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('dist'));
})