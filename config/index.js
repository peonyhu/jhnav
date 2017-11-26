var Config = require('./config-base');
module.exports = new Config({
    local: require('./local.js'),
    production: {
        httpUrl: '',
        httpsUrl: '',
        cookieOptions: {
          maxAge: 86400 * 30,
          domain: '.jinhui365.com'
        },
        logLevel:'info',
        dbbase:'nav',
        username:'root',
        password:'1234543210'
    },
    logLevel:'info',
    cookieOptions: {
        maxAge: 86400 * 30,
        domain: '.jinhui365.com'
    },
    version: 4,
    defaultVersion:'5.17.0',
    //logDir: process.cwd() + '/../logs/',
    port:3000
});
