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
        background: url("img/login/2.jpg") no-repeat;
        background-size: 100% 100%;
    }

</style>
<div class="container-fluid login-page">
    <div class="row">
        <div class="col-sm-12">
            <div class="page-header text-center">
                <h2 class="logandreg">登陆</h2>
            </div>
            <div class="form-register well" style="height: 280px;">
                <form action="/springmvc/login" method="POST">
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">账号:</label>
                        <input type="text" class="form-control" id="recipient-name"placeholder="手机号/邮箱/账号" name="username">
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">密码:</label>
                        <input type="password" class="form-control" id="recipient-pwd"placeholder="******" name="password">
                    </div>
                    <div class="col-sm-12 text-center">
                        <button type="submit" class="btn btn-success btn-block" style="margin-left: -20px;" id="submit">登陆</button>
                    </div>
                </form>
                <span class="login-go" style="float: left;margin-top: 30px;color: #777;">
                    <a href="">忘记密码</a>
                </span>
                <span class="login-go" style="float: right;margin-top: 30px;color: #777;">
                    去注册
                    <a href="register">Go!</a>
                </span>
                <p>${usernol}</p>
            </div>
        </div>
    </div>
</div>




<%@include file="footer.jsp"%>