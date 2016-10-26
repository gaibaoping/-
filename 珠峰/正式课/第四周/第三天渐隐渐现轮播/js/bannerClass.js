function Banner(id,url,interval) {
    //����id��ͬ����ȡ�Ĳ�ͬ��dom�ڵ�Ԫ��
    //����url��ͬ��ȡ�������ݾ��ǲ�ͬ�ģ��ֲ���ͬ��ͼƬ
    //intervalʱ�����������Լ�ѡ��೤ʱ���ֲ�һ��ͼƬ
    this.banner = document.getElementById('id');
    this.bannerInner = utils.getElesByClass('bannerInner', this.banner)[0];
    this.focusList = utils.getElesByClass('focusList', this.banner)[0];
    this.imgs = this.bannerInner.getElementsByTagName('img');
    this.lis = this.focusList.getElementsByTagName('li');
    this.leftBtn = utils.getElesByClass('left', this.banner)[0];
    this.rightBtn = utils.getElesByClass('right', this.banner)[0];
    this.url = url;
    this.interval = interval || 2000;//���������������������ô��Ĭ��Ϊ2000
    this.timer = null;
    this.step = 0;
    this.data=null;
    this.init();//�ڴ���ʵ��������ִ�����init�����Ӷ������еĹ��з�����ͷ��βִ��һ��
}
Banner.prototype={
    constructor:Banner,
    getData:function(){
        var that=this;
        var xhr=new XMLHttpRequest();
        xhr.open('get',this.url+'?_='+Math.random(),false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                that.data=utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    },
    bindData:function(){
        if(this.data){
            var str='';
            var strLis='';
            for(var i=0;i<this.data.length;i++){
                var curData=this.data[i];
                str+='<div><img src="" real="'+curData.src+'"/></div>';
                strLis+=i===0?'<li class="selected"</li>':'<li></li>';
            }
            this.bannerInner.innerHTML=str;
            this.focusList.innerHTML=strLis;
        }
    },
    imgDelayLoad:function(){
        var that=this;
        for(var i=0;i<this.imgs.length;i++){
            if(i==0){
                utils.css(this.imgs[i].parentNode,'zIndex',1);
                animate(this.imgs[i].parentNode,{opacity:1},300);
            }
            (function(i){
                var curImg=that.imgs[i];
                var tempImg=new Image;
                tempImg.src=curImg.getAttribute('real');
                tempImg.onload=function(){
                    curImg.src=this.src;
                    utils.css(curImg,'display','block');
                    animate(curImg,{opacity:1},300);
                };
                tempImg=null;
            })(i);
        }
    },
    autoMove:function (){
        if(this.step==this.data.length-1){
            this.step=-1;
        }
        this.step++;
        for(var i=0;i<this.imgs.length;i++){
            //������ͼƬ������ֵ��step��ֵ��ȵ���һ����������߲㼶�������Ķ�����Ϊz-indexΪ0
            if(this.step==i){
                utils.css(this.imgs[i].parentNode,'zIndex',1);//��������zIndexΪ1
                //���̰Ѹող㼶����������ͼƬ��͸���ȴ�0������1
                animate(this.imgs[i].parentNode,{opacity:1},300,function(){
                    var siblings=utils.siblings(this);//�ѳ��˸ո���ʾ����ͼƬ�ĸ���div�������ֵܽڵ�ȫ����͸��������Ϊ0��Ϊ�˱�֤��һ�εĽ���Ч��
                    for(var i=0;i<siblings.length;i++){
                        utils.css(siblings[i],'opacity',0);
                    }
                });
            }else{
                utils.css(this.imgs[i].parentNode,'zIndex',0);
            }
            this.lis[i].className=i===this.step?'selected':'';
        }
    },
    mouseEvent:function(){
        var that=this;
        this.banner.onmouseover=function(){
            window.clearInterval(that.timer);
            that.leftBtn.style.display=that.rightBtn.style.display='block';
        };
        this.banner.onmouseout=function(){
            that.timer=window.setInterval(function(){
                //this==>window ��ʱ���е�this����window
                that.autoMove();
            },1000);
            that.leftBtn.style.display=that.rightBtn.style.display='none';
        };
    },
    btnEvent:function(){
        var that=this;
        this.leftBtn.onclick=function(){
            if(that.step==0){
                that.step=that.data.length;
            }
            that.step-=2;
            that.autoMove();
        };
        this.rightBtn.onclick=function(){
            that.autoMove();
        }
    },
    binEventForLis:function () {
        var that = this;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = function () {
                that.step = this.index - 1;
                that.autoMove();
            }
        }
    },
    init:function(){//����ִ���������еĺ���\
        var that=this;
        this.getData();//�Ȼ�ȡ����
        this.bindData();//������
        window.setTimeout(function(){
            that.imgDelayLoad();
        },400);
        this.timer=window.setInterval(function(){//�漰����ʱ����������Ҫ���ⶨʱ���е�this��window������Ҫ��֤ÿ�������е�this��ʵ��
            that.autoMove();
        },this.interval);
        this.mouseEvent();
        this.btnEvent();
        this.binEventForLis();
    }
};





