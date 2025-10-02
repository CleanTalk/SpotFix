'use strict';

var gulp       = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    concat     = require('gulp-concat'),
    wrap     = require('gulp-wrap'),
    mergeStream   = require('merge-stream'),
    cssmin   = require('gulp-cssmin');

function bundle_src_js() {
    const cssStream = processCSS();
    const jsStream = gulp.src([
        'js/src/api.js',
        'js/src/handlers.js',
        'js/src/widget.js',
        'js/src/main.js',
        'js/src/selections.js',
        'js/src/storage.js',
        'js/src/loaders/SpotFixTemplatesLoader.js',
        'js/src/loaders/SpotFixSVGLoader.js',
        'js/src/loaders/SpotFixSourcesLoader.js',
        'js/src/loaders/SpotFixLoaderEvent.js',
    ]);

    return mergeStream(cssStream, jsStream)
        .pipe(concat('doboard-widget-bundle.js'))
        .pipe(gulp.dest('dist/'));
}

function minify_js() {
    return gulp.src('dist/doboard-widget-bundle.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.', { addComment: true }))
        .pipe(gulp.dest('dist/'));
}

function processCSS() {
    return gulp.src('styles/doboard-widget.css')
        .pipe(cssmin())
        .pipe(wrap('let spotFixCSS = `<%= contents %>`;'))
        .pipe(concat('css-as-js.js'))
        .pipe(gulp.dest('temp/'))
        .on('end', async () => {
            const { deleteSync} = await import('del');
            deleteSync('temp');
        })
        ;
}

// Задача для минификации JS
gulp.task('compress-js', gulp.series(bundle_src_js, minify_js));

gulp.task('watch-js', function() {
    gulp.watch(
        ['js/src/api.js', 'js/src/handlers.js', 'js/src/widget.js', 'js/src/main.js'],
        gulp.series('compress-js')
    );
});
