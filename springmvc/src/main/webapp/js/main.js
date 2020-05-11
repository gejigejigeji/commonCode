$(document).ready(function () {
    var pageW,pageH;
    var page = {
        init : function() {
            page.resize();
            page.p1.init()
        },
        p1 : {
            init : function() {


          }
        },
        touchStartY : function (e) {
            $(this).on('touchmove', e.data, page.touchMoveY)
            $(this).one('touchend', page.touchEndY)
            page.Y = e.changedTouches[0].clientY;
        },
        touchMoveY : function (e) {
            e.preventDefault();
            var y = e.changedTouches[0].clientY;
            if (y - page.Y < -50) {
                $(this).off('touchmove', page.touchMoveY);
                if(e.data.next != undefined) {
                    page.ChangePage(e.data.from, e.data.next, 'up');
                }
            } else if (y - page.Y > 50) {
                $(this).off('touchmove', page.touchMoveY);
                if(e.data.up != undefined) {
                    page.ChangePage(e.data.from, e.data.up, 'down');
                }
            }
        },
        touchEndY : function () {
            $(this).off('touchmove', page.touchMoveY);
        },
        ChangePage : function(from, to, ori) {
            if (page.IsAni) return false;

            page.IsAni = true;

            var fromAni = 'moveToTop';
            var toAni = 'moveFromBottom';

            if (ori == 'down') {
                fromAni = 'moveToBottom';
                toAni = 'moveFromTop';
            } else if (ori == 'left') {
                fromAni = 'moveToLeft';
                toAni = 'moveFromRight';
            } else if (ori == 'right') {
                fromAni = 'moveToRight';
                toAni = 'moveFromLeft';
            }
            from.addClass(fromAni + ' animated').one('webkitAnimationEnd', function () {
                $(this).removeClass('show animated ' + fromAni);
            });
            to.addClass(toAni + ' animated show').one('webkitAnimationEnd', function (e) {
                page.IsAni = false;
                $(this).removeClass(toAni +' animated');
                var _id = to.attr('id');
                _id = _id.substr(4);
                page.Page = $('#page' + _id);
                page.clear();
                page['p' + _id].init();
            });
        },
        resize: function() {
            pageW = $(window).width();
            pageH = $(window).height();
            $('body').height(pageH);
        }
    };
    page.init();
});

