var gulp = require('gulp');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var del = require('del');
var browserify = require('browserify');

var uglify = require('gulp-uglify');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');


var path = require('path');

var paths = {
    src: ['src/**/*.js', 'src/*.js', '*.js'],
    build: 'build',
    srcRoot: path.join(__dirname, 'src')
};

gulp.task('clean', function () {
    del(['build/*.js']);
});

gulp.task('compile', function () {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { sourceRoot: paths.srcRoot }))
        .pipe(gulp.dest(paths.build))
});

gulp.task('cleanscripts' , function(){
    del(['public/javascripts/app.js']);
});

gulp.task('scripts', function() {
    return gulp.src('public/javascripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/javascripts'));
});
gulp.task('watch', ['scripts'], function () {
    gulp.watch(paths.src, ['clean', 'compile']);
    gulp.watch('public/javascripts/**/*.js', ['cleanscripts', 'scripts']);
});