const Sequelize = require('sequelize');
var sequelize = require('../db');
var Nav = sequelize.define('nav',{
    type:{
        type:Sequelize.INTEGER
    },
    title:{
        type:Sequelize.STRING,
        field:'title'
    },
    link:{
        type:Sequelize.STRING
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
            res.render('../views/nav/index',{jsonArr:result});
        })
    },
    addNav: function(req,res){
        NavType.findAll({raw:true}).then(function(result){
            res.render('../views/nav/add_nav',{jsonArr:result});
        })
    },

};