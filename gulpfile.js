var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('cssConcat', function(){
    return gulp.src(['./src/css/*.css'])
   .pipe(concat('main.css'))
   .pipe(cssmin())
   .pipe(gulp.dest('./build/css'));
});
gulp.task('image:build', function(){
    return gulp.src('./src/images/**/*.*')
       .pipe(imagemin({ 
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           use: [pngquant()],
           interlaced: true
       }))
       .pipe(gulp.dest('./build/images'));
});
gulp.task('jsConcat', function() {
 return gulp.src(['./src/js/*.js'])
   .pipe(concat('main.js'))
   .pipe(uglify())
   .pipe(gulp.dest('./build/js'));
});
gulp.task('build', ['jsConcat','cssConcat','image:build']);
gulp.task('watch',function(){
   gulp.watch('./src/css/*.css', ['cssConcat']);
   gulp.watch('./src/js/*.js', ['jsConcat']);
    gulp.watch('./src/images/**/*.*', ['image:build']);
});
gulp.task('default',['build','watch']);