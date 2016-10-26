var pageRender = (function(){
    var box = document.getElementById('box'),
        list = document.getElementById('list'),
        pageNum = document.getElementById('pageNum'),
        pageInp = document.getElementById('pageInp');
    var total = 0,
        page = 1;

    //bindHTML：从服务器获取指定页数的数据，然后实现数据绑定
    function bindHTML(){
        var fn = function (result){
            if(!result) return;
            total = parseInt(result['total']);
            var data = result['data'];

            //List
            var str = '';
            for(var i = 0, len = data.length; i < len; i++){
                var curData = data[i];
                str += '<li data-id="'+curData['id']+'">';
                str += '<span>'+curData['id']+'</span>';
                str += '<span>'+curData['name']+'</span>';
                str += '<span>'+(curData['sex']===1?'女':'男')+'</span>';
                str += '<span>'+curData['score']+'</span>';
                str += '</li>'
            }
            list.innerHTML = str;

            //Page Num
            str = '';
            for(var k =1; k <= total; k++){
                if(k === page){
                    str += '<li class="bg">'+k+'</li>';
                    continue;
                }
                str += '<li>' +k+ '</li>'
            }
            pageNum.innerHTML = str;

            //Page Inp
            pageInp.value = page;
        };
        ajax({
            url:'/getList?page='+page,
            type:'GET',
            dataType:'JSON',
            success:fn
        });
    }

    //bindEvent:使用事件委托处理盒子中的点击事件
    function bindEvent(ev){
        ev = ev || window.event;
        var tar = ev.target || ev.scrElement,
            tarTag = tar.tagName.toUpperCase(),
            tarInn = tar.innerHTML;

        //List Span:跳转到详细页并且把用户的ID传递给详情页
        if(tarTag == 'SPAN' && tar.parentNode.parentNode.id == 'list'){
            window.open('detail.html?id=' + tar.parentNode.getAttribute('data-id'));
            return;
        }
        //Page Span:计算出最新的page值后重新的绑定数据即可
        if(tarTag == 'SPAN' && tar.parentNode.className == 'page'){
            if(tarInn == 'FIRST'){
                if (page == 1) return;
                page = 1;
            }
            if(tarInn == 'PREV'){
                if(page == 1) return;
                page--;
            }
            if(tarInn == 'NEXT'){
                if(page == total) return;
                page++;
            }
            if(tarInn == 'LAST'){
                if(page == total) return;
                page = total;
            }
            bindHTML();
        }
        //Page Num Li:点击的是谁，就让当前页等于里面的内容，并且重新绑定数据
        if(tarTag == 'LI' && tar.parentNode.id == 'pageNum'){
            if(page == parseInt(tarInn)) return;
            page = parseInt(tarInn);
            bindHTML();
        }
    }
    return {
        init: function(){
            //开始加载页面就需要做一次数据绑定，展示第一页的内容
            bindHTML();

            //使用事件委托处理盒子中的点击事件
            box.onclick = bindEvent;

            //文本框按下键盘事件处理
            pageInp.onkeyup = function (ev){
                ev = ev || window.event;
                if(ev.keyCode === 13){//Enter
                    var val = Math.round(this.value);
                    //如果输入的不是有效数字：依然显示当前页
                    if(isNaN(val)){
                        this.value = page;
                        return;
                    }
                    //如果输入的值小于第一页或者大于最后一页
                    val < 1 ? val = 1: null;
                    val > total ? val = total : null;
                    page = val;
                    bindHTML();
                }
            };

                //List span : 跳转详细页并且把用户的ID传递给详情页

        }
    }
})();
pageRender.init();
