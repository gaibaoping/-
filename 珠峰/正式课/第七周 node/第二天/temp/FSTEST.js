var fs = require('fs');
//读取文件中的内容
//readFile:异步读取内容，不管内容是否读取完成继续执行下面的事情（无阻塞I/O操作）
//readFileSync:同步读取内容，只有当内容都读取完成后，我们才能进行下面的操作
var res = fs.readFileSync('./0 animation语法.html','UTF-8');
console.log(res);

//往指定的文件中写入内容
//fs.writeFile:异步写入
//fs.writeFileSync([pathname],[content],[encoding]):同步写入
//写入
