const Sequelize = require('sequelize');
var sequelize = require('../config/db');
var Nav = sequelize.define('nav',{
    flag:{
        type:Sequelize.INTEGER
    },
    title:{
        type:Sequelize.STRING
    },
    link:{
        type:Sequelize.STRING
    },
    type_id:{
        type:Sequelize.INTEGER
    }
},{
    freezeTableName:true
});
var nav = Nav.sync({force:false});
var NavType = sequelize.define('nav_type',{
    name:{
        type:Sequelize.STRING
    }
},{
    freezeTableName:true
});
var navType = NavType.sync({force:false});
module.exports = {
    //展示所有导航页面
    index: function(req,res){
        Nav.findAll({raw:true}).then(function(result){
            //console.log(result);
            var resSet = {};
            var resLen = result.length;
            if(resLen)
            {
                for(var i = 0;i < resLen;i++)
                {
                    if(!resSet['type_id_'+result[i].type_id])
                    {
                        resSet['type_id_'+result[i].type_id] = [];
                    }
                    resSet['type_id_'+result[i].type_id].push(result[i]);
                }
            }
            res.render('nav/index',{jsonArr:resSet});
        })
    },
    addNav: function(req,res){
        NavType.findAll({raw:true}).then(function(result){
            if(req.params.id)
            {
                Nav.findById(Number(req.params.id)).then(function(data){
                    res.render('nav/add_nav',{jsonArr:result,siteInfo:data.dataValues});
                });
            }
            else{
                res.render('nav/add_nav',{jsonArr:result,siteInfo:''});
            }
        });
    },
    doAddNav: function(req,res){
        if (!req.body) return res.sendStatus(400);  
        var param = {
            'title':req.body.title,
            'link':req.body.link,
            'flag':req.body.flag,
            'type_id':req.body.type_id
        };
        if(req.body.id)
        {
            param.id = req.body.id;
        }
        Nav.upsert(param).then(function(result){
            console.log(result);
            res.redirect('/');
            // if(result){
            // }else{
            //     res.redirect('/addNav');
            // }
        });
      
    },
    doDelNav: function(req,res,next){
        if (!req.body) return res.sendStatus(400);  
        console.log(Number(req.body.id)+'~~~');
        Nav.findById(Number(req.body.id)).then(function(nav){
            nav.destroy()}).then(function(){
                res.send(200,{"code":0});
            })

    }
};