window.onload=function(){for(var e=document.querySelectorAll(".m-site-list li"),t=e.length,o=0;o<t;o++)e[o].onmouseover=function(){this.className="active"},e[o].onmouseout=function(){this.className=""};for(var i=document.querySelectorAll(".u-del"),n=i.length,l=io.connect("http://localhost:2999"),o=0;o<n;o++)i[o].onclick=function(){var e=this;if(console.log("/del/"+e.getAttribute("j-site-id")),confirm("确定要删除该记录吗？")){var t=e.getAttribute("j-site-id");url="/del",ajax.send(url,"POST",{id:t},function(o){l.emit("aboutDel",{id:t});var i=e.parentNode;i.parentNode.removeChild(i)})}}};