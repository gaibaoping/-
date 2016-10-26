function animate(ele,target,duration,callBack){
    function effectLinear(t,b,c,d){
        return b+t/d*c;
    }
    var time = 0;
    duration = duration||1000;
    var begin = {};
    var change = {};
    for(var key in target){
        begin[key] = utils.css(ele,key);
        change[key] = target[key] - begin[key];
    }
    var interval = 10;
    ele.timer = window.setInterval(function(){
        time += interval;
        if(time>=duration){
            window.clearInterval(ele.timer);
            utils.css(ele,target);
            if(typeof callBack == 'function'){
                callBack.call(ele);
            }
            return;
        }
        for(var key in change){
            if(change[key]){
                var targetVal = effectLinear(time,begin[key],change[key],duration);
                utils.css(ele,key,targetVal);
            }
        }
    },interval)
}
