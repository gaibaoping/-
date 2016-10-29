var aM = require('./TEST1');
function avgFn(){
    var curLength = arguments.length;
    var res = aM.sum.apply(this,arguments);
    return res/curLength;
}
module .exports = {
    avgFn:avgFn
};