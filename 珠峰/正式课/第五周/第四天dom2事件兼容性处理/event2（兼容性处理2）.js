//div.addEventListener('click',fn,false);
/**
 *
 * @param ele 给哪个元素绑定事件
 * @param eventType 事件类型 => click  mouseover 。。。
 * @param fn 绑定的函数
 */
function bind(ele,eventType,fn){//处理dom2事件绑定的兼容性
    if(ele.addEventListener){//可能是一个函数/undefined
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //从这里往下的代码是给ie6-8
    var tempFn = function (){
        fn.call(ele);
    };
    //这个if只有在第一次执行一遍，下一次在ele身上就已经有这个自定义属性了，如果有这个属性那么就直接跳过，如果没有就创建一个
    if(!ele['mybind'+eventType]){
        //mybind这个就是用来区分原生的属性的。自定义属性是用来存放经过伪装之后的这些tempFn的。为了区分不同事件之间使用不同的数组，所以在mybind的后面加一个eventType用来区分事件类型的
        //如果ele.mybindclick不存在那么就创建一个数组
        ele['mybind'+eventType] = [];
    }
    var a = ele['mybind'+eventType];//操作简单
    for(var i = 0; i < a.length; i++){//这个循环是为了处理重复绑定，对于已经在事件池中出现过的我们就不要再绑定了，但是我们只能去遍历我们自己模拟的这个自定义属性数组（模拟事件池）
        if(a[i].origin === fn){//说明曾经绑定过
            return;//如果曾经绑定过，1 不需要更新数组 2 更不需要添加到事件池中
        }
    }
    a.push(tempFn);//把已经添加过origin这个自定义属性的函数，添加到对应事件类型的ele的自定义属性那个数组中去 ==> 这个数组就是为了移除事件的时候能找到自己原来是谁。
    tempFn.origin = fn;//在这个临时的函数身上添加一个自定义属性用来记录它原来是用哪个函数
    ele.attachEvent('on'+eventType,tempFn);//fn中的this不是ele是window
}

function unbind(ele,evenType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(evenType,fn,false);
        return;
    }
    //for ie6-8
    var a = ele['mybind'+evenType];//通过事件类型去拿对应自定义属性的数组
    for(var i = 0; i < a.length; i++){
        //在一堆tempFn中挑哪一个origin属性是传进来这个参数fn那么我就使用detachEvent方法来移除对应的tempFn
        var tempFn = a[i];
        if (tempFn.origin == fn){
            ele.detachEvent('on'+evenType,tempFn);//绑定的时候叫做tempFn
        }
    }
}

//顺序问题
function on(ele,eventType,fn){//解决顺序问题
    //这个on方法只负责把绑定的函数添加到ele的自定义属性数组中
    //把不同的事件类型绑定的函数放到不同的数组中
    if(!ele['myevent'+eventType]){
        ele['myevent'+eventType] = [];
    }
    var a = ele['myevent'+eventType];
    for(var i = 0; i<a.length; i++){//不能重复绑定
        if(a[i] === fn){//只要有一个重复的，直接删除掉然后直接跳出循环就可以了，因为在on的时候已经处理重复绑定
            return;
        }
    }
    a.push(fn);
    bind(ele,eventType,run);//要把run方法绑定给真正事件发生的时候要执行的
}

function off(ele,eventType,fn){
    var a = ele['myevent'+eventType];
    //遍历数组，只要数组中存在一个fn函数那么我就把这个函数从数组中移除
    for(var i = 0; i<a.length; i++){
        if(a[i] === fn){
            /*a.splice(i,1);
            break;*/
            a[i] = null;//保证如果在函数触发的过程中，调用了off方法就会有保存着多有函数的数组的塌陷问题。但是现在数组中出现了null只是在
        }
    }
}

function run(e){//它负责按照顺序执行自定义属性数组中的方法，真正绑定给事件的函数是run
    //所以只有run才存在事件对象e
    //比如click事件发生的时候，这个run方法总要找到click对应的那个自定义属性click的数组才行。
    //ele['myevent'+eventType]//ele eventType
    e = e || window.event;

    //这里的this就是绑定的那个元素ele
    var isLowIE = !e.target;//也可以判断当前浏览器是否是ie678
    if(isLowIE){
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
        e.pageY = (document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
        e.preventDefault = function (){
            e.returnValue = false;
        };
        e.stopPropagation = function(){
            e.cancelBubble = true;
        }
    }
    var a = /*e.target*/this['myevent'+e.type];
    for(var i = 0; i<a.length; i++){
        var fn = a[i];
        //由于a数组中可能因为off方法填进去了null，所以要判断当前的每一项是不是函数如果是函数才执行呢
        if(typeof fn == 'function'){
            fn.call(this/*e.target*/,e);//这个e是从run方法中获取到的，应该还给数组中每一个fn
        }else{//说明你当前不是一个函数是一个null
            a.splice(i,1);//就可以把这个null删除掉了，这个else不写没有问题，就是数组中多了一些null。但是我们做过判断所以没有问题
            i--;//由于形成了数组塌陷所以i--
        }
    }
}