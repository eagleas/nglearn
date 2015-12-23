var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: {
      baseDir: "./src",
      middleware: [historyApiFallback()]
    },
    open: false
  });

  gulp.watch("assets/scss/*.scss", ['sass']);
  gulp.watch("assets/css/*.css").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("src/**/*.html").on('change', browserSync.reload);
  gulp.watch("src/**/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("assets/scss/*.scss")
  .pipe(sass())
  .pipe(gulp.dest("assets/css"))
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
