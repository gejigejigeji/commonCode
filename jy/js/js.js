// JavaScript Document
$(function(){
	$('.sz li').mouseover(function(){ 
		$(this).addClass('aiya').siblings().removeClass('aiya')
		var suoyin=$(this).index()
		$('.nr .yi').eq(suoyin).show().siblings().hide()
		})
	})
	
//图标替换
$(document).ready(function(e) {
	$('.rkbtn li').hover(function(){
		$(this).children("a").stop(true).animate({right:'137px'},200);
	},function(){
		$(this).children("a").stop(true).animate({right:'0px'},200);
	}); })
//图标替换 end


$(function(){
	$('.zyzs .bt li').each(function(i){
		$(this).mouseover(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.tp .rq').eq(i).css('right','-400px')
			$('.tp .rq').eq(i).show().animate({ right:'0px'}).siblings('.rq').hide();
			
			$('.sm .rj').eq(i).show().siblings().hide()
			$('.sm .rj').css('left','-280px').animate({left:'10px'})
			
			})
		})
	})
	
	
$(function(){
	$('.woqu').kxbdMarquee({
		direction:"up",isEqual:false
		})
	
	})	
	

	
	
	
	
	
	
	
	