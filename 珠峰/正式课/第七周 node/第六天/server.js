var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function(request,response){
    var obj = url.parse(request.url,true),
        pathname = obj.pathname,
        query = obj.query;
    if(pathname === '/getAll'){
        var callback = query['cb'];//获取客户端传递进来的函数名
        var data = {
            name:'zf',
            age:8
        };
        var str = callback + '('+JSON.stringify(data)+')';//'fn({"name":"zf","age":8})'
        response.writeHead(200,{'content-type':'text/javascript;charset=utf-8'});
        response.end(str);
    }
});
server1.listen(86,function(){
    console.log('正在监听86端口');
});