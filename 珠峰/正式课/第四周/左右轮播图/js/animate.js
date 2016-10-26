/**
 * ����
 * @param ele Ҫ�˶���Ԫ��
 * @param target Ҫ�˶����յ�
 * @param duration �ڶ೤ʱ��������˶�
 * @param callback �˶�����֮��Ҫִ�еĺ���
 */
function animate(ele,target,duration,callback){
    var effectLinear=function(t,b,c,d){
        return b+t/d*c;
    };
    var time=0;
    var begin={};
    var change={};
    for(var key in target){
        begin[key]=utils.css(ele,key);
        change[key]=target[key]-begin[key];
    }
    var interval=10;
    ele.timer&&window.clearInterval(ele.timer);//ֻҪ�˶���Ԫ�����Զ����Ա����Ŷ�ʱ����ô����һ��ִ�е�ʱ��һ������һ�εĶ�ʱ������������Ƿ��Ѿ������յ�
    ele.timer=window.setInterval(function(){
        time+=interval;
        if(time>=duration){
            window.clearInterval(ele.timer);
            utils.css(ele,target);
            if(typeof callback=='function'){
                callback.call(ele);//�ѻص������е�this�޸ĳ�ele
            }
            return;
        }

        for(var key in change){
            if(change[key]){
                var targetVal=effectLinear(time,begin[key],change[key],duration);
                utils.css(ele,key,targetVal);
            }
        }
    },interval)
}