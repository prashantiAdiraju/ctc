$(function(){
	var float_js={
		all_pop:function(id,links,title){
			var left=$(window).width()/2-290;
			var top=$(window).height()/2-290;//获取高宽
			var openvalue='height=580,width=580,top='+top+',left='+left+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no';//设置弹出属性
			$(id).click(function(){
				window.open(links,title,openvalue);
			});
		},
		mail_pop_show:function(){
			function download_pop_show(){
				if($('.download_pop_show').length>0){
					var dom=document.createElement('script');
					dom.src='default/js/download_pop_show.js';
					document.body.appendChild(dom);
				}
			}
			download_pop_show();
			var upgrade_pop_show=function(){
				if($('.upgrade_pop_show').length>0){
					var dom=document.createElement('script');
					dom.src='default/js/upgrade_mail_pop.js';
					document.body.appendChild(dom);
				}
			};
			upgrade_pop_show();
			var check_pop=function(){
				if($('.check_pop_button').length>0){
					var dom=document.createElement('script');
					dom.src='default/js/check_pop.js';
					document.body.appendChild(dom);
				}
			};
			check_pop();
		},
		to_top:function(){//and livechat
			var totop_html='<div class="float_totop hidden"></div>';
			$('body').append(totop_html);
			$(window).scroll(function(){//totop滚动
				if($(window).scrollTop()>450){
					$('.float_totop').removeClass('hidden');
				}else{
					$('.float_totop').addClass('hidden');
				}
			});
			$('.float_totop').click(function(){
				$('body,html').animate({scrollTop:0},600);
			});
		},
		all_float:function(){
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
			var livechat_inside_html='<div class="livechat_content"><p class="title">What can we do for you?<span class="close"> </span></p><dl><dt>Technical Support</dt><dd class="link"><a target="_blank" href="support/technical-issues.html">Click here</a></dd><dd class="dis">Assistance on technical issues for paid users only.</dd></dl><dl><dt>Pre-Sales Inquiry</dt><dd class="link"><span class="click">Start a chat now</span></dd><dd class="dis">Pricing, inquiry and questions on license code, download link and invoice, etc.</dd></dl></div>';
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
			var language_html='<div class="language_top"><div class="wrap clearfix"><span class="close"></span><p class="title">CHOOSE YOUR REGION</p><div class="list_box"><dl class="list"><dt>North America</dt><dd><a class="current" href="index.html">United States<span>(English)</span></a><a href="index.html">Canada<span>(English)</span></a><a class="canada_fr" href="http://fr.easeus.com/">Canada<span>(Francais)</span></a></dd></dl><dl class="list"><dt>Latin America </dt><dd><a href="http://br.easeus.com/">Brasil<span>(Português)</span></a><a href="http://es.easeus.com/">México<span>(Español)</span></a><a href="http://es.easeus.com/">Chile<span>(Español)</span></a><a href="http://es.easeus.com/">Argentina<span>(Español)</span></a></dd></dl></div><div class="list_box"><dl class="list"><dt>Europe</dt><dd><a class="deutschland_de" href="http://www.easeus.de/">Deutschland<span>(Deutsch)</span></a><a class="deutschland_de" href="http://www.easeus.de/">Österreich<span>(Deutsch)</span></a><a class="france_fr" href="http://fr.easeus.com/">France<span>(Francais)</span></a><a class="belgique_fr" href="http://fr.easeus.com/">Belgique<span>(Francais)</span></a><a href="http://es.easeus.com/">España<span>(Español)</span></a><a href="http://it.easeus.com/">Italia<span>(Italiano)</span></a><a href="http://br.easeus.com/">Portugal<span>(Português)</span></a><a href="index.html">United Kingdom<span>(English)</span></a><a href="http://nl.easeus.com/">Netherlands<span>(Nederlands)</span></a></dd></dl></div><div class="list_box last"><dl class="list"><dt>Asia Pacific</dt><dd><a href="index.html">Australia<span>(English)</span></a><a href="index.html">Singapore<span>(English)</span></a><a href="index.html">New Zealand<span>(English)</span></a><a class="japan" href="http://jp.easeus.com/">日本<span>（日本語）</span></a><a href="http://cn.easeus.com/">中国<span>(简体中文)</span></a><a href="http://tw.easeus.com/">台灣<span>(繁體中文)</span></a><a href="http://tw.easeus.com/">香港<span>(繁體中文)</span></a><a href="index.html">Hong Kong<span>(English)</span></a><a href="index.html">India<span>(English)</span></a></dd></dl><dl class="list"><dt>International</dt><dd><a href="index.html">English</a></dd></dl></div></div></div>';
			$('body').append(language_html);
			window_mouse_bind($('.toplink .united_span,.language_bottom_click'),$('.language_top'),$('.toplink .united_span,.language_bottom_click,.language_top'));
			$('.language_top .close').click(function(){
				$('.language_top').removeClass('current');
			});
			//语言切换
			var dom=document.createElement('script');
			dom.src='default/js/language.js';
			document.body.appendChild(dom);
			//新增的弹出窗口
			self.all_pop('#Context .bt_livechat .this_bt','https://secure.livechatinc.com/licence/1389892/open_chat.cgi?groups=2','livechat');
		},
		input_word_show:function(){
			$('.word_hide_show').each(function(){
				var word_hide_show=$(this);
				var word=word_hide_show.val();
				word_hide_show.focus(function(){
					var this_word=$(this).val();
					if(word==this_word){
						word_hide_show.val('');
					}
				}).blur(function(){
					var this_word=$(this).val();
					if(this_word==''){
						word_hide_show.val(word);
					}
				});
			});
		},
		article:function(){
			var float_bottom=function(){
				if($('.float_bottom').length>0){
					var gura_f_top=$('.footer').offset().top;
					var scs=function(){
						var top=$(window).scrollTop()+$(window).height();
						if(top>=gura_f_top){
							$(".float_bottom").removeClass('current');
						}else{
							$(".float_bottom").addClass('current');
						}
					};
					$(window).bind('scroll',scs);
					$('.float_bottom .colse').click(function(){
						$(this).parent().parent().removeClass('current');
						$(window).unbind('scroll',scs);
					});
				}
			};
			//float_bottom();
			//button->change->linkid
			var article_linkid=function(){
				var buy_linkid=document.URL;
				buy_linkid=buy_linkid.replace(/http\:\/\/.*?\/|\?.*|\.html{0,1}/g,'');
				buy_linkid=buy_linkid.replace(/\//g,'---');
				//set buy_linkid
				$('.article_content .article_button.buy').each(function(){
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
	float_js.to_top();
	float_js.all_float();
	float_js.article();
	float_js.mail_pop_show();
	float_js.input_word_show();
});