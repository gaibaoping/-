function bind(ele,eventType,fn){
    if(ele.addEventListener){
        ele.addEventListener(eventType,fn);
        return;
    }
    if(!ele['myType'+eventType]){
        var a = [];
    }
    ele['myType'+eventType] = fn;
    a.push(fn);
    fn.origin = fn;
    for(var i = 0; i < a.length; i++){
        if(a[i].origin == fn){
            return;
        }
        var tempFn = function(){
            fn.call(ele);
        };
        ele.attachEvent('on'+eventType,tempFn);
    }
}
function run(e){//½â¾ö¼æÈÝÐÔ
    e = e || window.event;
    var IsLowerIE = !e.target;

}
