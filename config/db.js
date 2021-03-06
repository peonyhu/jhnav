const Sequelize = require('sequelize');
var config = require('./index');
const Op = Sequelize.Op
module.exports = new Sequelize(config.getConfig('dbbase'),config.getConfig('username'),config.getConfig('password'),{
    host:'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
});