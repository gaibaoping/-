var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function(request,response){
    var obj = url.parse(request.url,true),
        pathname = obj.pathname,
        query = obj.query;
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
                suffixMIME = 'text/javascript';
                break;
        }
        var conFile = 'NOT FOUND';
        var code = 404;
        try{
            conFile = fs.readFileSync('.'+pathname,'utf-8');
            code = 200;
        }catch(e){}
        response.writeHead(code,{'content-type':suffixMIME+';charset=utf-8;'});
        response.end(conFile);
        return ;
    }

    var customData = fs.readFileSync('./json/userList.json','utf-8');
    customData = JSON.parse(customData);
    if(pathname == '/getList'){
        var n = query['page'],
            result = {
                total:Math.ceil(customData.length/10),
                data:[]
            };
        for(var i = (n-1)*10; i <= (n*10-1); i++){
            if(i>customData.length-1)break;
            result.data.push(customData[i]);
        }
        response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }
    if(pathname == '/getInfo'){
        var id = query['id'];
        result = null;
        customData.forEach(function(item,index){
            if(item.id == id){
                result = item;
                return false;
            }
        });
        response.writeHead(200,{'content-type':'application/json;charset:utf-8;'});
        response.end(JSON.stringify(result));
    }

});
server1.listen(82,function(){
    console.log('正在成功监听82端口');
});