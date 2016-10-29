function sum(){
    var total = null;
    [].forEach.call(arguments,function(item,index){
        item = Number(item);
        if(!isNaN(item)){
            total+=item;
        }else{total = null;}
    });
    return total;
}
module .exports = {
    sum:sum
};