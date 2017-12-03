var ajax = {
    init: function(){
        return window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
        },
    send: function(url,method,args,_callback,_errback,async,cookies){
        // if(url.indexOf('?') == -1) {
        //   url+= '?'+(+new Date);
        // } else {
        //   url+= '&'+(+new Date);
        // }
        var q=ajax.init();
        if(async == null || async === "")
            async = true;
        if(method == null || method === "")
            method = "GET";
        q.open(method,url,async);
        q.onreadystatechange=function(){
                if(this.readyState===4 && this.status===200 && this.responseText != "") {
                    _callback(JSON.parse(this.responseText));
                }
                else if(_errback != null){
                    _errback();
                }
            };
        if (cookies) {
            q.setRequestHeader('Cookie',cookies);
        }
        if(method=='POST') {
            q.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            if((typeof args == 'object')){//object 的o要小写
                args = getParamString(args);
            }
            q.send(args);
        } else {
            q.send(null);
        }
    }
}

var getParamString = function(obj){
  var result = "";
  for ( var p in obj ){
    result += p + "=" + obj[p] + "&";
  }
  return result;
}
