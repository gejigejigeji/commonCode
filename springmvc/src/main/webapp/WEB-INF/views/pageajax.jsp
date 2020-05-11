<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@include file="header.jsp"%>
<style>
    ul {
    }
    ul li{
        display: inline-block;
    }
</style>
<div>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <a class="dian">...</a>
    </ul>
</div>
<input type="button" value="asdasdasdsadas" id="btn">

<table width="100%">
    <thead>
    <tr>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
    </thead>
    <tbody>
    </tbody>
    </table>

<form action="/springmvc/file" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit">
</form>
<p>${fileUrl}</p>
<script>

    $('#btn').click(function () {
        $('tbody').append("<tr></tr>")
        $.ajax({
            type:'post',
            url:'/springmvc/page',
            data:{num:1},
            success:function(data){
                for (as in data) {
                    $('tbody tr').last().append("<td>"+data[as].username+"</td>")
                }
            }
        });
    })

</script>

<%@include file="footer.jsp"%>