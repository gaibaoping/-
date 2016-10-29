var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function(request,response){
    var obj = url.parse(request.url,true),
        pathname = obj.pathname,
        query = obj.query;
    //前端路由：根据客户端请求资源的不同，返回对应的不同内容
    //'.'+pathname的前提条件是：server.js必须在当前项目的根目录下，这样./才是当前的项目目录，我们才会找到对应的资源文件
    //如果请求的是项目资源文件（HTML/CSS/JS/PNG/GIF...），我们统一使用下面的操作进行处理即可
    var reg = /\.([a-z]+)/i;
    if(reg.test(pathname)){
        //获取当前请求资源文件的后缀名，通过后缀名获取到对应的MIME类型
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
                suffixMIME = 'text/js';
                break;
        }
        try{
            //加TRY CATCH的目的：如果当前请求的资源文件不存在的话，我们不让服务器报错，而是返回一个不存在的提示即可，这样保证服务不会因为错误而终止
            var conFile = fs.readFileSync('.'+pathname,'utf-8');
            response.writeHead(200,{'content-type':suffixMIME+';charset=utf-8;'});
            response.end(conFile);
        } catch(e){
            //第一个参数是告诉客户端返回的状态码：200是成功  404是资源文件不存在
            //第二个参数是配置响应头，其中content-type是告诉客户端返回内容的格式类型:'MIME;ENCODING'
            response.writeHead(404,{'content-type':'text/plain'});
            response.end('request file is not found!');
        }
    }
    //这样做完后在谷歌浏览器下没有问题，但是在IE下还是有问题：虽然请求的内容都返回了，但是我们返回的是从文件中获取的字符串，IE下不能识别这些字符串是CSS还是JS
    /*if(pathname === '/0 animation语法.html'){
        var conFile = fs.readFileSync('./0 animation语法.html','utf-8');
        response.write(conFile);
        response.end();
    }
    if(pathname == '/css/index.css'){
        var cssFile = fs.readFileSync('./css/index.css','utf-8');
        response.write(cssFile);
        response.end();
    }*/
});
server1.listen(82,function(){
    console.log('server is success,listening on 80 port');
});