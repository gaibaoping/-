var url = require('url');
var res = url.parse('http://www.zhufengpeixun.cn:80/0 animation语法.html?name=zf&age=80#aa');
console.log(res);
/*
{
    protocol: 'http:', ����Э��
    slashes: true, б�ߣ��Ƿ���б�� TRUE����
    auth: null, ����
    host: 'www.zhufengpeixun.cn:80', ����+�˿ں�
    port: '80', �˿ں�
    hostname: 'www.zhufengpeixun.cn', ����
    hash: '#aa', ��ϣֵ
    search: '?name=zf&age=80', �ʺż����ݵ�ֵ
    query: 'name=zf&age=80', ���ݵ�ֵ
    pathname: '/0 animation语法.html', ������Դ��Ŀ¼���ƣ����ַ�������ǰ����һ����б�ܣ�
    path: '/0 animation语法.html?name=zf&age=80',  pathname+search
    href: 'http://www.zhufengpeixun.cn:80/0 animation语法.html?name=zf&age=80#aa' �ҽ�����������URl��ַ
}
*/

var res = url.parse('http://www.zhufengpeixun.cn:80/0 animation语法.html?name=zf&age=80#aa',true);
console.log(res);
/* {
 protocol: 'http:',
 slashes: true,
 auth: null,
 host: 'www.zhufengpeixun.cn:80',
 port: '80',
 hostname: 'www.zhufengpeixun.cn',
 hash: '#aa',
 search: '?name=zf&age=80',
 query: { name: 'zf', age: '80' },
 pathname: '/0 animation语法.html',
 path: '/0 animation语法.html?name=zf&age=80',
 href: 'http://www.zhufengpeixun.cn:80/0 animation语法.html?name=zf&age=80#aa' }*/

//query: { name: 'zf', age: '80' },�ڵڶ�������дtrue�Ļ��Ͳ�д�����𣺲�дtrue��query���Ի�ȡ��ֵ����һ���ַ���������true֮�����ַ����Զ��Ľ���Ϊһ�����󣬶����������������ֵ�ֱ������Ǵ��ݵ�����