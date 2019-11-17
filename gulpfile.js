
var gulp        = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'),// Подключаем Browser Sync
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('Sedona-/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('Sedona-/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'Sedona-' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src(['Sedona-/js/**/*.js', 'Sedona-/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
    return gulp.src('Sedona-/**/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch('Sedona-/sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('Sedona-/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['Sedona-/js/common.js', 'Sedona-/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за js файлами
});
gulp.task('default', gulp.parallel('sass', 'scripts', 'browser-sync', 'watch'));


