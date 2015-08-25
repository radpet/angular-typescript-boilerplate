var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var merge = require('merge2');
var karma = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  src: 'src/',
  test: 'test/',
  jspm_packages: 'jspm_packages',
  build: 'build/',
  compiledTests: 'compiled-tests/',
  definitions: 'definitions/',
  typings: 'typings/',
};

var tsSources = ts.createProject({
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "module": "system",
  "target": "es5",
  "sourcemap": true,
  "noImplicitAny": false,
  "declarationFiles": true,
});

gulp.task('dev', function (callback) {
  del.sync(paths.build + '/*');
  gulp.src([paths.src + '/index.html', 'config.js']).pipe(gulp.dest(paths.build));
  runSequence('ts-watch', 'html', 'html-watch', callback);
});

gulp.task('ts', function () {
  var typescripts = paths.src + '/**/*.ts';
  var typings = paths.typings + '/**/*.d.ts';
  var tsResult = gulp.src([typescripts,typings]).pipe(sourcemaps.init()).pipe(ts(tsSources));
  return merge([tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.build)), tsResult.dts.pipe(gulp.dest(paths.build))]);
});

gulp.task('ts-watch', ['ts'], function () {
  var typescripts = paths.src + '/**/*.ts';
  gulp.watch(typescripts, ['ts']);
});

gulp.task('tsTest', function () {
  var typescripts = paths.test + '**/*.ts';
  var typings = paths.typings + '**/*.d.ts';
  var typescriptTypings = paths.build + '**/*.d.ts';
  console.log(gulp.src(typescriptTypings));
  var tsResult = gulp.src([typescripts,typings,typescriptTypings]).pipe(ts(tsSources));
  return tsResult.js.pipe(gulp.dest(paths.compiledTests));
});

gulp.task('tsTest-watch', ['tsTest'], function () {
  var typescripts = paths.test + '/**/*.ts';
  gulp.watch(typescripts, ['tsTest']);
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

gulp.task('test', function (callback) {
  del.sync(paths.compiledTests + '/*');
  runSequence('tsTest-watch', 'ts-watch', 'karma');
});

gulp.task('karma', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});