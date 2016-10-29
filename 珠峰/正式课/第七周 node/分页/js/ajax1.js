function ajax(options){
    var _default = {
        url:null,
        type:'GET',
        dataType:'TXT',
        async:true,
        data:null,
        success:null,
        error:null
    };
    for(var key in options){
        if(options.hasOwnProperty(key)){
            _default[key]=options[key];
        }
    }
    var xhr = new XMLHttpRequest();
    //清除缓存
    if(_default.type.toUpperCase() == 'GET'){
        _default.url += (_default.url.indexOf('?')==-1?'?':'&');
        _default.url += '_='+Math.random();
    }
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onreadystatechange = function(){
        if(/^2\d{2}$/.test(xhr.status)&&xhr.readyState==4){
            var text = xhr.responseText;
            _default.dataType = _default.dataType.toUpperCase();
            switch (_default.dataType){
                case 'XML':
                    text = xhr.responseXML;
                    break;
                case 'JSON':
                    text = JSON in window?JSON.parse(text):eval('('+text+')');
                    break;
            }
            _default.success&&_default.success.call(xhr,text);
        }
        if(/^(4|5)\d{2}$/.test(xhr.status)){
            _default.error&&_default.error.call(xhr,text);
        }
    };
    xhr.send(_default.data);
}