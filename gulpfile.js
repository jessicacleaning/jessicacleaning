const { series, src, dest, parallel } = require('gulp');
const rimraf = require('gulp-rimraf');
var revAll = require("gulp-rev-all");
var revdel = require('gulp-rev-delete-original');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');


var argv = require('yargs').argv;
var isProduction = (argv.production === undefined) ? false : true;


const srcPath = 'src';
const destPath = isProduction ? '_site' : 'dist';

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

function optimizeHtml() {
    return src(`${destPath}/**/*.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(destPath));
}

function optimizeCss() {
    return src(`${destPath}/**/*.css`)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefixer())
        .pipe(dest(destPath));
}

function optimizeJs() {
    return src(`${destPath}/**/*.js`)
        .pipe(uglify())
        .pipe(dest(destPath));
}


exports.clean = cleanTask;
exports.copyAll = copyAllTask;
exports.sass = sassTask;
exports.revAll = series(cleanTask, copyAllTask, revAllTask);
exports.optimize = series(cleanTask, copyAllTask, parallel(optimizeHtml, optimizeCss, optimizeJs));
exports.build = series(cleanTask, sassTask, copyAllTask, parallel(optimizeHtml, optimizeCss, optimizeJs), revAllTask);
exports.default = exports.build;