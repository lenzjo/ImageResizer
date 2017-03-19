'use strict';

import gulp       from 'gulp';
import plugins    from 'gulp-load-plugins';
import glob       from 'glob';
import merge2     from 'merge2';

const $ = plugins();

const PATH = {
  src:  {
    imgs:   'srcimgs/**/*.{png,jpeg,jpg,svg,gif}',
  },
  dest: {
    imgs:   'destimgs'
  }
};


//-----------------------------------------------------------------------
//------------------ Replace this part with size-incs as needed ---------

const newImages = [
  { width: 250,       suffix: '-thumbnail-lg' },
  { width: 250 * 2,   suffix: '-thumbnail-lg-hd' },
  { width: 165,       suffix: '-thumbnail-md' },
  { width: 165 * 2,   suffix: '-thumbnail-md-hd' },
  { width: 474,       suffix: '-thumbnail-sm' },
  { width: 474 * 2,   suffix: '-thumbnail-sm-hd' },
  { width: 312,       suffix: '-thumbnail-bs' },
  { width: 312 * 2,   suffix: '-thumbnail-bs-hd' }
];
//-----------------------------------------------------------------------


const imgPrefs = { progressive: true, optimizationLevel: 5 };

gulp.task('default', function() {
  const path = require('path');
  const images = glob.sync(PATH.src.imgs);
  var streams = [];

  images.map(function(image) {
    let origName = path.basename(image, '.jpg');
    newImages.map(function(newImage) {
      streams.push(gulp.src(image)
        .pipe( $.rename(function (path) {
          path.basename = origName + newImage.suffix;
        }))
        .pipe($.changed(PATH.dest.imgs))
        .pipe($.if(newImage.width !== null, $.imageResize( { width: newImage.width})))
        .pipe($.imagemin(imgPrefs))
        .pipe(gulp.dest(PATH.dest.imgs)));
      });
  });
  return merge2(streams);
});
