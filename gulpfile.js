//Dependencias
var browserSync = require('browser-sync');
var concatCSS   = require('gulp-concat-css');
var concatJS    = require('gulp-concat');
var del         = require('del');
var gulp        = require('gulp');
var minifyCSS   = require('gulp-minify-css');
var minifyHTML  = require('gulp-minify-html');
var minifyJS    = require('gulp-uglify');
var reload      = browserSync.reload;
var rename      = require('gulp-rename');
var stylus      = require('gulp-stylus');

//Archivos a copiar a dist

var _PROYECTOJS = 'assets/js/**/*';

var _BASE = [
	'index.html'
];

gulp.task('minify-js', function () {
    gulp.src(_PROYECTOJS)
    .pipe(concatJS('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(reload({stream: true, once: true}));
});

gulp.task('minify-css', function () {
    gulp.src('assets/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(concatCSS('style.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(reload({stream: true, once: true}));
});

gulp.task('copyBase', function(){
	gulp.src(_BASE)
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true, once: true}));
});


gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

gulp.task('watch', function() {
    // Cambios principales
    gulp.watch(_PROYECTOJS, ['minify-js']);
    gulp.watch('assets/stylus/**/*.styl', ['minify-css']);
    gulp.watch(_BASE,  ['copyBase']);
});

gulp.task('server', function () {
  browserSync({
    notify: false,
    server: 'dist/'
  });
});

//Tarea por defecto
gulp.task('default', ['clean'], function() {
    gulp.start('copyBase', 'minify-js', 'minify-css', 'server', 'watch');
});


