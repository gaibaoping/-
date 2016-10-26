var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj['pathname'],
        query = urlObj['query'];

    //->处理静态资源文件的请求
    var reg = /\.([a-z]+)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
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
        var conFile = 'file is not found!',
            status = 404;
        try {
            conFile = fs.readFileSync('.' + pathname, 'utf8');
            status = 200;
        } catch (e) {
            suffixMIME = 'text/plain';
        }
        response.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8;'});
        response.end(conFile);
        return;
    }

    //->处理客户端使用AJAX进行的数据请求:严格按照API接口文档中的规范实现对应的功能即可
    var customData = fs.readFileSync('./json/custom.json', 'utf-8');
    customData = customData.length === 0 ? '[]' : customData;
    customData = JSON.parse(customData);
    var result = {code: 1, msg: 'error', data: null};

    //->1)获取所有的客户信息
    if (pathname === '/getAllList') {
        if (customData.length > 0) {
            result = {
                code: 0,
                msg: 'success',
                data: customData
            };
        }
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }

    //->2)增加客户信息:在NODE中获取客户端请求主体中的内容,我们使用request.on('data')和request.on('end')两个事件处理
    if (pathname === '/addInfo') {
        var requestStr = '';
        request.on('data', function (chunk) {
            requestStr += chunk;
        });
        request.on('end', function () {
            requestStr = JSON.parse(requestStr);
            //->动态计算一个ID:原先的最大ID基础上加1即可
            requestStr['id'] = customData.length === 0 ? 1 : parseFloat(customData[customData.length - 1]['id']) + 1;
            customData.push(requestStr);
            fs.writeFileSync('./json/custom.json', JSON.stringify(customData), 'utf-8');
            result = {
                code: 0,
                msg: 'success'
            };
            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            response.end(JSON.stringify(result));
        });
        return;
    }

    //->3)修改客户信息
    if (pathname === '/updateInfo') {
        requestStr = '';
        request.on('data', function (chunk) {
            requestStr += chunk;
        });
        var flag = false;
        request.on('end', function () {
            requestStr = JSON.parse(requestStr);
            customData.forEach(function (item, index) {
                if (requestStr['id'] == item['id']) {
                    customData[index] = requestStr;
                    flag = true;
                    return false;
                }
            });
            fs.writeFileSync('./json/custom.json', JSON.stringify(customData), 'utf-8');
            result = {
                code: 0,
                msg: 'success'
            };
            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            response.end(JSON.stringify(result));
        });
        return;
    }

    //->4)获取指定的客户信息
    if (pathname === '/getInfo') {
        var customId = query['id'];
        customData.forEach(function (item, index) {
            if (item['id'] == customId) {
                result = {
                    code: 0,
                    msg: 'success',
                    data: customData[index]
                };
                return false;
            }
        });
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }

    //->5)删除客户信息
    if (pathname === '/removeInfo') {
        customId = query['id'];
        customData.forEach(function (item, index) {
            if (item['id'] == customId) {
                customData.splice(index, 1);
                fs.writeFileSync('./json/custom.json', JSON.stringify(customData), 'utf-8');
                result = {
                    code: 0,
                    msg: 'success'
                };
                return false;
            }
        });
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
    }
});
server1.listen(1234, function () {
    console.log('server is success,listing on 1234 port!');
});