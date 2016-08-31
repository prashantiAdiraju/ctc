//all scroll
var globle_scroll=function(move,left,right,list,auto_time,move_time,mouse_or_click,fun){this.move=$(move);this.left=$(left);this.right=$(right);this.list=$(list);this.move_time=move_time;this.auto_time=auto_time;this.mouse_or_click=mouse_or_click;this.len=0;this.wid=0;this.num=1;this.css3=false;this.set_html=function(){var self=this;if(typeof(auto_time)=='undefined'){self.auto_time=8000}if(typeof(move_time)=='undefined'){self.move_time=400}var first=this.move.children().first().clone();var last=this.move.children().last().clone();this.move.prepend(last);this.move.append(first);var supportCss3=(function(){var div=document.createElement('div'),vendors='Khtml Ms O Moz Webkit'.split(' '),len=vendors.length;return function(prop){if(prop in div.style)return true;prop=prop.replace(/^[a-z]/,function(val){return val.toUpperCase()});while(len--){if(vendors[len]+prop in div.style){return true}}return false}})();this.css3=supportCss3('transition');if(this.css3){self.move.css({transitionDuration:self.move_time+'ms'})}};this.set_width=function(){this.wid=this.move.parent().width();this.len=this.move.children().length;this.move.children().width(this.wid);var move_width=this.len*this.wid;this.move.width(move_width)};this.gos=function(){var self=this;this.set_html();this.set_width();var animate_go=function(num,time){if(typeof(fun)=='function'){var fun_num=num;if(num<=0){fun_num=self.len-2};if(num>=self.len-1){fun_num=1}fun(fun_num-1)}if(time!=0){var time=self.move_time}var left='-'+(num*self.wid).toString()+'px';if(self.css3){self.move.css({transitionDuration:time+'ms',transform:'translate('+left+',0px)'});window.clearInterval(animate_st);var animate_st=window.setTimeout(function(){if(num<=0){self.move.css({transitionDuration:'0ms'});self.num=self.len-2;left='-'+(self.num*self.wid).toString()+'px';self.move.css({transform:'translate('+left+',0px)'})};if(num>=self.len-1){self.move.css({transitionDuration:'0ms'});self.num=1;left='-'+(self.num*self.wid).toString()+'px';self.move.css({transform:'translate('+left+',0px)'})};self.list.children().removeClass('current');self.list.children().eq(self.num-1).addClass('current')},time)}else{self.move.stop().animate({left:left},time,function(){if(num<=0){self.num=self.len-2;left='-'+(self.num*self.wid).toString()+'px';self.move.css({left:left})};if(num>=self.len-1){self.num=1;left='-'+(self.num*self.wid).toString()+'px';self.move.css({left:left})};self.list.children().removeClass('current');self.list.children().eq(self.num-1).addClass('current')})}};if(typeof(this.mouse_or_click)=='undefined'){this.mouse_or_click='click'}this.list.children().on(this.mouse_or_click,function(){self.num=$(this).attr('value');animate_go(self.num)});this.left.on('click',function(){left_click()}).bind("selectstart",function(){return false});function left_click(){self.num--;animate_go(self.num)}this.right.on('click',function(){right_click()}).bind("selectstart",function(){return false});function right_click(){self.num++;animate_go(self.num)};animate_go(1,0);$(window).resize(function(){self.set_width();animate_go(self.num,0)});self.st='';self.auto_scroll=function(){self.st=window.setInterval(function(){self.num++;animate_go(self.num)},self.auto_time)};self.auto_scroll();self.move.hover(function(){window.clearInterval(self.st)},function(){self.auto_scroll()});var touch_scroll=function(ul,css3){this.startPos='';this.endPos='';this.isScrolling='';this.int=function(){var self=this;var ul_dom=$(ul);var id=$(ul).get(0);if(('ontouchstart'in window)||window.DocumentTouch&&document instanceof DocumentTouch){id.addEventListener('touchstart',self.start,false);id.addEventListener('touchmove',self.move,false);id.addEventListener('touchend',self.end,false)}};this.start=function(){if(css3){var left=self.move.css('transform').toString().split(',')[4]}else{var left=$(ul).css('left')}var left=parseInt(left,10);var touch=event.touches[0];this.startPos={x:touch.pageX,y:touch.pageY,left:left};if(css3){$(ul).css({transitionDuration:'0ms'})}};this.move=function(){var self=this;var touch=event.touches[0];self.endPos={x:touch.pageX-self.startPos.x,y:touch.pageY-self.startPos.y};self.isScrolling=Math.abs(self.endPos.x)<Math.abs(self.endPos.y)?1:0;if(self.isScrolling===0){event.preventDefault();var left=self.startPos.left+self.endPos.x;left+='px';if(css3){$(ul).css({transform:'translate('+left+',0px)'})}else{$(ul).css({left:left})}}};this.end=function(){var self=this;if(self.endPos.x>0){left_click()}else if(self.endPos.x<0){right_click()}}};var touch=new touch_scroll(move,self.css3);touch.int()}};
//cookie
var cookie={
	setcookie:function(name,value,Days){
		if(typeof(Days)=='undefined'){
			var Days=24;
		}
		var date=new Date(); 
		date.setTime(date.getTime() + Days*1*60*60*1000);
		document.cookie=name+"="+value+";path=/;expires="+date.toGMTString();
	},
	getcookie:function(name){//获取指定名称的cookie的值
		var cookies=document.cookie.split(';'); 
		var cookieValue=0;
		for (var i=0; i < cookies.length; i++){
			var cookie=jQuery.trim(cookies[i]); 
			if(cookie.substring(0, name.length + 1)==(name + '=')){
				cookieValue=decodeURIComponent(cookie.substring(name.length + 1)); 
				break; 
			}
		}
		return cookieValue; 
	}
}
//is pc start
var ispc=true;
var ispc_fun=function(){
	var dom=$('.header .media_show').width();
	var ispc=true;
	if(dom==34){
		return false;
	}else{
		return true;
	}
}
$(function(){
	ispc=ispc_fun();
	$(window).resize(function(){
		ispc=ispc_fun();
	});
});
//is pc end
var change_star=function(){};
//all -> js
var globle_js=function(){
	this.header=function(){$('.header .pro_nav')
		$('.header .nav_a').click(function(){
			if(!ispc){
				if(this.id==1){
					$(this).parent().removeClass('current');
					this.id=0;
				}else{
					$(this).parent().addClass('current');
					this.id=1;
				}
				return false;
			}
		});
		$('.header .media_show').click(function(){
			if($('#header_nav').hasClass('current')){
				$('#header_nav').removeClass('current');
			}else{
				$('#header_nav').addClass('current');
			}
		})
	};
	//Single->li->scroll
	this.go_to=function(){
		$('.go_to').click(function(){
			var id=$(this).attr('where');
			var space_top=$(this).attr("space_top");
			if(typeof(space_top)=='undefined'){
				space_top=0;
			}
			var top=$('#'+id).offset().top-space_top;
			$('body,html').animate({ scrollTop:top},600);
			return false;
		});
	};
	//all changes by check
	this.check_change=function(clicks,checks,mouse_or_click){
		if(typeof(mouse_or_click)=='undefined'){
			var mouse_or_click='click';
		}else{
			var mouse_or_click='mouseover';
		}
		$(document).on(mouse_or_click,clicks,function(){
			var num=$(this).attr('changeid');
			$(clicks).removeClass('current');
			$(clicks+'[changeid="'+num+'"]').addClass('current');
			$(checks).addClass('hidden');
			$(checks+'[changeid="'+num+'"]').removeClass('hidden');
		})
	};
	this.check_hook=function(clicks,changes,fun){
		var isfun=false;
		if(typeof(fun)=='function'){
			isfun=true;
		}else{
			isfun=false;
		}
		$(document).on('click',clicks,function(){
			if($(this).hasClass('current')){
				$(changes+'[changeid="1"]').addClass('hidden');
				$(changes+'[changeid="0"]').removeClass('hidden');
				$(clicks).removeClass('current');
				if(isfun){
					fun($(this),false);
				}
			}else{
				$(changes+'[changeid="0"]').addClass('hidden');
				$(changes+'[changeid="1"]').removeClass('hidden');
				$(clicks).addClass('current');
				if(isfun){
					fun($(this),true);
				}
			}
		})
	};
	this.classify_table=function(){//classify_table shows
		if($('.classify_table').length>0){
			$('.classify_table .name').each(function(){
				var have=0;
				$(this).click(function(){
					var table_list=$(this).parents('.classify_table');
					var table_list_child=table_list.children().not(table_list.children()[0]).clone();
					if(!ispc){
						var li=$(this).parent();
						if(this.id==1){
							li.removeClass('current');
							this.id=0;
						}else{
							li.addClass('current');
							if(have==0){
								li.append('<div class="table_media_content"></div>');
								li.find('.table_media_content').append(table_list_child);
								have=1;
							}
							this.id=1;
						}
						return false;
					}
				});
			});
			//no_img set auto min-height
			var name=$('.classify_table .name');
			if(name.length>0){
				function name_fu(){
					name.removeAttr('style');
					var min_height=0;
					name.each(function(){
						var height=$(this).height();
						if(min_height<height){
							min_height=height;
						}
					});
					if(ispc){
						name.css({minHeight:min_height+'px'});
					}
				}
				name_fu();
				$(window).resize(function(){
					name_fu();
				})
			}
			//scale
			$('.classify_table li').hover(function(){
				if(ispc){
					var num=$(this).index();
					$(this).parent().parent().addClass('hover_index_'+num);
				}
			},function(){
				if(ispc){
					var num=$(this).index();
					$(this).parent().parent().removeClass('hover_index_'+num);
				}
			})
		}
	};
	this.classify_table_fixed=function(){//classify_table_fixed
		var classify_table_fixed=$('#classify_table_fixed');
		var classify_table=$('#classify_table');	
		var isfixed=false;
		if(classify_table_fixed.length>0){
			var top=classify_table.offset().top+$('#classify_table > ul:eq(0)').height()-classify_table_fixed.height()-30;
			var hide_top=classify_table.offset().top+classify_table.height()-classify_table_fixed.height();
			$(window).resize(function(){
				if(ispc){
					top=classify_table.offset().top+$('#classify_table > ul:eq(0)').height()-classify_table_fixed.height()-30;
					hide_top=classify_table.offset().top+classify_table.height()-classify_table_fixed.height();
				}else{
					classify_table_fixed.removeClass('current');
				}
			})
			$(window).scroll(function(){
				if(ispc){
					var sc_top=$(window).scrollTop();
					if(sc_top>top){
						if(!isfixed){
							classify_table_fixed.addClass('current');
							isfixed=true;
						}
						if(sc_top<hide_top){
							classify_table_fixed.addClass('current');
						}else{
							classify_table_fixed.removeClass('current');
						}
					}else{
						if(isfixed){
							classify_table_fixed.removeClass('current');
							isfixed=false;
						}
					}
				}
			})
		}
	};
	this.downloads_num=function(){
		if($('.downloads_num').length>0){
			var autotime=$('.downloads_num').attr('autotime');
			if(typeof(autotime)=='undefined'){
				autotime=5000;
			}else{
				autotime=Number(autotime)*1000;
			}
			var rd=function(n,m){
				var c = m-n+1;  
				return Math.floor(Math.random() * c + n);
			}
			var num_change=function(id){
				$(id).each(function(i){
					var thisid=id+i;
					if(cookie.getcookie(thisid)!=0){
						var num=Number(cookie.getcookie(thisid))+rd(1,5);
					}else{
						var num=Number($(this).attr('num'))+rd(1,5);
					}
					$(this).attr({num:num});
					num=num.toString();
					var span='<span>';
					for(var i=0;i<num.length;i++){
						span+=num[i]+'</span><span>';
					}
					span=span.replace(/<span>$/,'');
					var word=$(this).attr('word');
					if(typeof(word)=="undefined"){
						word='';
					}
					$(this).html(word+span);
					cookie.setcookie(thisid,num);
				});
			}
			num_change('.downloads_num');
			var st=window.setInterval(function(){
				num_change('.downloads_num');
			},autotime)
		};
	};
	this.float_side=function(){//all the sidebar and fixed js runing here
		//nav fixed
		var show_top=650;
		var show_num=0;
		var product_nav=$('.product_nav');
		var show_top_fun=function(){
			show_top=product_nav.offset().top;
		}
		if(product_nav.length>0){
			show_top_fun();
		}
		var pro_fixed_button=$('.pro_fixed_button');
		if(pro_fixed_button.length>0){
			$(window).resize(show_top_fun);
			$(window).scroll(function(){
				if($(window).scrollTop()>show_top){
					if(show_num==0){
						pro_fixed_button.addClass('current');
						show_num=1;
					}
				}else{
					if(show_num==1){
						pro_fixed_button.removeClass('current');
						show_num=0;
					}
				}
			})
		}
	};
	this.star=function(id_num){//星星
		//change-star for jsonP
		change_star=function(json){
			var json=JSON.parse(json);;
			var star1=json.star1;
			var star2=json.star2;
			var star3=json.star3;
			var star4=json.star4;
			var star5=json.star5;
			var review_url=json.url;
			var star_content=$('#star_content');
			var star_num=$('#star_num');
			star1=Number(star1);star2=Number(star2);star3=Number(star3);star4=Number(star4);star5=Number(star5);
			var allstar=star1+star2+star3+star4+star5;//获取有多少条评论
			var star=new Array(
				star5,star4,star3,star2,star1
			);
			var allstarnum=0;//获取总的实际评分
			var i=0;//设置循环i
			for(i=4;i>=0;i--){
				var s=4-i;
				allstarnum+=star[s]*(i+1);
			}
			allstarnum=Math.floor((allstarnum/allstar)*2)/2;//pro star
			var span='';
			var big_span='';//分类页大猩猩
			var spanid=1;
			if(allstarnum%2==0.5 || allstarnum%2==1.5){
				spanid=0;
			}
			for(i=1;i<=5;i++){
				if(i<=allstarnum){
					span+='<span class="star_01"></span>';
					big_span+='<span class="starBig_01"></span>';
				}else{
					if(spanid==0){
						span+='<span class="star_02"></span>';
						big_span+='<span class="starBig_02"></span>';
						spanid=1;
					}else{
						span+='<span class="star_03"></span>';
						big_span+='<span class="starBig_03"></span>';
					}
				}
			}
			if(star_num.length>0){
				star_num.html('<meta itemprop="ratingValue" content="'+allstarnum+'" />'+span);//植入html
			}
			var num=0;//绑定星际评分条
			if(star_content.length>0){
				star_content.find('.percent').each(function(){
					var star_pre=star[num]/allstar*100+'%';
					$(this).find('b').css({width:star_pre});
					$(this).next().html('('+star[num]+')');
					num++;
				})
				//下面是绑定hover事件
				star_content.mouseenter(function(){
					$(this).find('.star_button').addClass('current');
					var starlist=$(this).find('.star_list');
					starlist.stop();
					starlist.removeClass('hidden');
				}).mouseleave(function(){
					$(this).find('.star_button').removeClass('current');
					var starlist=$(this).find('.star_list');
					starlist.stop();
					starlist.addClass('hidden');
				});	
			}
			//首页banner插入review评论数
			if($('.banner_star').length>0){
				$('.banner_star .star').after('<a href="/'+review_url+'" class="review_url">('+allstar+')</a>');
			}
			//导航review
			if($('.product_nav .review').length>0){
				$('.product_nav .review,.pro_fix_nav .review').html("<span>&nbsp;</span>Review("+allstar+")");
				
			}
			//分类页review数量设置
			if($('#topreview .word').length>0){
				if($('#topreview .word a').length>0){
					$('#topreview .word a').text('Review('+allstar+')');
				}else{
					$('#topreview .word').text('Review('+allstar+')');
				}
			}
			if($('#topreview2').length>0){
				$('#star_num2').html(big_span);
				$('#topreview2 .word').text('Review('+allstar+')');
			}
		};
		//dom script
		var dom=document.createElement('script');
		dom.src="http://www.easeus.com/product/get_star_num_1?pid="+id_num+'&callback=change_star';
		document.body.appendChild(dom);
		//review按钮锚点
		$('.top_review .button').click(function(){
			var top=$('.submit_liveword').offset().top-100;
			$('body,html').animate({scrollTop:top},600);
		})
	};
	this.animate=function(clas){
		$(clas).each(function(){
			var this_top=$(this).offset().top-$(window).height()+60;
			var fun=function(event){
				var self=event.data.self;
				if($(window).scrollTop()>this_top){
					self.addClass('run');
					$(document).unbind('scroll',fun);
				}
			}
			$(document).bind('scroll',{self:$(this)},fun);
			//run buy onces
			if($(window).scrollTop()>this_top){
				$(this).addClass('run');
				$(document).unbind('scroll',fun);
			}
		});
	};
	this.countdown=function(){
		if($('.time').length>0){
			window.setInterval(function(){
				var a=new Date();
				a.setHours(0,0,0,0);
				a.setDate(a.getDate()+1);
				var b=new Date();
				var s=Number(a)-Number(b);
				if(s>0){
					var m=Math.ceil(s/1000);
					var f=Math.floor(m/60);
					var t=Math.floor(f/60);
					var day=Math.floor(t/24);
					var mm=m-f*60;
					var ff=f-t*60;
					var t=t-day*24;
					$('.time .hours').html(t);
					$('.time .minutes').html(ff);
					$('.time .seconds').html(mm);
				}
			},1000);
		}
	};
	this.version=function(){
		if($('.version').length>0){
			var dom=document.createElement('script');
			dom.src='default/js/version.js';
			document.body.appendChild(dom);
		}
	};
	this.buy_linkid_run=function(){//购买页，linkid根据来源不同做修改， 执行
		//get buy_linkid
		var buy_linkid=document.URL;
		buy_linkid=buy_linkid.match(/linkid\=.*/);
		if(buy_linkid!=null){
			buy_linkid=buy_linkid[0];
			if(/\&/.test(buy_linkid)){
				buy_linkid=buy_linkid.split('&');
				buy_linkid=buy_linkid[0];
			}
			buy_linkid=buy_linkid.split('=');
			buy_linkid=buy_linkid[1];
			//set buy_linkid
			$('.buy_linkid').each(function(){
				var url=$(this).attr('href');
				var linkids=url.match(/linkid\=.*/);
				if(linkids!=null){
					linkids=linkids[0];
					if(/\&/.test(linkids)){
						linkids=linkids.split('&');
						linkids=linkids[0];
					}
					url=url.replace(linkids,'linkid='+buy_linkid);
					$(this).attr({href:url});
				}else{
					if(!(/javascript\:void\(0\)/.test(url))){
						$(this).attr({href:url+'&linkid='+buy_linkid});
					}
				}
			});
		}
	};
	this.pop_img=function(){
		if($('.pop_img').length>0){
			$('body').append('<div id="tc_sp"><span class="loading"></span><div id="tc_sphtml"></div><div id="tc_close"></div></div><div id="tc_bg"></div>');
		};
		$('.pop_img').click(function(){
			$('#tc_sp').css({display:'block'}).animate({
				opacity:1
			},300);
			$('#tc_bg').css({display:'block'}).animate({
				opacity:0.8
			},300);
			$('#tc_sphtml').html('');
			$('#tc_sp .loading').show();
			var src=$(this).attr('href');
			var img=new Image();
			img.onload=function(){
				$('#tc_sphtml').width(img.width);
				$('#tc_sp').width(img.width).css({marginLeft:(img.width)/-2});
				$('#tc_sphtml').html('<img src="'+src+'" width:="'+img.width+'" height="'+img.height+'" />');
				$('#tc_sp .loading').hide();
			};
			img.src=src;
			return false;
		});
		$('#tc_bg').click(function(){
			$('#tc_sp').animate({
				opacity:0
			},300,function(){
				$(this).css({display:'none'});
			});
			$('#tc_bg').animate({
				opacity:0
			},300,function(){
				$(this).css({display:'none'});
			});
			$('#tc_sp .loading').hide();
		});
		$('#tc_close').click(function(){
			$('#tc_bg').click();
		});
	};
	this.float_banner=function(){
		$(document).on('click','.float_banner .close_bt',function(){
			$(this).parent().slideUp(400,function(){$(this).remove();});
		});
	};
	this.height_resize=function(clas){
		$(clas).each(function(){
			var self=$(this);
			var box_height=$(this).height();
			var resize_run=function(){
				var width=$(window).width();
				if(width>1920){
					var height=width*box_height/1920;
					self.css({minHeight:height});
				}else{
					self.css({minHeight:box_height});
				}
			}
			$(window).resize(function(){
				resize_run();
			})
			resize_run();
		})
	};
	this.hover_change=function(checks,changes){//模拟搜索框hover效果切换change
			$(checks).hover(
				function(){
					$(checks+' > ol').css({display:'block'});
				},
				function(){
					$(checks+' > ol').css({display:'none'});
				}
			)
			$(checks+' li').click(function(){
				var num=$(this).attr('value')
				$(checks+' span').html($(this).html());
				$(checks+' > ol').css({display:'none'});
				$(changes).addClass('hidden');
				$(changes+'[changeid="'+num+'"]').removeClass('hidden');
			})
		};
	this.support_sibebar=function(){//support页面侧边栏hover效果
			var dom=$('#part_box_support .thishover');
			if(dom.length>0){
				dom.hover(function(){
					$(this).find('dl').show();
				},function(){
					$(this).find('dl').hide();
				})
				
			}
		};
	this.fixded_scrolls=function(clas,class_hide){
		var clas=$(clas);
		var class_hide=$(class_hide);
		var top=0;
		var resize_all=function(){
			top=clas.offset().top;
			hide_top=class_hide.height()+top-clas.height();
			clas.width(clas.parent().width());
		}
		resize_all();
		$(window).resize(function(){
			resize_all();
		})
		$(window).scroll(function(){
			if(ispc){
				var sc_top=$(window).scrollTop();
				if(sc_top>top){
					if(sc_top<hide_top){
						clas.addClass('current');
						clas.removeClass('fixed');	
					}else{
						clas.removeClass('current');
						clas.addClass('fixed');	
					}
				}else{
					clas.removeClass('current');
				}
			}else{
				clas.removeClass('current');
				clas.removeClass('fixed');
			}
		})
	};
	this.scroll_li=function(clas,left,right,auto_time){var time=600;var allnum=$(clas).children().length;$(clas).html($(clas).html()+$(clas).html());var wid=0;var num=0;var goright=0;$(clas).children().each(function(){wid+=$(this).outerWidth();$(this).attr({widths:$(this).outerWidth()}).css({width:$(this).outerWidth()})});$(clas).width(wid);$(right).click(function(){click_right()});function click_right(){var gowid=Number($(clas).children().eq(num).attr("widths"));num+=1;goright+=gowid;$(clas).animate({right:goright},time,function(){if(num>=allnum){num=0;goright=0;$(clas).css({right:0})}})}$(left).click(function(){if(num==0){$(clas).css({right:wid/2});num=allnum;goright=wid/2}num-=1;var gowid=Number($(clas).children().eq(num).attr("widths"));goright-=gowid;$(clas).animate({right:goright})});var st="";if(typeof(auto_time)=="undefined"){auto_time=4000}function settime(){st=window.setInterval(function(){click_right()},auto_time)}settime();$(clas+","+left+","+right).hover(function(){window.clearInterval(st)},function(){settime()})};
	this.scroll_mouse=function(list,left_click,right_click){var length=0;var list=$(list);var left_click=$(left_click);var right_click=$(right_click);var last_left=0;var wd_resize=function(){length=0;list.children().each(function(){length+=$(this).width()});last_left=list.parent().width()-length;list.width(length)};wd_resize();$(window).resize(function(){wd_resize()});left_click.mousedown(function(){list.animate({left:0},1000)});right_click.mousedown(function(){list.animate({left:last_left},1000)});left_click.mouseup(function(){list.stop()});right_click.mouseup(function(){list.stop()})};
	this.hide_show=function(leftclick,rightclick,list,auto_time){var num=0;var effect_time=600;var len=$(list).length;$(leftclick).click(function(){left_click()});function left_click(){num--;if(num<0){num=len-1;};auto(num);};$(rightclick).click(function(){right_click();});function right_click(){num++;if(num>=len){num=0;};auto(num);};function auto(num){window.clearInterval(st);set_auto_time();$(list).eq(num).fadeIn(effect_time).removeClass('hidden').siblings().addClass('hidden').fadeOut(effect_time);};var st='';function set_auto_time(){st=window.setInterval(function(){right_click();},auto_time);};set_auto_time();};
	this.language_link=function(){//to other language
		if(navigator.language){
			var language=navigator.language;
		}else{
			var language=navigator.browserLanguage;
		}
		var url=document.URL;
		var article=0;
		if(typeof(this_page_is_article)!='undefined'){
			article=1;
		}
		url=url.replace(/index.html{0,1}/,'');
		url=url.replace(/http\:\/\/bd\.easeus\.com|http\:\/\/192\.168\.1\.\d{1,3}/,'http://www.easeus.com');
		//
		var page_pop=cookie.getcookie('page_pop');
		if(page_pop!='no'){
			if(/de/.test(language)){
				$.get('article/jump.html',{language:'de',url:url,article:article},function(date){
					if(confirm('Sie besuchen jetzt unsere Englische Website. Möchten Sie auf deutsche Website wechseln?')){
						cookie.setcookie('page_pop','yes');
						$.get('article/count.html',{action:'yes',url:url,article:article},function(){
							window.location.href=date;
						})
					}else{
						cookie.setcookie('page_pop','no');
						$.get('article/count.html',{action:'no',url:url,article:article});
					}
				})
			}
		}
	};
}
//run function
$(function(){
	var globleJs=new globle_js();
	globleJs.header();
	globleJs.go_to();
	globleJs.float_side();
	globleJs.classify_table();
	globleJs.animate('.animate_left,.animate_right,.animate_top,.animate_show,.animate_flip,.animate_rotate');
	globleJs.countdown();
	globleJs.version();
	if($('.buy_linkid').length>0){
		globleJs.buy_linkid_run();
	};
	globleJs.downloads_num();
	globleJs.pop_img();
	globleJs.float_banner();
	globleJs.support_sibebar();//support页面侧边栏hover效果
	globleJs.height_resize('.height_resize');
	/*for->article*/
	if($('.article_check').length>0){
		globleJs.check_change('.article_check font','.article_button');
	};
	//globleJs.language_link();
})