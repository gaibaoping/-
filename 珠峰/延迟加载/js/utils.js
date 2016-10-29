var utils=(function(){
    var isStanderBrower='getComputedStyle' in window;
    function getElesByClass(strClass,context){
        context=context||document;
        var tag=context.getElementsByTagName('*');
        var ary=[];
        for(var i=0;i<tag.length;i++){
            var flag=true;
            var curTag=tag[i];
            var strClassAry=strClass.replace(/(^ +| +$)/g,'').split(/ +/);
            for(var j=0;j<strClassAry.length;j++){
                var curClass=strClassAry[j];
                var reg=new RegExp('(^| +)'+curClass+'( +|$)');
                if(!reg.test(curTag.className)){
                    flag=false;
                    break;
                }
            }
            if(flag){
                ary.push(curTag);
            }
        }
        return ary;
    }
    function offSet(ele){
        var l=null;
        var t=null;
        l+=ele.offsetLeft;
        t+=ele.offsetTop;
        var par=ele.offsetParent;
        while(par){
            if(isStanderBrower){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent;
        }
        return {left:l,top:t};
    }
    function win(attr,val){
        if(typeof val=='undefined'){
            val=document.documentElement[attr]||document.body[attr];
            return val;
        }
        document.documentElement[attr]=val;
        document.body[attr]=val;
    }
    return {getElesByClass:getElesByClass,offset:offSet,win:win};
})();
