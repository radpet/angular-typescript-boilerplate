var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');//TODO
var merge = require('merge2');
var karma = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');

var paths = {
  src: 'src/',
  test: 'test/',
  jspm_packages: 'jspm_packages',
  build: 'build/',
  compiledTests: 'compiled-tests/',
  definitions: 'definitions/',
  typings: 'typings/',
};

var typings = paths.typings + '/**/*.d.ts';

var typescripts = {
  src: paths.src + '/**/*.ts',
  test: paths.test + '/**/*.ts'
};

var tsSources = ts.createProject({
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "module": "commonjs",
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

gulp.task('tslint',function(){
    return gulp.src(typescripts.src).pipe(tslint()).pipe(tslint.report('verbose',{ emitError: false}));
});

gulp.task('ts',['tslint'], function () {
  var tsResult = gulp.src([typescripts.src,typings]).pipe(sourcemaps.init()).pipe(ts(tsSources));
  return merge([tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.build)), tsResult.dts.pipe(gulp.dest(paths.build))]);
});

gulp.task('ts-watch', ['ts'], function () {
  gulp.watch(typescripts.src, ['ts']);
});

gulp.task('tsTest', function () {
  var typescriptTypings = paths.build + '/**/*.d.ts';
  var tsResult = gulp.src([typescripts.test,typings,typescriptTypings]).pipe(ts(tsSources));
  return tsResult.js.pipe(gulp.dest(paths.compiledTests));
});

gulp.task('tsTest-watch', ['tsTest'], function () {
  gulp.watch(typescripts.test, ['tsTest']);
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
  runSequence('ts-watch','tsTest-watch', 'karma');
});

gulp.task('karma', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});