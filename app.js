// 引用模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var cookie = require('cookie-parser');
// 创建app对象
var app = express();
var http = require('http');
var config = require('./config/index');
const Sequelize = require('sequelize');
const sequelize = require('./config/db');
app.use(cookie());
// 根据配置文件中的resource设置视图文件目录以及静态资源目录
if(config.getConfig('resource') === 'source'){
    app.set('views', path.join(__dirname, 'views')); // 设置视图文件目录
    app.use(express.static(path.join(__dirname, 'public')));// 配置静态资源目录
} else {
    app.set('views', path.join(__dirname ,'dist/views')); // 设置视图文件目录
    app.use(express.static(path.join( __dirname ,'dist/public')));// 配置静态资源目录
}

app.set('view engine' , 'ejs'); //设置模板引擎为ejs
var router = require('./routes');
app.use('/', router);
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:2999"); //The ionic server
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
var server = app.listen(2999);    // 监听 3000 端口
console.log('server started at port 2999');
 var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    io.emit('news', 'hello');
    socket.on('aboutDel', function (data) {
        io.emit('news', '站点id为'+data.id+'的导航已被删除');
    });
    socket.on('delivercode', function (data) {
        console.log(data);
        io.emit('doQrLogin'+data.qrcode, data);
    });
    
});
//require('./controller/socketBase')(server);
module.exports = app;