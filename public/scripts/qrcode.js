window.onload = function(){
    var socket = io.connect();
    var oBtn = document.querySelector('#deliver');
    var qrcode = GetQueryString('qrcode');
    // var url = '/doQrLogin';
    // ajax.send(url,'GET',{qrcode:qrcode},function(res){
    //     socket.emit('delivercode',res.data);
    // });
    socket.emit('delivercode',{'name':'Emma','qrcode':qrcode});

}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}