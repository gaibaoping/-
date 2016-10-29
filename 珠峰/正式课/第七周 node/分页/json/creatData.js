function ran(n,m){
    return Math.round(Math.random()*(m-n)+n);
}
var str1 = '王赵钱孙李周武郑冯陈楚卫蒋沈韩杨朱秦尤许何吕施张',
    str2 = '王赵钱孙李周武郑冯陈楚卫蒋沈韩杨朱秦尤许何吕施张';
var ary = [];
for(var i = 1; i <= 98; i++){
    var obj = {
        id:i,
        name:str1[ran(0,23)]+str2[ran(0,23)],
        sex:ran(0,1),
        score:ran(0,100)
    };
    ary.push(obj);
}
var fs = require('fs');
fs.writeFileSync('./userList.json',JSON.stringify(ary),'utf-8');