/*基于String.prototype扩展字符串处理的常用方法*/
~function(pro){
    function queryURLParameter(){
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg,function(){
            obj[arguments[1]]=arguments[2];
        });
        reg = /#([^?=&#]+)/;
        if(reg.test(this)){
            obj['HASH'] = reg.exec(this)[1];
        }
        return obj;
    }
    pro.queryURLParameter = queryURLParameter;
}(String.prototype);


/*计算content区域的高度*/
~(function(){
    var $header = $('#header'),
        $content = $('#content'),
        $menu = $('#menu');
    computedHeight();
    function computedHeight(){
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var tarH = winH - $header.outerHeight() - 40;
        $content.css('height',tarH);
        $menu.css('height',tarH-2);
    }
    //window.onresize:当浏览器的窗口大小发生改变时触发这个事件
    $(window).on('resize',computedHeight);
})();

/*menu render*/
var menuRender = (function(){
    var $menu = $('#menu'),
        $menuList = $menu.find('a'),
        menuIScroll = null;

    return{
        init:function(){
            //每一次加载页面的时候，我们首先都会看一下URL地址栏后面是否存在哈希值，存在的话让哈希值对应的A有选中样式，不存在的话，让第一个A有选中样式即可
            var urlObj = window.location.href.queryURLParameter(),
                hash = urlObj['HASH']||'nba',
                $curMenu = $menuList.filter('[href="#'+hash+'"]');
            $curMenu.length===0?$curMenu = $menuList.eq(0):null;
            $curMenu.addClass('bg');

            //实现menu区域的局部滚动
            menuIScroll = new IScroll('#menu',{
                bounce:false,
                scrollbars:true,
                mouseWheel:true,
                fadeScrollbars:true
            });
            menuIScroll.scrollToElement($curMenu[0],300);//使当前的iscroll滚动区域
            //给MENU区域的每一个A绑定点击事件
            $menuList.on('click',function(){
                //控制当前URL的末尾加对应的哈希值（#xxx），以后再重新加载页面的时候如果有哈希值，我们就让哈希值对应的A有选中的样式=>这件事情不需要JS处理，只需要让每一个A的href加上#xxx即可
                //让当前点击的A有选中样式，让其余的A没有选中样式
                //$(this).addClass('bg').parent().siblings().children('a').removeClass('bg');
                var _this = this;
                $menuList.each(function(index,item){
                    if(this === _this){
                        $(_this).addClass('bg');
                        return;
                    }
                    $(this).removeClass('bg');
                });
                //控制右侧的内容跟着点击而改变

            })
        }
    }
})();
menuRender.init();