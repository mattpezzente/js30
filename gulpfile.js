var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var workingDir = 'drum-kit';

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: `${workingDir}/`
    }
  });
});

gulp.task('reload', done => {
  browserSync.reload();
  done();
});

gulp.task('watch', () => {
  gulp.watch(`${workingDir}/*.html`, ['reload']);
  gulp.watch(`${workingDir}/js/**/*.js`, ['reload']);
});

gulp.task('css', () => {
  let processors = [
   autoprefixer({ browsers: ['last 2 versions']}),
   ];
  return gulp.src(`${workingDir}/sass/**/*.sass`)
    .pipe(sass().on('error', function(err) {
      console.error(err.message);
      browserSync.notify(err.message, 3000); // Display error in the browser
      this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(`${workingDir}/css`))
    .pipe(browserSync.reload({
      stream:true
  }))
})

gulp.task('default', ['browser-sync', 'css', 'watch'], () => {
  gulp.watch(`${workingDir}/sass/**/*.sass`, ['css'])
})


