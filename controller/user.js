const Sequelize = require('sequelize');
var sequelize = require('../config/db');

var express = require('express');
// 创建app对象
// var app = express();
// var http = require('http');

// var sio = require('socket.io');
// var io = sio.listen(http.createServer(app));
// io.on('connection', function (socket) {
//     console.log('SocketIO有新的连接!');
//     });
var User = sequelize.define('user',{
    name:{
        type:Sequelize.STRING
    },
    pwd:{
        type:Sequelize.STRING
    }
},{
    freezeTableName:true
});
var user = User.sync({force:false});
function isLogined(req){
    if(req.cookies["account"] != null){
        var account = req.cookies["account"];
        var user = account.username;
        var hash = account.hash;
        if(authenticate(user, hash)){
            console.log(user + " had logined.");
            return true;
        }
    }
    return false;
}
function authenticate(user, hash){
    return true;
}
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}
module.exports = {
    login :(req,res,next)=>{

        res.render('user/login',{qrCode:randomString()});
    },
    doLogin :(req,res)=>{
        if (!req.body) return res.sendStatus(400);
        var username = req.body.username;
        var hash = req.body.pwd;
        res.cookie('account', {username:username,hash:hash});
        res.redirect('/');
    },
    checkLogin: (req,res,next)=>{
        if(isLogined(req))
        {
            next();
            return false;
        }
        res.redirect('/login');
    },
    logout :(req,res)=>{
        res.cookie('account', null);
        res.redirect('/');
    },
    qrcode :(req,res)=>{
        res.render('user/qrcode');
    }
}