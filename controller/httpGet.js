
var http = require("http");

function getUserInfo(req){
    let account = {};
    if(req.cookies["account"] != null){
        account = req.cookies["account"];
    }
    return account;
}
module.exports = {
    notice:function(req,res){
        var req1 = http.get('http://news-dev.jinhui365.cn/cms/cmsapi/cms/cmsapi?p=1&pageSize=3',(res1)=> {  
            //console.log("response: " + res1.statusCode);  
            var d = '';  
            res1.on('data',(data)=>{  
                d += data;  
            }).on('end', ()=>{  
                const parsedData = JSON.parse(d);
                if(parsedData.message.code == 0){
                    //console.log(parsedData.data.data);
                    res.render('demo/notice',{noticeArr:parsedData.data.data,userInfo:getUserInfo(req)});
                }else{
                    res.render('demo/500');
                }
            });  
        }).on('error',(e)=> {  
            console.log("error: " + e.message);
            res.render('demo/500');
        });

    }
};