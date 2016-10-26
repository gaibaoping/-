var pageRender = (function(){
    var box = document.getElementById('box'),
        list = document.getElementById('list'),
        pageNum = document.getElementById('pageNum'),
        pageInp = document.getElementById('pageInp');
    var total = 0,
        page = 1;
    function bindHTML(){
        var fn = function (result){
            if(!result) return;
            total = parseInt(result['total']);
            var data = result['data'];
            var str = '';
            for(var i = 0,len = data.length; i < len; i++){
                var curData = data[i];
                str += '<li data-id="'+curData['id']+'">';
                str += '<span>'+curData['id']+'</span>';
                str += '<span>'+curData['name']+'</span>';
                str += '<span>'+(curData['sex']==0?'男':'女')+'</span>';
                str += '<span>'+curData['score'];
                str += '</li>';
            }
            list.innerHTML = str;

            str = '';
            for(var k =1; k <= total; k++){
                if(k == page){
                    str += '<li class="bg">'+k+'</li>';
                    continue;
                }
                str += '<li>'+k+'</li>';
            }
            pageNum.innerHTML = str;
            pageInp.value = page;
        };
        ajax({
            url:'/getList?page='+page,
            type:'GET',
            dataType:'json',
            success:fn
        });
    }

    function bindEvent(ev){
        ev = ev || window.event;
        var tar = ev.target || ev.srcElement,
            tarTag = tar.tagName.toUpperCase(),
            tarInn = tar.innerHTML;
        if(tarTag=='SPAN'&&tar.parentNode.parentNode.id == 'list'){
            window.open('detail.html?id='+tar.parentNode.getAttribute('data-id'));
            return;
        }
        if(tarTag == 'SPAN'&&tar.parentNode.className=='page'){
            switch (tarInn){
                case '首页':
                    if(page==1) return;
                    page=1;
                    break;
                case '上一页':
                    if(page==1) return;
                    page--;
                    break;
                case '下一页':
                    if(page==total)return;
                    page++;
                    break;
                case '尾页':
                    if(page==total)return;
                    page=total;
            }
            bindHTML();
        }
        if(tarTag=='LI'&&tar.parentNode.id=='pageNum'){
            if(page == parseInt(tarInn))return;
            page = parseInt(tarInn);
            bindHTML();
        }
    }

    function keyUp(ev){
        ev = ev || window.event;
        if(ev.keyCode == 13){
            var val = Math.round(this.value);
            if(isNaN(val)){
                this.value = page;
                return;
            }
            val<1?val=1:null;
            val>total?val=total:null;
            page =val;
            bindHTML();
        }
    }
    return{
        init:function(){
            bindHTML();
            box.onclick = bindEvent;
            pageInp.onkeyup = keyUp;
        }
    }
})();
pageRender.init();

