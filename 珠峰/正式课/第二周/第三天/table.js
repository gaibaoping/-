/**
 * Created by Administrator on 2016/8/25.
 */
/*
* 表格排序：1 点击表头里的列，按照点击的表头列去排序
*         2 如果连续点击，那么在正序和倒叙切换
*         3 表格主体隔行变色
* */
//获取元素
var box=document.getElementById('box');//获取外层的元素
var table=box.getElementsByTagName('table')[0];//获取表格
var thead=table.tHead;//表格里特殊的获取方式
var tHeadTr=thead.rows[0];//获取thead里面所有行的第一行
var tHeadThs=tHeadTr.cells;//获取表头里面第一行所有的列
var tbody=table.tBodies[0];//获取表格主体
var tbodyRows=tbody.rows;//获取表格主体里面所有的行

//获取数据
// ajax:  js中获取数据一般都是用ajax(async异步的 javascript and xml(数据格式))的方式

/*
* ajax的用法：
*
* */
(function getDate(){
    var xhr=new XMLHttpRequest();//创建一个异步对象
    //xhr 可以理解为是去获取数据的载体，也可以理解为这是去装数据的容器
    xhr.open('get','date.txt',false);
    //get:请求类型（用什么样的方式去拿数据）get/post
    //url:接口（到哪里去拿）  后端来定义接口
    //true/false:同步或者异步（true是异步，false是同步）  是代码继续运行还是等着数据获取回来继续运行
    xhr.onreadystatechange=function(){//绑定事件，当状态改变的时候
        if(xhr.readyState==4&&xhr.status==200){
            //readyState 代表的是状态  4这个状态代表已经成功返回
            //status==200;代表的是成功获取数据
            //404 找不到页面
            //502 5开头的都是后端错误
            //304 本地缓存
            //console.log(utils.jsonParse(xhr.responseText));//响应文本，就是获取回来的内容
            //由于相当文本是data.txt是文本文件默认是字符串，所以需要去掉引号
            window.data=utils.jsonParse(xhr.responseText);//已经把获取回来的数据赋值给全局的data变量
        }
    };
    xhr.send(null);//出发
})();
console.log(data);

//把获取回来的数据添加到页面中  数据绑定
(function dataBind(){
    if(window.data){//说明已经成功获取到了数据
        var frg=document.createDocumentFragment();//创建文档碎片  解决多次回流问题
        for(var i=0;i<data.length;i++){//数组中有7个对象，每个对象是tbody里面的一行数据
            //只要循环能执行一次就说明有一条数据，只要有一条就需要回填到tbody里去。
            var curData=data[i];//代表的是每一条数据{"name":""...}
            var tr=document.createElement('tr');
            for(var key in curData){//每一条数据里有多少个属性就需要创建多少列
                //创建列
                var td=document.createElement('td');
                //我这里需要向td里面塞html
                /*if(key==='sex'){//判断性别
                    //如果性别
                    td.innerHTML=curData[key]==1? '男':'女';
                }else{
                    td.innerHTML=curData[key];//把属性值添加到html中
                 }*/
                td.innerHTML=key==='sex'?curData[key]==1?'男':'女':curData[key];//把属性值添加到html中
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tbody.appendChild(frg);
        frg=null;
    }
})();
function changeBg(){
    for(var i=0;i<tbodyRows.length;i++){
        tbodyRows[i].className='c'+(i%2+1);
    }
}
changeBg();

//实现排序效果
/*
*   1 给表头里面所有的列绑定点击事件
*   2 然后事件发生的时候按照点击这一列的下面的body对应的列的内容去排序
*
* */
(function bindEvent(){
    //循环给表头里面的所有列绑定事件
    for(var i=0;i<tHeadThs.length;i++){
        //判断如果有cursor这个类的th我才绑定
        tHeadThs[i].index=i;//这个索引是排序的时候用的
        tHeadThs[i].sortFlag=-1;//排序的默认值
        if(tHeadThs[i].className==='cursor'){
            tHeadThs[i].onclick=function(){
                //当事件发生的时候按照点击的列去排序
                //console.log(this);
                //console.log(this.index);
                //sort(this.index);//专门负责排序的方法
                sort.call(this);
                changeBg();//排序结束之后隔行变色已经乱了，需要重新执行函数
            }
        }
    }
})();
/*
*   排序的时候，只有事件发生的那一刻才知道按照哪一列的innerHTML去排序，排序对应的cells[索引]和点击表头的索引是同一个值。所以可以通过事件发生时候的this.index就可以取到，并且传给sort函数当实参
* */
//负责排序的方法
function sort(n){
    console.log(this);//如果这个函数中的this不是window，是点击那个表头，那我就能通过this来获取到this自身上的索引，如果能通过this拿到索引值就不用使用参数n了，如何把这里面的this换成事件发生时刻this（点击表头）呢?
    for(var i=0;i<tHeadThs.length;i++){
        if(tHeadThs[i]!==this){//只要表头项不是点击这个表头，那么就恢复成默认值
            tHeadThs[i].sortFlag=-1;
        }
    }
    var that=this;
    //排序是给tbody里面所有的行排序
    that.sortFlag*=-1;
    var tbodyRowsAry=utils.listToArray(tbodyRows);//把主体里面所有的行转化成数组之后才可以排序
    tbodyRowsAry.sort(function(a,b){
        //a和b分别代表的是主体所有的行，按照行内所有的列的第三列的内容去排序
        //这里面的this已经和外面的this不是同一个了。所以需要用变量来获取外面的this
        var _a= a.cells[that.index/*n*/].innerHTML;
        var _b= b.cells[that.index/*n*/].innerHTML;
        if(isNaN(_a)||isNaN(_b)){//如果列里面的内容不是数字那么就按照字符串的排序方法排序
            return (_a.localeCompare(_b))*that.sortFlag;
        }
        return (_a-_b)*that.sortFlag;
        //return a.cells[that.index/*n*/].innerHTML- b.cells[that.index/*n*/].innerHTML;
    });
    var frg=document.createDocumentFragment();
    for(var i=0;i<tbodyRowsAry.length;i++){
        frg.appendChild(tbodyRowsAry[i]);
    }
    tbody.appendChild(frg);
    frg=null;
}
/*
* 正序倒序切换
*       1 添加了一个自定义属性默认值是-1；
*       2 在每次排序sort之前先乘等于-1
*       3 在排序return的结果又乘以这个自定义属性
*       ps：return的值是正数还是负数就是排序的根本
*
* */
/*
* 如果不是连续点击，那么在第二次点击其他列的时候，把除了自己的其他所有表头都恢复成原始的sortFlag=-1的状态
* */