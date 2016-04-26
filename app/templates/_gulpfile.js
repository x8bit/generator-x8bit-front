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
    templateCache = require('gulp-angular-templatecache'),
    template = require('gulp-template'),
    lazypipe = require('lazypipe'),
    mainBowerFiles = require('main-bower-files');

var enviroments = {
  "development" : {
  },
  "production" : {
  }
}

var enviroment = enviroments["development"];
if (process.argv.length > 2){
  if (process.argv[2] == "production") {
    enviroment = enviroments["production"]
  }
};

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
    .pipe(gulp.dest('build/assets/js'))
    .pipe(connect.reload());
});

var fontsDirectory = [
  'bower_components/font-awesome/fonts/*.*',
  'bower_components/simple-line-icons/fonts/*.*' 
];

gulp.task('copyfonts',function(){
  gulp.src(fontsDirectory, { base: 'bower_components' })
  .pipe(gulp.dest('build/assets'));
});

gulp.task('copyImages',function(){
  return gulp.src(['app/assets/img/**/.*', '!app/assets/img/.gitkeep'])
  .pipe(gulp.dest('build/assets/img'));
});

var cssTasks = lazypipe()
    .pipe(concat,'vendor.min.css')
    .pipe(gulp.dest,"build/assets/css");

var jsTasks = lazypipe()
  .pipe(concat,'vendor.min.js')
  .pipe(gulp.dest,"build/assets/js");

gulp.task('bowerify', function() {
  return gulp.src(mainBowerFiles())
  .pipe(
      gulpif(/[.]js$/, jsTasks()
    ))
  .pipe(
      gulpif(/[.]css$/, cssTasks()
    ))
});

gulp.task('minify-own-styles', function(){
  return gulp.src("app/assets/css/**/*.css")
      .pipe(concatCss('app.min.css'))
      .pipe(gulp.dest('build/assets/css'))
});

gulp.task('minify-own-sources', function() {
  gulp.src(['app/directives/**/*.coffee', 'app/modules/**/*.module.coffee' ,'app/modules/**/*.coffee','app/js/*.coffee', 'app/js/*.js'])
    .pipe(
      gulpif(/[.]coffee$/, coffee({bare: true}).on('error', gutil.log)
    ))
    /* Uncomment if you need make a template
    .pipe(
      gulpif(/app.js$/, template({baseUrl: enviroment.baseUrl })
    ))*/
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest("build/assets/js/"))
    .pipe(connect.reload())
});


gulp.task('index', function(){
  return gulp.src('app/index.jade')
    //.pipe(template({base: enviroment.base })) Uncomment if you gonna use a template
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('build/'));
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/**/*.coffee','./app/js/*.js'], ['minify-own-sources']);
  gulp.watch(['./app/assets/css/**/*.css'],['minify-own-styles']);
  gulp.watch(['./app/**/*.html', './app/**/*.jade', '!app/index.jade'], ['templates']);
  gulp.watch(['app/index.jade'], ['index']);
});

gulp.task('default', ['connect', 'copyfonts', 'copyImages', 'bowerify', 'templates', 'minify-own-styles', 'minify-own-sources', 'index' ,'watch']);
gulp.task('production', ['copyfonts', 'copyImages', 'bowerify', 'templates', 'minify-own-styles', 'minify-own-sources', 'index']);