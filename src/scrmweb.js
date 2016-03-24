/**
 * Created by janeluck on 1/15/16.
 */
$.fn.queryIntime = function(opt){
    /*
     * delay: 停顿时间段
     * func: 实时搜索异步回调函数
     * func的this指向该jquery对象,@param value {String}:当前input的value值
     *
     * */
    var options = {delay: 500, func: function(value){}};
    $.extend(options, opt);
    var self = this;

    self.startTimer = function(callback){

        self.stopTimer();
        self._timer = setTimeout(
            function()
            {

                delete self._timer;
                callback.apply(self);
            },
            options.delay
        );};
    self.stopTimer = function(){
        clearTimeout(self._timer);
    };

    self.on('keyup', function(e){
        self.startTimer(options.func.bind(self, self.val()))
    });
    return self;
};




+function($){
    var wrap, outer, title, content, close, sure, opts;
    $.fn.ckConfirm = function(options){
        if (!$(this).length) {
            return this;
        };

        $(this)
            .data('ckConfirm', opts = $.extend({},{onSure: function(){}, data: {}, title: '确认删除么？'}, options))
            .unbind('click.ckConfirm')
            .bind('click.ckConfirm', function(e) {
                e.preventDefault();


            });

        $('#ckConfirm-wrap .delete_frame01_Txt01').html(opts.title);
        $.ckConfirm.show()




    };

    $.ckConfirm = function(){

    };
    $.ckConfirm.show = function(){
        wrap.css('display', 'block');
    };
    $.ckConfirm.close = function(){
        wrap.css('display', 'none');
    };

    $.ckConfirm.init = function(){
        if ($("#ckConfirm-wrap").length) {
            return;
        }

        $('body').append(
            wrap = $('<div id="ckConfirm-wrap"></div>')
        );
        wrap.click(function(e){
            e.preventDefault();

        })

        outer = $('<div class="delete_frame01"></div>')
            .appendTo(wrap);

        outer.css({
            marginTop: $(window).height()/2 - 60,
            marginLeft: $(window).width()/2 - 100
        });

        outer.append(
            title = $('<div class="delete_frame01_Txt01">确定删除么？</div>'),
            content = $('<div class="delete_frame01_btn clearfix"></div>')
        );
        content.append(
            sure = $('<div class="delete_btn_left"></div>'),
            close = $('<div class="delete_btn_right"></div>')
        );


        sure.click(function(e){
            e.preventDefault();
            // alert('sure.click');
            opts.onSure(opts.data);
        });
        close.click($.ckConfirm.close);


        wrap.click(function(e){
            if (   !$('.delete_frame01').has(e.target).length && !$(e.target).hasClass('delete_frame01')   ){
                $.ckConfirm.close()
            };
        })

    };
    $(function(){
        $.ckConfirm.init();
    })
}(jQuery);


var ck  =  {
    ckNoty: function(msg, flag) {
        /*
         *
         * flag, 0: success, 1: fail
         * */
        var type;
        flag = flag || 0;
        type = flag + 2;
        var html = '<div class="delete_frame0'+ type + '"><div class="delete_frame0' + type + '_Txt01">' + msg +'</div></div>'

        var $rs = $('#ckNoty');
        $rs.html(html)
            .show();
        var body_width = $('body').width(),
            rs_width = $('#rs').width();
        var left = (body_width - rs_width)/2,
            top = parseInt($rs.offset().top);
        if (parseInt( $(document).scrollTop() ) > top) {
            top = $(document).scrollTop()+42;
        }
        $rs.css({
            'position': 'fixed',
            'left': left,
            'top': 100//top
        });
        //console.log($('#rscallback').offset().top, $(document).scrollTop());
        setTimeout(function(){
            $rs.hide();
        }, 4000);
    },
    // jqxGird汉化
    localization: {
        "/": "-",
        ":": ":",
        firstDay: 0,
        days: {
            names: ["日", "一", "二", "三", "四", "五", "六"] || ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            namesAbbr: ["日", "一", "二", "三", "四", "五", "六"],
            namesShort: ["日", "一", "二", "三", "四", "五", "六"]
        },
        months: {
            names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
            namesAbbr: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", ""]
        },
        AM: ["AM", "am", "AM"],
        PM: ["PM", "pm", "PM"],
        eras: [{
            name: "A.D.",
            start: null,
            offset: 0
        }],
        twoDigitYearMax: 2029,
        patterns: {
            d: "M/d/yyyy",
            D: "dddd, MMMM dd, yyyy",
            t: "h:mm tt",
            T: "h:mm:ss tt",
            f: "dddd, MMMM dd, yyyy h:mm tt",
            F: "dddd, MMMM dd, yyyy h:mm:ss tt",
            M: "MMMM dd",
            Y: "yyyy MMMM",
            S: "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
        },
        percentsymbol: "%",
        currencysymbol: "￥",
        currencysymbolposition: "before",
        decimalseparator: ".",
        thousandsseparator: ",",
        pagergotopagestring: "前往:",
        pagershowrowsstring: "显示行数:",
        pagerrangestring: " / ",
        pagerpreviousbuttonstring: "前一页",
        pagernextbuttonstring: "下一页",
        pagerfirstbuttonstring: "首页",
        pagerlastbuttonstring: "尾页",
        groupsheaderstring: "把一列拖放到此处来分组",
        sortascendingstring: "升序",
        sortdescendingstring: "降序",
        sortremovestring: "取消排序",
        groupbystring: "以此列分组",
        groupremovestring: "从分组中删除",
        filterclearstring: "清除",
        filterstring: "过滤",
        filtershowrowstring: "显示记录当:",
        filterorconditionstring: "或者",
        filterandconditionstring: "并且",
        filterselectallstring: "(选择所有)",
        filterchoosestring: "请选择:",
        filterstringcomparisonoperators: ["空", "非空", "包含", "包含(区分大小写)", "不包含", "不包含(区分大小写)", "以此开头", "以此开头(区分大小写)", "以此结束", "以此结束(区分大小写)", "等于", "等于(区分大小写)", "无值", "有值"],
        filternumericcomparisonoperators: ["等于", "不等于", "小于", "小于等于", "大于", "大于等于"],
        filterdatecomparisonoperators: ["等于", "不等于", "小于", "小于等于", "大于", "大于等于"],
        filterbooleancomparisonoperators: ["等于", "不等于"],
        validationstring: "输入非法",
        emptydatastring: "没有符合条件的数据",
        filterselectstring: "选择过滤条件",
        loadtext: "加载中...",
        clearstring: "清除",
        todaystring: "今天"
    }

};

$(function(){
    // url包装函数，ajax的url参数需要通过此包装
    ck.baseUrl = function(str){
        return GLOBAL_INFO.baseUrl  + str + '/VISITID/' + GLOBAL_INFO.currentQzID
    }
})

/**
 * 公共方法: 模板编译
 * @param segment{$HTMLElement} jquery dom 对象
 * @param data{Object} 数据模型对象
 * @return {$HTMLElement} 编译后的$dom对象
 * Usage----->
 * 在构造函数中
 * compile.call(this, $(htmlString), this.viewModel)
 * */
function templateCompile(segment, data) {
    var self = this;
    var watchList = [];
    var $excludeElement = segment.find('[data-bind*=foreach] [data-bind]');
    segment.find('[data-bind]').each(function (index, element) {
        var $elem = $(element);
        var expression = $elem.attr('data-bind').replace('$root', 'self.viewModel');
        var matchs = expression.match(/^\b(\w*?)\b:(.*)/);
        if (elemIsInForeach($elem, $excludeElement)) {
            return;
        }
        with (data) {
            var ifAttr = $elem.attr('data-if');
            if (ifAttr) {
                ifAttr = ifAttr.replace('$root', 'self.viewModel');
                if (!eval(ifAttr)) {
                    $elem.remove();
                    return;
                }
                ;
            }
            var classAttr = $elem.attr('data-class');
            if (classAttr) {
                classAttr = classAttr.replace('$root', 'self.viewModel');
                classAttr = eval(classAttr);
                $elem.addClass(classAttr);
            }
            switch (matchs[1]) {
                case 'text':
                    $elem.text(eval(matchs[2]));
                    watchList.push({
                        key: matchs[2],
                        Func: function (newVal) {
                            $elem.text(newVal);
                        }
                    });
                    break;
                case 'foreach':
                    var eachData = eval(matchs[2]);
                    var listFragment = document.createDocumentFragment();
                    if (eachData instanceof Array) {
                        for (var i = 0, len = eachData.length; i < len; i++) {
                            var $listElement = $elem.clone();
                            var $foreachElement = self.compile($listElement, eachData[i]);
                            $foreachElement.children().each(function (index, element) {
                                //var e = $(element).clone()[0];
                                listFragment.appendChild(element);
                            });
                        }
                    }
                    $elem.html('');
                    $elem.append(listFragment);
                    break;
                case 'click':
                    $elem[0].onclick = function (event) {
                        eval(matchs[2]).call(this, data, event);
                    };
                    break;
                case 'attr':
                    //todo:attr:{a:'t1', b:'t2'}
                    var attrMatchs = matchs[2].match(/{(\w.*?):(.*)}/);
                    $elem.attr(attrMatchs[1], eval(attrMatchs[2]));
                    var match2, watchStr;
                    if ((match2 = /^([\w\.]+)\b.*?\?.*:/.exec(attrMatchs[2])) !== null) {
                        watchStr = match2[1];
                    }
                    watchList.push({
                        key: watchStr,
                        Func: function (newVal) {
                            $elem.attr(attrMatchs[1], eval(attrMatchs[2]));
                        }
                    });
                    break;
            }
        }
    });
    watch.call(self, watchList, data, self.viewModel);
    return segment;

    function elemIsInForeach($elem, $excludeElement) {
        var result = false;
        $excludeElement.each(function (index, elem) {
            if (elem === $elem[0]) {
                result = true;
            }
        });
        return result;
    }

    function watch(watchList, obj, modelRoot) {
        var self = this;
        for (var i = 0, item, arr = []; i < watchList.length; i++) {
            item = watchList[i];
            item.Func = [item.Func];
            for (var n = 0, item2, isRepeat = false; n < arr.length; n++) {
                item2 = arr[n];
                if (item.key === item2.key) {
                    item2.Func = item2.Func.concat(item.Func);
                    isRepeat = true;
                }
            }
            !isRepeat && arr.push(item);
        }
        watchList = arr;
        watchList.forEach(function (item) {
            var watchStr = item.key, value, watchHandler, watchObj, match;
            var defaultSetFunc = function (newVal) {
                var oldVal = value;
                value = newVal;
                if (watchHandler instanceof Array) {
                    watchHandler.forEach(function (handler) {
                        handler.call(self, newVal, oldVal);
                    });
                } else {
                    watchHandler.call(self, newVal, oldVal);
                }
            };
            if ((match = /self.viewModel.(.*)/.exec(watchStr))) {
                watchObj = modelRoot;
                watchStr = match[1];
            } else {
                watchObj = obj;
            }
            value = watchObj[watchStr];
            (function (scope) {
                watchHandler = typeof item.Func !== 'string' ? item.Func : eval(item.Func);
            })(obj);

            Object.defineProperty(watchObj, watchStr, {
                get: function () {
                    return value;
                },
                set: defaultSetFunc
            });
        });
    }
}

/**
 * @Class 公共组件: 全局消息框
 * @param 注入compile依赖
 * Usage----->
 * Step1: 只初始化一次 var alertObj = new GlobalAlert(compile);
 * Step2: 每次调用 alertObj.updateModel({title: '成功', message: '...'});
 * */
function GlobalAlert(compile) {
    var self = this;
    this.alertTemplate = '\
    <div id="alertWrapper"><div data-bind="attr:{class:$root.title == \'成功\' ? \'alert alert-success\' : \'alert alert-error\'}">\
      <button class="close" data-bind="click:close"></button>\
      <strong data-bind="text:$root.title"></strong> <span data-bind="text:$root.message"></span>\
    </div></div>';
    this.init = function () {
        this.htmlSegment = compile.call(this, $(this.alertTemplate), this.viewModel);
        return this;
    };
    this.viewModel = {
        title: '',
        message: '',
        close: function () {
            self.hide();
        }
    };
    this.updateModel = function (config) {
        for (var name in config) {
            this.viewModel[name] = config[name];
        }
        this.show();
        return this;
    };
    var timer;
    this.show = function () {
        if ($('#alertWrapper').length === 0) {
            $('body').append(this.htmlSegment);
        }
        var enableHide = false;
        clearTimeout(timer);
        setTimeout(function () {
            $('#alertWrapper').find('.alert').removeClass('hide').addClass('show');  
        }, 0);
        timer = setTimeout(function () {
                enableHide = true;
                self.hide();
            }, 3000);
    };
    this.hide = function () {
            $('#alertWrapper').find('.alert').removeClass('show').addClass('hide');
    };
    return this.init();
}


