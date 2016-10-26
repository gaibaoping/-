var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    /*
     * request:�洢�˿ͻ��������ȫ����Ϣ
     *   request.url:�洢�ͻ�������ĵ�ַ�������ַ�а����������ļ���Ŀ¼�����Լ��ʺź��������
     * response���ṩ����صķ������Ը��ͻ��˷�������
     * */
    //console.log(request.url);
    var urlObj = url.parse(request.url, true),
        pathname = urlObj['pathname'],//�����ļ���Ŀ¼������
        query = urlObj['query'];//�ͻ����ʺź��洫�ݸ���������ֵ
    //����������0 animation语法.html�Ļ�������������Ҫ��0 animation语法.html
    //console.log(pathname);

    //����������0 animation语法.html�Ļ�������������Ҫ��0 animation语法.html�е����ݻ�ȡ����Ȼ��ѻ�ȡ�����ݷ��ظ��ͻ���
    if (pathname === '/0 animation语法.html') {
        var conFile = fs.readFileSync('./0 animation语法.html', 'utf-8');
        response.write(conFile);
        response.end();
    }
});
server1.listen(88, function () {
    console.log('server is success,listening on 80 port!');
});
