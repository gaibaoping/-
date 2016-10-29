//创建AJAX对象，兼容所有的浏览器，并且是使用惰性思想进行优化=>第一次执行方法，我们从头到尾的运行代码，判断当前浏览器下哪一种创建情况是兼容的，找到兼容的方法后比仅仅创建一个AJAX对象，而且还把之前的方法重写（重写成只有当前兼容情况创建的方式即可）
/**
 * createXHR:创建一个 AJAX对象
 * @parameter:null
 * @return:[object] AJAX example
 * by team on 2016/09/29
 */
function createXHR(){
    //ary中存储我们创建AJAX对象的四种方式，每一个都是一个小的函数
    var xhr = null,
        ary = [
            function(){
                return new XMLHttpRequest();
            },
            function(){
                return new ActiveXObject('Microsoft.XMLHTTP');
            },
            function(){
                return new ActiveXObject('Msxm12.XMLHTTP');
            },
            function(){
                return new ActiveXObject('Msxm13.XMLHTTP');
            }
        ];
    //循环ary中的每一项，每一项都是一创建方式的函数，我们让这些小函数一次执行
    for(var i = 0, len = ary.length; i < len; i++){
        var tempFn = ary[i];
        //使用try  catch捕获异常信息，如果执行某一个小函数报错了，说明当前的浏览器不兼容这种创建的方式，我们继续执行一个小函数即可；如果执行当前的这个小函数没有报错，说明浏览器兼容，我们除了获取到对应的AJAX实例以外，还需要把createXHR方法重写为当前的小函数，这样以后再执行createXHR，就相当于只执行重写后的小函数了（惰性思想）
        try{
            xhr = tempFn();
            createXHR = tempFn;
            break;
        }catch(e){

        }
    }
    return xhr;
}
/**
 * ajax:send ajax get data,this is a public method
 * @parameter
 *      options:[object] storage all parameters
 */
//我们当前要封装的方法，需要传递的参数值太多了，如果还是一个个形参变量来定义的话，以后执行这个方法的时候必须按照既定的顺序传递，再如果想让其中的某些参数有默认值，控制起来非常的麻烦，再并且我们目前制定的参数可能还不全呢...=>解决方案：只设定一个形参，这个形参是一个对象，把需要传递的内容都当作其属性名和属性值传递进，这样就不会受到顺序的限制了
function ajax(options) {
    var _default = {
        url: null,//请求的URL地址
        type: "GET",//请求的方式，默认是GET请求，如果以后执行方法需要使用的也是GET请求，则不需要在传递这个参数值了
        async: true,//同步还是异步，默认值是true异步
        dataType: 'TXT',//预先设定请求回来的内容的类型：TXT、XML、JSON，默认请求回来的结果是文本
        cache: true,//在GET请求方式下，我们走不走缓存数据，默认是true走缓存的
        timeout: null,//设置请求的超时时间，默认是不设定任何超时的
        data: null,//在POST请求中，需要传递给服务器的内容都放在DATA中，然后通过请求主体传递给服务，在GET请求中，我们把内容放到URL末尾传递给服务器
        headReceive: null,//当响应头信息接收成功后执行的事情[回调函数]
        success: null,//当响应主体内容接收成功后执行的事情[回调函数]
        error: null//当请求失败后执行的事情[回调函数]
    };
    //把options传进来的值替_default
    for(var key in options){
        if(options.hasOwnProperty(key)){//回去看第一周继承视频
            _default[key] = options[key];
        }
    }
    //开始AJAX处理
    var xhr = createXHR();
    if(/^(GET|HEAD|DELETE)$/i.test(_default.type)){
        //验证是否走缓存，如果cache设置的是false，我们需要清除GET系列的缓存，也就是需要在URL的末尾加随机数
        if(_default.cache===false){
            //首先验证之前的URL中是否存在？，存在的话我们追加的是&_=，不存在的话，我们追加的是?_=
            _default.url += _default.url.indexOf('?')===-1?'?_=':'&_=';
            _default.url += Math.random();
        }
        //处理data
        if(_default.data != null && Object.prototype.toString.call(_default.data)==='[object Object]'){
            var isOne = 0;
            for(var attr in _default.data){
                if(_default.data.hasOwnProperty(attr)){
                    isOne++;
                    if(isOne==1&&_default.url.indexOf('?')==-1){
                        _default.url += '?';
                    }else{
                        _default.url += '&'
                    }
                    _default.url += attr + '=' + _default.data[attr];
                }
            }
            _default.data = null;
        }
    }


    xhr.open(_default.type,_default.url,_default.async);
    //处理超时时间
    _default.timeout != null?xhr.timeout = _default.timeout:null;
    xhr.onreadystatechange = function(){
        if(/^(2|3)\d{2}$/.test(xhr.status)){
            if(xhr.readyState == 2){//响应头信息接收成功
                _default.headReceive && _default.headReceive.call(xhr);
            }
            if(xhr.readyState == 4){//响应主体信息接收成功
                var val = /^XML$/i.test(_default.dataType) ? xhr.responseXML : xhr.responseText;
                ///^JSON$/i.test(_default.dataType)?val=('JSON' in window? JSON.parse(val):eval('('+val+')'))
            }
        }
        if(/^(4|5)\d{2}$/.test(xhr.status)){
            if(typeof _default.error === 'function'){
                _default.error.call(xhr,xhr.responseText);
            }
        }
    };
    //处理请求主体的信息data:如果是post系列的话，我们需要把传递的对象转化为JSON格式的字符串然后在传递给服务器
    if(/^(POST|PUT)$/i.test(_default.type) && _default.data!=null && Object.prototype.toString.call(_default.data)==='[object Object]'){
        _default.data = JSON.stringify(_default.data);
    }
    xhr.send(_default.data);
}
