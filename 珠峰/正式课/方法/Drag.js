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

//�ڶ�������ק
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
//ԭ���Ϸ����ļ̳�
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

//����
function clearEffect(){
    clearTimeout(this.flyTimer);//����Ͳ��øģ���Ϊ��������޹�DOMԪ�أ������Ǳ���ק��DOMԪ�أ�
    //this.ele.flyTimer;
    //������Drag���ʵ���ϣ��ȶ�����DOMԪ���ϸ���ȫ����ΪDOMԪ�������õĶ�����������кܶ�����Ժͷ����������׺��Զ������Ժͷ�����ͻ��
    clearTimeout(this.dropTimer);
}
function getSpeed(e){
    if(this.prevPosi){//�������һ�ε�λ�ã�˵�����Ѿ����ǵ�һ��
        this.speed=e.pageX-this.prevPosi;
        this.prevPosi=e.pageX;//���ϵĸ��¡���һ�ε�λ�á�,ȷ������һ�ε�λ�á��������һ�εġ�

    }else{
        this.prevPosi=e.pageX;//���û����һ�ε�λ�ã���ѵ�ǰ��λ�ø�ֵ������һ�ε�λ�á�
    }
}
function fly(){
    this.speed*=.98;
    var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;//�õ������ұ߽�
    var currentX=this.ele.offsetLeft+this.speed;//�����˶�ʱ������Ӧ�õ����λ��
    if(currentX<=0){//��߽��ж�,���Խ�������
        this.ele.style.left=0;//��ͣ����߽���
        this.speed*=-1;//����ͷ��ײ���߽��򷴷����˶�
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
        this.flag++;//��ʶ���ԣ�������¼�������ٴε����˱߽������
    }else{
        this.ele.style.top=currentY+"px";
        this.flag=0;
    }
    if(this.flag<2){//���Ǹ�����Ȥ�ļ���
        this.dropTimer=setTimeout(processThis(drop,this),20);
    }
}
Drag.prototype.range = function(oRange){
    this.oRange = oRange;//�൱�������ַ�ʽ��this.addRange����һ������
    this.on('dragging',this.addRange);//����this.addRange�ǰ󶨵��¼��ϵķ���������û��������������ֻ������������һ������
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
