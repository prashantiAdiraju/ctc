var store_backup_change=function(linkid){
	if(typeof(linkid)=='undefined'){
		linkid='e_tbstore';
	}
	var allprice=[];
		allprice['tbhome']=[29,27,25,23,20,17];
		allprice["tbwork"]=new Array(39,37,35,31,27,23);
		allprice["tbserver"]=new Array(199,189,179,159,139,119);
		allprice["tbaserver"]=new Array(299,284,269,239,209,179);
		allprice["tbt"]=new Array(999,1399);
		allprice["ebc_work"]=new Array(79,76.50,75,72.5,69.5,63.5);
		allprice["ebc_server"]=new Array(299,290,284,275,263,239);
		allprice["ebc_aserver"]=new Array(399,387,379,367,351,319);
		allprice["dm_server"]=new Array(45,45,45,45,45,45);
		allprice["dm_work"]=new Array(12,12,12,12,12,12);
	var set_links=[];
		set_links['tbhome']='16514-39';
		set_links["tbwork"]='16514-34';
		set_links["tbserver"]='16514-35';
		set_links["tbaserver"]='16514-43';
		set_links["tbt"]=new Array('16514-81','16514-82');
		set_links["ebc_work"]='16514-106';
		set_links["ebc_server"]='16514-105';
		set_links["ebc_aserver"]='16514-108';
		set_links["dm_server"]='16514-73';
		set_links["dm_work"]='16514-74';
	var store_table_price={
		gos:function(){
			var self=this;
			var option='';
			for(var i=0;i<=35;i++){
				option+=('<option value="'+i+'">'+i+'</option>');
			}
			$('.store_table .number').html(option);
			$('.store_table .number').change(function(){
				self.get_all_price();
				self.set_link();
			});
			//月份切换等,下
			$('.store_table .change_number').change(function(){
				$(this).parents('ul').find('.price_a').html('$'+allprice[$(this).parent().find('.number').attr('name')][this.value].toFixed(2));
				self.get_all_price();
				self.set_link();
			});
		},
		get_all_price:function(){
			var all_new_price=0;//all新价格
			var all_old_price=0;//all原价
			var id=0;
			$('.store_table .number').each(function(){
				if(this.value!=0){
					id++;//判断选中了的有多少个
					var this_tr=$(this).parents('ul');
					var name=this.name;
					var val=Number(this.value);
					var new_price=0;//单个新价
					var old_price=0;//单个原价
					if(name=='tbt'){
						var thisval=Number($(this).parent().find('.change_number').val());
						new_price=allprice[name][thisval];
						old_price=allprice[name][thisval];
					}else{
						if(val<=1){
							new_price=allprice[name][0];
						}else if(val<=5){
							new_price=allprice[name][1];
						}else if(val<=10){
							new_price=allprice[name][2];
						}else if(val<=20){
							new_price=allprice[name][3];
						}else if(val<=50){
							new_price=allprice[name][4];
						}else{
							new_price=allprice[name][5];
						}
						old_price=allprice[name][0];
					}
					this_tr.find('.price_a').html('$'+new_price.toFixed(2));
					this_tr.find('.price_b').html('$'+(val*new_price).toFixed(2));
					all_new_price+=val*new_price;
					all_old_price+=val*old_price;
				}
			});
			if(id>=2){
				all_new_price=all_new_price*0.8;
			}
			var all_save_price=all_old_price-all_new_price;
			$('#all_price').html('$'+all_new_price.toFixed(2));
			$('#all_old_price').html('$'+all_old_price.toFixed(2));
			$('#all_save_price').html('$'+all_save_price.toFixed(2));
		},
		set_link:function(){
			var links='https://shopper.mycommerce.com/checkout/cart/new';
			var link_next='';
			var id=0;
			$('.store_table .number').each(function(){
				if(this.value!=0){
					id++;//判断选中了的有多少个
					var val=Number(this.value);
					var name=this.name;
					if(name=='tbt'){
						var thisval=Number($(this).parent().find('.change_number').val());
						links+='/'+set_links[name][thisval];
						link_next+='quantity_'+set_links[name][thisval]+'='+val+'&';
					}else{
						links+='/'+set_links[name];
						link_next+='quantity_'+set_links[name]+'='+val+'&';
					}
				}
			});
			if(id==0){
				links='javascript:void(0)';
			}else if(id==1){
				links+='?'+link_next+'linkid='+linkid;
				links=links.replace(/quantity.*?[=]/g,'quantity=');
			}else{
				links+='?'+link_next+'ss_coupon=MULT-JTFC&linkid='+linkid;
			}
			$('#buy_now').attr({href:links});
		}
	};
	store_table_price.gos();
}