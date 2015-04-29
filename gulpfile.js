/* File: gulpfile.js */

/* jshint strict: false */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    //clean = require('gulp-clean'),
    del = require('del'),
    //rimraf = require('gulp-rimraf'),
    //vinylPaths = require('vinyl-paths')
    karma = require('karma').server
    //     //angularProtractor = require('gulp-angular-protractor');
    //     protractor = require('gulp-protractor').protractor;
    ;


    // browserify js
    gulp.task('browserify', ['clean'], function() {
       gulp.src(['src/client/app/app.module.js'])
      .pipe(browserify({
        insertGlobals: true,
        debug: true
      }))
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('dist/js'));
    });



    // copy other js
    gulp.task('js', ['jshint', 'clean'],function() {
      //  gulp.src('src/client/lib/angular/angular-bootstrap-datetimepicker-directive.js')
      // .pipe(gulp.dest('dist/lib/angular/'));

      gulp.src('src/client/lib/bootstrap/js/bootstrap-datetimepicker.js')
     .pipe(gulp.dest('dist/lib/bootstrap/js/'));

    });

    // copy html
    gulp.task('html', ['clean'],function() {
       gulp.src('src/client/app/app.html')
      .pipe(gulp.dest('dist/'));
    });
    // copy templates html
    gulp.task('templates', ['clean'],function() {
       gulp.src(['src/client/app/**/*.html', '!src/client/app/app.html'])
      .pipe(gulp.dest('dist/templates/'));
    });

    // copy css
    gulp.task('css', ['clean'],function() {
       gulp.src(['src/client/content/css/**/*.css'])
      .pipe(gulp.dest('dist/css/'));

      gulp.src(['src/client//lib/bootstrap/css/bootstrap-datetimepicker.css'])
     .pipe(gulp.dest('dist/lib/bootstrap/css/'));

    });

    // copy images
    gulp.task('images', ['clean'],  function() {
      gulp.src(['src/client/content/img/**/*.*'])
      .pipe(gulp.dest('dist/img/'));
    });

    // not really dependent on jshint but I want to lint before copying files
    // which is dependent on clean
    gulp.task('clean', ['jshint'] ,function(cb) {
        del(['dist/**/**'], cb);
    });


    //gulp.task('copy', ['clean', 'browserify', 'html', 'templates', 'css', 'images', 'js']);
    gulp.task('build', ['browserify', 'html', 'templates', 'css', 'images', 'js']);

    var filePaths = {
      appJS:'public/ang/*.js',
      //unitTestJS: 'public/ang/test/unit/*test-unit.js',
      e2eTestJS: 'src/client/test/e2e/*test-e2e.js'
    };

    // jshint
    gulp.task('jshint', function(){
      return gulp.src(filePaths.appJS)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
    });


    //karma
    gulp.task('karmaOnly', function (done) {

      karma.start({
        configFile: __dirname + '/karma.conf.js'
      }, done);
    });
    gulp.task('karma', ['build']);

    //
    // gulp.task('protractor', function(){
    //   return gulp.src([filePaths.e2eTestJS])
    //     .pipe(protractor({
    //       'configFile': 'protractor.conf.js'
    //     }))
    //     .on('error', function(e) { gutil.log(e.message); });
    // });

    // gulp.task('watch', [], function() {
    //   return gulp.watch([
    //     'src/client/app/**/*.js',
    //     'src/client/app/**/*.html',
    //     'src/client/app/**/*.css',
    //     'src/client/app/**/*.img'],
    //   [
    //     'browserify',
    //     'views'
    //   ]);
    // });





//
// // packages
// var gulp  = require('gulp'),
//     gutil = require('gulp-util'),
//     jshint = require('gulp-jshint'),
//     karma = require('karma').server,
//     //angularProtractor = require('gulp-angular-protractor');
//     protractor = require('gulp-protractor').protractor;
//
//
// var filePaths = {
//   appJS:'public/ang/*.js',
//   //unitTestJS: 'public/ang/test/unit/*test-unit.js',
//   e2eTestJS: 'src/client/test/e2e/*test-e2e.js'
// };
//
// // jshint
// gulp.task('jshint-run', function(){
//   gutil.log('jshint completed');
//
//   return gulp.src(filePaths.appJS)
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('jshint-stylish'));
// });
//
// gulp.task('jshint-watch', function(){
//   gulp.watch(filePaths.appJS, ['jshint-run']);
// });
//
//
// // karma
// gulp.task('karma-run', function (done) {
//
//   karma.start({
//     configFile: __dirname + '/karma.conf.js'
//   }, done);
// });
//
// gulp.task('protractor-run', function(){
//   return gulp.src([filePaths.e2eTestJS])
//     .pipe(protractor({
//       'configFile': 'protractor.conf.js'
//     }))
//     // .on('error', function(e) { throw e });
//     .on('error', function(e) { gutil.log(e.message); });
//
// });
//
// gulp.task('protractor-watch', function(){
//   gulp.watch(filePaths.appJS, ['protractor-run']);
// });
//
//
// // create a default task and just log a message
// gulp.task('running-log', function() {
//   gutil.log('Gulp is running!');
// });
//
//
// gulp.task('default', [
//   'jshint-run',
//   'karma-run',
//   'protractor-run',
//
//   'jshint-watch',
//   'protractor-watch',
//
//   'running-log']);
