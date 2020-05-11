$(function () {

    var divElement = $("#he_input_css input");

    var cellphone = $('#he_input_css input[name="cellphone"]');

    var password = $('#he_input_css input[name="password"]');

    var userName = $('#he_input_css input[name="userName"]');

    var comfirepassword=$('#he_input_css input[name="comfirepassword"]');

    cellphone.val(app.params.cellphone);

    cellphone.bind("input propertychange change",function(event){
        $('.error-tips').text('')
        if((/^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0) &&
         (comfirepassword.length<1  || /^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0 && userName.val().length>0 && comfirepassword.val().length>0 && comfirepassword.val()==password.val())){
            $('.regist_btn').addClass('active');
        }else{
            $('.regist_btn').removeClass('active');
        }
    });
    

    userName.bind("input propertychange change",function(event){
        $('.error-tips').text('')
         if((/^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0) &&
         (comfirepassword.length<1  || /^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0 && userName.val().length>0 && comfirepassword.val().length>0 && comfirepassword.val()==password.val())){
            $('.regist_btn').addClass('active');
        }else{
            $('.regist_btn').removeClass('active');
        }
    });


    password.bind("input propertychange change",function(event){
        $('.error-tips').text('')
          if((/^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0) &&
         (comfirepassword.length<1  || /^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0 && userName.val().length>0 && comfirepassword.val().length>0 && comfirepassword.val()==password.val())){
            $('.regist_btn').addClass('active');
        }else{
            $('.regist_btn').removeClass('active');
        }
    });

    comfirepassword.bind("input propertychange change",function(event){
        $('.error-tips').text('')
         if((/^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0) &&
         (comfirepassword.length<1  || /^1[123456789]\d{9}$/.test(cellphone.val()) && password.val().length>0 && userName.val().length>0 && comfirepassword.val().length>0 && comfirepassword.val()==password.val())){
            $('.regist_btn').addClass('active');
        }else{
            $('.regist_btn').removeClass('active');
        }
    });

    app.initForm($('.js-loginForm'),function(data,request){

        if(data.code==0){
            loginSuccess(data,request);
        }else{
             app.showAlert(data.message);
        }
        
    },null,function(){

    });

    function loginSuccess(data,request){

        var sid = request.getResponseHeader('sid');
        var tid = request.getResponseHeader('tid');

        var obj = $.extend({},{
            sid:sid,
            tid:tid,
            userID:data.data.id
        },app.params);

        var url='';

        $.cookie('loginUser', JSON.stringify(obj), { expires: 7 , path:'/'}); // 存储一个带7天期限的 cookie

        if(app.params.type=='Part'){
            url='/Mobile/Share/index.html';
            url= app.addUrlParams(window.location.origin + url,obj)
            window.location.href= url;
        }else if(app.params.type=='Issue'){

            //设置指派者
            app.commonAjax({
                url:'/MobileApp/Issue/setSolver.do',
                beforeSend: function (request) {
                    request.setRequestHeader("sid", sid);
                    request.setRequestHeader("tid", tid);
                },
                data:{
                    objectID:app.params.ID,
                    type:'beSolver',
                    solverID:data.data.id,
                },
                success:function(){
                    url='/Mobile/Share/problem.html';
                    url= app.addUrlParams(window.location.origin + url,obj)
                    window.location.href= url;
                }
            })

        }else if(app.params.type=='Invite'){
            var confirm=window.confirm('你确定要添加'+app.params.senderName+'为好友吗？');
            if(confirm==true){
                app.commonAjax({
                    url:'/MobileApp/Contact/sendFriendRequest.do',
                    beforeSend: function (request) {
                        request.setRequestHeader("sid", sid);
                        request.setRequestHeader("tid", tid);
                    },
                    data:{
                        receiverID:app.params.senderID,
                        senderID: data.data.id
                    },
                    success:function(){
                        url='/Mobile/Join/downloads.html';
                        url= app.addUrlParams(window.location.origin + url,obj)
                        window.location.href= url;
                    }
                })
            }else{
                url='/Mobile/Join/downloads.html';
                url= app.addUrlParams(window.location.origin + url,obj)
                window.location.href= url;
            }
        }

    }

    app.initForm($('.js-registerForm'),function(data,request){

        if(data.code==0){
            loginSuccess(data,request);
        }else{
             app.showAlert(data.message);
        }
        
    });

    //登录
    $('.js-login').click(function(){
        var password=$('#he_input_css input[name="password"]').val();
        if(!password){
            app.showAlert('请输入密码！')
            return;
        }
        checkCellpone()
        $('.js-loginForm').submit();
    })

    //注册
    $('.js-regist').click(function () {
        checkCellpone();
        var userName=$('#he_input_css input[name="userName"]').val();
        var password=$('#he_input_css input[name="password"]').val();
        var comfirepassword=$('#he_input_css input[name="comfirepassword"]').val();
        if(!userName){
            app.showAlert('请输入姓名！')
            return;
        }
        if(!password){
            app.showAlert('请输入密码！')
            return;
        }
        if(password!=comfirepassword){
            app.showAlert('密码不一致！')
            return;
        }
        $('.js-registerForm').submit();
    });

    //去登录页面
    $('.js-gotoRegist').click(function(){
         var url='register.html'

            var obj = $.extend({},app.params,{
                cellphone:""
            })

            url=app.addUrlParams(url,obj)

            window.location.href=url;

    })

    //去注册页面
    $('.js-gotoLogin').click(function(){
         var url='login.html'

            var obj = $.extend({},app.params,{
                cellphone:""
            })

            url=app.addUrlParams(url,obj)

            window.location.href=url;

    })


    //获取短信验证码
   var validCode=true;

    $('.get_yzm').click(function () {

        var code=$(this);

        if(!validCode){
            return;
        }
        app.commonAjax({
            url:'/MobileApp/Common/Public/sendVerifyCode.do',
            data:{
                businessType:'UserRegistry',
                cellphone:cellphone.val()
            },
            success:function (response) {
                app.showAlert(response.message);
                if(response.code==0){
                     var time=30;
                     validCode=false;
                     code.addClass("msgs1");
                     var t=setInterval(function () {
                      time--;
                      code.html(time+"秒");
                      if (time==0) {
                       clearInterval(t);
                       code.html("重新获取");
                       validCode=true;
                       code.removeClass("msgs1");
                      }
                     },1000)
                }
            },
            error:function (err) {
                console.log(err);
            }
        });
    })


    function checkCellpone(){
        if(!(/^1[123456789]\d{9}$/.test(cellphone.val()))){
            $('.error-tips').text('手机格式不正确！')
            return false; 
        }
    }
});