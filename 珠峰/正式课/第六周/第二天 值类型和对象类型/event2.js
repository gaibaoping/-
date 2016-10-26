function on(ele,type,fn){//负责挖程序池，并且把需要绑定的方法保存到程序池里

	//使on方法有能力处理自定义事件
	//凡是自定义事件，我们都让事件类型以"self"开头，也就是说通过判断type的开头是不是"self"，我们就可以知道这是不是自定义的事件类型了。
	
	if(/^self/.test(type)){//处理自定义事件的绑定
		if(!ele["aSelf"+type]){
			ele["aSelf"+type]=[];	
		}
		var a=ele["aSelf"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		//这里不用写attachEvent，也不用写addEventListener，因为这跟系统事件没有关系，所以不需要系统的事件绑定方法来解决
		return;
	}
	
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return ;
	}
	
	
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];	
		ele.attachEvent("on"+type,function(){run.call(ele)});
	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);
	
}


function run(e){//负责找到对应的程序池，然后遍历执行这个数组里的所有的相关方法

	var e=e||window.event;
	var type=e.type;
	if(!e.target){
		e.target=e.srcElement;
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
		e.stopPropagation=function(){e.cancelBubble=true;}
		e.preventDefault=function(){e.returnValue=false;};	
	}
	var a=this["aEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);//用call来执行a数组里的每个方法，是为了让数组里的方法在执行的时候，this指向被绑定的DOM元素。
				//为什么要传这个参数e？
				
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
}


//专门用来执行（通知）绑定在自定义事件上的方法
function selfRun(selfType,e){//第一个参数是自定义事件的类型，第二个参数是可选的，是系统的事件对象
	//原理是通过selfType找到对应的数组，然后遍历执行数组里的方法
	var a=this["aSelf"+selfType];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);	
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
	
}

function off(ele,type,fn){//负责把对应的方法从程序池里移除
		if(/^self/.test(type)){
			var a=ele["aSelf"+type];
			if(a&&a.length){
				for(var i=0;i<a.length;i++){
					if(a[i]==fn){
						a[i]=null;
						break;	
					}
				}
				
			}
			return;
		}
	
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;
	}	
	var a=ele["aEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				//a.splice(i,1);
				//i--;
				break;
			}	
		}
	}
}

function processThis(fn,obj){
	return function(e){fn.call(obj);}	
}