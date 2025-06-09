const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

function scripts() {
     return gulp.src('./src/scripts/*.js').pipe(uglify()).pipe(gulp.dest('./dist/js'));
}

function styles() {
     return gulp
          .src('./src/styles/*.scss')
          .pipe(sass({ outputStyle: 'compressed' }))
          .pipe(gulp.dest('./dist/styles/'));
}

function images() {
     return gulp
          .src('./src/images/**/*', { encoding: false })
          .pipe(imagemin())
          .pipe(gulp.dest('./dist/images'));
}

function html() {
     return gulp
          .src('./*.html')
          .pipe(htmlmin({ collapseWhitespace: true }))
          .pipe(gulp.dest('./dist/'));
}

exports.default = gulp.parallel(styles, images, scripts, html);

exports.watch = function () {
     gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
     gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
     gulp.watch('./*.html', gulp.parallel(html));
};
