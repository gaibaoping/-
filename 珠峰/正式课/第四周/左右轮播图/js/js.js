var banner=document.getElementById('banner');
var bannerInner=utils.getElesByClass('bannerInner',banner)[0];
//�������е�ͼƬ�����ĺ���
var focusList=utils.getElesByClass('focusList',banner)[0];
var lis=focusList.getElementsByTagName('li');
//���н���ul
var leftBtn=utils.getElesByClass('left',banner)[0];
var rightBtn=utils.getElesByClass('right',banner)[0];
//��ȡ����
(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data?_='+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            window.data=utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
    /*console.log(xhr.responseText);
     console.log(data);*/
})();
//������
//<div><img src="img/banner1.jpg"/></div>
//<li class="selected"></li>
(function binData(){
    if(window.data){
        var str='';//ƴ������ͼƬ
        var liStr='';//ƴ�����е�li
        for(var i=0;i<data.length;i++){
            str+='<div><img src="" real="'+data[i].src+'"/></div>';
            liStr+=i==0?'<li class="selected"></li>':'<li></li>';
        }
    }
    str+='<div><img src="" real="'+data[0].src+'"/></div>';
    //Ϊ����ҳ���ڴ��Ӿ��Ͽ��������޷첥�ţ���ô��Ҫ�����һ�ź͵�һ��ͼƬ��ȫһ����ͼƬ��ĩβ
    //��Ҫ�޸�bannerInner�Ŀ�ȣ���֤���һ��ͼƬ�ܺ�������
    utils.css(bannerInner,'width',(data.length+1)*1000);//
    bannerInner.innerHTML=str;
    focusList.innerHTML=liStr;

})();
//ͼƬ�ӳټ���
var imgs=bannerInner.getElementsByTagName('img');//����ͼƬ
console.log(imgs);
function imgsDelayLoad(){
    console.log(1);
    for(var i=0;i<imgs.length;i++){
        (function(i){//��ӱհ������ڵ�onload�ɹ���ʱ��i��ֵ�Ѿ���������ֵ
            var curImg=imgs[i];
            var tempImg=new Image;
            tempImg.src=curImg.getAttribute('real');
            tempImg.index=i;
            tempImg.onload=function(){
                curImg.src=this.src;
                utils.css(curImg,'display','block');
                animate(curImg,{opacity:1},200);
            }
        })(i);//�����к���
        /*//�Զ�������
        var curImg=imgs[i];
        var tempImg=new Image;
        tempImg.src=curImg.getAttribute('real');
        tempImg.index=i;
        tempImg.onload=function(){
            imgs[this.index].src=this.src;
            utils.css(imgs[this.index],'display','block');
            animate(imgs[this.index],{opacity:1},200);
        }*/
    }
}
window.setTimeout(imgsDelayLoad,300);


//�ֲ�ͼ
var timer=window.setInterval(autoMove,2000);//2sִ��һ��autoMove����
var step=0;//��ǰ��ʾͼƬ������ֵ��Ĭ���ǵ�һ����ʾ
function autoMove(){
    if(step==data.length){
        step=0;
        utils.css(bannerInner,'left',-1000*step);
    }
    step++;//step++֮���ֵ��������һ��Ҫ�˶������յ㣨�Ǹ���step*-1000������ģ�
    //��step��ֵΪ3��ʱ�������ͼƬ��ʾ
    /*if(step==4){
        step=0;
        utils.css(bannerInner,'left',0);
        return;
    }*/
    animate(bannerInner,{left:-1000*step},300);
    focusAlign();
}
//������� �����ѡ�б�������step���仯��step��ֵ�ͽ��������ֵ��ͬ�Ĳ����ѡ����ʽ�������Ƴ�ѡ����ʽ
function focusAlign(){
    var tempStep=step==data.length?0:step;//����������ͼƬ�����ǽ���ֻ���ĸ������Ե�������ͼƬ��ʾ���Ӿ����ǵ�һ��ͼƬ����������Ӧ����lis[0]���Ǹ�����ѡ�С�
    //���step��ֵΪ4��ʱ�����������޸ĳ�0
    for(var i=0;i<lis.length;i++){
        lis[i].className=i===tempStep?'selected':'';
    }
}
//�����ͣ���ֲ�ͼ�ϵ�ʱ����Ҫֹͣ����
banner.onmouseover=function(){
    window.clearInterval(timer);
    leftBtn.style.display=rightBtn.style.display='block';
};
banner.onmouseout=function(){
    timer=window.setInterval(autoMove,2000);
    leftBtn.style.display=rightBtn.style.display='none';
};
//�����л�
leftBtn.onclick=function(){
    if(step==0){
        step=data.length;
        utils.css(bannerInner,'left',-1000*step);
    }
    step--;
    animate(bannerInner,{left:-1000*step},500);
    focusAlign();
};
rightBtn.onclick=autoMove;
//��������¼�

(function binEventForLis(){
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            step=this.index;//�����һ������Ͱѽ����Ӧ������ֵ��ֵ��ȫ�ֵ�step����������������ǿ�����һ����һ��ͼƬ��ʾ��
            //�����step��ֵ�����޸�Ҳ��Ϊ�˱�֤�´��Զ��ֲ���ʱ�򣬴������������л�������ͼƬ��ʼ
            animate(bannerInner,{left:-1000*step},500);
            focusAlign();
        }
    }
})();
