var banner = document.getElementById('banner');
var bannerInner = utils.getElesByClass('bannerInner')[0];
var div = bannerInner.getElementsByTagName('div');
var focusList = utils.getElesByClass('focusList')[0];
var img = banner.getElementsByTagName('img');
var lis = focusList.getElementsByTagName('li');
var leftBtn = utils.getElesByClass('left')[0];
var rightBtn = utils.getElesByClass('right')[0];
console.log(rightBtn);
//��ȡ����
;(function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            window.data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
//������
(function bindData(){
    var str = '';
    var strLis = '';
    for (var i = 0;i < data.length;i++) {
        var curDta = data[i];
        str += '<div><img src="" real="'+curDta.src+'"/></div>';
        strLis += i===0?'<li class="selected"></li>':'<li></li>';
    }
    bannerInner.innerHTML = str;
    focusList.innerHTML = strLis;
})();
//ͼƬ�ӳټ���
window.setTimeout(imgDelayLoad,100);
function imgDelayLoad(){
    for (var i = 0;i<img.length;i++) {
        if(i == 0){
            utils.css(img[i].parentNode,'zIndex',1);
            animate(img[i].parentNode,{opacity:1},300);
        }
        (function(i){
            var curImg = img[i];
            var tempImg = new Image;
            tempImg.src = curImg.getAttribute('real');
            tempImg.onload = function(){
                curImg.src = this.src;
                utils.css(curImg,'display','block');
            };
        })(i)
    }
}
//�Զ��ֲ�
var step = 0;
var timer = window.setInterval(autoMove,1000);
function autoMove(){
    if(step==data.length-1){
        step = -1;
    }
    step++;
    for(var i = 0;i<img.length;i++){
        if(step == i){
            utils.css(img[i].parentNode,'zIndex',1);
            animate(img[i].parentNode,{opacity:1},300,function(){
                var siblings = utils.siblings(this);
                for(var i = 0;i < siblings.length;i++){
                    utils.css(siblings[i],'opacity',0);
                }
            });
        }else{
            utils.css(img[i].parentNode,'zIndex',0);
        }
        lis[i].className = i==step?'selected':'';
    }
}
//�������
banner.onmousemove = function(){
    window.clearInterval(timer);
    leftBtn.style.display = rightBtn.style.display = 'block';
};
banner.onmouseout = function(){
    timer = window.setInterval(autoMove,1000);
    leftBtn.style.display = rightBtn.style.display = 'none';
};
//�����л�
leftBtn.onclick = function(){
    if(step == 0){
        step = data.length;
    }
    step -= 2;
    autoMove();
};
rightBtn.onclick = autoMove;
//��������¼�
(function bindEventFocusList(){
    for(var i = 0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            step = this.index-1;
            autoMove();
        }
    }
})();