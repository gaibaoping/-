/*
//DOM获取元素
var div=document.getElementById('box');
var table=div.getElementsByTagName('table')[0];
var tHead=table.tHead;
var tHeadTr=tHead.rows[0];
var tHeadThr=tHeadTr.cells;
var tbody=table.tBodies[0];
var tbodyRows=tbody.rows;
//获取数据
(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            window.data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
console.log(data);
//绑定数据
(function bindData(){
    if(window.data){
        var frg=document.createDocumentFragment();
        for(var i=0;i<data.length;i++){
            var tr=document.createElement('tr');
            for(var key in data[i]){
                var td=document.createElement('td');
                td.innerHTML=key==='sex'?data[i][key]==1?'男':'女':data[i][key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tbody.appendChild(frg);
        frg=null;
    }
})();
//隔行变色
function changeBg(){
    for(var i=0;i<data.length;i++){
        tbodyRows[i].className='c'+(i%2+1);
    }
}
changeBg();
//绑定事件
(function bindEvent(){
    for(var i=0;i<tHeadThr.length;i++){
        tHeadThr[i].index=i;
        tHeadThr[i].sortFlag=-1;
        if(tHeadThr[i].className=='cursor'){
            tHeadThr[i].onclick=function(){
                sort.call(this,this.index);
                changeBg();
            }
        }
    }
})();
//排序
function sort(n){
    var tBodyRowsAry=[].slice.call(tbodyRows);
    var that=this;
    for(var j=0;j<tHeadThr.length;j++){
        if(tHeadThr[j]!=that){
            tHeadThr[j].sortFlag=-1;
        }
    }
    that.sortFlag*=-1;
    tBodyRowsAry.sort(function (a,b){
        var _a=a.cells[n].innerHTML;
        var _b= b.cells[n].innerHTML;
        if(isNaN(_a)||isNaN(_b)){
            return _a.localeCompare(_b)*that.sortFlag;
        }
        return (_a-_b)*that.sortFlag;
    });
    var frg=document.createDocumentFragment();
    for(var i=0;i<tBodyRowsAry.length;i++){
        frg.appendChild(tBodyRowsAry[i]);
    }
    tbody.appendChild(frg);
    frg=null;
}*/
var div=document.getElementById('box');
var table=div.getElementsByTagName('table')[0];
var thead=table.tHead;
var tHeadTr=thead.rows[0];
var tHeadThr=tHeadTr.cells;
var tbody=table.tBodies[0];
var tBodyRows=tbody.rows;

(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            window.data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
//console.log(data);
(function bindData(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var tr=document.createElement('tr');
        for(var key in data[i]){
            var td=document.createElement('td');
            td.innerHTML=key==='sex'?data[i][key]==1?'男':'女':data[i][key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tbody.appendChild(frg);
    frg=null;
})();
function changeBg(){
    for(var i=0;i<tBodyRows.length;i++){
        tBodyRows[i].className='c'+(i%2+1);
    }
}
changeBg();
(function bindEvent(){
    for(var i=0;i<data.length;i++){
        tHeadThr[i].index=i;
        tHeadThr[i].sortFlag=-1;
        if(tHeadThr[i].className=='cursor'){
            tHeadThr[i].onclick=function(){
                sort.call(this,this.index);
                changeBg();
            }
        }
    }
})();
function sort(n){
    var tBodyRowsAry=[].slice.call(tBodyRows);
    var that=this;
    for(var j=0;j<tHeadThr.length;j++){
        if(tHeadThr[j]!=that){
            tHeadThr[j].sortFlag=-1;
        }
    }
    that.sortFlag*=-1;
    tBodyRowsAry.sort(function(a,b){
        var _a= a.cells[n].innerHTML;
        var _b= b.cells[n].innerHTML;
        if(isNaN(_a)||isNaN(_b)){
            return _a.localeCompare(_b)*that.sortFlag;
        }
        return (_a-_b)*that.sortFlag;
    });
    var frg=document.createDocumentFragment();
    for(var i=0;i<tBodyRowsAry.length;i++){
        frg.appendChild(tBodyRowsAry[i]);
    }
    tbody.appendChild(frg);
    frg=null;
}