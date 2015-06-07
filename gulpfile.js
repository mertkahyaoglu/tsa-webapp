var gulp = require('gulp'),
    browserify = require('browserify'),
    nodemon = require('gulp-nodemon'),
    refresh = require('gulp-livereload');

var paths = {
  html: ['./public/index.html'],
  server: ['./*.js']
};

gulp.task('html', function(){
  return gulp.task('html', function(){
    gulp.src(paths.html)
      .pipe(refresh());
  });
});

gulp.task('js', function(){
  return gulp.task('js', function(){
    gulp.src(paths.js)
      .pipe(refresh());
  });
});

gulp.task('serve', function () {
  nodemon({script: 'server.js'})
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['serve', 'watch']);
