/**
 * Created by xiang.chen on 2017/3/7.
 */

(function ($) {
    window.EventsList = function (element, options) {
        var _this = this;
        this.compiler = Handlebars.compile($('#tpi-list-item').html());
        this.pageNumber = 1;
        this.pageSize = 20;
        this.total = 0;
        this.totalCount = 0;
        this.content= options.content;
        this.myscroll;
        this.bottomOffset=options.bottomOffset;
        this.onLoadSuccess= options.onLoadSuccess || $.noop();


        this.formatter= options.formatter || $.noop();


        this.init = function(success){
            renderHtml(function(){
                if($.isFunction(success)){
                    success.call(this,_this);
                }
                $('.more').show();
                if ($('.scroller').height()<element.height()) {
                    $('.more').hide();
                    //_this.myscroll.destroy();
                }else{
                    $('.more').show();
                    var span = $('<div><i class="pull_icon"></i><span>上拉加载...</span></div>');
                    $('.more').html(span.html());
                }

                $('.amz-toolbar').click(function(){
                    _this.myscroll.scrollToElement('#events-list',500);
                    $('.amz-toolbar').removeClass('am-active');
                });

            });
        }

        this.reload= function(success){
            _this.pageNumber= 1;
            renderHtml(function(){
                if ($('.scroller').height()<element.height()) {
                    $('.more').hide();
                    //_this.myscroll.destroy();
                }else{
                    $('.more').show();
                    var span = $('<div><i class="pull_icon"></i><span>上拉加载...</span></div>');
                    $('.more').html(span.html());
                }
                if(_this.myscroll){
                    if($.isFunction(success)){
                        success.call(this,_this);
                    }
                    _this.myscroll.refresh();
                }
            },'load');
        }

        this.refresh =function(success){
            $('.more').show();
            if ($('.scroller').height()<element.height()) {
                $('.more').hide();
                //_this.myscroll.destroy();
            }else{
                $('.more').show();
                var span = $('<div><i class="pull_icon"></i><span>上拉加载...</span></div>');
                $('.more').html(span.html());
            }
            if(_this.myscroll){
                _this.myscroll.refresh();
                if($.isFunction(success)){
                    success.call(this,_this);
                }
            }
        }



        function renderHtml(success,type){
            var defaultOptions = {
                pageNumber:_this.pageNumber || 1,
                pageSize: 20
            }
            var param = $.extend({},defaultOptions,options.params);
            app.commonAjax({
                url:options.url,
                data: param,
                success:function(data){
                    // if(data.code!=0){
                    //     app.showAlert("Error:"+data.code+",Message:"+data.message);
                    //     return
                    // }
                    _this.total = data.total / param.pageSize;
                    _this.totalCount = data.total;
                    _this.formatter.call(this,data.data);

                    if(data.data.objects){
                        if(type=='append'){
                            _this.content.append(_this.compiler(data.data.objects));
                        }else{
                            _this.content.html(_this.compiler(data.data.objects));
                        }
                    }else{
                        _this.content.html('<img style="margin: 6rem auto;display: block; width: 13rem;" src= "./mobile/static/image/img_null_data.png"/>')
                    }




                    if(!_this.myscroll){
                        _this.myscroll= new iScroll(element[0],{
                            bottomOffset:_this.bottomOffset,
                            onScrollMove:function(){
                                if (this.y<(this.maxScrollY)) {
                                    $('.pull_icon').addClass('flip');
                                    $('.pull_icon').removeClass('loading');
                                    $('.more span').text('释放加载...');
                                }else{
                                    $('.pull_icon').removeClass('flip loading');
                                    $('.more span').text('上拉加载...')
                                }

                                //出现回到顶部的按钮
                                if(this.y < -20){
                                    $('.amz-toolbar').addClass('am-active');
                                }else{
                                    $('.amz-toolbar').removeClass('am-active');
                                }
                            },
                            onScrollEnd:function(){
                                if ($('.pull_icon').hasClass('flip')) {
                                    $('.pull_icon').addClass('loading');
                                    $('.more span').text('加载中...');
                                    if(Math.ceil(_this.total) > _this.pageNumber){
                                        _this.pageNumber++;
                                        renderHtml(function(){
                                            _this.myscroll.refresh();
                                        },'append');
                                    }else{
                                        $('.pull_icon').removeClass('flip');
                                        $('.pull_icon').removeClass('loading');
                                        $('.more span').text('到底了');
                                    }
                                }

                            },
                            onRefresh:function(){
                                $('.more').removeClass('flip');
                                $('.more span').text('上拉加载...');
                            }

                        });
                    }

                    //
                    if($.isFunction(success)){
                        success.call(this,arguments);
                    }
                    if($.isFunction(_this.onLoadSuccess)){
                        _this.onLoadSuccess.call(this,arguments);
                    }

                }
            });
        }
    }

})(window.jQuery);