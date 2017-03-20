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
  { width: 1000,      suffix: '-lg' },
  { width: 1000 * 2,  suffix: '-lg-hd' },
  { width: 800,       suffix: '-md' },
  { width: 800 * 2,   suffix: '-md-hd' },
  { width: 530,       suffix: '-sm' },
  { width: 530 * 2,   suffix: '-sm-hd' },
  { width: 360,       suffix: '-bs' },
  { width: 360 * 2,   suffix: '-bs-hd' }
];
//-----------------------------------------------------------------------


const imgPrefs = { progressive: true, optimizationLevel: 5 };

gulp.task('default', function() {
  const path = require('path');
  const images = glob.sync(PATH.src.imgs);
  var streams = [];

  images.map(function(image) {
    let fext = path.extname(image);
    let origName = path.basename(image, fext);
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
