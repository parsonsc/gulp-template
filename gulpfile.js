var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');


// sass
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') 
    // .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watch
gulp.task('watch', ['browserSync', 'sass', 'images', 'fonts'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// Browsersync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// useref
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'))
});

gulp.task('userefcomponents', function(){
  return gulp.src('app/components/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build/components'))
});

gulp.task('usereftemplates', function(){
  return gulp.src('app/temlates/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build/templates'))
});


gulp.task('userefcss', function(){
  return gulp.src('app/css/*.css')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build/css'))
});

gulp.task('userefjs', function(){
  return gulp.src('app/js/*.js')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
   
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build/js'))
});


// Image
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('build/images'))
});


// Fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('build/fonts'))
})


gulp.task('clean:build', function() {
  return del.sync('build');
})

// Connect/webserver
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['.', '.app']
  });
});

// Livereload
gulp.task('livereload', function() {
  gulp.src(['.app/css/*.css', '.app/js/*.js'])
    .pipe(watch())
    .pipe(connect.reload());
});

// Build
gulp.task('build', function (callback) {
  runSequence('clean:build', 
    ['sass', 'useref', 'userefcss','userefjs','usereftemplates','userefcomponents', 'images', 'fonts'],
    callback
  )
})

// Sync
gulp.task('sync', function (callback) {
  runSequence(['build', 'watch', 'webserver'],
    callback
  )
})