/* File: gulpfile.js */

/* jshint strict: false */

// packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    //angularProtractor = require('gulp-angular-protractor');
    protractor = require('gulp-protractor').protractor;


var filePaths = {
  appJS:'public/ang/*.js',
  //unitTestJS: 'public/ang/test/unit/*test-unit.js',
  e2eTestJS: 'src/client/test/e2e/*test-e2e.js'
};

// jshint
gulp.task('jshint-run', function(){
  return gulp.src('public/ang/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// gulp.task('jshint-watch', function(){
//   gulp.watch(filePaths.appJS, ['jshint-run']);
// });


// karma
gulp.task('karma-run', ['jshint-run'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('protractor-run', ['jshint-run'], function(){
  return gulp.src([filePaths.e2eTestJS])
    .pipe(protractor({
      'configFile': 'protractor.conf.js'
    }))
    // .on('error', function(e) { throw e });
    .on('error', function(e) { gutil.log(e.message); });

});

gulp.task('protractor-watch', function(){
  gulp.watch(['src/client/**/*.js'
            , 'src/client/**/*.html'
            , 'src/client/**/*.css'
            ,'./protractor.conf.js']
  , ['protractor-run', 'karma-run', 'jshint-run']);
});


// // create a default task and just log a message
// gulp.task('running-log', function() {
//   gutil.log('Gulp is running!');
// });


gulp.task('default', [
  'jshint-run',
  'karma-run',
  'protractor-run',

  //'jshint-watch',
  'protractor-watch']);
