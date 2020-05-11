<%@ page contentType="text/html; charset=UTF-8" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%

    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">

    <title>welcome页面</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
</head>

<body>
<%--<!-- 输出普通字符 -->--%>
<%--${msg } <br/>--%>
<%--<!-- 输出List -->--%>
<%--<p>书籍列表</p>--%>
<%--<c:forEach items="${booklist}" var="node">--%>
    <%--<c:out value="${node}"></c:out>--%>
<%--</c:forEach>--%>
<%--<br/>--%>
<%--<br/>--%>

<%--<!-- 输出Map -->--%>
<%--<c:forEach items="${map}" var="node">--%>
    <%--姓名：<c:out value="${node.key}"></c:out>--%>
    <%--住址：<c:out value="${node.value}"></c:out>--%>
    <%--<br/>--%>
<%--</c:forEach>--%>

<table>
    <tr>
        <td>名称：</td>
        <td>${username}</td>

        <td>名称：</td>
        <td>${password}</td>
    </tr>
    <tr>
        <td>年龄：</td>
        <c:set var="salary" scope="session" value="${users.uid}"/>
        <td><c:out value="${salary}"/></td>

    </tr>
</table>
</body>
</html>