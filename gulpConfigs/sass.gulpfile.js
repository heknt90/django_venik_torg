'use strict';

const          gulp = require('gulp'),
            plumber = require('gulp-plumber'),
         sourcemaps = require('gulp-sourcemaps'),
               sass = require('gulp-sass'),
            postcss = require('gulp-postcss'),
           mqpacker = require('mqpacker'),
       autoprefixer = require('autoprefixer'),
            cssnano = require('cssnano'),
             rename = require('gulp-rename'),
             CONFIG = require('./config.gulpfile'),
             server = require('browser-sync').create();

module.exports = {

    dev: function() {
        return gulp.src(CONFIG.sass.src)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: ['node_modules/']
            }))
            .pipe(postcss([ 
                mqpacker({sort: true}),
                autoprefixer(),
                cssnano({preset: ['default', {discardComments: {removeAll: true}} ] })        
            ]))
            .pipe(rename(CONFIG.sass.destFileName))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(CONFIG.sass.dest))
            .pipe(server.stream())
    },

    prod: function () {
        return gulp.src(CONFIG.sass.src)
            .pipe(sass({
                includePaths: ['node_modules/']
            }))
            .pipe(postcss([ 
                mqpacker({sort: true}),
                autoprefixer(),
                cssnano({preset: ['default', { discardComments: {removeAll: true} } ] })        
            ]))
            .pipe(rename(CONFIG.sass.destFileName))
            .pipe(gulp.dest(CONFIG.sass.dest))
    }

}