var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var shell = require('gulp-shell');
var merge = require('merge2');
var watch = require('gulp-watch');
var karma = require('karma').Server;

var paths = {
  src: 'src/',
  test: 'test/',
  jspm_packages: 'jspm_packages',
  build: 'build/'
};

var tsSources = ts.createProject({
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "module": "commonjs",
  "target": "es5",
  "sourcemap":true
});

gulp.task('dev', function (callback) {
  del.sync(paths.build + '/*');
  gulp.src([paths.src + '/index.html', 'config.js']).pipe(gulp.dest(paths.build));
  runSequence('ts-watch', 'html', 'html-watch', callback);
});

gulp.task('ts', function () {
  var typescripts = paths.src + '/**/*.ts';
  return gulp.src(typescripts).pipe(ts(tsSources)).pipe(gulp.dest(paths.build));
});


gulp.task('tsTest', function () {
  var typescripts = paths.test + '/**/*.ts';
  return gulp.src(typescripts).pipe(ts(tsTests)).pipe(gulp.dest(paths.test));
});


gulp.task('ts-watch', ['ts'], function () {
  var typescripts = paths.src + '/**/*.ts';
  gulp.watch(typescripts, ['ts']);
});

gulp.task('html', function () {
  var htmlFiles = paths.src + '/**/*.html';
  gulp.src(htmlFiles)
    .pipe(gulp.dest(paths.build));
});

gulp.task('html-watch', function () {
  var htmlFiles = paths.src + '/**/*.html';
  gulp.watch(htmlFiles, ['html']);
});

gulp.task('test', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});