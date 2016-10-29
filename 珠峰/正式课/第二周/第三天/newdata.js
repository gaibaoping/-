var div=document.getElementById('box');
var table=div.getElementsByTagName('table')[0];
var tHead=table.tHead;
var tHeadTr=tHead.rows[0];
var tHeadThs=tHeadTr.cells;
var tbody=table.tBodies[0];
var tBodyRows=tbody.rows;
//获取数据
(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','date.txt',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            window.data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
})();
console.log(data);

//绑定数据
(function bindData(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var tr=document.createElement('tr');
        for(var key in data[i]){
            var td=document.createElement('td');
            td.innerHTML=key==='sex'?data[i][key]===1?'男':'女':data[i][key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tbody.appendChild(frg);
    frg=null;
})();
//各行变色
function changeBg(){
    for(var i=0;i<tBodyRows.length;i++){
        tBodyRows[i].className='c'+(i%2+1);
    }
}
changeBg();
//绑定事件
(function bindEvent(){
    for(var i=0;i<tHeadThs.length;i++){
        tHeadThs[i].index=i;
        tHeadThs[i].sortFlag=-1;
        if(tHeadThs[i].className=='cursor'){
            tHeadThs[i].onclick=function(){
                sort.call(this,this.index);
                changeBg();
            }
        }
    }
})();
//排序
function sort(n){
    var tBodyRowsAry=[].slice.call(tBodyRows,0);
    var frg=document.createDocumentFragment();
    //console.log(tBodyRowsAry);
    var that=this;
    for(var i=0;i<tHeadThs.length;i++){
        if(tHeadThs[i]!=that){
            tHeadThs[i].sortFlag=-1;
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
    for(var j=0;j<tBodyRowsAry.length;j++){
        frg.appendChild(tBodyRowsAry[j]);
    }
    tbody.appendChild(frg);
    frg=null;
}

