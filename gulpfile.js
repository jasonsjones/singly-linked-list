var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');

var source = [
    '*.js',
    'test/*.js',
    'lib/*.js'
];

gulp.task('jshint', function() {
    return gulp.src(source)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jscs());
});

gulp.task('test', function () {
    return gulp
        .src(source[1])
        .pipe(mocha());
});
