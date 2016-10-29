/*
*  1 思想转变：一直都是面向过程编程（单纯的实现效果就可以了oDiv的拖拽）==>面向对象的思想，把要操作的对象（要拖拽的元素）当作一类来处理
*  2 类和实例：实例上存储都是私有的可能要操作到的元素或者值
* */
/*
* 构造函数的封装：
*       1 把方法都定义在原型上，对于拖拽来说，mousedown/mouseover/mouseup这是所有要拖拽的元素都要使用的方法所以应该是公有方法。
*       2 公有方法和函数，（onmousemove方法）操作实例上的私有属性 比如：this.element就是要拖拽的那个元素，也就是公有方法要操作的那个元素，实例就是起到了保存和媒介作用，既能调用公有方法又能获取私有属性
*       3 一定处理好this问题，因为这个this（也就是实例）才能保证获取到要操作的属性和方法。
* */
//new Drag(oDiv) 我要拖拽oDiv
function Drag(ele){//定义一个叫做Drag的类， ele：我要拖拽的元素
    this.element = ele;//我要把要拖拽的元素保存在实例私有属性身上，在公有方法中只要能保证公有方法中的this是实例，那么就能通过this.element来拿到这个要拖拽的元素
    this.x = null;//这个私有的x是用来记录鼠标点击的那一刻距离我要拖拽的元素的偏移量，但是这一会没有发生点击事件所以还没有。
    this.y = null;
    //给鼠标绑定onmousedown事件是必须要操作的事。所以可以放在构造函数中，因为直接在new Drag创建实例的过程中就会默认执行代码
    var that = this;// 这个this一定是实例
    this.DOWN = function (e){//由于这个方法才是真正绑定给mousedown事件的，所以事件对象只在这个DOWN函数中，但是我们down方法需要用事件对象e，所以需要传给down方法，这个e不用处理，在on方法中处理过了
        that.down.call(that,e);
    };
    this.MOVE = function(e){//和down相同的道理也处理一次啊move和up
        that.move.call(that,e)
    };
    this.UP = function(e){
        that.up.call(that,e);
    };
    on(this.element,'mousedown',/*this.down*/this.DOWN);//如果绑定this.down。那么当事件被触发的时候this.down（原型上的down方法）中的this就变成了this.element了。也就是那个要拖拽的元素了。但是我们要保证原型上方法中的this是实例，所以需要我们包装一个函数来处理this问题，这些函数在up的时候还要被移除所以必须保证时刻能获取到，那么就保存在实例的私有属性身上，在up方法中就能通过this（实例）来获取了
}
//分别定义三个公有函数
Drag.prototype.down = function(e){
    //必须保证公有方法中的this是实例
    this.x = e.clientX - this.element.offsetLeft;
    //从新赋值鼠标相对于传进来的ele也就是this.element的相对偏移量
    this.y = e.clientY - this.element.offsetTop;
    //判断下setCapture是否可以使用，如果可以就绑定给元素this.element，如果不可以才绑定给document
    if(this.element.setCapture){//ie firefox
        this.element.setCapture();
        on(this.element,'mousemove',this.MOVE);//保证this是实例
        on(this.element,'mouseup',this.UP);//由于绑定事件会更改this，所以我们都绑定的是大写的MOVE和UP已经处理过this的
    }else{//chrome需要把事件绑定给document
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    e.preventDefault();
};
Drag.prototype.move = function(e){
    //this.element才是我们要拖拽也就是我要操作的那个元素，而this.x就是保存着那个相对偏移量的值，我们把这个值存储在实例的私有属性上了。这个值是在mousedown的时候才算出来的
    this.element.style.left = e.clientX - this.x + 'px';
    this.element.style.top = e.clientY - this.y + 'px';
};
Drag.prototype.up = function(){
    //由于绑定的时候是分开绑定的，所以移除的时候要分开移除
    if(this.element.releaseCapture){
        this.element.releaseCapture();
        off(this.element,'mousemove',this.MOVE);//由于这个方法是存储在实例的私有属性上的所以能通过this获取并且移除
        off(this.element,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
};