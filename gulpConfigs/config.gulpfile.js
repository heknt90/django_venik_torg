'use strict';

const CONFIG = {
    bsync: {
        port: '8000'
    },
    django: {
        projectName: 'venik_torg',    // <<< [ Название корневой папки Django-проекта ]
    adress: {
            host: '127.0.0.1',
            port: '3000'
        }
    },
    frontend: {
        src: './frontend/sources/', // Корень для исходников
    },
    sass: {
        destFileName: 'app.min.css',    // Пускай для prod и dev файл будет называться одинаково
        options: {
            includePaths: ['node_modules']  // <<<< Надо проверить что делает эта опция!
        }
    },
    js: {},
    images: {}
};

// Генерируемые
CONFIG.django.templates = `./${CONFIG.django.projectName}/**/templates/**/*.html`; // Отслеживание изменений html.

CONFIG.frontend.dest = `./${CONFIG.django.projectName}/static/`; // Корень для production файлов.

CONFIG.sass.src = `${CONFIG.frontend.src}scss/entry.scss`;  // Точка входа сборки css
CONFIG.sass.watch = `${CONFIG.frontend.src}scss/**/*.scss`; // За какими файлами происходит наблюдение
CONFIG.sass.dest = `${CONFIG.frontend.dest}css/`;   // Путь куда кладется css файл после сборки

CONFIG.js.src = `${CONFIG.frontend.src}js/entry.js`; // Путь к точке входа в webpack 
CONFIG.js.dest = `${CONFIG.frontend.dest}js/`;  // Куда бросать js на выходе
CONFIG.js.entry = {                                 //
    'app': `${CONFIG.frontend.src}index.js`         //  Кусок Webpack конфига
}                                                   //
CONFIG.js.watch = `${CONFIG.frontend.src}js/**/*.js`;   //  Отслеживание изменений js

CONFIG.images.src = `${CONFIG.frontend.src}images/**/*.{png,jpg,svg,bmp,webp}`;  // Где брать картинки
CONFIG.images.dest = `${CONFIG.frontend.dest}images`;  // Куда собирать картинки


module.exports = CONFIG;