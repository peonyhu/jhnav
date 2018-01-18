window.onload = function(){
    var socket = io.connect();
    var oBtn = document.querySelector('#deliverBtn');
    var qrcode = GetQueryString('qrcode');
    var oUserId = document.querySelector('#userid');
    var oUserName = document.querySelector('#username');
    var oHash = document.querySelector('#hash');
    oBtn.onclick = function(){
        var id = oUserId.value;
        var name = oUserName.value;
        var hash = oHash.value;
        if(!(id && name && qrcode && hash))
        {
            location.href="/login";
            return false;
        }
        var url = '/doQrLogin';
        var param = {qrcode:qrcode,id:id,name:name,hash:hash};
        ajax.send(url,'POST',param,function(res){
            console.log(res);
            if(res.message.code == 0){
                socket.emit('delivercode',res.data);
                alert('扫码登录成功');
            }else{
                alert(res.message.message);
            }
        });
    }
    console.log(socket);
    //socket.emit('delivercode',{'id':1,'name':'Emma','qrcode':qrcode});

}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}