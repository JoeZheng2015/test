var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
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
	gulp.watch('app/css/summer/**/*.css', ['prefixer'])
});
gulp.task('prefixer', function () {
	return gulp.src('app/css/summer/**/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/css/summer/'));
});
