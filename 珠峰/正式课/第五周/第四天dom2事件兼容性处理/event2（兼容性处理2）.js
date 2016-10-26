//div.addEventListener('click',fn,false);
/**
 *
 * @param ele ���ĸ�Ԫ�ذ��¼�
 * @param eventType �¼����� => click  mouseover ������
 * @param fn �󶨵ĺ���
 */
function bind(ele,eventType,fn){//����dom2�¼��󶨵ļ�����
    if(ele.addEventListener){//������һ������/undefined
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //���������µĴ����Ǹ�ie6-8
    var tempFn = function (){
        fn.call(ele);
    };
    //���ifֻ���ڵ�һ��ִ��һ�飬��һ����ele���Ͼ��Ѿ�������Զ��������ˣ���������������ô��ֱ�����������û�оʹ���һ��
    if(!ele['mybind'+eventType]){
        //mybind���������������ԭ�������Եġ��Զ���������������ž���αװ֮�����ЩtempFn�ġ�Ϊ�����ֲ�ͬ�¼�֮��ʹ�ò�ͬ�����飬������mybind�ĺ����һ��eventType���������¼����͵�
        //���ele.mybindclick��������ô�ʹ���һ������
        ele['mybind'+eventType] = [];
    }
    var a = ele['mybind'+eventType];//������
    for(var i = 0; i < a.length; i++){//���ѭ����Ϊ�˴����ظ��󶨣������Ѿ����¼����г��ֹ������ǾͲ�Ҫ�ٰ��ˣ���������ֻ��ȥ���������Լ�ģ�������Զ����������飨ģ���¼��أ�
        if(a[i].origin === fn){//˵�������󶨹�
            return;//��������󶨹���1 ����Ҫ�������� 2 ������Ҫ��ӵ��¼�����
        }
    }
    a.push(tempFn);//���Ѿ���ӹ�origin����Զ������Եĺ�������ӵ���Ӧ�¼����͵�ele���Զ��������Ǹ�������ȥ ==> ����������Ϊ���Ƴ��¼���ʱ�����ҵ��Լ�ԭ����˭��
    tempFn.origin = fn;//�������ʱ�ĺ����������һ���Զ�������������¼��ԭ�������ĸ�����
    ele.attachEvent('on'+eventType,tempFn);//fn�е�this����ele��window
}

function unbind(ele,evenType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(evenType,fn,false);
        return;
    }
    //for ie6-8
    var a = ele['mybind'+evenType];//ͨ���¼�����ȥ�ö�Ӧ�Զ������Ե�����
    for(var i = 0; i < a.length; i++){
        //��һ��tempFn������һ��origin�����Ǵ������������fn��ô�Ҿ�ʹ��detachEvent�������Ƴ���Ӧ��tempFn
        var tempFn = a[i];
        if (tempFn.origin == fn){
            ele.detachEvent('on'+evenType,tempFn);//�󶨵�ʱ�����tempFn
        }
    }
}

//˳������
function on(ele,eventType,fn){//���˳������
    //���on����ֻ����Ѱ󶨵ĺ�����ӵ�ele���Զ�������������
    //�Ѳ�ͬ���¼����Ͱ󶨵ĺ����ŵ���ͬ��������
    if(!ele['myevent'+eventType]){
        ele['myevent'+eventType] = [];
    }
    var a = ele['myevent'+eventType];
    for(var i = 0; i<a.length; i++){//�����ظ���
        if(a[i] === fn){//ֻҪ��һ���ظ��ģ�ֱ��ɾ����Ȼ��ֱ������ѭ���Ϳ����ˣ���Ϊ��on��ʱ���Ѿ������ظ���
            return;
        }
    }
    a.push(fn);
    bind(ele,eventType,run);//Ҫ��run�����󶨸������¼�������ʱ��Ҫִ�е�
}

function off(ele,eventType,fn){
    var a = ele['myevent'+eventType];
    //�������飬ֻҪ�����д���һ��fn������ô�ҾͰ�����������������Ƴ�
    for(var i = 0; i<a.length; i++){
        if(a[i] === fn){
            /*a.splice(i,1);
            break;*/
            a[i] = null;//��֤����ں��������Ĺ����У�������off�����ͻ��б����Ŷ��к�����������������⡣�������������г�����nullֻ����
        }
    }
}

function run(e){//��������˳��ִ���Զ������������еķ����������󶨸��¼��ĺ�����run
    //����ֻ��run�Ŵ����¼�����e
    //����click�¼�������ʱ�����run������Ҫ�ҵ�click��Ӧ���Ǹ��Զ�������click��������С�
    //ele['myevent'+eventType]//ele eventType
    e = e || window.event;

    //�����this���ǰ󶨵��Ǹ�Ԫ��ele
    var isLowIE = !e.target;//Ҳ�����жϵ�ǰ������Ƿ���ie678
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
        //����a�����п�����Ϊoff�������ȥ��null������Ҫ�жϵ�ǰ��ÿһ���ǲ��Ǻ�������Ǻ�����ִ����
        if(typeof fn == 'function'){
            fn.call(this/*e.target*/,e);//���e�Ǵ�run�����л�ȡ���ģ�Ӧ�û���������ÿһ��fn
        }else{//˵���㵱ǰ����һ��������һ��null
            a.splice(i,1);//�Ϳ��԰����nullɾ�����ˣ����else��дû�����⣬���������ж���һЩnull���������������ж�����û������
            i--;//�����γ���������������i--
        }
    }
}