const { src, dest, watch, series } = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const merge = require('merge-stream');

function concatScripts() {
    return src([
        'src/js/index.js',
        'src/lib/prism.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('static/js'))
}

function compileSass() {
    const scssStream = src(['src/scss/app.scss'])
        .pipe(sass())
        .pipe(concat('scss-files.scss'));

    const cssStream = src([
        'src/lib/normalize.css',
        'src/lib/iconfont.css',
        'src/lib/prism.css',
        'src/lib/github-markdown.css'
        ])
        .pipe(concat('css-files.css'));

    const mergedStream = merge(scssStream, cssStream)
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('static/css'));

    return mergedStream;
    
}

watch(['src/scss/*.scss', 'src/lib/*.css'], function(cb) {
    compileSass();
});

watch(['src/js/*.js', 'src/lib/*.js'], function(cb){
    concatScripts();
});

exports.default = series(concatScripts, compileSass);