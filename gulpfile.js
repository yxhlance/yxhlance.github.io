var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');

gulp.task('concatJs',function () {

    gulp.src('./repeathtml/js/*.js')
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(uglify({
            compress: true
        }))
        .pipe(gulp.dest('repeathtml/js'));

});

gulp.task('csscompress',function () {
    gulp.src('./repeathtml/css/{reset,index,media}.css')
        .pipe(concat('index.min.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('./repeathtml/css'));
});

gulp.task('imagemin',function(){
   gulp.src('./sucai/img/**/*.{png,jpg}')
       .pipe(imagemin({
           optimizationLevel: 5,
           progressive: true,
           interlaced: true,
           multipass: true
       }))
       .pipe(gulp.dest('./sucai/img/img_compress'));
});




//gulp.task('default',['concatJs']);