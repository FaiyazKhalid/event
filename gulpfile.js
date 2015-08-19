var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var del = require('del');
var browserify = require('browserify');


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

gulp.task('watch', function () {
    gulp.watch(paths.src, ['clean', 'compile']);
});

gulp.task('default', ['watch']);