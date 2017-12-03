window.onload = function(){
    var oSiteArr = document.querySelectorAll('.m-site-list li');
    var oSiteLen = oSiteArr.length;
    for(var i = 0;i < oSiteLen;i++)
    {
        oSiteArr[i].onmouseover = function(){
            var oThis = this;
            oThis.className = 'active';
        }
        oSiteArr[i].onmouseout = function(){
            var oThis = this;
            oThis.className = '';
        }

    }
    /*
     * 删除站点
    */
    var oDelArr = document.querySelectorAll('.u-del');
    var oDelArrLen = oDelArr.length;   
    for(var i = 0;i < oDelArrLen;i++)
    {
        oDelArr[i].onclick = function(){
            var oThis = this;
            console.log('/del/'+oThis.getAttribute('j-site-id'));
            if(confirm('确定要删除该记录吗？'))
            {
                var site_id = oThis.getAttribute('j-site-id');
                url = '/del';
                ajax.send(url,'POST',{id:site_id},function(res){
                    var oLi = oThis.parentNode;
                    oLi.parentNode.removeChild(oLi);
                })
            }
        }

    }

}