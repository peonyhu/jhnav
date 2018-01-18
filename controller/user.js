const Sequelize = require('sequelize');
var sequelize = require('../config/db');
var express = require('express');
var User = sequelize.define('user',{
    name:{
        type:Sequelize.STRING
    },
    pwd:{
        type:Sequelize.STRING
    },
    qrcode:{
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
            return true;
        }
    }
    return false;
}
function authenticate(user, hash){
    if(user && hash)
    {
        return true;
    }
    return false;
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
        var type = req.body.type;
        var username = req.body.name;
        var conditionArr = {name:username};
        if(type == 1)
        {
            conditionArr.pwd = req.body.pwd;
        }else if(type == 2)
        {
            conditionArr.qrcode = req.body.qrcode;
        }
        User.findOne({
            where:{
                $and:conditionArr
            },
            raw:true
        }).then(function(user){
            if(user)
            {
                res.cookie('account',{username:user.name,hash:user.pwd+user.qrcode,id:user.id});
                res.status(200).send({"message":{"code":0}}) 
            }else{
                res.status(200).send({"message":{"code":-1,message:"用户名或密码不正确"}}) 
            }
        });
        
       
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
        res.cookie('account',null);
        res.redirect('/');
    },
    qrcode :(req,res)=>{
        res.render('user/qrcode',{userInfo:getUserInfo(req)});
    },
    doQrLogin :(req,res)=>{
        console.log(41413243);
        console.log(req.body);
        if(!req.body) return res.sendStatus(400);
        var id = req.body.id;
        var name = req.body.name;
        var qrcode = req.body.qrcode;
        User.update({qrcode:qrcode},{
            where:{
                $and:{id:id,name:name}
            }
        }).then(function(result){
            if(result[0] >= 0){
                res.status(200).send({"message":{"code":0,"message":"标识注入成功"},"data":{name:name,id:id,qrcode:qrcode}});
            }
            else{
                res.status(200).send({"message":{"code":-1,"message":'扫描二维码登录失败，请稍后重试'}});
            }
        });
    }
}
function getUserInfo(req){
    let account = {};
    if(req.cookies["account"] != null){
        account = req.cookies["account"];
    }
    return account;
}