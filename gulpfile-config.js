/**
 * Created by xfwei on 16/5/30.
 */
var src = 'public';//默认目录文件夹

module.exports = {
  sass: {
    src: src + '/sass/*.scss',
    dest: src + '/css/'
  },
  css: {
    src : src + '/css/**/*.css',
    dest:'dist/public/css'
  },
  js: {
    src: src + '/scripts/**/*.js',
    dest: 'dist/public/scripts'
  },
  images: {
    src: src + '/images/**/*',
    dest: 'dist/public/images'
  },
  ejs: {
    src: 'views/**/*.ejs',
    dest: 'dist/views',
  }
};
