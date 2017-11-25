const Sequelize = require('sequelize');
module.exports = new Sequelize('nav','root','1234543210',{
    host:'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});