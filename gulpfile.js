var gulp = require('gulp');
var gulpConfig = require('./gulpfile-config');
var cssConfig = gulpConfig.css;
//var autoprefixer = require('gulp-autoprefixer');//自动添加浏览器兼容后缀
var uglify = require('gulp-uglify');//压缩js
var jsConfig =gulpConfig.js;
//var jshint = require('gulp-jshint');//js 代码检查
//var gutil = require('gulp-util'); //打日志

var rename = require('gulp-rename');//重命名
var minifycss = require('gulp-minify-css');//压缩CSS
//var zip = require('gulp-zip');//打包
//var zipConfig = gulpConfig.zip;

var sourcemaps = require('gulp-sourcemaps');
var sassConfig = gulpConfig.sass;
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');

var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var imageConfig = gulpConfig.images;
var ejsConfig = gulpConfig.ejs;

gulp.task('default', ['publish']);
/*
* sass转css
*/
gulp.task('sass', function () {
  return sass(sassConfig.src)
    .pipe(gulp.dest(sassConfig.dest))
});
/*
* js压缩并生成map
*/
function jsProcess(toAddComment){
    if(toAddComment)
    {
        return gulp.src(jsConfig.src)
        //.pipe(jshint('.jshintrc'))//错误检查
        //.pipe(jshint.reporter('default'))//对错误进行输出
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rev())
        .pipe(sourcemaps.write('/maps',{addComment: toAddComment,sourceMappingURLPrefix: '/js'}))
        .pipe(gulp.dest(jsConfig.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(jsConfig.dest));
    }else{
          return gulp.src(jsConfig.src)
          //.pipe(jshint('.jshintrc'))//错误检查
          //.pipe(jshint.reporter('default'))//对错误进行输出
          .pipe(sourcemaps.init())
          .pipe(uglify())
          .pipe(rev())
          // .pipe(sourcemaps.write('/maps',{addComment: toAddComment,sourceMappingURLPrefix: '/js'}))
          .pipe(gulp.dest(jsConfig.dest))
          .pipe(rev.manifest())
          .pipe(gulp.dest(jsConfig.dest));
    }
}

gulp.task('publish-js-add-map', function (){
    return jsProcess(true);
});


/*
* clear
*/
gulp.task('clear-dist', function(){
  return gulp.src('dist')
    .pipe(clean());
});
gulp.task('clear-css', function(){
  return gulp.src('src/public/css')
    .pipe(clean());
});
gulp.task('clear', function(){
  return runSequence('clear-dist','clear-css');
});
/*
* 静态资源加md5版本号
*/
gulp.task('publish-js', function (){
    return jsProcess(false);
});

gulp.task('publish-css',function(){
    return gulp.src(cssConfig.src)
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(cssConfig.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(cssConfig.dest));
});



gulp.task('publish-image',function(){
  return gulp.src(imageConfig.src)
    .pipe(rev())
    .pipe(gulp.dest(imageConfig.dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(imageConfig.dest));
});

gulp.task('replace-image-in-css', function() {
  return gulp.src(['dist/public/images/*.json','dist/public/css/**/*.css'])
    .pipe(revCollector({
      replaceReved:true
    }))
    .pipe(gulp.dest('dist/public/css'));
});
gulp.task('copy-view',function(){
  return gulp.src(ejsConfig.src)
  .pipe(gulp.dest(ejsConfig.dest));
});
gulp.task('publish-view',['copy-view'], function () {
  return gulp.src(['dist/**/*.json','dist/views/**/*.ejs'])
    .pipe(revCollector({
      replaceReved:true
    }))
    .pipe(gulp.dest(ejsConfig.dest));
});

/*
 * 清除中间生成的.json 文件
*/
gulp.task('clear-tem', function(){
  return gulp.src('dist/**/*.json')
    .pipe(clean());
});
gulp.task('publish',function(callback){
    runSequence('clear', 'sass', 'publish-js', 'publish-css','publish-image', 'publish-view','replace-image-in-css','clear-tem',callback);
});
gulp.task('publish-addMap',function(callback){
    runSequence('clear', 'sass', 'publish-js-add-map', 'publish-css','publish-image', 'publish-view','replace-image-in-css','clear-tem',callback);
});



