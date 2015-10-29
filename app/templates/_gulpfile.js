var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    coffee      = require('gulp-coffee'),
    concat      = require('gulp-concat'),
    concatCss   = require('gulp-concat-css'),
    jade        = require('gulp-jade'),
    less        = require('gulp-less'),
    gutil       = require('gulp-util'),
    ngAnnotate  = require('gulp-ng-annotate'),
    gulpif      = require('gulp-if'),
    templateCache = require('gulp-angular-templatecache');

var cssFiles = require("./bowercss.json");
var jsFiles = require("./bowerjs.json");

gulp.task('connect', function () {
  connect.server({
    root: './build',
    port: 8888,
    livereload: true                                                                                                                                                                                                                           
  });
});

gulp.task('templates', function () {
  return gulp.src(['app/**/*.html', 'app/**/*.jade'])
    .pipe(gulpif(/[.]jade$/, jade({
      pretty: true
    })))
    .pipe(templateCache('templates.js', {
      module: 'templates',
      standalone: true
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

var fontsDirectory = [
  'bower_components/font-awesome/fonts/*.*',
  'bower_components/fontawesome/fonts/*.*',
  'bower_components/simple-line-icons/fonts/*.*' 
];

gulp.task('copyfonts',function(){
  gulp.src(fontsDirectory, { base: 'bower_components' })
  .pipe(gulp.dest('build/css'));
});


gulp.task('minify-css', function () {
    return gulp.src(cssFiles)
        .pipe(concatCss('vendor.css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('estilos', function(){
  return gulp.src("app/assets/styles/**/*.css")
      .pipe(concatCss('app.css'))
      .pipe(gulp.dest('build/css'))
});

gulp.task('minify-js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('build/js/'))
});

gulp.task('coffee', function() {
  gulp.src(['app/directives/**/*.coffee', 'app/modules/*.module.coffee' ,'app/modules/**/*.coffee','app/js/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest("build/js/"))
    .pipe(connect.reload())
});

 
gulp.task('watch', function () {
  gulp.watch(['./app/**/*.coffee'], ['coffee']);
  gulp.watch(['./app/assets/styles/**/*.css'],['estilos']);
  gulp.watch(['./app/**/views/*.html', './app/**/views/*.jade'], ['templates']);
});

gulp.task('default', ['connect', 'copyfonts','minify-js', 'templates','minify-css', 'estilos', 'coffee','watch']);
