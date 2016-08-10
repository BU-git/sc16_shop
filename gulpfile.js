var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

gulp.task('cssConcat', function(){
	return gulp.src(['./src/css/*.css'])
    .pipe(concat('main.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./build/css'));
});
gulp.task('jsConcat', function() {
  return gulp.src(['./src/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});
gulp.task('build', ['jsConcat','cssConcat']);
gulp.task('watch',function(){
    gulp.watch('./src/css/*.css', ['cssConcat']);
    gulp.watch('./src/js/*.js', ['jsConcat']);
});
gulp.task('default',['build','watch']);