'use strict';

let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let wrap = require('gulp-wrap');
let mergeStream = require('merge-stream');
let cssmin = require('gulp-cssmin');
let browserSync = require('browser-sync').create();


function bundle_src_js() {
    const cssStream = processCSS();
    const jsStream = gulp.src([
        'js/src/api.js',
        'js/src/handlers.js',
        'js/src/widget.js',
        'js/src/main.js',
        'js/src/selections.js',
        'js/src/storage.js',
        'js/src/fileuploader.js',
        'js/src/loaders/SpotFixTemplatesLoader.js',
        'js/src/loaders/SpotFixSVGLoader.js',
        'js/src/loaders/SpotFixSourcesLoader.js',
        'js/src/loaders/SpotFixLoaderEvent.js',
    ]);

    return mergeStream(cssStream, jsStream)
        .pipe(concat('doboard-widget-bundle.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
}

function minify_js() {
    return gulp.src('dist/doboard-widget-bundle.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.', {addComment: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
}

function processCSS() {
    return gulp.src('styles/doboard-widget.css')
        .pipe(cssmin())
        .pipe(wrap('let spotFixCSS = `<%= contents %>`;'))
        .pipe(concat('css-as-js.js'))
        .pipe(gulp.dest('temp/'))
        .on('end', async () => {
            const {deleteSync} = await import('del');
            deleteSync('temp');
        })
        ;
}

gulp.task('compress-js', gulp.series(bundle_src_js, minify_js));

gulp.task('serve', function() {
    browserSync.init({
        server: './',
        open: false,
    });


    gulp.watch(['js/src/**/*.js', 'styles/**/*.css'], gulp.series('compress-js'));


    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('compress-js', 'serve'));
