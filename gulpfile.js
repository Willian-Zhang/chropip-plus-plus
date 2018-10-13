const fs = require("fs");
const gulp = require('gulp');
const rename = require('gulp-rename');
const header = require('gulp-header');
const gcp = require('gulp-copy');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');

function mergeTask() {
    return gulp.src('src/background.js')
        .pipe(header(`const code = \`${fs.readFileSync('./src/code.js')}\`;\n`))
        .pipe(rename({basename: 'background', suffix: '.meg'}))
        .pipe(gulp.dest('dist'))
}

function copyTask() {
    return gulp
        .src(['src/manifest.json', 'src/assets/*'])
        .pipe(gcp('build', {prefix: 1}));
}

function buildTask() {
    // return gulp
    //     .src('dist/background.meg.js')
    //     .pipe(babel({presets: ['es2015']}))
    //     .pipe(uglify())
    //     .pipe(rename('background.js'))
    //     .pipe(gulp.dest('dist'))

    return gulp
        .src('dist/background.meg.js')
        .pipe(rename('background.js'))
        // .pipe(babel({presets: ['es2015']}))
        // .pipe(uglify())
        .pipe(gulp.dest('build'))
}

function releaseTask() {

}

gulp.task('clean', () => {
    return gulp.src(['dist', 'build'], {read: false})
        .pipe(clean());
});
gulp.task('merge', ['clean'], mergeTask);
gulp.task('copy', ['merge'], copyTask);
gulp.task('build', ['copy'], buildTask);
gulp.task('release', ['build'], releaseTask);

gulp.task('default', ['build']);