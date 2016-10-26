var searchRender = (function () {
    var $searchInp = $('#searchInp'),
        $searchList = $('#searchList');
    function inpEven(){
        var val = $(this).val();
        if(val.length === 0){
            //没有输入内容：让UL收起
            $searchList.stop().slideUp(100);
            return;
        }
        $.ajax({
            url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+val,
            type:'get',
            dataType:'jsonp',
            jsonp:'cb',
            //jsonpCallback:'search',
            success:function(result){
                if(!result){
                    return;
                }
                var data = result['s'];
                if(data.length == 0){
                    //没有获取到匹配的结果：收起UL
                    $searchList.stop().slideUp(100);
                    return;
                }
                //获取了匹配的内容：绑定LI，展开UL
                var str = '';
                $.each(data,function(index,item){
                    if(index > 3)return false;
                    str += '<li>'+item+'</li>';
                });
                $searchList.html(str).stop().slideDown(100);
            }
        })
    }
    return {
        init:function () {
            //给文本框的获取焦点和输入内容事件绑定方法：当操作的时候，如果文本框中有内容，我们向百度的服务器发送一个JSONP请求，把用户输入的内容传递给百度，百度返回对应的推荐结果；如果有推荐的结果，我们展示UL，没有的我们隐藏UL；
            $searchInp.on('focus keyup',inpEven);
            //点击不同的位置实现不同的操作（事件委托，委托给body来处理）：点击的是文本框什么都不做，如果点击的是UL下面的LI，我们不仅要隐藏UL，还要把LI中的内容复制到文本框中，如果点击的是其他区域只需要隐藏UL即可
            $('body').on('click',function(ev){
                var tar = ev.target,
                    tarTag = tar.tagName.toUpperCase();
                //INPUT
                if(tarTag === 'INPUT' && tar.id === 'searchInp'){
                    return;
                }
                //LI
                if(tarTag === 'LI' && tar.parentNode.id === 'searchList'){
                    $searchInp.val(tar.innerHTML);
                    $searchList.stop().slideUp(100);
                    return;
                }
                //OTHER
                $searchList.stop().slideUp(100)
            })
        }
    }
})();
searchRender.init();