<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2017/6/29
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@include file="header.jsp"%>
<style>
    *{
        border-color: #ddd !important;}
    body {
        background: url("img/login/1.jpg") no-repeat;
        background-size: 100% 100%;
    }

</style>
<div class="container-fluid login-page">
    <div class="row">
        <div class="col-sm-12">
            <div class="page-header text-center">
                <h2 class="logandreg">账号注册</h2>
            </div>

            <div class="form-register well">
                <form action="/springmvc/register" method="POST">
                    <div class="form-group">
                        <label for="recipient-user" class="control-label">账号:</label>
                        <input type="text" class="form-control" id="recipient-user"placeholder="6-20位非中文" name="username">
                    </div>
                    <div class="form-group">
                        <label for="recipient-pwd" class="control-label">密码:</label>
                        <input type="password" class="form-control" id="recipient-pwd"placeholder="6-20位非中文" name="password">
                    </div>
                    <div class="form-group">
                        <label for="recipient-repwd" class="control-label">确认密码:</label>
                        <input type="password" class="form-control" id="recipient-repwd"placeholder="6-20位非中文" name="repassword">
                    </div>
                    <div class="form-group">
                        <label for="recipient-email" class="control-label">邮箱:</label>
                        <input type="text" class="form-control" id="recipient-email"placeholder="你特么随意" name="email">
                    </div>
                    <div class="wrap-reg">
                        <div class="boxty">
                            　　　　<div class="btnty" id="dragEle">Go!</div>
                            　　　　<div class="tips">>>拖动滑块验证<<</div>
                            　　</div>
                    </div>
                    <div class="col-sm-12 text-center">
                        <button type="button" class="btn btn-info" onclick="window.location.href='index.jsp'">返回</button>
                        <button type="submit" class="btn btn-success" id="submit">注册</button>
                    </div>
                </form>
                <span class="login-go" style="float: right;margin-top: 10px;color: #777;">
                    去登陆
                    <a href="login">Go!</a>
                </span>
            </div>
        </div>
    </div>
</div>

<p>${cunzai.get(0)}</p>

<script>
    function DragValidate (dargEle,msgEle){
        var dragging = false;//滑块拖动标识
        var iX;
        dargEle.mousedown(function(e) {
            dragging = true;
            iX = e.clientX; //获取初始坐标
        });
        $(document).mousemove(function(e) {
            if (dragging) {
                var e = e || window.event;
                var oX = e.clientX - iX;
                if(oX < 30){
                    return false;
                };
                if(oX >= 345){//容器宽度+10
                    oX = 340;
                    return false;
                };
                dargEle.width(oX + "px");
                return false;
            };
        });
        $(document).mouseup(function(e) {
            var width = dargEle.width();
            if(width < 335){
                dargEle.width("30px");
                msgEle.text(">>拖动滑块验证<<");
            }else{
                dargEle.attr("validate","true").text("验证成功！").unbind("mousedown");
            };
            dragging = false;
        });
    };
    function checkUser(str,css){
        var re = /^[a-zA-z]\w{6,20}$/;
        if(re.test(str)){
            css.css({'background': '#82FE98'});
        }else{
            css.css({'background': '#FF625B'});
        }
    }
    $('#recipient-user,#recipient-pwd,#recipient-repwd').keyup(function () {
        var reuser = $(this).val();
        checkUser(reuser,$(this));
    })
    $('#recipient-email').keyup(function () {
        var reil = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var email = $('#recipient-email').val();
        if(reil.test(email)){
            $('#recipient-email').css('background', '#82FE98');
        }else {
            $('#recipient-email').css('background', '#FF625B');
        }
    })
    DragValidate($("#dragEle"),$(".tips"));
    $("#submit").click(function(){
        var pwd = $('#recipient-pwd').val();
        var repwd = $("#recipient-repwd").val();
        if(!$("#dragEle").attr("validate")){
            alert("请先拖动滑块验证！");
            return false;
        }else if($('.form-control').val()==''){
            alert('不能为空');
            return false;
        }else if (pwd!=repwd) {
            alert('两次密码输入不一致');
            return false;
        }else {
            alert('注册成功!')
        }

    });
</script>



<%@include file="footer.jsp"%>