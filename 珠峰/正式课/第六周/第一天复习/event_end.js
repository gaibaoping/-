//1 on是假绑定，这种绑定把fn保存到自己定义的数组里，为了避免在数组里出现重复项而做的判断
function on(ele,eventType,fn){//负责添加
    if(ele.addEventListener){
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //for ie6-8
    if(!ele['myEvent'+eventType]){//run和自定义属性数组是相同的都是只能出现一次
        ele['myEvent'+eventType] = [];
        ele.attachEvent('on'+eventType,function(){
            run.call(ele);//处理run中的this为ele
        });
    }
    var a = ele['myEvent'+eventType];//用a去代替这个自定义属性
    for(var i = 0; i < a.length; i++){//排除重复绑定的
        if(a[i] === fn){
            return;
        }
    }
    a.push(fn);
}
function off(ele,eventType,fn){//负责移除
    if(ele.removeEventListener){
        ele.removeEventListener(eventType,fn,false);
        return;
    }
    //for ie6-8
    var a = ele['myEvent'+eventType];
    if(a){
        for(var i = 0; i < a.length; i++){
            if(a[i] === fn){
                a[i] = null;
                break;
            }
        }
    }
}
function run(){//负责找到数组并且按照顺序执行
    //this就是ele，this是在on方法中就已经通过call的方式处理好了
    //即使标准浏览器中事件e是从哪里来的，是怎么传进来的

    //当事件触发的时候，浏览器是如何执行绑定在事件上的方法的
    //浏览器是如何封装一个事件对象，并且当实参传给事件触发的方法
    //这些东西就是事件的原理
    var e = window.event;
    var a = this['myEvent'+e.type];
    if(a){//这个条件成立那么必定是ie6-8浏览器，在标准浏览器中根本就不用添加这个自定义属性并且还赋值数组
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.preventDefault = function(){
            e.returnValue = false;
        };
        e.stopPropagation = function(){
            e.cancelBubble = true;
        };
        for(var i = 0; i < a.length; i++){//循环执行方法
            var curFn = a[i];
            if(typeof curFn == 'function'){
                curFn.call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}