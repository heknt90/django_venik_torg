'use strict';



const          gulp = require('gulp'),
           imagemin = require('gulp-imagemin'),
        browserSync = require('browser-sync'),
             server = browserSync.create(),
           svgstore = require('gulp-svgstore'),
             rename = require('gulp-rename'),

             CONFIG = require('./gulpConfigs/config.gulpfile'),

             c_sass = require('./gulpConfigs/sass.gulpfile'),
               c_js = require('./gulpConfigs/js.gulpfile'),
             c_copy = require('./gulpConfigs/copy.gulpfile'),

      
              spawn = require('child_process').spawn,
               argv = require('yargs')
                      .default('host', CONFIG.django.adress.host)
                      .default('port', CONFIG.django.adress.port)
                      .default('bsync-port', CONFIG.bsync.port)
                      .argv;
      
const djangoAddress = argv.host + ":" + argv.port;


/**          SCSS        */

// // Development SCSS
gulp.task('sass:dev', c_sass.dev);

// // Production SCSS
gulp.task('sass:prod', c_sass.prod);



/**      JAVASCRIPT         */

// Development JavaScript
gulp.task('js:dev', c_js.dev);

// Production JavaScript
gulp.task('js:prod', c_js.prod);


/**          Production IMAGES        */

gulp.task('img:prod', function() {
    return gulp.src(CONFIG.images.src)
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.mozjpeg({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest(CONFIG.images.dest))
});


/**         SPRITE           */

gulp.task('sprite', function() {
    return gulp.src(`${CONFIG.frontend.src}/sprite/*.svg`)              //
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(`${CONFIG.frontend.dest}/build/img`));
});


/**          COPY FILES             */

// Development Copy files
 gulp.task('copy:dev', c_copy.dev);

// Production Copy files
 gulp.task('copy:prod', c_copy.prod);


 /**            DJANGO START               */
gulp.task('django-runserver', function () {

    let args = [`./${CONFIG.django.projectName}/manage.py`, "runserver", djangoAddress];
    // let python = process.env['VIRTUAL_ENV'] + '/bin/python';
    let python = 'python';
    let runserver = spawn(python, args, {stdio: "inherit"});
    runserver.on('close', function (code) {
        if (code !== 0) {
            console.error('Django runserver exited with error code: ' + code);
        } else {
            console.log('Django runserver exited normally.');
        }
    });
});


/**         RELOAD           */


gulp.task('b:reload', function (done) {
    server.reload();
    done();
});

// Запуск development-сервера. Так как django-runserver пока не работает как нужно, он отключен
// gulp.task('browsersync', ['django-runserver'], function () {
gulp.task('browsersync', function () {
    server.init({
        proxy: djangoAddress,
        port: argv['bsync-port']
    });

    gulp.watch(CONFIG.sass.watch, gulp.series('sass:dev', 'b:reload'));
    gulp.watch(CONFIG.js.watch, gulp.series('b:reload'));
    gulp.watch(CONFIG.django.templates, gulp.series('b:reload'));

});

// Run in development
// gulp.task('start', gulp.series('copy:dev', 'sass:dev', 'js:dev', 'browsersync', 'watch'));
gulp.task('start', gulp.series('copy:dev', 'sprite', 'sass:dev', gulp.parallel('js:dev', 'browsersync')));

// Run before deploy to production
gulp.task('build', gulp.parallel('copy:prod', 'img:prod', 'sprite', 'sass:prod', 'js:prod'));


// Run Development with Django
gulp.task('default', gulp.parallel('start', 'django-runserver'));