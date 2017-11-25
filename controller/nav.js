const Sequelize = require('sequelize');
var sequelize = require('../db');
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
            res.render('../views/nav/index',{jsonArr:resSet});
        })
    },
    addNav: function(req,res){
        NavType.findAll({raw:true}).then(function(result){
            res.render('../views/nav/add_nav',{jsonArr:result});
        });
    },
    doAddNav: function(req,res){
        if (!req.body) return res.sendStatus(400);  
        Nav.upsert({
            'title':req.body.title,
            'link':req.body.link,
            'flag':req.body.flag,
            'type_id':req.body.type_id
        }).then(function(result){
            if(result){
                res.redirect('/');
            }else{
                res.redirect('/addNav');
            }
        });
      
    }
};