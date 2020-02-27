'use strict';

const          gulp = require('gulp'),
     webpack_stream = require('webpack-stream'),
      webpackConfig = require('../webpack.config'),
      server = require('browser-sync').create(),
      CONFIG = require('./config.gulpfile');
    //   server = require('browser-sync').create(); 

module.exports = {

    dev: function () {
        let cfg = Object.assign({}, webpackConfig.development, {entry: CONFIG.js.entry});
    
        return gulp.src(CONFIG.js.src)
            .pipe(webpack_stream(cfg))
            .on('error', function (error) {
                console.log(error.message);
                this.emit('end');
            })
            .pipe(gulp.dest(CONFIG.js.dest))
            .pipe(server.stream())
    },

    prod: function () {
        let cfg = Object.assign({}, webpackConfig.production, {entry: CONFIG.js.entry});
        return gulp.src(CONFIG.js.src)
            .pipe(webpack_stream(cfg))
            .pipe(gulp.dest(CONFIG.js.dest));
    }
}