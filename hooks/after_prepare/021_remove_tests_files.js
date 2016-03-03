#!/usr/bin/env node

var del  = require('del');
var fs   = require('fs');
var path = require('path');

var rootdir = process.argv[2];

if (rootdir) {

  // go through each of the platform directories that have been prepared
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  for(var x=0; x<platforms.length; x++) {
    // open up the index.html file at the www root
    try {
      var platform = platforms[x].trim().toLowerCase();
      var testBuildPath;

      if(platform == 'android') {
        testBuildPath = path.join('platforms', platform, 'assets', 'www', 'build', 'test');
      } else {
        testBuildPath = path.join('platforms', platform, 'www', 'build', 'test');
      }

      if(fs.existsSync(testBuildPath)) {
<<<<<<< HEAD:hooks/after_prepare/021_remove_tests_files.js
        process.stdout.write('Removing test build from assets after prepare: ' + testBuildPath + '\n');
        del.sync(testBuildPath);
      } else {
        process.stdout.write('Test build @ ' + testBuildPath + ' does not exist for removal' + '\n');
=======
        process.stdout.write('Removing test build from assets after prepare: ' + testBuildPath);
        if (!process.env.TRAVIS) { del.sync(testBuildPath); }
      } else {
        process.stdout.write('Test build @ ' + testBuildPath + ' does not exist for removal');
>>>>>>> 1424c74499ca40e6448d4c9bfbd3d9369b144fad:hooks/after_prepare/020_remove_tests_files.js
      }

    } catch(e) {
      process.stdout.write(e + '\n');
    }
  }
}
