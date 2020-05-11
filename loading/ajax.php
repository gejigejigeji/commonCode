<?php
error_reporting(0);
	$qsd=Array(); 
	$qsd['user']=$_POST['user'];
	$qsd['aser']=$_POST['aser'];
	$qsd['sser']=$_POST['sser'];
//	echo '账号为'.$qsd['user'];
//	echo '密码为'.$qsd['aser'];
//	echo '验证码'.$qsd['sser'];
	echo json_encode($qsd);
	?>