/**
 * 管理系统公用方法
 * 公用命名空间 window.app
 * 注意：easyUI控件options中 所有自定义属性必须加下划线 如: _url
 * @createBy TanYong
 * @createDate 2015-06-19
 */
(function ($) {

  window.app = {

      ctx:window.top.ctx,

      top:window.top,

      iosDownload:'https://itunes.apple.com/cn/app/I2问问/id1300460162?mt=8',

    /**
     * 通用ajax方法
     * 自动在url前加 项目名
     * @param options 和$.ajax参数一样
     * @createBy TanYong
     * @createDate 2015-06-23
     */
    commonAjax: function (options) {
      var defaultOptions = {method: "POST",dataType:'json'};
      options.url = this.ctx + options.url;
      options = $.extend(defaultOptions, options);
      return $.ajax(options);
    },

    /**
     * 根据 asci 码 生成 正则表达式
     * @param str
     * @returns {string}
     */
    asciiFormat: function (str) {
      var list = str.split(',');
      var result = '';
      $.each(list, function (i, obj) {
        if (obj) {
          result += String.fromCharCode(obj);
        }
      })
      return result;
    },

      /**
       * 高亮 显示 单词
       * @param text
       * @param words
       * @param tag
       * @returns {*}
       */
      highlight: function (text, words, tag) {
          tag = tag || 'span';
          var i, len = words.length, re;
          for (i = 0; i < len; i++) {
              re = new RegExp(words[i], 'g');
              if (re.test(text)) {
                  text = text.replace(re, '<' + tag + ' style="color: #D54422">$&</' + tag + '>');
              }
          }
          return text;
      },

    /**
     *
     * @param data 需要遍历的节点数组
     * @param callback 每个节点的回调函数  return false; 停止遍历
     * @param parent 父节点 根节点不传或传null
     * @param level 层级
     */
    eachTree: function (data, callback, parent, level) {
      var _this = this;
      level = level || 0;
      for (var a = 0; a < data.length; a++) {
        var node = data[a];
        if (callback.call(node, node, parent, a, level) === false) {
          return false;
        }
        if (node.children && node.children.length) {
          if (this.eachTree(node.children, callback, node, level + 1) === false) {
            return false;
          }
        }
      }
    },

    /**
     * 解析URL参数
     * @param url 要解析的url地址
     * @return JSON格式的参数
     * @createBy TanYong
     * @createDate 2015-06-24
     */
    parseParams: function (url) {
      if (url.indexOf("?") != -1) {
        url = url.substr(url.indexOf("?") + 1);
      }
      var paramsArr = url.match(/[^\?\=\&]*\=[^\?\=\&]*/g);
      var params = {};
      if (paramsArr != null) {
        $.each(paramsArr, function () {
          var kv = this.split("=");
          params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
        });
      }
      return params;
    },

    /**
     * 给一个url添加参数
     * @param url 要添加参数的url
     * @param params 要添加的参数对象 Object
     * @param isUrl 是否url，默认true, 为true不存在？则会自动添加？ false则不会添加
     */
    addUrlParams: function (url, params, isUrl) {
      if (isUrl !== false && url.indexOf("?") == -1) {
        url += "?";
      }
      for (var item in params) {
        var value = params[item];
        if (typeof(value) === "object") {
          value = JSON.stringify(value);
        }
        if (!url || (url.substr(url.length - 1) != "&" && url.substr(url.length - 1) != "?")) {
          url += "&";
        }
        url += decodeURIComponent(item) + "=" + encodeURIComponent(value);
      }
      return url;
    },
      /**
       * 初始化表单，自动ajax提交
       * @param form form表单元素 jQuery对象
       * @param success 成功回调 可以为空
       * @param error 失败回调 可以为空
       * @param beforeSend 提交前要执行的方法 可以返回false终止提交
       * @createBy TanYong
       * @createDate 2015-07-01
       */
      initForm: function (form, success, error, beforeSend) {
          // 覆盖form的submit事件 改为ajax提交
          success = success || $.noop;
          error = error || $.noop;
          beforeSend = beforeSend || $.noop;

          form.submit(function () {
              // 启用校验并校验
              var dataArr = form.serializeArray();
              // 最终要提交的数据
              var data = {};
              $(dataArr).each(function () {
                  data[this.name] = this.value;
              });
              // 调用提交前回调
              var result = beforeSend.call(this, data);
              if (result === false) {
                  return false;
              }

              app.commonAjax({
                  data: data,
                  loading: true,
                  url: form.attr("action"),
                  type: form.attr("method") || "POST",
                  success: function (data, textStatus, request) {
                      // 错误处理
                      if (data && data.success === false) {
                          //app.showAlert(data.message);
                          error.call(this, data);
                      } else {
                          success.call(this, data ,request);
                      }
                  },
                  error: function () {
                      app.showAlert('请求异常');
                      error.apply(this, arguments);
                  }
              });
              return false;
          });

      },

      showAlert:function(msg){

          var $div = $("<div class='am-alert'>" +
                          "<div>"+
                            "<span class='am-text'></span>"+
                          "</div>"+
                          
                     "</div>");

          $div.find('.am-text').text(msg||'请求异常');

          $('body').append($div);

          setTimeout(function(){
            $div.remove();
          },2000)

          
      },



    /**
     * 初始化
     * @createBy TanYong
     * @createDate 2015-06-23
     */
    init: function () {
      var _this=this;
        $.ajaxSetup({
            xhrFields: {
                withCredentials: true
            },
            _beforeSend: function () {
                //$.AMUI.progress.start();
            },
            beforeSend: function (request) {
                this._beforeSend.apply(this, arguments);

                request.setRequestHeader("sid", _this.top.app.params.sid);
                request.setRequestHeader("tid", _this.top.app.params.tid);
                request.setRequestHeader("chanel", 'web');
            },
            _complete: function (data) {
                //$.AMUI.progress.done();
                if (data.status == '411') {
                    window.top.location = app.ctx + "/mobile/login.jsp";
                }
            },
            complete: function () {
                this._complete.apply(this, arguments);
            },
            dataType: "JSON",
            cache: false,
            error: function () {

            }
        });
      this.params = this.parseParams(window.location.search);
    }
  };
  app.init();
})($);