/*var xhr = new XMLHttpRequest();
xhr.open('get','/getAllList');
xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
        console.log(xhr.responseText);
    }
};
xhr.send(null);*/

//进入首页的第一件事情：从服务器端获取全部的客户信息，然后展示在页面中
~function(){
    var customList = document.getElementById('custom-list');
    //console.log(ul);
    ajax({
    url:'/getAllList',
    type:'GET',
    dataType:'JSON',
    success:function(result){
        //result就是我们需要获取的数据，API文档中编写了数据格式的样子，接下来按照获取的数据实现HTML的绑定即可（字符串拼接）
        //console.log(result);
        if(result&&result['code']==0){
            var data = result['data'];
            //数据绑定
            bindHTML(data);
            //删除：事件委托
            bindDelete();
        }
    }
});
    function bindHTML(data){
        var str = '';
    for(var i = 0, len = data.length; i < len; i++){
        var curData = data[i];
        /*str+='<li><span class="w50">'+curData['id']+'</span><span class="w150">'+curData['name']+'</span><span class="w50">'+curData['age']+'</span><span class="w200">'+curData['phone']+'</span><span class="w200">'+curData['address']+'</span><span class="w150 control"><a href="">修改</a> <a href="">删除</a></span></li>'*/
        str += '<li>';
        str += '<span class="w50">'+curData['id']+'</span>';
        str += '<span class="w150">'+curData['name']+'</span>';
        str += '<span class="w50">'+curData['age']+'</span>';
        str += '<span class="w200">'+curData['phone']+'</span>';
        str += '<span class="w200">'+curData['address']+'</span>';
        str += '<span class="w150 control">';
        str += '<a href="detail.html?id='+curData.id+ '">修改</a>';
        //数据绑定的时候我们把客户的ID存储到元素的自定义属性上，这样以后再操作这个元素如果需要知道对应的客户ID，我们直接在自定义属性上获取即可（JS中自定义属性的解决方法是最伟大的思想）
        str += '<a href="javascript:;" data-id="'+curData.id+'">删除</a>';
        str += '</span>';
        str += '</li>';
    }
    customList.innerHTML = str;
}
    function bindDelete(){
    customList.onclick = function(e){
        e = e || window.event;
        if(e.target.nodeName=='A'){
            if(e.target.innerHTML == '删除'){
                var customId = e.target.getAttribute('data-id');
                //window.alert('确定删除吗');
                var flag = window.confirm('您确定要删除编号为[N]的客户吗');
                //window.prompt('确定删除吗');
                if(flag){
                    ajax({
                        url:'/removeInfo?id='+customId,
                        type:'GET',
                        dataType:'json',
                        success:function(result){
                            if(result&&result['code']==0){
                                customList.removeChild(e.target.parentNode.parentNode);
                            }
                        }
                    });
                }

            }
        }

    };
}
}();

