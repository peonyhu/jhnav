/*
 * 此文件为git提交忽略文件 每个人自己的配置在这里修改
 */
module.exports = {
  httpUrl: "localhost:2999",
  httpsUrl: "localhost:2999",
  cookieOptions: {
    maxAge: 86400 * 30,
    domain:''
  },
  logLevel:"debug",
  resource:'source', //js，css引用路径，source：源码路径 dist：输出路径,
  port:2999,
  logLevel:"info",
  dbbase:'nav',
  username:'root',
  password:'1234543210'
};
