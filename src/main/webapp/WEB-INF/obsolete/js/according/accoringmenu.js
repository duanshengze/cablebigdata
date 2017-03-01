var sw=null;
function loadmenu(data){
	var $box = $("#demo");
	$box.empty();
	var str =""; 
	str = data;
	var obj = eval(str);
//	var data = eval(data_);
//	var str=JSON.stringify(data);
//	var obj=JSON.parse(str.replace(/'/g,'"'));
//	alert(str);
	sw = new UCD.According($box,obj);
	sw.bind("click",function(e,ins){
		var uuid = $(e.target).closest(".i").attr("data-uuid");
		var I = ins._settings.items[uuid];
//		alert($(e.target).name);
//		if(undefined != I.data){
//			var c_id = I.data.title;
//			loadProcess_contrast(c_id);
//		}
		try{
			var url = "";
			url = I.data.url;
			contrast_now=I.data.title;
//			var c_id = I.data.title;
			if(undefined != url){
				loadProcess_contrast(url);
//				showattrs(I.data,"test");
			}
		}
		catch(err){
			
		}
	});
}

function loadCompany_contrast(contrast){
	if(null != sw || undefined != sw){
//		showattrs(sw,"test");
		sw.setData([]);
//		sw.init();
	}
	
	var url = "company_contrast.action";
	//通过ajax获得值
	$.ajax({
		url: url,
		type: 'POST',
		async: true, //异步请求
		dataType: 'json',
		data:{
			'contrast_now':contrast_now
		},
		success: function(data, textStatus) {
//			var b=JSON.stringify(data.series_data);
//			var json = JSON.parse(data);
			var success = data.success;		
			//数据发生改变时重新载入菜单
			if (null != success && undefined != success && '' != success && 'true' == success) {
				//调用每一个图表的回调函数，进行单独业务处理
				
				loadmenu(data.data);
			}else{
				//数据没有更新不需要任何操作
//				loadmenu(data.data);
			}			
		},
		error: function() {
			alert("数据获取异常");
		}
	});
}