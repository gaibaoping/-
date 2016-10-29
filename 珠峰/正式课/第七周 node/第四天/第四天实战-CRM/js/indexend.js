/*
* 在真实项目中我们可以使用一下的单例模式把我们的各功能进行封装，然后按照执行的先后顺序去执行，这样有助于项目后期的维护和升级
* */

var indexRender = (function () {
    var customList = document.getElementById('customList');

    //->bindHTML:数据绑定
    function bindHTML(data) {
        var str = '';
        for (var i = 0, len = data.length; i < len; i++) {
            var curData = data[i];
            str += '<li>';
            str += '<span class="w50">' + curData.id + '</span>';
            str += '<span class="w150">' + curData.name + '</span>';
            str += '<span class="w50">' + curData.age + '</span>';
            str += '<span class="w200">' + curData.phone + '</span>';
            str += '<span class="w200">' + curData.address + '</span>';
            str += '<span class="w150 control">';
            str += '<a href="">修改</a>';
            //->数据绑定的时候我们把客户的ID存储到元素的自定义属性上,这样以后在操作这个元素如果需要知道对应的客户ID，我们直接在自定义属性上获取即可(JS中自定义属性的解决方法是最伟大的一种编程思想)
            str += '<a href="javascript:;" data-id="' + curData.id + '">删除</a>';
            str += '</span>';
            str += '</li>';
        }
        customList.innerHTML = str;
    }

    //->bindDelete:绑定删除事件
    function bindDelete() {
        customList.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarTag = tar.tagName.toUpperCase();
            if (tarTag === 'A' && tar.innerHTML === '删除') {
                var customId = tar.getAttribute('data-id'),
                    flag = window.confirm('您确定要删除编号为 [ ' + customId + ' ] 的客户吗?');
                if (flag) {
                    ajax({
                        url: '/removeInfo?id=' + customId,
                        type: 'GET',
                        dataType: 'JSON',
                        success: function (res) {
                            if (res && res['code'] == 0) {
                                customList.removeChild(tar.parentNode.parentNode);
                            }
                        }
                    });
                }
            }
        }
    }

    return {
        //->当前模块的入口,在入口中我们完成一些初始化和第一步要做的事情
        init: function () {
            //->第一步:获取数据
            ajax({
                url: '/getAllList',
                type: 'GET',
                dataType: 'JSON',
                success: function (result) {
                    if (result && result['code'] == 0) {
                        var data = result['data'];

                        //->第二步:绑定数据
                        bindHTML(data);

                        //->第三步:绑定事件
                        bindDelete();
                    }
                }
            });
        }
    }
})();
indexRender.init();
