'use strict';

var gulp       = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    concat     = require('gulp-concat'),
    cleanCSS   = require('gulp-clean-css'); // Добавляем плагин для минификации CSS

function bundle_src_js() {
    return gulp.src([
        'js/src/api.js',
        'js/src/handlers.js',
        'js/src/widget.js',
        'js/src/main.js',
        'js/src/selections.js',
        'js/src/storage.js',
        'js/src/templater.js',
        'js/src/sources_loader.js',
        'js/src/css_content.js',
    ])
        .pipe(concat('doboard-widget-bundle.js'))
        .pipe(gulp.dest('js/src/'));
}

function minify_js() {
    return gulp.src('js/src/doboard-widget-bundle.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.', { addComment: true }))
        .pipe(gulp.dest('js/'));
}

function minify_css() {
    return gulp.src('styles/doboard-widget.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: 0
                },
                2: {
                    removeDuplicateRules: true
                }
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.', { addComment: true }))
        .pipe(gulp.dest('styles/'));
}

// Задача для минификации JS
gulp.task('compress-js', gulp.series(bundle_src_js, minify_js));

// Задача для минификации CSS
gulp.task('compress-css', minify_css);

// Общая задача для минификации всех ресурсов
gulp.task('compress-all', gulp.parallel('compress-js', 'compress-css'));

gulp.task('watch-js', function() {
    gulp.watch(
        ['js/src/api.js', 'js/src/handlers.js', 'js/src/widget.js', 'js/src/main.js'],
        gulp.series('compress-js')
    );
});

// Добавляем вотчер для CSS файлов
gulp.task('watch-css', function() {
    gulp.watch(
        'styles/doboard-widget.css',
        gulp.series('compress-css')
    );
});

// Общий вотчер для JS и CSS
gulp.task('watch-all', gulp.parallel('watch-js', 'watch-css'));
