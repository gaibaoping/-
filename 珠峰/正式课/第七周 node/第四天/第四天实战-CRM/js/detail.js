~function(pro){
    //queryURLParameter:把URL地址问号后面的参数值以对象键值对的方式保存下来
    function queryURLParameter(){
        var reg = /([^?&=#]+)=([^?&=#]+)/g,
            obj = {};
        this.replace(reg,function(){
            obj[arguments[1]]=arguments[2];
        });
        return obj;
    }
    pro.queryURLParameter = queryURLParameter;
}(String.prototype);


var detailRender = (function(){
    var submit = document.getElementById('submit');
    var customId = null,
        isUpdate = false;
    //bindEvent:绑定提交的点击事件
    function bindEvent(){
        submit.onclick = function(){
            //获取四个文本框中的内容
            //把获取的数据传递给服务器（AJAX请求）
            //根据获取的内容把需要传递给服务器的JSON格式的字符串准备好
            //发送AJAX请求
            //当请求成功后，根据服务器返回的结果做处理：如果增加成功回到首页，增加失败给用户一个提示即可
            var userName = document.getElementById('userName'),
                userAge = document.getElementById('userAge'),
                userPhone = document.getElementById('userPhone'),
                userAddress = document.getElementById('userAddress');
            if(isUpdate){
                //修改
                var str = '';
                str += '{"id":"'+customId+'","name":"'+userName.value+'",';
                str += '"age":"'+userAge.value+'",';
                str += '"phone":"'+userPhone.value+'",';
                str += '"address":"'+userAddress.value+'"}';
                ajax({
                    url:'/updateInfo',
                    type:'POST',
                    dataType:'json',
                    data:str,
                    success:function(result){
                        if(result&&result.code==0){
                            window.location.href = '0 animation语法.html';
                        }
                    }
                });
                return;
            }
            //添加
            var str = '';
            str += '{"name":"'+userName.value+'",';
            str += '"age":"'+userAge.value+'",';
            str += '"phone":"'+userPhone.value+'",';
            str += '"address":"'+userAddress.value+'"}';
            ajax({
                url:'/addInfo',
                type:'POST',
                dataType:'json',
                data:str,
                success:function(result){
                    if(result&&result.code==0){
                        //JS中实现页面跳转的方式
                        //window.location.href = 'xxx';在当前窗口打开新页面
                        //window.open('xxx');在新窗口打开页面
                        window.location.href = '0 animation语法.html';
                    }
                }
            });
        }
    }
    return {
        init:function(){
            //进入页面首先应该获取URL地址栏中的参数信息，如果有ID就是修改而不是增加，并且还需要知道修改的是哪一个客户（获取浏览器地址栏的UEL:window.location.href）
            //'http://localhost:1234/detail.html?id=4&age=25'->{id:4,age:25}类似于NODE中的URL.PARSE第二个参数写TRUE后得到的QUERY值
            var obj = window.location.href.queryURLParameter();
            if(typeof obj['id']!=='undefined'){
                isUpdate = true;
                customId = obj['id'];
                //如果是修改的话，我们首先需要把客户信息获取到，然后把信息存储到文本框中
                ajax({
                    url:'/getInfo?id='+customId,
                    type:'GET',
                    dataType:'json',
                    success:function(result){
                        if(result&&result.code==0){
                            var data=result.data;
                            userName.value=data.name;
                            userAge.value=data.age;
                            userAddress.value=data.address;
                            userPhone.value=data.phone;
                        }
                    }
                });
            }
            //绑定提交的点击事件
            bindEvent();
        }
    }
})();
detailRender.init();