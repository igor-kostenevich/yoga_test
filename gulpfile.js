const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browsersSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');

const styleFiles = [
        './src/css/main.less',
        './src/css/media.less'
 ]

const scriptsFiles = [
    './src/js/main.js'
]

gulp.task('styles', () => {
    //Шаблон для поиска файлов стилей
    return gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(less())
    //объединение файлов в один
    .pipe(concat('style.css'))
    //Автопрефиксы для посл 2 версий браузеров
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    //Минификация
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourcemaps.write('./'))
    //Выходная папка для стилей
    .pipe(gulp.dest('./build/css'))
    .pipe(browsersSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src(scriptsFiles)
    //объединение файлов в один
    .pipe(concat('script.js'))
    //uglify
    .pipe(uglify({
        toplevel: true
    }))
    //Выходная папка для js
    .pipe(gulp.dest('./build/js'))
    .pipe(browsersSync.stream());
});

//Удаление 
gulp.task('del', () => {
    return del(['build/*'])
});

gulp.task('img-compress', () => {
    return gulp.src('./src/img/**')
    .pipe(imagemin({
        proggressive: true
    }))
    .pipe(gulp.dest('./build/img/'))
})

gulp.task('watch', () => {
    browsersSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/img/**', gulp.series('img-compress'))
    //Отслеживание
    gulp.watch('./src/css/**/*.less', gulp.series('styles'))
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
    gulp.watch("./*.html").on('change', browsersSync.reload);
});

gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));