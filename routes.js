var app = require('./app');
var controller = require('./controller/index');

var express = require('express');
var router = express.Router();   //使用 express.Router 类创建模块化、可挂载的路由句柄
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// 访问根路由 渲染 index 模板
router.get('/', controller.nav.index);
router.get('/addNav/:id',controller.user.checkLogin,controller.nav.addNav);
router.get('/addNav',controller.user.checkLogin,controller.nav.addNav);
router.post('/doAddNav',urlencodedParser,controller.user.checkLogin,controller.nav.doAddNav);
router.post('/del',urlencodedParser,controller.nav.doDelNav);
router.get('/login',controller.user.login);
router.post('/doLogin',urlencodedParser,controller.user.doLogin);
router.get('/logout',controller.nav.logout);
router.get('/socket',controller.socket.index);
router.get('/notice',controller.httpGet.notice);
router.get('/qrcode',controller.user.qrcode);

module.exports = router;