var box = document.getElementById('box');
var obj = window.location.href.split('=')[1];
var fn = function (result){
    var str = '<ul><li style="text-align: center;font-size: 20px">详细信息</li>';
    str += '<li>编号：'+result['id']+'</li>';
    str += '<li>姓名：'+result['name']+'</li>';
    str += '<li>性别：'+(result['sex']==0?"女":"男")+'</li>';
    str += '<li>分数：'+result['score']+'</li>';
    str += '</ul>';
    box.innerHTML = str;
};
if(obj){
    ajax({
        url:'/getInfo?id='+obj,
        type:'GET',
        dataType:'JSON',
        success:fn
    });
}
