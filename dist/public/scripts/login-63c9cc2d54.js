window.onload=function(){function e(e){ajax.send("/doLogin","POST",e,function(e){console.log(e),0==e.message.code?location.href="/":alert(e.message.message)})}document.querySelector("#qrcode");var o=document.querySelector("#uniqueCode").value;new QRCode("qrcode",{text:"http://"+window.location.host+"/qrcode?qrcode="+o,width:158,height:158,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});io.connect().on("doQrLogin"+o,function(o){o.type=2,e(o)});var n=document.querySelector("#u-login-btn"),t=document.querySelector("#user"),c=document.querySelector("#pwd");n.onclick=function(){var o=t.value,n=c.value;if(!o||!n)return alert("请输入用户名和密码"),!1;e({name:o,pwd:n,type:1})}};