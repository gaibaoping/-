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