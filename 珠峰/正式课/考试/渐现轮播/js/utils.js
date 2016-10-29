var utils = (function () {
    var isStanderBrowser = 'getComputedStyle' in window;
    function listToArray(likeAry) {
        try {
            return Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
            return ary;
        }
    }
    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }
    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = m;
            m = n;
            n = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }
    function offset(ele) {
        var l = null,
            t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        par = ele.offsetParent;
        while (par) {
            if (!/MSIE 8/.test(window.navigator.userAgent)) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    }
    function win(attr, val) {
        if (typeof val !== 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }
    function getCss( attr) {
        var val = null;
        if (isStanderBrowser) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr == 'opacity') {
                val = this.currentStyle.filter;
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }

        }
        var reg = /-?\d+(\.\d+)?(px|em|rem|pt|deg)?/;
        if (reg.test(val)) {
            val = parseFloat(val);
        }
        return val;
    }
    function setCss( attr, val) {
        if (attr == 'opacity') {
            this.style.opacity = val;
            this.style.filter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr == 'float') {
            this.style.cssFloat = val;
            this.style.styleFloat = val;
            return;
        }
        var reg = /(width|height|left|top|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?)/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        this.style[attr] = val;
    }
    function setGroupCss(options) {
        //这个是不是一个对象的判断在css方法中已经判断过了
        //options = options || [];
        //if (options.toString() == '[object Object]') {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    setCss.call(this, key, options[key]);
                }
            }
        //}
    }

    function css(ele){ //根据参数个数或者类型的不同来调用不同处理函数
        //getCss(oDiv,'width');
        //setCss(oDiv,'width',1000);
        //setGroupCss(oDiv,{width:2000,height:2000});
       //[div,'attr',val] [div,'attr'] [div,{}]
        var argsAry = listToArray(arguments).slice(1); //argsAry其实是党css传参数不同的情况下，复制了不同的参数
        var secondParam = arguments[1];
        var thirdParam = arguments[2]; // undefined?
        if(typeof secondParam == 'string'){ //第二个参数是字符串，有可能是getCss/setCss,还需要进一步看第三个参数是否存在
            if(typeof thirdParam == 'undefined'){ //第三个参数没传
                //console.log(arguments); //[DIV,'attr']
                return getCss.apply(ele,argsAry);
            }
            //只要代码运行到这里说明有第三个参数，单个设置样式
            //[div,'attr',val]
            setCss.apply(ele,argsAry);
            return;
        }
        secondParam = secondParam || [];
        if(secondParam.toString() == '[object Object]'){
            //只要代码运行到这一行说明第二个参数是一个对象
            //[div,{}]
            setGroupCss.apply(ele,argsAry);
        }
    }


    function prev(ele) {
        if(isStanderBrowser){
            return ele.previousElementSibling;
        }
        var pre = ele.previousSibling;
        while (pre && pre.nodeType != 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }
    function prevAll(ele) {
        var ary = [];
        var prev = this.prev(ele);
        while (prev) {
            ary.unshift(prev);
            prev = this.prev(prev);
        }
        return ary;
    }
    function next(ele) {
        if(isStanderBrowser){
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType != 1) {
            next = next.nextSibling;
        }
        return next;
    }
    function nextAll(ele) {
        var ary = [];
        var next = this.next(ele);
        while (next) {
            ary.push(next);
            next = this.next(next);
        }
        return ary;
    }
    function children(ele, tagName) {
        var ary = [];
        if(isStanderBrowser){
            ary =  listToArray(ele.children);
        }else{
            var nodes = ele.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                var curNode = nodes[i];
                if (curNode.nodeType == 1) {
                    ary.push(curNode);
                }
            }
        }
        if (typeof tagName == "string") {
            for (var i = 0; i < ary.length; i++) {
                var curEle = ary[i];
                if (curEle.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(i, 1);
                    i--;
                }
            }
        }
        return ary;
    }
    function sibling(ele) {
        var ary = [];
        var pre = this.prev(ele);
        var nex = this.next(ele);
        pre ? ary.push(pre) : void 0;
        nex ? ary.push(nex) : void 0;
        return ary;
    }
    function siblings(ele) {
        return this.prevAll(ele).concat(this.nextAll(ele));
    }
    function index(ele) {
        return this.prevAll(ele).length;
    }
    function firstEleChild(ele) {
        if(isStanderBrowser){
            return ele.firstElementChild;
        }
        var chs = this.children(ele);
        return chs.length > 0 ? chs[0] : null;
    }
    function lastEleChild(ele) {
        if(isStanderBrowser){
            return ele.lastElementChild;
        }
        var chs = this.children(ele);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }
    function append(newEle, container) {
        container.appendChild(newEle);
    }
    function prepend(newEle, container) {
        var firstChild = this.firstEleChild(container);
        firstChild ? container.insertBefore(newEle, firstChild) : container.appendChild(newEle);
    }
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }
    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);

        nex ? oldEle.parentNode.insertBefore(newEle, nex) : oldEle.parentNode.appendChild(newEle);
    }
    function hasClass(ele, strClass) {
        strClass = strClass.replace(/(^ +| +$)/g, ""); //
        var reg = new RegExp("(^| +)" + strClass + "( +|$)");
        return reg.test(ele.className);
    }
    function addClass(ele, strClass) {
        strClass = strClass.replace(/(^ +| +$)/g, "");
        var strClassAry = strClass.split(/ +/); //['c2','c3']
        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];
            if (!this.hasClass(ele, curClass)) {
                ele.className += " " + curClass;
            }
        }
    }
    function removeClass(ele, strClass) {
        var strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/);
        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];
            if (this.hasClass(ele, curClass)) {
                var reg = new RegExp('(^| +)' + curClass + '( +|$)', "g"); //把所有能用c2和c3拼接成的正则能在className中能匹配到的全部用' '空格字符串替换
                ele.className = ele.className.replace(reg, " ");
            }
        }
    }
    function getElesByClass(strClass, context) {
        context = context || document;
        if (isStanderBrowser) {
            return context.getElementsByClassName(strClass);
        }
        var strClassAry = strClass.replace(/(^  +| +$)/g, "").split(/ +/);
        var tags = context.getElementsByTagName('*');
        var ary = [];
        for (var i = 0; i < tag.length; i++) {
            var flag = true;
            var curTag = tags[i];
            for (var j = 0; j < strClassAry.length; j++) {
                var curClass = strClassAry[j];
                var reg = new RegExp("(^| +)" + curClass + "( +|$)");
                if (!reg.test(curTag.className)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                ary.push(curTag);
            }
        }
        return ary;
    }

    return {
        listToArray : listToArray,
        jsonParse : jsonParse,
        win : win,
        getRandom : getRandom,
        offset : offset,
        prev : prev,
        next  : next,
        children : children,
        prevAll : prevAll,
        nextAll : nextAll,
        sibling : sibling,
        siblings : siblings,
        index : index,
        firstEleChild : firstEleChild,
        lastEleChild : lastEleChild,
        append : append,
        prepend: prepend,
        insertBefore : insertBefore,
        insertAfter : insertAfter,
        hasClass : hasClass,
        addClass : addClass,
        removeClass : removeClass,
        getElesByClass : getElesByClass,
        css : css
    };
})();




