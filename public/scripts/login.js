window.onload = function(){
    var oQrcode = document.querySelector('#qrcode');
    var qrcode = document.querySelector('#uniqueCode').value;
    console.log(qrcode);
    new QRCode(oQrcode, 'http://10.10.11.201:2999/qrcode?qrcode='+qrcode);


    
    var socket = io.connect();
    socket.on('doQrLogin'+qrcode,function(data){
        console.log(data);
    });

}