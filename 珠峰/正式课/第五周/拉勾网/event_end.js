function on(ele,eventType,fn){//�������
    if(ele.addEventListener){
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //for ie6-8
    if(!ele['myEvent'+eventType]){//run���Զ���������������ͬ�Ķ���ֻ�ܳ���һ��
        ele['myEvent'+eventType] = [];
        ele.attachEvent('on'+eventType,function(){
            run.call(ele);//����run�е�thisΪele
        });
    }
    var a = ele['myEvent'+eventType];//��aȥ��������Զ�������
    for(var i = 0; i < a.length; i++){//�ų��ظ��󶨵�
        if(a[i] === fn){
            return;
        }
    }
    a.push(fn);
}
function off(ele,eventType,fn){//�����Ƴ�
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
function run(){//�����ҵ����鲢�Ұ���˳��ִ��
    //this����ele��this����on�����о��Ѿ�ͨ��call�ķ�ʽ�������
    //
    e = window.event;
    var a = this['myEvent'+e.type];
    if(a){//�������������ô�ض���ie6-8��������ڱ�׼������и����Ͳ����������Զ������Բ��һ���ֵ����
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.preventDefault = function(){
            e.returnValue = false;
        };
        e.stopPropagation = function(){
            e.cancelBubble = true;
        };
        for(var i = 0; i < a.length; i++){//ѭ��ִ�з���
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