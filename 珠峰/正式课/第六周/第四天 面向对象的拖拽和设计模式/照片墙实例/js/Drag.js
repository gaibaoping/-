function EventEmitter (){}
EventEmitter.prototype.on = function (type,fn){
    if(!this['aEvent'+type]){
        this['aEvent'+type] = [];
    }
    var a = this['aEvent'+type];
    if(a&& a.length){
        for(var i = 0; i < a.length; i++){
            if(a[i]==fn){

            }
        }
    }
    a.push(fn);
    return this;
};
EventEmitter.prototype.fire = function (type,e){
    var a = this['aEvent'+type];
    if(a&& a.length){
        for(var i =0; i < a.length; i++){
            if(typeof a[i]=='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
    //return this;
};
EventEmitter.prototype.off = function (type,fn){
    var a = this['aEvent'+type];
    if(a&& a.length){
        for(var i = 0; i < a.length; i++){
            if(a[i]==fn){
                a[i] = null;
                break;
            }
        }
    }
    return this;
};

//第二步：拖拽
function Drag(ele){
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;
    this.ele = ele;
    var that = this;
    this.DOWN = function(e){
        that.down.call(that,e);
    };
    this.MOVE = function(e){
        that.move.call(that,e);
    };
    this.UP = function(e){
        that.up.call(that,e);
    };
    on(this.ele,'mousedown',that.DOWN);
}
//原型上方法的继承
Drag.prototype = new EventEmitter();

Drag.prototype.down = function(e){
    this.x = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    e.preventDefault();
    this.fire('dragstart',e);
};
Drag.prototype.move = function(e){
    this.ele.style.left = e.pageX - this.mx + this.x + 'px';
    this.ele.style.top = e.pageY - this.my + this.y + 'px';
    this.fire('dragging',e);
};
Drag.prototype.up = function (e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE);
        off(this.ele,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    this.fire('dragend',e);
};

//动画
function clearEffect(){
    clearTimeout(this.flyTimer);//这儿就不用改，因为这个属性无关DOM元素（它不是被拖拽的DOM元素）
    //this.ele.flyTimer;
    //定义在Drag类的实例上，比定义在DOM元素上更安全，因为DOM元素是内置的对象，它本身就有很多的属性和方法，很容易和自定义属性和方法冲突。
    clearTimeout(this.dropTimer);
}
function getSpeed(e){
    if(this.prevPosi){//如果有上一次的位置，说明这已经不是第一次
        this.speed=e.pageX-this.prevPosi;
        this.prevPosi=e.pageX;//不断的更新“上一次的位置”,确保“上一次的位置”总是最近一次的。

    }else{
        this.prevPosi=e.pageX;//如果没有上一次的位置，则把当前的位置赋值给“上一次的位置”
    }
}
function fly(){
    this.speed*=.98;
    var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;//得到最大的右边界
    var currentX=this.ele.offsetLeft+this.speed;//正常运动时，盒子应该到达的位置
    if(currentX<=0){//左边界判断,如果越过了左界
        this.ele.style.left=0;//则停在左边界上
        this.speed*=-1;//调个头，撞到边界向反方向运动
    }else if(currentX>=maxRight){
        this.ele.style.left=maxRight+"px";
        this.speed*=-1;
    }else{
        this.ele.style.left=currentX+"px";
    }
    //var that=this;
    //this.flyTimer=setTimeout(function(){fly.call(that)},20);
    if(Math.abs(this.speed)>=.5){
        this.flyTimer=setTimeout(processThis(fly,this),20);
    }

}
function drop(){
    if(this.dropSpeed){
        this.dropSpeed+=9;
    }else{
        this.dropSpeed=9;
    }
    this.dropSpeed*=.98;
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
    var currentY=this.ele.offsetTop+this.dropSpeed;
    if(currentY>=maxBottom){
        this.ele.style.top=maxBottom+"px";
        this.dropSpeed*=-1;
        this.flag++;//标识属性，用来记录连续多少次到达了边界的属性
    }else{
        this.ele.style.top=currentY+"px";
        this.flag=0;
    }
    if(this.flag<2){//这是个很有趣的技巧
        this.dropTimer=setTimeout(processThis(drop,this),20);
    }
}
Drag.prototype.range = function(oRange){
    this.oRange = oRange;//相当于用这种方式给this.addRange传了一个参数
    this.on('dragging',this.addRange);//由于this.addRange是绑定到事件上的方法，所以没法传参数，所以只能在外面再套一个方法
};
Drag.prototype.addBorder = function(){
    this.ele.style.border = '10px dashed #ccc';
};
Drag.prototype.removeBorder = function(){
    this.ele.style.border = 'none';
};
Drag.prototype.border = function(){
    this.on('dragstart',this.addBorder);
    this.on('dragend',this.removeBorder);
};
Drag.prototype.addRange = function (e){
    var oRange = this.oRange;
    //var oRange = {left:100,top:0,right:500,bottom:400};
    var valX = this.x + (e.pageX - this.mx);
    var valY = this.y + (e.pageY - this.my);
    if(valX>=oRange.right){
        valX = oRange.right;
    }else if(valX<=oRange.left){
        valX = oRange.left;
    }
    this.ele.style.left = valX + 'px';
    if(valY>=oRange.bottom){
        valY = oRange.bottom;
    }else if(valY<=oRange.top){
        valY = oRange.top;
    }
    this.ele.style.top = valY + 'px';
};
