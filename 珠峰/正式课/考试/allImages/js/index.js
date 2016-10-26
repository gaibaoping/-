var uls=utils.getElesByClass('uls',document)[0];
(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            window.data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
(function binData(){
    if(data){
        var str='';
        for(var i=0;i<data.length;i++){
            str+='<li><div><img src="" real='+data[i].src+'/></div></li>';
        }
        uls.innerHTML=str;
    }
})();

var images=document.getElementsByTagName('img');
console.log(images);
window.onscroll=allImages;
window.setTimeout(allImages,500);
function allImages(){
    for(var i=0;i<images.length;i++){
        var curImg=images[i];
        var a=utils.win('scrollTop')+utils.win('clientHeight');
        var b=utils.offset(curImg.parentNode).top+curImg.parentNode.offsetHeight;
        if(curImg.loaded){continue;}
        if(a>b){
            var tempImg=new Image;
            tempImg.src=curImg.getAttribute('real');
            tempImg.index=i;
            tempImg.onload=function(){
                images[this.index].src=this.src;
                images[this.index].style.display='block';
            };
            curImg.loaded=true;
            fadeIn(curImg);
        }
    }
}
function fadeIn(img){
        var opacityVal=parseFloat(window.getComputedStyle(img,null).opacity);
        img.timer=window.setInterval(function(){
            opacityVal+=0.1;
            if(opacityVal>=1){
                window.clearInterval(img.timer);
                return;
            }
            img.style.opacity=opacityVal;
        },10);
}
