var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass'),
    prefix = require('gulp-autoprefixer');
    inject = require('gulp-inject');
    svgmin = require('gulp-svgmin');
    svgstore = require('gulp-svgstore');

function fileContents (filePath, file) {
  return file.contents.toString('utf8');
}

gulp.task('watch', function() {
  gulp.watch('css/*.scss', ['compass']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('svg/*.svg', ['svg']);
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('html', function() {
  var injects = gulp.src(['*.svg'], {read: true});
  gulp
    .src('src/*.html')
    .pipe(inject(injects, { transform: fileContents })) 
    .pipe(gulp.dest(''))
    .pipe(connect.reload());
});

gulp.task('compass', function() {
  gulp.src('css/*.scss')
    .pipe(compass({
      sass: 'css',
      image: 'assets',
      style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(prefix())
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('svg', function () {
  var svgs = gulp.src('svg/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', prefix: 'icon-', inlineSvg: true }))
    .pipe(gulp.dest(''));

  gulp.src('src/index.html')
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest(''))
    .pipe(connect.reload());
});

gulp.task('default', ['html', 'compass', 'connect', 'watch', 'svg']);