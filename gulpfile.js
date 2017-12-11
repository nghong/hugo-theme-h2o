var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var merge = require('merge-stream');

gulp.task('scripts', function(){
gulp.src([
    'src/js/index.js',
    'src/lib/prism.js'
     ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('static/js'))
});

gulp.task('sass', function(){
var scssStream = gulp.src(['src/scss/app.scss'])
    .pipe(sass())
    .pipe(concat('scss-files.scss'));

var cssStream = gulp.src([
    'src/lib/normalize.css',
    'src/lib/iconfont.css',
    'src/lib/prism.css',
    'src/lib/github-markdown.css'
    ])
    .pipe(concat('css-files.css'));

var mergedStream = merge(scssStream, cssStream)
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('static/css'));

return mergedStream;
});

gulp.task('watch', function(){
gulp.watch(['src/scss/*.scss', 'src/lib/*.css'], ['sass']);
gulp.watch(['src/js/*.js', 'src/lib/*.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);