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
    function formatTime(template){
        template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
        var ary = this.match(/\d+/g);
        template = template.replace(/\{(\d+)\}/g,function(){
            var n = arguments[1],
                res = ary[n]||'00';
            res.length<2?res = '0'+res:null;
            return res;
        });
        return template;
    }
    pro.queryURLParameter = queryURLParameter;
    pro.formatTime = formatTime;
}(String.prototype);
var str = '2016-12-21 12:25:30';
console.log(str.formatTime('{3}-{4}'));


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
                calendarRender.init($(this).attr('data-id'));
            });
            var calendarRender = (function(){
                var calendarPlain = $.Callbacks();//制定一张计划表,add增加需要执行的方法，remove移除某个不需要执行的方法，fire通知计划表中的方法执行

                var $calendar = $('#calendar'),
                    $wrapper = $calendar.find('.wrapper'),
                    $link = null,
                    $btnLeft = $calendar.find('.btnLeft'),
                    $btnRight = $calendar.find('.btnRight');
                //数据绑定
                calendarPlain.add(function(today,data){
                    var $calendarTemplate = $('#calendarTemplate'),
                        templateText = $calendarTemplate.html();
                    var res = ejs.render(templateText,{calendarData:data});
                    $wrapper.html(res).css('width',data.length*110);
                    $link = $wrapper.children('a');
                    minL = (data.length);
                });

                //初始定位到今天日期的位置
                calendarPlain.add(function(today,data){
                    var $curLink = $link.filter('[data-time="'+today+'"]');//在所有的A中获取到代表今天日期的那一个A，如果不存在，说明今天日期没有比赛，我们需要找距离今天最近的后一天
                    if($curLink.length == 0){
                        today = today.replace(/-/g,'');
                        $link.each(function(index,item){
                            var itemItem = $(item).attr('data-time');
                            itemItem = itemItem.replace(/-/g,'');
                            if(itemItem - today>0){
                                today = itemItem;
                                return false;
                            }
                        });
                        //比较完成一圈后依然没有找到就选中最后一项即可
                        if($curLink.length===0){
                            $curLink = $link.eq($link.length-1);
                        }
                    }
                    $wrapper.css('left',-$curLink.index()*110+330);
                    $curLink.addClass('bg');

                    //定位好后，我们需要获取当前展示的这七个A对应的起始日期和结束日期，并且通过这个日期，让下面的数据动态的展示

                });

                //点击左右两个按钮切换日期
                calendarPlain.add(function(today,data){
                    $btnLeft.on('click',temp);
                    $btnRight.on('click',temp);
                    function temp(){
                        var curL = parseFloat($wrapper.css('left'));
                        $(this).hasClass('btnLeft')?curL += 770:curL -= 770;
                    }
                });


                return {
                    init:function(columnId){
                        columnId = columnId||100000;
                        //从腾讯的服务器获取到需要展示的日期数据
                        $.ajax({
                            url:'http://matchweb.sports.qq.com/kbs/calendar?callback=calendar&columnId='+columnId,
                            type:'get',
                            dataType:'jsonp',
                            jsonpCallback:'calendar',
                            success:function(result){
                                if(result && result['code']==0){
                                    //数据解析/数据的重构
                                    var data = result['data'],
                                        today = data['today'];
                                    data = data['data'];
                                    //开始处理具体的业务逻辑
                                    calendarPlain.fire(today,data);
                                }
                            }
                        })
                    }
                }
            })();
            calendarRender.init($curMenu.attr('data-id'));
        }
    }
})();
menuRender.init();