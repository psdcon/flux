var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    prefix = require('gulp-autoprefixer'),
    minifyHTML = require('gulp-minify-html');

var env,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = '/';
  sassStyle = 'expanded';
} else {
  outputDir = 'production/';
  sassStyle = 'compressed';
}

sassSources = ['sass/style.scss'];
htmlSources = [outputDir + '*.html'];

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(prefix())
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['compass']);
  gulp.watch('*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload());
});

gulp.task('default', ['html', 'compass', 'connect', 'watch']);