/**
 * Created by Administrator on 2016/8/24.
 */
var utils={
    listToArray:function(likeArray){//������ת��������
        try{
            return Array.prototype.slice.call(likeArray,0);//������ת�������� likeArray��������
            //return [].slice.call(likeArray,0);//���һ��ʵ�������ҵ�slice
        }catch(e){
            var ary=[];
            for(var i=0;i<likeArray.length;i++){
                ary[ary.length]=likeArray[i];
            }
            return ary;
        }
    },
    getRandom:function(n,m){//��ȡn��m֮����������
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
    prev:function(ele){//��ȡ��һ��Ԫ�ظ��ڵ�
        var pre=ele.previousSibling;
        while(pre&&pre.nodeType !=1){
            pre=pre.previousSibling;
        }
    },
    jsonParse:function (jsonStr){
    return 'JSON'in window ? JSON.parse(jsonStr):eval('('+jsonStr+')');
    //eval��ʱ����ǰ��ƴ��һ��С����
    }
};