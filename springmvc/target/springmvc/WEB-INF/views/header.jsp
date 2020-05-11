<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><c:out value="${salary}"/></title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.min.css">
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/GalMenu.css" />
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/swiper.min.js"></script>
    <script src="js/swiper.animate.js"></script>
    <script src="js/layer.js"></script>
</head>
<body>
<%--<canvas style="position: absolute;top: 0;left: 0;"></canvas>--%>
<div class="GalMenu GalDropDown">
    <div class="circle" id="gal">
        <div class="ring">
            <a href="/springmvc/index.jsp" title="" class="menuItem">首页</a>
            <a href="register" title="" class="menuItem">注册</a>
            <a href="login" title="" class="menuItem">登陆</a>
            <a href="#" title="" class="menuItem">个人中心</a>
            <a href="#" title="" class="menuItem">留言</a></div>
        <audio id="audio" src="audio/niconiconi.mp3"></audio>
    </div>
</div>
<div id="overlay" style="opacity: 1; cursor: pointer;"></div>