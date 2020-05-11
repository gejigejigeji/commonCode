<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    Integer hitsCount =(Integer)application.getAttribute("hitCounter");
    if( hitsCount ==null || hitsCount == 0 ){hitsCount = 1;}else{hitsCount += 1;}
    application.setAttribute("hitCounter", hitsCount);
%>
<%--设置title--%>
<c:set var="salary" scope="session" value="${'主页啊'}"/>
<%@include file="WEB-INF/views/header.jsp"%>

${user}
<div class="container-fluid index-bg" style="height: 100%;">
</div>













<%--<p>页面访问量为: <%= hitsCount%></p>--%>
<%@include file="WEB-INF/views/footer.jsp"%>
