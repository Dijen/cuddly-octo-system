//плагины
const { src, dest, watch } = require('gulp'); //стандартные функции от gulp
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


// Статический сервер
function bs() {
    /*bs-вызываем функцию browserSync, запускает локальный сервер, он включается только после того как скомпилируются sass файлы serveSass*/
    serveSass(); //вызываем функцию 
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //отслеживаемые файлы 
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    /* объясняю browserSync что нужно в папке /sass/ отслеживать все-** под папки и все-* файлы с расширение .sass, после отслеживания нужно будет выполнить функцию serveSass*/
    watch("./js/*.js").on('change', browserSync.reload); // ./-основная папка
};

// Компилировать sass в CSS и автоматически внедрять в браузеры
function serveSass() { /* функция которая делает из sass файлов css файлы serveSass, sass файлы обновляют страницу при помощи функции browserSync.stream*/
    return src("./sass/*.sass") //берем все файлы из попки sass
        .pipe(sass()) // запускаем плангин sass
        .pipe(dest("./css")) /* и выплевываем готовые скомпилированные файлы в папку css*/
        .pipe(browserSync.stream()); /* после перезагружаем стриницу при помощи browserSync.stream*/
};

exports.serve = bs; /* выгружаются task, serve-название task который будет запускать функцию bs (после выполняются паралельно или последовательно мои task)*/