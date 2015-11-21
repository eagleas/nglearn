var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: {
      baseDir: "./",
      middleware: [historyApiFallback()]
    },
    open: false
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/css/*.css").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("app/**/*.html").on('change', browserSync.reload);
  gulp.watch("app/**/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
  .pipe(sass())
  .pipe(gulp.dest("app/css"))
  .pipe(browserSync.stream());
});

// process JS files and return the stream.
gulp.task('js', function () {
  return gulp.src('*/**/*.js')
  .pipe(browserify())
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['serve']);
