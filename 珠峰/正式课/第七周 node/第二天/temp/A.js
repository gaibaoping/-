function sum(){
    var total = null;
    [].forEach.call(arguments,function(item,index){
        item = Number(item);
        if(!isNaN(item)){
            total+=item;
        }else{total = null;}
    });
    /*for(var i = 0;i<arguments.length;i++){
     var cur = Number(arguments[i]);
     if(!isNaN(cur)){
     total+=arguments[i];
     }
     }*/
    return total;
}
//module��NODE�����Դ���һ��������������ģ���[Object]
//module.exports���ڵ�ǰ��ģ���б�¶һЩ������ʹ�õ����Ի��߷���
//module.exports.sum = sum;
module .exports = {
    sum:sum
};