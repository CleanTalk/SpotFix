'use strict';

var gulp       = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    concat     = require('gulp-concat'),
    babel      = require('gulp-babel');

function bundle_src_js() {
    return gulp.src([
            'js/src/api.js',
            'js/src/handlers.js',
            'js/src/widget.js',
            'js/src/main.js'
        ])
        .pipe(concat('doboard-widget-bundle.js'))
        .pipe(gulp.dest('js/src/'));
}

function bundle_js() {
    return gulp.src('js/src/doboard-widget-bundle.js')
        .pipe(babel({
            presets: [["@babel/preset-env", { targets: { ie: "11" } }]],
            plugins: ["@babel/plugin-transform-class-properties"]
        }))
        .pipe(gulp.dest('js/src/'));
}

function minify_js() {
    return gulp.src('js/src/doboard-widget-bundle.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js/'));
}

gulp.task('compress-js', gulp.series(bundle_src_js, bundle_js, minify_js));

gulp.task('watch-js', function() {
    gulp.watch(
        ['js/src/api.js', 'js/src/handlers.js', 'js/src/widget.js', 'js/src/main.js'],
        gulp.series('compress-js')
    );
});