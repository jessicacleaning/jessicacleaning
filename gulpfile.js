const { series, src, dest } = require('gulp');
const rimraf = require('gulp-rimraf');
var revAll = require("gulp-rev-all");
var revdel = require('gulp-rev-delete-original');


const srcPath = 'src';
const destPath = 'dist';

function clean() {
    return src(destPath, { read: false, allowEmpty: true }) // much faster
        .pipe(rimraf());
}

function build(cb) {
    cb();
}

function copyAll() {
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


exports.build = build;
exports.clean = clean;
exports.copyAll = copyAll;
exports.revAll = series(clean, copyAll, revAllTask);
exports.default = series(clean, build);