var list = document.getElementById('list'),
    obj = window.location.href,
    id = obj.split('=')[1];
function bindHtml(){
    function fn(result){
        var str = '';
        str += '<li>编号：'+result['id']+'</li>';
        str += '<li>姓名：'+result['name']+'</li>';
        str += '<li>性别：'+(result['sex']==0?'男':'女')+'</li>';
        str += '<li>分数：'+result['score']+'</li>';
        list.innerHTML = str;
    }
    ajax({
        url:'/getInfo?id='+id,
        type:'GET',
        dataType:'JSON',
        success:fn
    })
}
bindHtml();