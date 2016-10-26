/**
 * Created by Administrator on 2016/8/24.
 */
var utils={
    listToArray:function(likeArray){//类数组转化成数组
        try{
            return Array.prototype.slice.call(likeArray,0);//类数组转化成数组 likeArray是类数组
            //return [].slice.call(likeArray,0);//随便一个实例都能找到slice
        }catch(e){
            var ary=[];
            for(var i=0;i<likeArray.length;i++){
                ary[ary.length]=likeArray[i];
            }
            return ary;
        }
    },
    getRandom:function(n,m){//获取n到m之间的随机整数
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        if(n>m){
            var temp=m;
            m=n;
            n=temp;
        }
        return Math.round(Math.random()*(n-m)+n);
    },
    hasPubProperty:function(obj,prop){
        return prop in obj&&!(obj.hasOwnProperty(prop));
    },
    prev:function(ele){//获取上一个元素哥哥节点
        var pre=ele.previousSibling;
        while(pre&&pre.nodeType !=1){
            pre=pre.previousSibling;
        }
    },
    jsonParse:function (jsonStr){
    return 'JSON'in window ? JSON.parse(jsonStr):eval('('+jsonStr+')');
    //eval的时候在前后拼接一个小括号
    }
};