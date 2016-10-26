var uls=utils.getElesByClass('uls',document)[0];
(function binData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/2\d{2}/.test(xhr.status)){
            window.data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
(function binData(){
    if(data){
        var str='';
        for(var i=0;i<data.length;i++){
            str+='<li><div><img src="" real='+data[i].src+'></div><div><h2>'+data[i].little+'</h2><p>'+data[i].nave+'</p></div></li>';
        }
        uls.innerHTML=str;
    }
})();
var imgs=document.getElementsByTagName('img');
console.log(imgs);
window.onscroll=allImages;
window.setTimeout(allImages,500);
function allImages(){
  for(var i=0;i<imgs.length;i++){
      var curImg=imgs[i];
      var a=document.documentElement.clientHeight+document.body.scrollTop;
      var b=curImg.parentNode.offsetHeight+utils.offset(curImg.parentNode).top;
      if(curImg.loaded){continue;}
      if(a>b){
          var tempImg=new Image;
          tempImg.src=curImg.getAttribute('real');
          tempImg.index=i;
          tempImg.onload=function(){
              imgs[this.index].src=this.src;
              imgs[this.index].style.display='block';
          };
          curImg.loaded=true;
          fadeIn(curImg);
      }
  }
}
function fadeIn(img){
    var opacityVal=parseFloat(window.getComputedStyle(img,null).opacity);
    img.timer=window.setInterval(function(){
        if(opacityVal>=1){
            window.clearInterval(img.timer);
        }
        opacityVal+=0.01;
        img.style.opacity=opacityVal;
    },10)
}