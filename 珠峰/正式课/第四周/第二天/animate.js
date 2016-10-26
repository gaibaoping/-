/**
 * 动画
 * @param ele 要运动的元素
 * @param target 要运动的终点
 * @param duration 在多长时间内完成运动
 * @param callback 运动结束之后要执行的函数
 */
function animate(ele,target,duration,callback){
    var effectLinear=function(t,b,c,d){
        return b+t/d*c;
    };
    var time=0;
    var begin={};
    var change={};
    for(var key in target){
        begin[key]=utils.css(ele,key);
        change[key]=target[key]-begin[key];
    }
    var interval=10;
    ele.timer&&window.clearInterval(ele.timer);//只要运动的元素有自定属性保存着定时器那么在下一次执行的时候一定把上一次的定时器情调，无论是否已经到达终点
    ele.timer=window.setInterval(function(){
        time+=interval;
        if(time>=duration){
            window.clearInterval(ele.timer);
            utils.css(ele,target);
            if(typeof callback=='function'){
                callback.call(ele);//把回调函数中的this修改成ele
            }
            return;
        }

        for(var key in change){
            if(change[key]){
                var targetVal=effectLinear(time,begin[key],change[key],duration);
                utils.css(ele,key,targetVal);
            }
        }
    },interval)
}