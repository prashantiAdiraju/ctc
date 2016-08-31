$(function(){
	var version_num={
		drw:'10.5',
		drw_mac:'10.0',
		tb:'9.2',
		tb_personal:'9.2',
		epm:'11.5',
		PCTrans:'9.0',
		EverySync:'3.0',
		cmc:'9.1',
		edm:'2.0',
		mobi:'6.0',
		mobi_android:'5.0',
		epr:'8.5',
		dc:'2.3.1',
		CleanGenius:'4.0.1'
	};
	var version=$('.version');
	if(version.length>0){
		version.each(function(){
			var name=$(this).attr('name');
			if(typeof(version_num[name])!='undefined'){
				$(this).html(' '+version_num[name]);
			}
		});
	}
});