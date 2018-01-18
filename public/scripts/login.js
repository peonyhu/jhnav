window.onload = function(){
    var oQrcode = document.querySelector('#qrcode');
    var qrcode = document.querySelector('#uniqueCode').value;
    new QRCode("qrcode", {
        text: 'http://'+window.location.host+'/qrcode?qrcode='+qrcode,
        width: 158,
        height: 158,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    
    var socket = io.connect();
    socket.on('doQrLogin'+qrcode,function(data){
        data.type = 2;
        doLogin(data);
    });
    var oLoginBtn = document.querySelector('#u-login-btn');
    var oUsername = document.querySelector('#user');
    var oPwd = document.querySelector('#pwd');
    oLoginBtn.onclick = function(){
        var user = oUsername.value;
        var pwd = oPwd.value;
        if(!(user && pwd))
        {
            alert('请输入用户名和密码');
            return false;
        }
        doLogin({name:user,pwd:pwd,type:1})
    }
    function doLogin(data){
        let url = '/doLogin';
        ajax.send(url,'POST',data,function(res){
            console.log(res);
            if(res.message.code == 0){
                location.href = '/';
            }else{
                alert(res.message.message);
            }
        })
    }

}