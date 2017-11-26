const Sequelize = require('sequelize');
var config = require('./index');
module.exports = new Sequelize(config.getConfig('dbbase'),config.getConfig('username'),config.getConfig('password'),{
    host:'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});