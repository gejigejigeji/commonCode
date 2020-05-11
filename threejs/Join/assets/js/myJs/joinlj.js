/**
 * Created by shitukeji on 2017/8/14.
 */
$(function () {
    //加入公司
    var cellphone=$('.js-join-cellPhone');

    var shareData={};

    app.commonAjax({
    	url:'/MobileApp/Share/Public/getShareData.do',
    	data:{
    		shareID:app.params.shareId,
    		type:app.params.type,
    		senderID:app.params.senderID
    	},
    	success:function(data){
    		if(data.code==0){
    			if(data.data.type=='Issue'){

					$('.js-title').text(data.data.senderName + '向你分享问题');
					$('.js-targetName').text(data.data.targetName)
                    shareData.ID=data.data.targetID;
					shareData.objectID=data.data.targetID;
					shareData.ownCorpID=data.data.targetCorp;
                    shareData.ownCorpID=data.data.targetCorp;
                    shareData.ownerID=data.data.targetOwner;;
                    shareData.sharerID=data.data.senderID;
                    shareData.type=data.data.type;
                    document.title='查看问题'
                    $('.js-join').text('查看')
                    $('.js-join-login').text('查看')

    			}else if(data.data.type=='Part'){
    				
                    shareData.ID=data.data.targetID;
					shareData.partID=data.data.targetID;
					shareData.basePartID=data.data.basePartID;

					shareData.ownCorpID=data.data.targetCorp;
                    shareData.ownerID=data.data.targetOwner;;
                    shareData.sharerID=data.data.senderID;
                    shareData.type=data.data.type;

                    document.title='查看设计'
                    $('.js-join').text('查看')
                    $('.js-join-login').text('查看')
                    $('.js-title').text(data.data.senderName + '向你分享零件');
                    $('.js-targetName').text(data.data.targetName);

    		  }else if(data.data.type=='Invite'){
    		  		$('<span></span>').text(data.data.senderName + '请你加入').appendTo($('.js-title'));
    		  		$('<span style="font-size: 14px;color: #7c94f9;line-height: 20px;">"I2问问"</span>').appendTo($('.js-title'));
                    shareData.senderID=data.data.senderID;             
                    shareData.senderName=data.data.senderName;
					shareData.type=data.data.type;
                    document.title='加入我们'
                    $('.js-join').text('加入')
                    $('.js-join-login').text('加入')
    		  }

    		  var value=$.cookie('loginUser');

    		  //在cookie 中 存 一个 当前打开的地址 当 用户退出登录后 直接打开 这个地址
                $.cookie('shareLink', window.location.href , {path:'/'}); // 存储一个带7天期限的 cookie




    		  if(value){

                  value=JSON.parse(value);

    		      app.commonAjax({
                      url:'/MobileApp/Common/checkLoggedIn.do',
                      beforeSend: function (request) {
                          this._beforeSend.apply(this, arguments);
                          request.setRequestHeader("sid", value.sid);
                          request.setRequestHeader("tid", value.tid);
                      },
                      success:function (data, textStatus, request) {
                          //判断是不是 tid 过期
                          if(data.code==11){
                              var sid = request.getResponseHeader('sid');
                              var tid = request.getResponseHeader('tid');
                              value.sid=sid;
                              value.tid=tid;
                              $.cookie('loginUser', JSON.stringify(value), { expires: 7 , path:'/'}); // 存储一个带7天期限的 cookie
                          }
                      },
                      complete:function(data){
                          $('.js-noLogin').hide();
                          $('.js-login').show();
                      }
                  })



                  // loginSuccess(value);
              }
	    	}else{
	    		alert(data.message)
	    	}
   		 }
    })




    function loginSuccess(data){

        var sid = data.sid;
        var tid = data.tid;

        shareData.cellphone=data.cellphone;
        var obj = $.extend({},{
            sid:sid,
            tid:tid,
            userID:data.userID
        },shareData);

        var url='';
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
                    objectID:shareData.ID,
                    type:'beSolver',
                    solverID:data.userID,
                },
                success:function(){
                    url='/Mobile/Share/problem.html';
                    url= app.addUrlParams(window.location.origin + url,obj)
                    window.location.href= url;
                }
            })

        }else if(app.params.type=='Invite'){
            var confirm=window.confirm('你确定要添加'+shareData.senderName+'为好友吗？');
            if(confirm==true){
                app.commonAjax({
                    url:'/MobileApp/Contact/sendFriendRequest.do',
                    beforeSend: function (request) {
                        request.setRequestHeader("sid", sid);
                        request.setRequestHeader("tid", tid);
                    },
                    data:{
                        receiverID:shareData.senderID,
                        senderID: data.userID
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
    

    cellphone.bind("input propertychange change",function(event){
        $('.error-tips').text('')
        if((/^1[12345789]\d{9}$/.test(cellphone.val()))){
            $('.js-join').addClass('active');
        }else{
            $('.js-join').removeClass('active');
        }
	});


    $('.js-join').click(function () {
        if(!(/^1[12345789]\d{9}$/.test(cellphone.val()))){
            $('.error-tips').text('手机格式不正确！')
            return false; 
        }

        app.commonAjax({
            url:'/MobileApp/Common/Public/checkExistence.do',
            data:{
                objectType:'UserCellphone',
                objectValue:cellphone.val()
            },
            success:function(data){
            	var url = window.location.origin;
            	//已经注册
            	if(data.code==0 && data.data>0){
            		url='login.html'
            	}else{
            		url='register.html'
            	}
            	var obj = $.extend({},{
            		cellphone:cellphone.val()
            	},shareData)

            	url=app.addUrlParams(url,obj)

            	window.location.href=url;
            }
        });
    })

    $('.js-join-login').click(function () {
        var value=$.cookie('loginUser');

        //在cookie 中 存 一个 当前打开的地址 当 用户退出登录后 直接打开 这个地址
        $.cookie('shareLink', window.location.href , {path:'/'}); // 存储一个带7天期限的 cookie

        if(value) {
            value = JSON.parse(value);
            loginSuccess(value);
        }
    })

});