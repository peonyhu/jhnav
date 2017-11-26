var app = require('./app.js');
var controller = require('./controller/index');

var express = require('express');
var router = express.Router();   //使用 express.Router 类创建模块化、可挂载的路由句柄
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// 访问根路由 渲染 index 模板
router.get('/', controller.nav.index);
router.get('/addNav',controller.nav.addNav);
router.post('/doAddNav',urlencodedParser,controller.nav.doAddNav);
//router.post('/del',urlencodedParser,controller.nav.doDelNav);

module.exports = router;