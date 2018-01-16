var _io = require('socket.io');
module.exports = function(server){
    console.log(server);
    var io = _io.listen(server);

    io.emit('news', 'hello');
    io.on('connection', function (socket) {
        socket.on('aboutDel', function (data) {
            io.emit('news', '站点id为'+data.id+'的导航已被删除');
        });
        
    });
}