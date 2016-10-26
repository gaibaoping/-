/**
 * Created by Administrator on 2016/8/13.
 */
/*var oTab=document.getElementById('tab');
var lis=oTab.getElementsByTagName('li');
var oDIv=oTab.getElementsByTagName('div');
function sum(nIndex){
    for(var i=0;i<lis.length;i++){
        lis[i].className='';
        oDIv[i].className='';
    }
    lis[nIndex].className='select';
    oDIv[nIndex].className='select';
}
for(var j=0;j<lis.length;j++){
    lis[j].baoPing=j;
    lis[j].onmouseover=function(){
        sum(this.baoPing);
    }
}*/
var oTab=document.getElementById('tab');
var lis=oTab.getElementsByTagName('li');
var oDIv=oTab.getElementsByTagName('div');
function sum(n){
    for(var i=0;i<lis.length;i++){
        lis[i].className='';
        oDIv[i].className='';
    }
    oDIv[n].className='select';
    lis[n].className='select';
}
for(var j=0;j<lis.length;j++){
    lis[j].zhuFi=j;
    lis[j].onmouseover=function(){
        sum(this.zhuFi);
    }
}
