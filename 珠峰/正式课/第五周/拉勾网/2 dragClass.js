/*
*  1 ˼��ת�䣺һֱ����������̱�̣�������ʵ��Ч���Ϳ�����oDiv����ק��==>��������˼�룬��Ҫ�����Ķ���Ҫ��ק��Ԫ�أ�����һ��������
*  2 ���ʵ����ʵ���ϴ洢����˽�еĿ���Ҫ��������Ԫ�ػ���ֵ
* */
/*
* ���캯���ķ�װ��
*       1 �ѷ�����������ԭ���ϣ�������ק��˵��mousedown/mouseover/mouseup��������Ҫ��ק��Ԫ�ض�Ҫʹ�õķ�������Ӧ���ǹ��з�����
*       2 ���з����ͺ�������onmousemove����������ʵ���ϵ�˽������ ���磺this.element����Ҫ��ק���Ǹ�Ԫ�أ�Ҳ���ǹ��з���Ҫ�������Ǹ�Ԫ�أ�ʵ���������˱����ý�����ã����ܵ��ù��з������ܻ�ȡ˽������
*       3 һ�������this���⣬��Ϊ���this��Ҳ����ʵ�������ܱ�֤��ȡ��Ҫ���������Ժͷ�����
* */
//new Drag(oDiv) ��Ҫ��קoDiv
function Drag(ele){//����һ������Drag���࣬ ele����Ҫ��ק��Ԫ��
    this.element = ele;//��Ҫ��Ҫ��ק��Ԫ�ر�����ʵ��˽���������ϣ��ڹ��з�����ֻҪ�ܱ�֤���з����е�this��ʵ������ô����ͨ��this.element���õ����Ҫ��ק��Ԫ��
    this.x = null;//���˽�е�x��������¼���������һ�̾�����Ҫ��ק��Ԫ�ص�ƫ������������һ��û�з�������¼����Ի�û�С�
    this.y = null;
    //������onmousedown�¼��Ǳ���Ҫ�������¡����Կ��Է��ڹ��캯���У���Ϊֱ����new Drag����ʵ���Ĺ����оͻ�Ĭ��ִ�д���
    var that = this;// ���thisһ����ʵ��
    this.DOWN = function (e){//��������������������󶨸�mousedown�¼��ģ������¼�����ֻ�����DOWN�����У���������down������Ҫ���¼�����e��������Ҫ����down���������e���ô�����on�����д������
        that.down.call(that,e);
    };
    this.MOVE = function(e){//��down��ͬ�ĵ���Ҳ����һ�ΰ�move��up
        that.move.call(that,e)
    };
    this.UP = function(e){
        that.up.call(that,e);
    };
    on(this.element,'mousedown',/*this.down*/this.DOWN);//�����this.down����ô���¼���������ʱ��this.down��ԭ���ϵ�down�������е�this�ͱ����this.element�ˡ�Ҳ�����Ǹ�Ҫ��ק��Ԫ���ˡ���������Ҫ��֤ԭ���Ϸ����е�this��ʵ����������Ҫ���ǰ�װһ������������this���⣬��Щ������up��ʱ��Ҫ���Ƴ����Ա��뱣֤ʱ���ܻ�ȡ������ô�ͱ�����ʵ����˽���������ϣ���up�����о���ͨ��this��ʵ��������ȡ��
}
//�ֱ����������к���
Drag.prototype.down = function(e){
    //���뱣֤���з����е�this��ʵ��
    this.x = e.clientX - this.element.offsetLeft;
    //���¸�ֵ�������ڴ�������eleҲ����this.element�����ƫ����
    this.y = e.clientY - this.element.offsetTop;
    //�ж���setCapture�Ƿ����ʹ�ã�������ԾͰ󶨸�Ԫ��this.element����������ԲŰ󶨸�document
    if(this.element.setCapture){//ie firefox
        this.element.setCapture();
        on(this.element,'mousemove',this.MOVE);//��֤this��ʵ��
        on(this.element,'mouseup',this.UP);//���ڰ��¼������this���������Ƕ��󶨵��Ǵ�д��MOVE��UP�Ѿ������this��
    }else{//chrome��Ҫ���¼��󶨸�document
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    e.preventDefault();
};
Drag.prototype.move = function(e){
    //this.element��������Ҫ��קҲ������Ҫ�������Ǹ�Ԫ�أ���this.x���Ǳ������Ǹ����ƫ������ֵ�����ǰ����ֵ�洢��ʵ����˽���������ˡ����ֵ����mousedown��ʱ����������
    this.element.style.left = e.clientX - this.x + 'px';
    this.element.style.top = e.clientY - this.y + 'px';
};
Drag.prototype.up = function(){
    //���ڰ󶨵�ʱ���Ƿֿ��󶨵ģ������Ƴ���ʱ��Ҫ�ֿ��Ƴ�
    if(this.element.releaseCapture){
        this.element.releaseCapture();
        off(this.element,'mousemove',this.MOVE);//������������Ǵ洢��ʵ����˽�������ϵ�������ͨ��this��ȡ�����Ƴ�
        off(this.element,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
};