var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass'),
    prefix = require('gulp-autoprefixer');


gulp.task('watch', function() {
  gulp.watch('css/*.scss', ['compass']);
  gulp.watch('*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('*.html')
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

gulp.task('default', ['html', 'compass', 'connect', 'watch']);