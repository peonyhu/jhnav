// 引用模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
//var config = requ
const Sequelize = require('sequelize');
const sequelize = require('./config/env');

app.set('views', path.join(__dirname,'views'));  // 设置视图文件目录

app.set('view engine' , 'ejs'); //设置模板引擎为ejs

app.use( express.static(path.join(__dirname, 'public')) );  // 配置静态资源目录

var router = require('./routes');
app.use('/', router);

app.listen(3000);    // 监听 3000 端口

console.log('server started at port 3000');
console.log(process.env.NODE_ENV);