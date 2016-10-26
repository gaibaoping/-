var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function(request,response){
    //当客户端向当前80这个服务发送请求，就会触发本回调函数执行
    //request:存储了客户端的全部请求信息
    //response:提供了一系列的方法供服务器端向客户端返回内容

    //获取客户端请求的URL地址，并且把地址进行解析
    //pathname:请求资源文件的路径和名称（会在最前面加一个/）
    //query:存储的是客户端问号传递过来的所有参数值，如果url.parse第二个参数为true的话，存储的值都是以对象键值对的方式存储的
    var obj = url.parse(request.url,true),
        pathname = obj.pathname,
        query = obj.query;

    //判断请求的是否为index.html，如果是的话，我们把index.html中的源代码得到，通过response.end返回给客户端，但是不要忘记，我们还需要重新写响应头
    //统一处理资源文件html/css/js/img的请求
    var reg = /\.([a-zA-Z]+)/i;
    if(reg.test(pathname)){
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix){
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                    break;
            case 'JS':
                suffixMIME = 'text/javaScript';
                break;
        }
        try{
            var conFile = fs.readFileSync('.'+pathname,'utf8');
            response.writeHead(200,{'content-type':suffixMIME+';charset=utf-8;'});
            response.end(conFile);
        }catch(e){
            response.writeHead(404,{'content-type':'text/plain;charset=uft-8;'});
            response.end('Not Found!');
        }

    }
    /*if(pathname == '/0 animation语法.html'){
        var conFile = fs.readFileSync('./0 animation语法.html','utf8');
        response.writeHead(200,{'content-type':'text/html;charset=utf-8;'})
        response.end(conFile);
    }
    if(pathname == '/css/test.css'){
        conFile = fs.readFileSync('./css/test.css','utf8');
        response.writeHead(200,{'content-type':'text/css;charset=utf-8;'})
        response.end(conFile);
    }*/

});
server1.listen(88,function(){
    console.log('服务创建成功，正在监听80端口');
});
