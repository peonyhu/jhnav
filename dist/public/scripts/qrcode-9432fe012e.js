function GetQueryString(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(n);return null!=o?unescape(o[2]):null}window.onload=function(){var e=io.connect(),n=document.querySelector("#deliverBtn"),o=GetQueryString("qrcode"),r=document.querySelector("#userid"),t=document.querySelector("#username"),c=document.querySelector("#hash");n.onclick=function(){var n=r.value,a=t.value,u=c.value;if(!(n&&a&&o&&u))return location.href="/login",!1;var l={qrcode:o,id:n,name:a,hash:u};ajax.send("/doQrLogin","POST",l,function(n){console.log(n),0==n.message.code?(e.emit("delivercode",n.data),alert("扫码登录成功")):alert(n.message.message)})},console.log(e)};