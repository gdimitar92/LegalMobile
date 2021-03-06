/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈
*
*  Copyright 2015 Reedia Limited. All rights reserved.
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.

*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*
*/
(function () {
  'use strict';

  var gulp = require('gulp');
  var plugins = require('gulp-load-plugins')({lazy: true});
  var path = require('path');
  var beep = require('beepbeep');
  var gutil = require('gulp-util');
  var ascii = require('../ascii.js');
  var runSequence = require('run-sequence');
  /**
  * Parse arguments
  */
  var args = require('yargs')
  .alias('e', 'emulate')
  .alias('b', 'build')
  .alias('r', 'run')
  // remove all debug messages (console.logs, alerts etc) from release build
  .alias('release', 'strip-debug')
  .default('build', false)
  .default('port', 9000)
  .default('strip-debug', false)
  .argv;
  var build = !!(args.build || args.emulate || args.run);
  var emulate = args.emulate;
  var run = args.run;
  var port = args.port;
  var stripDebug = !!args.stripDebug;
  var targetDir = path.resolve(build ? 'www' : '.tmp');


  // our main sequence, with some conditional jobs depending on params
  gulp.task('default', function(done) {
    ascii.captain();
    gutil.log(gutil.colors.white('\nCabin crew, doors on automatic, cross-check & report. Thank you.\n'));
    ascii.crew();
    gutil.log(gutil.colors.white('\nIn a few moments, we will be passing around the cabin to\noffer you hot or cold drinks. Please, sit back, relax, and\nenjoy the flight.\n'));
    ascii.captain();
    gutil.log(gutil.colors.white('\nStarting initializing the Gulp sequence, local time is:\n'));

    runSequence(
      'clean',
      'iconfont',
      [
        'licenses',
        'fonts',
        'templates',
        'styles',
        'favicon',
        'images',
        'vendor',
        'languages'
      ],
      'index',
      build ? 'noop' : 'watchers',
      build ? 'noop' : 'serve',
      emulate ? ['ionic:emulate', 'watchers'] : 'noop',
      run ? 'ionic:run' : 'noop',
      done);
    });
    ascii.plane();
    gutil.log(gutil.colors.white('Flight \"LegalMobile\" is ready for takeoff.'));

}());
