/*
* Lodash 是一套工具库，它内部封装了诸多对字符串、数组、对象等常见数据类型的处理函数，
* 其中部分是目前 ECMAScript 尚未制定的规范，但同时被业界所认可的辅助函数。
*/
var _ = require('lodash'); 
var Config = function(options) {
  for(var key in options) {
    this[key] = options[key];
  }
};

/**
 * 获取配置中key对应的value
 */
Config.prototype.getConfig = function(key) {
  if (!key) {
    throw  new Error('缺少参数key');
  }
  var current = this[process.env.NODE_ENV || 'production'];
  if (current && current[key]) {
    return current[key]; //返回当前环境配置中的key
  }
  return this[key]; //返回默认key
};

module.exports = Config;