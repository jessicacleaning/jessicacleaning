const { series, src, dest } = require('gulp');
const rimraf = require('gulp-rimraf');
var revAll = require("gulp-rev-all");
var revdel = require('gulp-rev-delete-original');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const lazypipe = require('lazypipe');
const uglify = require('gulp-uglify');



const srcPath = 'src';
const destPath = 'dist';

function cleanTask() {
    return src(destPath, { read: false, allowEmpty: true }) // much faster
        .pipe(rimraf());
}

function sassTask() {
    return src(`${srcPath}/scss/style.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(`${srcPath}/css`));
}

function copyAllTask() {
    return src(`${srcPath}/**/*`)
        .pipe(dest(destPath));
}

function revAllTask() {
    const revConfig = {
        dontRenameFile: [/^\/index.html/g],
        dontUpdateReference: [/^\/index.html/g],
    };
    return src(`${destPath}/**/*`)
        .pipe(dest(destPath))
        .pipe(revAll.revision(revConfig))
        .pipe(revdel())
        .pipe(dest(destPath))
        .pipe(revAll.manifestFile())
        .pipe(dest(destPath));
}

function optimizeAllTask() {
    const optimizeHtml = lazypipe()
        .pipe(() => htmlmin({ collapseWhitespace: true }))

    const optimizeCss = lazypipe()
        .pipe(() => cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefixer);

    const optimizeJs = lazypipe()
        .pipe(() => uglify())


    return src(`${destPath}/**/*`)
        .pipe(gulpif('*.html', optimizeHtml()))
        .pipe(gulpif('*.css', optimizeCss()))
        .pipe(gulpif('*.js', optimizeJs()))
        .pipe(dest(destPath));
}

exports.build = series(cleanTask, sassTask, copyAllTask, optimizeAllTask, revAllTask);
exports.clean = cleanTask;
exports.copyAll = copyAllTask;
exports.sass = sassTask;
exports.revAll = series(cleanTask, copyAllTask, revAllTask);
exports.optimize = series(cleanTask, copyAllTask, optimizeAllTask);
exports.default = series(cleanTask);