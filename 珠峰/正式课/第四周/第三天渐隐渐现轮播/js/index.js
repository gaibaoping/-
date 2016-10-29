var banner=document.getElementById('banner');
var bannerInner=utils.getElesByClass('bannerInner',banner)[0];
var focusList=utils.getElesByClass('focusList',banner)[0];
var imgs=banner.getElementsByTagName('img');
var lis=focusList.getElementsByTagName('li');
var leftBtn=utils.getElesByClass('left',banner)[0];
var rightBtn=utils.getElesByClass('right',banner)[0];
console.log(rightBtn);
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
})();
//������
(function bindData(){
    if(window.data){
        var str='';
        var strLis='';
        for(var i=0;i<data.length;i++){
            var curData=data[i];
            str+='<div><img src="" real="'+curData.src+'"/></div>';
            strLis+=i===0?'<li class="selected"</li>':'<li></li>';
        }
        bannerInner.innerHTML=str;
        focusList.innerHTML=strLis;
    }
})();
window.setTimeout(imgDelayLoad,300);
function imgDelayLoad(){
    for(var i=0;i<imgs.length;i++){
        if(i==0){
            utils.css(imgs[i].parentNode,'zIndex',1);
            animate(imgs[i].parentNode,{opacity:1},300);
        }
        (function(i){
            var curImg=imgs[i];
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
}
//�Զ��ֲ�
var step=0;
var timer=window.setInterval(autoMove,1000);
function autoMove(){
    if(step==data.length-1){
        step=-1;
    }
    step++;
    for(var i=0;i<imgs.length;i++){
        //������ͼƬ������ֵ��step��ֵ��ȵ���һ����������߲㼶�������Ķ�����Ϊz-indexΪ0
        if(step==i){
            utils.css(imgs[i].parentNode,'zIndex',1);//��������zIndexΪ1
            //���̰Ѹող㼶����������ͼƬ��͸���ȴ�0������1
            animate(imgs[i].parentNode,{opacity:1},300,function(){
                var siblings=utils.siblings(this);//�ѳ��˸ո���ʾ����ͼƬ�ĸ���div�������ֵܽڵ�ȫ����͸��������Ϊ0��Ϊ�˱�֤��һ�εĽ���Ч��
                for(var i=0;i<siblings.length;i++){
                    utils.css(siblings[i],'opacity',0);
                }
            });
        }else{
            utils.css(imgs[i].parentNode,'zIndex',0);
        }
        lis[i].className=i===step?'selected':'';
    }
}


banner.onmouseover=function(){
    window.clearInterval(timer);
    leftBtn.style.display=rightBtn.style.display='block';
};
banner.onmouseout=function(){
    timer=window.setInterval(autoMove,1000);
    leftBtn.style.display=rightBtn.style.display='none';
};
//�����л�
leftBtn.onclick=function(){
    if(step==0){
          step=data.length;
    }
    step-=2;
    autoMove();
};
rightBtn.onclick=autoMove;
//��������¼�
(function binEventForLis(){
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            step=this.index-1;
            autoMove();
        }
    }
})();
