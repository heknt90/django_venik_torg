const gulp = require('gulp'),
    CONFIG = require('./config.gulpfile');

function copyStatic() {
    return gulp.src([
        `${CONFIG.frontend.src}/static/*`
    ], {
        base: `${CONFIG.frontend.src}static`
    })
    .pipe(gulp.dest(CONFIG.frontend.dest));
}

module.exports = {

    dev: function () {
        return gulp.src([
          `${CONFIG.frontend.src}/fonts/**/*.{woff,woff2}`,
          `${CONFIG.frontend.src}/images/**/*.{png,jpg,svg,bmp,webp}`
        ], {
          base: CONFIG.frontend.src
        })
        .pipe(gulp.dest(CONFIG.frontend.dest));
    },

    prod: function () {
        copyStatic();
        return gulp.src([
            `${CONFIG.frontend.src}/fonts/**/*.{woff,woff2}`
          ], {
            base: CONFIG.frontend.src
          })
          .pipe(gulp.dest(CONFIG.frontend.dest));
    }

}