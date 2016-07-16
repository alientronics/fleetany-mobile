import { join } from 'path';

const config: any = {
  gulp: require('gulp'),
  appDir: 'app',
  testDir: 'test',
  testDest: 'www/build/test',
  typingsDir: 'typings',
};

const imports: any = {
  gulp: require('gulp'),
  runSequence: require('run-sequence'),
  ionicGulpfile: require(join(process.cwd(), 'gulpfile.js')),
};

const gulp: any = imports.gulp;
const runSequence: any = imports.runSequence;

// just a hook into ionic's build
gulp.task('build-app', (done: Function) => {
  runSequence(
    'build',
    (<any>done)
  );
});

// run jasmine unit tests using karma with PhantomJS2 in single run mode
gulp.task('karma', (done: Function) => {

  let karma: any = require('karma');
  let karmaOpts: {} = {
    configFile: join(process.cwd(), config.testDir, 'karma.config.js'),
    singleRun: true,
  };

  new karma.Server(karmaOpts, done).start();
});

// run jasmine unit tests using karma with Chrome, Karma will be left open in Chrome for debug
gulp.task('karma-debug', (done: Function) => {

  let karma: any = require('karma');
  let karmaOpts: {} = {
    configFile: join(process.cwd(), config.testDir, 'karma.config.js'),
    singleRun: false,
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    browserify: {
      debug: true,
      plugin: [
        ['tsify'],
      ],
    },
  };

  new karma.Server(karmaOpts, done).start();
});

// run tslint against all typescript
gulp.task('lint', () => {

  let tslint: any = require('gulp-tslint');

  return gulp.src(join(config.appDir, '**/*.ts'))
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// build unit tests, run unit tests, remap and report coverage
gulp.task('unit-test', (done: Function) => {
  runSequence(
    ['clean'], // Ionic's clean task, nukes the whole of www/build
    ['html'],
    'karma',
    (<any>done)
  );
});
