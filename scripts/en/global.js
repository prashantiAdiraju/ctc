var globle_scroll=function(){};
//设定cook设置和获取类
var cookie={
	setcookie:function(name,value){
		var Days=1;
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
//all -> js
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
$(function(){
	globle_js=function(){
		this.gos=function(){
			//table页面价格选择跳转
			if($('.table_price_check').length>0){
				$(document).on('click','.table_price_check',function(){
					var id=$(this).val();
					$('.table_price_num').eq(id).removeClass('hidden').siblings('.table_price_num').addClass('hidden');
					$('.table_price_link').eq(id).removeClass('hidden').siblings('.table_price_link').addClass('hidden');
				})
			}
			if($('.table_price_check_f').length>0){
				$(document).on('click','table_price_check_f',function(){
					var id=$(this).val();
					$('.table_price_link_f').eq(id).removeClass('hidden').siblings('.table_price_link_f').addClass('hidden');
				})
			}
			//回到顶部
			if(!(!-[1,]&&!window.XMLHttpRequest)){//非ie6情况下效果
			$('body').append('<div class="to_top"></div>');
				$(window).scroll(function(){//totop滚动
					if($(window).scrollTop()>450){
						$('.to_top').show(500);
					}else{
						$('.to_top').hide(500);
					};
				});
				$('.to_top').hide(0);
				$('.to_top').click(function(){
					$('body,html').animate({ scrollTop: 0 }, 600);
				});
			}
			$('.go_to').click(function(){//这里开始，增加页面锚点，用js做。用法：点击的地方增加class->go_to,增加id如to_p,锚点增加->to_ps，go_to_h该属性为多移动的距离
				var first_ck=$('.nav_this > li');
				if(first_ck.length>0){
					first_ck.last().click();
				}
				var top=$(this).attr('go_to_h');
				if(typeof(top)=='undefined'){
					top=40;
				}else{
					top=Number(top);
				}
				var id=this.id+'_s';
				var top=$('#'+id).offset().top-top;
				$('body,html').animate({ scrollTop:top},600);
				return false;
			});
		};
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
		this.scroll_li=function(clas,left,right){var time=600;var allnum=$(clas).children().length;$(clas).html($(clas).html()+$(clas).html());var wid=0;var num=0;var goright=0;$(clas).children().each(function(){wid+=$(this).outerWidth();$(this).attr({widths:$(this).outerWidth()});});$(clas).width(wid);$(right).click(function(){click_right();});function click_right(){var gowid=Number($(clas).children().eq(num).attr('widths'));num+=1;goright+=gowid;$(clas).animate({right:goright},time,function(){if(num>=allnum){num=0;goright=0;$(clas).css({right:0});}});};$(left).click(function(){if(num==0){$(clas).css({right:wid/2});num=allnum;goright=wid/2;};num-=1;var gowid=Number($(clas).children().eq(num).attr('widths'));goright-=gowid;$(clas).animate({right:goright});});var st='';function settime(){st=window.setInterval(function(){click_right();},4000);};settime();$(clas).hover(function(){window.clearInterval(st)},function(){settime();});};
	this.hide_show=function(leftclick,rightclick,list,auto_time){var num=0;var effect_time=600;var len=$(list).length;$(leftclick).click(function(){left_click()});function left_click(){num--;if(num<0){num=len-1;};auto(num);};$(rightclick).click(function(){right_click();});function right_click(){num++;if(num>=len){num=0;};auto(num);};function auto(num){window.clearInterval(st);set_auto_time();$(list).eq(num).fadeIn(effect_time).removeClass('hidden').siblings().addClass('hidden').fadeOut(effect_time);};var st='';function set_auto_time(){st=window.setInterval(function(){right_click();},auto_time);};set_auto_time();};
		this.all_pop=function(id,links,title){
			var left=$(window).width()/2-290;
			var top=$(window).height()/2-290;//获取高宽
			var openvalue='height=580,width=580,top='+top+',left='+left+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no';//设置弹出属性
			$(id).click(function(){
				window.open(links,title,openvalue)
			})
		};
		this.subnav_fixed=function(){//subnav导航的浮动效果开启，包括radio
			//radio
			var radio=$('#subnav_radio input');
			var arr=new Array();
			radio.each(function(){
				arr.push(this.value);
			})
			radio.click(function(){
				var val=this.value;
				for(i=0;i<arr.length;i++){
					thischeck(val,arr[i]);
				}
				function thischeck(vals,nr){
					if(vals==nr){
						$('#subnav_fixed a').addClass('hidden');
						$('#subnav_fixed a[support="'+vals+'"]').removeClass('hidden');
					}
				}
			});//上面针对input,以下针对span;
			var radio_span=$('#subnav_radio span');
			radio_span.click(function(){
				radio_span.removeClass('active');
				$(this).addClass('active');
				var id=$(this).index();
				$('#subnav_fixed > div').addClass('hidden');
				$('#subnav_fixed > div').eq(id).removeClass('hidden');
			})
			//浮动效果开启
			var fix=$('.subnav_product');
			if(fix.length>0){
				var top=fix.offset().top;
				$(window).scroll(function(){
					if($(window).scrollTop()>top){
						fix.addClass('subnav_product_fixed');
					}else{
						fix.removeClass('subnav_product_fixed');
					}
				})
			}
		};
		this.table_fixed=function(){//table头部浮动
			if($('.table_prolist_fixed').length>0){
				var hei=$('#table_prolist_fixed').height();
				$(window).scroll(function(){
					if($('#table_prolist_fixed').offset().top<$(window).scrollTop()){
						if(($('#table_prolist_fixed').offset().top+hei)<$(window).scrollTop()){
							$('.table_prolist_fixed').css({display:'none'})
						}else{
							$('.table_prolist_fixed').css({display:'block'})
						}
					}else{
						$('.table_prolist_fixed').css({display:'none'})
					}
				})
			}
		};
		this.classify_table=function(){//classify_table shows
			function tb(a,b,c){
				var len=$(a).length;
				if(len<=0){
					return false;
				}
				$(b).each(function(){
					var have=0;
					var li=$(this).parent().parent();
					var table_list_child=$(c).eq(0).clone();
					$(this).click(function(){
						if(this.id==1){
							li.removeClass('current');
							this.id=0;
						}else{
							li.addClass('current');
							if(have==0){
								table_list_child.appendTo(li);
								have=1;
							}
							this.id=1;
						}
					})
				});
			}
			tb('.classify_table_title li','.classify_table_title span.word','.classify_table_content');//new
			tb('.table_list_title > li','.table_list_title .media','.table_list_child');//old
			//no_img set auto min-height
			var no_img=$('.classify_table_title .no_img,.classify_table_title .t_title_word');
			if(no_img.length>0){
				var min_height=0;
				no_img.each(function(){
					var height=$(this).height();
					if(min_height<height){
						min_height=height;
					}
				});
				no_img.css({minHeight:min_height+'px'});
			}
		};
		this.star=function(id,star_num,star5,star4,star3,star2,star1){//星星
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
			allstarnum=Math.floor((allstarnum/allstar)*2)/2;//获取当前的总星级
			var span='';//设定星星评分总级的html内容；
			var spanid=1;//设定半星情况
			if(allstarnum%2==0.5 || allstarnum%2==1.5){
				spanid=0;
			}
			for(i=1;i<=5;i++){
				if(i<=allstarnum){
					span+='<span class="star_01">&nbsp;</span>';
				}else{
					if(spanid==0){
						span+='<span class="star_02">&nbsp;</span>';
						spanid=1;
					}else{
						span+='<span class="star_03">&nbsp;</span>';
					}
				}
			}
			$(star_num).html(span+'<meta itemprop="ratingValue" content="'+allstarnum+'" />');//植入html
			var num=0;//绑定星际评分条
			$(id).find('.percent').each(function(){
				var star_pre=star[num]/allstar*100+'%';
				$(this).find('b').css({width:star_pre});
				$(this).next().html('('+star[num]+')');
				num++;
			})
			//下面是绑定hover事件
			$(id).mouseenter(function(){
				$(this).find('.star_button').addClass('current');
				var starlist=$(this).find('.star_list');
				starlist.stop();
				starlist.removeClass('hidden');
			}).mouseleave(function(){
				$(this).find('.star_button').removeClass('current');
				var starlist=$(this).find('.star_list');
				starlist.stop();
				starlist.addClass('hidden');
			})
		};
		this.review_roll=function(id){//review_roll渐隐渐现效果
			var num=0;
			var time=1000;
			var st=window.setInterval(function(){
				$(id).eq(num).animate({opacity:1},time).removeClass('hidden').siblings().animate({opacity:0},time,function(){$(this).addClass('hidden');})
				num++;
				if(num>=$(id).length){
					num=0;
				}
			},5000);
		};
		this.scrolls=function(clas,left,right,clicks,time,resize){
			if($(clas).length>0){
				var index_banner=new banner_scroll(clas,left,right,clicks,time,resize);
				if(resize==true){
					index_banner.resize=true;
				}
				index_banner.gos();
			}
		};
		this.scroll_bottom=function(){//页面下方友情链接图片滚动
			var time=600;
			var allnum=$('#scroll_bottom li').length;
			$('#scroll_bottom').html($('#scroll_bottom').html()+$('#scroll_bottom').html());
			var wid=0;
			var num=0;
			var goright=0;
			$('#scroll_bottom li').each(function(){
				wid+=$(this).outerWidth();
				$(this).attr({widths:$(this).outerWidth()});
			})
			$('#scroll_bottom').width(wid);
			$('#scroll_bottom_right').click(function(){
				var gowid=Number($('#scroll_bottom li').eq(num).attr('widths'));
				num+=1;
				goright+=gowid;
				$('#scroll_bottom').animate({
					right:goright
				},time,function(){
					if(num>=allnum){
						num=0;
						goright=0;
						$('#scroll_bottom').css({right:0})
					}
				})
			});
			$('#scroll_bottom_left').click(function(){
				if(num==0){
					$('#scroll_bottom').css({right:wid/2});
					num=allnum;
					goright=wid/2;
				}
				num-=1;
				var gowid=Number($('#scroll_bottom li').eq(num).attr('widths'));
				goright-=gowid;
				$('#scroll_bottom').animate({
					right:goright
				})
			});
			var st='';
			function settime(){
				st=window.setInterval(function(){
					$('#scroll_bottom_right').click()
				},4000)
			}
			settime();
			$('.scroll_bottom_ul').hover(
				function(){
					window.clearInterval(st)
				},
				function(){
					settime();
				}
			)
		};
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
		this.check_hook=function(clicks,changes){
			$(clicks).click(function(){
				if($(this).hasClass('current')){
					$(changes+'[changeid="1"]').addClass('hidden');
					$(changes+'[changeid="0"]').removeClass('hidden');
					$(this).removeClass('current');
				}else{
					$(changes+'[changeid="0"]').addClass('hidden');
					$(changes+'[changeid="1"]').removeClass('hidden');
					$(this).addClass('current');
				}
			})
		};
		this.change_byChangeid=function(clicks,checks){//一般普通的切换
			$(document).on('click',clicks,function(){
				var num=$(this).attr('changeid');
				$(clicks).removeClass('current');
				$(clicks+'[changeid="'+num+'"]').addClass('current');
				$(checks).addClass('hidden');
				$(checks+'[changeid="'+num+'"]').removeClass('hidden');
			})
		};
		this.input_change=function(clicks,checks){
			$(document).on('click',clicks,function(){
				$(this).attr({checked:"checked"});
				var num=$(this).attr('changeid');
				$(checks).each(function(){
					if($(this).attr('changeid')==num){
						$(this).removeClass('hidden');
					}else{
						$(this).addClass('hidden');
					}
				})
			})
		};
		this.select_change=function(checks,changes){//搜索框切换change
			$(checks).change(function(){
				var num=$(this).val();
				$(changes).addClass('hidden');
				$(changes+'[changeid="'+num+'"]').removeClass('hidden');
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
		this.fix=function(self){
			var top=$(self).offset().top;
			$(window).scroll(function(){
				if($(window).scrollTop()>top){
					$(self).addClass('fixed');
				}else{
					$(self).removeClass('fixed');
				}
			})
		};
		this.share=function(){
			var left=$(window).width()/2-290;
			var top=$(window).height()/2-290;//获取高宽
			var openvalue='height=580,width=580,top='+top+',left='+left+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no';//设置弹出属性
			if($('.float_share').length>0){
				var url=document.URL;
				var title=$('title').eq(0).html();
				var twitter_title='';//twitter用的title
				var text_len=120-url.length;
				if(title.length>text_len){
					twitter_title=title.substr(0,text_len)+'...';
				}else{
					twitter_title=title;
				}
				var facebook='http://www.facebook.com/sharer/sharer.php?u='+url;
				$('#share_facebook').click(function(){
					window.open(facebook,'facebook',openvalue)
				});
				var twitter='https://twitter.com/intent/tweet?text='+twitter_title+'&url='+url+'&via=EaseUS';
				$('#share_twitter').click(function(){
					window.open(twitter,'twitter',openvalue);
				});
				var google='https://plus.google.com/share?url='+url;
				$('#share_google').click(function(){
					window.open(google,'google',openvalue);
				});
			};
		};
		this.demo_price=function(linkid){
			if(typeof(linkid)=='undefined'){
				linkid='e_tbstore';
			}
			var price={
				set_price:new Array(
					new Array(39,37,35,31,27,23),
					new Array(199,189,179,159,139,119),
					new Array(299,284,269,239,209,179),
					new Array(999,1399),
					new Array(99,159,259),
					45,
					12,
					new Array(29,27,25,23,20,17)
				),
				set_links:new Array(
					'16514-34',
					'16514-35',
					'16514-43',
					new Array('16514-81','16514-82'),
					new Array('16514-51','16514-52','16514-53'),
					'16514-73',
					'16514-74',
					'16514-39'
				),
				gos:function(){
					var option='';
					for(i=0;i<=35;i++){
						option+=('<option value="'+i+'">'+i+'</option>');
					}
					$('.table_solution_store .number').html(option);
				},
				change:function(){
					var allprice=price.set_price;
					$('.table_solution_store .number').change(function(){
						var this_tr=$(this).parents('tr');
						var name=Number(this.name);
						var val=Number(this.value);
						var new_price=0;
						var save_price=0;//每一件省下了多少钱
						if(name<=2 || name==7){
							if(val<=1){
								new_price=allprice[name][0];
								save_price=0;
							}else if(val<=5){
								new_price=allprice[name][1];
								save_price=allprice[name][0]-allprice[name][1];
							}else if(val<=10){
								new_price=allprice[name][2];
								save_price=allprice[name][0]-allprice[name][2];
							}else if(val<=20){
								new_price=allprice[name][3];
								save_price=allprice[name][0]-allprice[name][3];
							}else if(val<=50){
								new_price=allprice[name][4];
								save_price=allprice[name][0]-allprice[name][4];
							}
						}else if(name<=3){
							var thisval=Number($('.table_solution_store .months').val());
							new_price=allprice[name][thisval];
							save_price=0;
						}else if(name<=4){
							var thisval=Number($('.table_solution_store .computers').val());
							new_price=allprice[name][thisval];
							save_price=0;
						}else{
							new_price=allprice[name];
							save_price=0;
						}
						this_tr.find('.thisprice').attr({price:new_price,save_price:save_price}).html('$'+new_price.toFixed(2));
						var num=val*Number(this_tr.find('.thisprice').attr('price'));
						this_tr.find('.allprice').html('$'+num);
						price.get_all_price();
						price.set_link();
					});
					//月份切换等,下
					$('.table_solution_store .months').change(function(){
						var this_tr=$(this).parents('tr');
						var thisval=Number($('.table_solution_store .months').val());
						new_price=allprice[3][thisval];
						this_tr.find('.thisprice').attr({price:new_price}).html('$'+new_price.toFixed(2));
						var val=this_tr.find('.number').val();
						var num=val*Number(this_tr.find('.thisprice').attr('price'));
						this_tr.find('.allprice').html('$'+num);
						price.get_all_price();
						price.set_link();
					});
					$('.table_solution_store .computers').change(function(){
						var this_tr=$(this).parents('tr');
						var thisval=Number($('.table_solution_store .computers').val());
						new_price=allprice[4][thisval];
						this_tr.find('.thisprice').attr({price:new_price}).html('$'+new_price.toFixed(2));
						var val=this_tr.find('.number').val();
						var num=val*Number(this_tr.find('.thisprice').attr('price'));
						this_tr.find('.allprice').html('$'+num);
						price.get_all_price();
						price.set_link();
					});
				},
				get_all_price:function(){
					var all_the_price=0;
					var all_the_save_price=0;//单个节约的总价
					var id=0;
					$('.table_solution_store .number').each(function(){
						if(this.value!=0){
							id++;//判断选中了的有多少个
							all_the_price+=Number(this.value)*Number($(this).parents('tr').find('.thisprice').attr('price'));
							all_the_save_price+=Number(this.value)*Number($(this).parents('tr').find('.thisprice').attr('save_price'));
						}
					})
					if(id>=2){
						all_the_save_price+=all_the_price*0.2;
						all_the_price=all_the_price*0.8;
					}
					$('#all_price').html('$'+all_the_price.toFixed(2));
					$('#Save_price').html('*Save: $'+all_the_save_price.toFixed(2));
				},
				set_link:function(){
					var set_link=price.set_links;
					var links='https://shopper.mycommerce.com/checkout/cart/new';
					var link_next='';
					var id=0;
					$('.table_solution_store .number').each(function(){
						if(this.value!=0){
							id++;//判断选中了的有多少个
							var num=$(this).parents('tr').find('.number').val();
							var name=this.name;
							if(name==3){
								var thisval=Number($('.table_solution_store .months').val());
								links+='/'+set_link[3][thisval];
								link_next+='quantity_'+set_link[3][thisval]+'='+num+'&';
							}else if(name==4){
								var thisval=Number($('.table_solution_store .computers').val());
								links+='/'+set_link[4][thisval];
								link_next+='quantity_'+set_link[4][thisval]+'='+num+'&';
							}else{
								links+='/'+set_link[name];
								link_next+='quantity_'+set_link[name]+'='+num+'&';
							}
						}
					})
					if(id==0){
						links='javascript:void(0)';
					}else if(id==1){
						links+='?'+link_next+'linkid='+linkid;
						links=links.replace(/quantity.*?[=]/g,'quantity=');
					}else{
						links+='?'+link_next+'ss_coupon=CHEN-00D1-MUTI&linkid='+linkid;
					}
					$('#all_price_buy').attr({href:links});
				}
			}
			price.gos();
			price.change();
			price.set_link();
		};
		this.backuo_solution=function(){
			var id=$('.price_solution_store');
			if(id.length>0){
				var left=$('.table_solution_store').offset().left+764;
				var height=$('.table_solution_store').height();
				$(window).resize(function(){
					left=$('.table_solution_store').offset().left+764;
					id.css({left:left});
				})
				var top=id.offset().top;
				$(window).scroll(function(){
					var top_height=top+height-331;
					if(top_height<$(window).scrollTop()){
						id.removeClass('price_solution_store_fixed');
					}else if(top<$(window).scrollTop()){
						id.addClass('price_solution_store_fixed').css({left:left});
					}else{
						id.removeClass('price_solution_store_fixed')
					}
				});
			}
			//下面是左边浮动sidebar的
			var sidebar=$('#sidebar_fixed');
			if(sidebar.length>0){
				var top=sidebar.offset().top;
				var this_height=sidebar.height();
				var height=sidebar.parent().height();
				var top_height=height+top-this_height-30;
				$(window).scroll(function(){
					if(top_height<$(window).scrollTop()){
						sidebar.removeClass('sidebar_fixed');
					}else if(top<$(window).scrollTop()){
						sidebar.addClass('sidebar_fixed');
					}else{
						sidebar.removeClass('sidebar_fixed');
					}
				})
			}
		};
		this.pannel_home_change=function(){//通用切换，/home/index页面，其他页面可用
			$('.panel_home > li').click(function(){
				$(this).siblings().find('.click').removeClass('current');
				var ck_dom=$(this).children().first();
				ck_dom.addClass('current');
				var val=Number(ck_dom.attr('value'));//获取排行
				var links=$(this).parent().parent().find('.panel_home_link').children();//设置隐藏消失
				links.addClass('hidden');
				links.eq(val).removeClass('hidden');
				var price=ck_dom.attr('price');//获取价格
				price=price.split(',');
				var price_dom=$(this).parent().parent().find('.panel_home_allprice');
				if(price[0]=='none'){
					price_dom.find('del').html('');
				}else{
					price_dom.find('del').html(price[0]);
				}
				price_dom.find('span').html(price[1]);
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
		this.img_tc=function(clas,wid){
			$('body').append('<div id="tc_sp"><div id="tc_img"><img src="" width="720" /></div><span class="tc_clost"></span></div><div id="tc_bg"></div>');
			if(typeof(wid)=='undefined'){
				wid=720;
			}
			var time=300;
			$(clas).click(function(){
				$('#tc_sp').css({display:'block'}).animate({
					opacity:1
				},time)
				$('#tc_bg').css({display:'block'}).animate({
					opacity:0.5
				},time)
				$('#tc_img').css({width:wid}).html('<img src="'+$(this).attr('bgimg')+'" width="'+wid+'" />');
			});
			$('#tc_bg,.tc_clost').click(function(){
				$('#tc_sp').animate({
					opacity:0
				},time)
				$('#tc_bg').animate({
					opacity:0
				},time)
				window.setTimeout(function(){
					$('#tc_sp').css({display:'none'});
					$('#tc_bg').css({display:'none'});
				},time)
			});
			if(!-[1,]&&!window.XMLHttpRequest){
				$('#tc_bg').css({background:'none'});
				$('#tc_sp').css({position:'absolute'});
			};
		};
		this.float_banner=function(){
			$(document).on('click','.float_banner .close_bt',function(){
				$(this).parent().slideUp(400,function(){$(this).remove();});
			});
			//saturday and sunday change img
			var date=new Date();
			if(date.getDay()==6 || date.getDay()==0){
				$('.float_banner').replaceWith('<div class="float_banner weekend"><a href="http://www.easeus.com/campaign/special-weekend-2016.html"></a><span class="close_bt"></span></div>');
			}
		};
		this.pop_pages=function(ck_open,ck_close,pages,text){//调用后弹出调用的页面,text为默认文字
			$(ck_open).click(function(){
				$(pages).show(200);
				return false;
			})
			$(ck_close).click(function(){
				$(pages).hide(200);
			})
			var word=$(text).val();
			$(text).focus(function(){
				if(this.value==word){
					this.value='';
				}
			})
		};
		this.media_sidebar=function(){
			$('.part_box_support_media_show').click(function(){
				if(this.id==0){
					$('.part_box_support_media_bg').removeClass('hidden');
					$('.sidebar,.LeftSideBar').css({display:'block'});
					this.id=1;
				}else{
					$('.part_box_support_media_bg').addClass('hidden');
					$('.sidebar,.LeftSideBar').removeAttr('style');
					this.id=0;
				}
			});
			$('.part_box_support_media_bg').click(function(){
				$('.part_box_support_media_bg').addClass('hidden');
				$('.sidebar').removeAttr('style');
				$('.part_box_support_media_show').attr({id:0});
			});
		};
		this.all_float=function(){
			var self=this;
			function window_mouse_bind(clas,currents,mouse){//bind window mouse
				function fun(){
					currents.removeClass('current');
					$(document).unbind('click',fun);
				}
				clas.click(function(){
					if(currents.hasClass('current')){
						currents.removeClass('current');
					}else{
						currents.addClass('current');
					}
				});
				mouse.unbind('mouseleave').unbind('mouseenter');
				mouse.mouseleave(function(){
					$(document).bind('click',fun);
				}).mouseenter(function(){
					$(document).unbind('click',fun);
				});
			}
			//livechat->html
			var livechat_outside_html='<div class="float_livechat"><div class="show"></div></div>';
			var livechat_inside_html='<div class="livechat_content"><p class="title">What can we do for you?<span class="close"> </span></p><dl><dt>Technical Support</dt><dd class="link"><a target="_blank" href="http://www.easeus.com/support/technical-issues.html">Click here</a></dd><dd class="dis">Assistance on technical issues for paid users only.</dd></dl><dl><dt>Pre-Sales Inquiry</dt><dd class="link"><span class="click">Start a chat now</span></dd><dd class="dis">Pricing, inquiry and questions on license code, download link and invoice, etc.</dd></dl></div>';
			$('body').append(livechat_outside_html);
			$('.float_livechat,.toplink li.livechat').append(livechat_inside_html);
			self.all_pop('.livechat_content .click,.livechat_window_pop','https://secure.livechatinc.com/licence/1389892/open_chat.cgi?groups=3','livechat');
			//float_livechat run
			window_mouse_bind($('.livechat .livechat_hover'),$('.livechat .livechat_hover').parent(),$('.livechat .livechat_hover').parent());//bind window mouse run
			window_mouse_bind($('.float_livechat .show'),$('.float_livechat .show').parent(),$('.float_livechat .show').parent());
			$('.livechat_content .close').click(function(){$(this).parent().parent().parent().removeClass('current');});
			//float share
			if($('.float_shares').length>0){
				var url=document.URL;
				var title=$('title').eq(0).html();
				var twitter_title='';//twitter用的title
				var text_len=120-url.length;
				if(title.length>text_len){
					twitter_title=title.substr(0,text_len)+'...';
				}else{
					twitter_title=title;
				}
				self.all_pop('#share_facebook','http://www.facebook.com/sharer/sharer.php?u='+url,'facebook');
				self.all_pop('#share_twitter','https://twitter.com/intent/tweet?text='+twitter_title+'&url='+url+'&via=EaseUS','twitter');
				self.all_pop('#share_google','https://plus.google.com/share?url='+url,'google');
			}
			//多语言弹出的那玩意
			var language_html='<div class="language_top"><div class="wrap clearfix"><span class="close"></span><p class="title">CHOOSE YOUR REGION</p><div class="list_box"><dl class="list"><dt>North America</dt><dd><a class="current" href="http://www.easeus.com/">United States<span>(English)</span></a><a href="http://www.easeus.com/">Canada<span>(English)</span></a><a class="canada_fr" href="http://fr.easeus.com/">Canada<span>(Francais)</span></a></dd></dl><dl class="list"><dt>Latin America </dt><dd><a href="http://br.easeus.com/">Brasil<span>(Português)</span></a><a href="http://es.easeus.com/">México<span>(Español)</span></a><a href="http://es.easeus.com/">Chile<span>(Español)</span></a><a href="http://es.easeus.com/">Argentina<span>(Español)</span></a></dd></dl></div><div class="list_box"><dl class="list"><dt>Europe</dt><dd><a class="deutschland_de" href="http://www.easeus.de/">Deutschland<span>(Deutsch)</span></a><a class="deutschland_de" href="http://www.easeus.de/">Österreich<span>(Deutsch)</span></a><a class="france_fr" href="http://fr.easeus.com/">France<span>(Francais)</span></a><a class="belgique_fr" href="http://fr.easeus.com/">Belgique<span>(Francais)</span></a><a href="http://es.easeus.com/">España<span>(Español)</span></a><a href="http://it.easeus.com/">Italia<span>(Italiano)</span></a><a href="http://br.easeus.com/">Portugal<span>(Português)</span></a><a href="http://www.easeus.com/">United Kingdom<span>(English)</span></a><a href="http://nl.easeus.com/">Netherlands<span>(Nederlands)</span></a></dd></dl></div><div class="list_box last"><dl class="list"><dt>Asia Pacific</dt><dd><a href="http://www.easeus.com/">Australia<span>(English)</span></a><a href="http://www.easeus.com/">Singapore<span>(English)</span></a><a href="http://www.easeus.com/">New Zealand<span>(English)</span></a><a class="japan" href="http://jp.easeus.com/">日本<span>（日本語）</span></a><a href="http://cn.easeus.com/">中国<span>(简体中文)</span></a><a href="http://tw.easeus.com/">台灣<span>(繁體中文)</span></a><a href="http://tw.easeus.com/">香港<span>(繁體中文)</span></a><a href="http://www.easeus.com/">Hong Kong<span>(English)</span></a><a href="http://www.easeus.com/">India<span>(English)</span></a></dd></dl><dl class="list"><dt>International</dt><dd><a href="http://www.easeus.com/">English</a></dd></dl></div></div></div>';
			$('body').append(language_html);
			window_mouse_bind($('.toplink .united_span,.language_bottom_click'),$('.language_top'),$('.toplink .united_span,.language_bottom_click,.language_top'));
			$('.language_top .close').click(function(){
				$('.language_top').removeClass('current');
			});
			//语言切换
			var dom=document.createElement('script');
			dom.src='http://www.easeus.com/default/js/language.js';
			document.body.appendChild(dom);
			//新增的弹出窗口
			self.all_pop('#Context .bt_livechat .this_bt','https://secure.livechatinc.com/licence/1389892/open_chat.cgi?groups=2','livechat');
		};
		this.mail_pop_show=function(){
			function download_pop_show(){
				if($('.download_pop_show').length>0){
					var dom=document.createElement('script');
					dom.src='http://www.easeus.com/default/js/download_pop_show.js';
					document.body.appendChild(dom);
				}
			}
			download_pop_show();
			var upgrade_pop_show=function(){
				if($('.upgrade_pop_show').length>0){
					var dom=document.createElement('script');
					dom.src='http://www.easeus.com/default/js/upgrade_mail_pop.js';
					document.body.appendChild(dom);
				}
			};
			upgrade_pop_show();
		},
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
					$.get('http://www.easeus.com/article/jump.php',{language:'de',url:url,article:article},function(date){
						if(confirm('Sie besuchen jetzt unsere Englische Website. Möchten Sie auf deutsche Website wechseln?')){
							cookie.setcookie('page_pop','yes');
							$.get('http://www.easeus.com/article/count.php',{action:'yes',url:url,article:article},function(){
								window.location.href=date;
							})
						}else{
							cookie.setcookie('page_pop','no');
							$.get('http://www.easeus.com/article/count.php',{action:'no',url:url,article:article});
						}
					})
				}
			}
		};
		this.article=function(){
			if($('#float_bar').length>0){
				$(window).scroll(function(){
					if($(window).scrollTop()<="200"){
						$("#float_bar").fadeOut("fast");
					}else{
						$("#float_bar").fadeIn("fast");
					}
				})
			};
			var float_bar_new=function(){
				if($('.float_bar_new').length>0){
					$(window).scroll(function(){
						if($(window).scrollTop()<=200){
							$(".float_bar_new").removeClass('current');
						}else{
							$(".float_bar_new").addClass('current');
						}
					})
				}
			};
			float_bar_new();
			//button->change->linkid
			var article_linkid=function(){
				var buy_linkid=document.URL;
				buy_linkid=buy_linkid.replace(/http\:\/\/.*?\/|\?.*|\.html{0,1}/g,'');
				buy_linkid=buy_linkid.replace(/\//g,'---');
				//set buy_linkid
				$('.article_button.buy').each(function(){
					var url=$(this).attr('href');
					var linkids=url.match(/linkid\=.*/);
					if(linkids!=null){
						linkids=linkids[0];
						if(/\&/.test(linkids)){
							linkids=linkids.split('&');
							linkids=linkids[0];
						}
						url=url.replace(linkids,linkids+'_'+buy_linkid);
						$(this).attr({href:url});
					}else{
						if(!(/javascript\:void\(0\)/.test(url))){
							$(this).attr({href:url+'&linkid=_'+buy_linkid});
						}
					}
				});
			};
			article_linkid();
		}
	};
	var globleJs=new globle_js();
	globleJs.gos();//全局样式调用
	globleJs.header();//开启头部的js效果
	globleJs.share();
	globleJs.backuo_solution();//当前页面浮动
	globleJs.scrolls('.articleSwap ul','','','.swapContr',8000);//
	globleJs.pannel_home_change();
	globleJs.support_sibebar();//support页面侧边栏hover效果
	globleJs.float_banner();//顶部广告 点击关闭事件
	globleJs.media_sidebar();//侧边栏弹出菜单
	globleJs.all_float();
	globleJs.mail_pop_show();
	if($('.buy_linkid').length>0){
		globleJs.buy_linkid_run();
	}
	globleJs.article();//文章页面js
	if($('.article_check').length>0){
		globleJs.check_change('.article_check font','.article_button');
	};
	//globleJs.language_link();
	//这一部分为首页banner的js
	function banner_scroll(move,left,right,list,auto_time,move_time,mouse_or_click){this.move=$(move);this.left=$(left);this.right=$(right);this.list=$(list);this.move_time=move_time;this.auto_time=auto_time;this.mouse_or_click=mouse_or_click;this.len=0;this.wid=0;this.num=1;this.css3=false;this.set_html=function(){var self=this;var first=this.move.children().first().clone();var last=this.move.children().last().clone();this.move.prepend(last);this.move.append(first);var supportCss3=(function(){var div=document.createElement('div'),vendors='Khtml Ms O Moz Webkit'.split(' '),len=vendors.length;return function(prop){if(prop in div.style) return true;prop=prop.replace(/^[a-z]/, function(val){return val.toUpperCase();});while(len--){if(vendors[len] + prop in div.style){return true;}}return false;};})();this.css3=supportCss3('transition');if(this.css3){self.move.css({transitionDuration:self.move_time+'ms'});}};this.set_width=function(){this.wid=this.move.parent().width();this.len=this.move.children().length;this.move.children().width(this.wid);var move_width=this.len*this.wid;this.move.width(move_width);};this.gos=function(){var self=this;if(typeof(auto_time)=='undefined'){self.auto_time=8000;}if(typeof(move_time)=='undefined'){self.move_time=400;}this.set_html();this.set_width();var animate_go=function(num,time){if(time!=0){var time=self.move_time;}var left='-'+(num*self.wid).toString()+'px';if(self.css3){self.move.css({transitionDuration:time+'ms',transform:'translate('+left+',0px)'});window.clearInterval(animate_st);var animate_st=window.setTimeout(function(){if(num<=0){self.move.css({transitionDuration:'0ms'});self.num=self.len-2;left='-'+(self.num*self.wid).toString()+'px';self.move.css({transform:'translate('+left+',0px)'});};if(num>=self.len-1){self.move.css({transitionDuration:'0ms'});self.num=1;left='-'+(self.num*self.wid).toString()+'px';self.move.css({transform:'translate('+left+',0px)'});};self.list.children().removeClass('current');self.list.children().eq(self.num-1).addClass('current');},time);}else{self.move.stop().animate({left:left},time,function(){if(num<=0){self.num=self.len-2;left='-'+(self.num*self.wid).toString()+'px';self.move.css({left:left});};if(num>=self.len-1){self.num=1;left='-'+(self.num*self.wid).toString()+'px';self.move.css({left:left});};self.list.children().removeClass('current');self.list.children().eq(self.num-1).addClass('current');})};};if(typeof(this.mouse_or_click)=='undefined'){this.mouse_or_click='click';}this.list.children().on(this.mouse_or_click,function(){self.num=$(this).attr('value');animate_go(self.num);});this.left.on('click',function(){left_click();});function left_click(){self.num--;animate_go(self.num);}this.right.on('click',function(){right_click();});function right_click(){self.num++;animate_go(self.num);};animate_go(1,0);$(window).resize(function(){self.set_width();animate_go(self.num,0);});self.st='';self.auto_scroll=function(){self.st=window.setInterval(function(){self.num++;animate_go(self.num);},self.auto_time);};self.auto_scroll();self.move.hover(function(){window.clearInterval(self.st);},function(){self.auto_scroll();});var touch_scroll=function(ul,css3){this.startPos='';this.endPos='';this.isScrolling='';this.int=function(){var self=this;var ul_dom=$(ul);var id=$(ul).get(0);if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){id.addEventListener('touchstart',self.start, false);id.addEventListener('touchmove',self.move, false);id.addEventListener('touchend',self.end, false);}};this.start=function(){if(css3){var left=self.move.css('transform').toString().split(',')[4];}else{var left=$(ul).css('left');}var left=parseInt(left,10);var touch = event.touches[0];this.startPos = {x:touch.pageX,y:touch.pageY,left:left};if(css3){$(ul).css({transitionDuration:'0ms'});}};this.move=function(){var self=this;var touch = event.touches[0];self.endPos = {x:touch.pageX - self.startPos.x,y:touch.pageY - self.startPos.y};self.isScrolling = Math.abs(self.endPos.x) < Math.abs(self.endPos.y) ? 1:0;if(self.isScrolling === 0){event.preventDefault();var left=self.startPos.left+self.endPos.x;left+='px';if(css3){$(ul).css({transform:'translate('+left+',0px)'});}else{$(ul).css({left:left});}}};this.end=function(){var self=this;if(self.endPos.x>0){left_click();}else if(self.endPos.x<0){right_click();}}};var touch=new touch_scroll(move,self.css3);touch.int();};}
	globle_scroll=banner_scroll;
	//首页bannerjs结束
	//tab切换
	tab = function(){
		this.tab_ctrl=function(clas,val){
			$(clas).click(function(){
				var switch_num=$(this).index();
				$(this).addClass("current").siblings().removeClass("current");
				$(val+":eq("+switch_num+")").css("display","block").siblings().css("display","none");
			})
			$(clas).first().click();
		};
	}
	if($('.list_tab').length>0){
		var cat_tab=new tab();
		cat_tab.tab_ctrl('.list_tab li','.article_list_bar > div'); //tab开启	
	}
})
//seo video js
$(function(){
	var migrate_os=function(){
		this.video=function(){
			$('.seo_video .video_img').click(function(){
				$('.seo_video .iframe').css({display:'block'}).animate({
					top:'0px',
					height:'345px'
				},100);
			});
			$('.seo_video .close').click(function(){
				$('.seo_video .iframe').animate({
					top:'130px',
					height:'0px'
				},100,function(){
					$(this).css({display:'none'});
				});
			})
		};
	}
	var migrate_os_run=new migrate_os();
	migrate_os_run.video();
})
