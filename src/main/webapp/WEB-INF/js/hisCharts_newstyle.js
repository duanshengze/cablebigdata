/**function initContentHeight(selector) {
	var frame = window.frameElement;
	var height = $(selector || 'body').outerHeight();
	//var width = $('body').outerWidth();
	var frameHeight = 1500;
	//var frameWidth = $(frame).width();
	$(frame).height(height > frameHeight ? height : frameHeight);
	//$(frame).width(width > frameWidth ? width : frameWidth);
	$(frame).css("min-width","1000px");
}**/
//查询按钮点击事件,用于重新加载页面
function onSelectInfo(){

	var Company_ID = $('#Company_ID').val();
	var contrast_ID = $('#contrast_ID').val();
	var qrc = $('#qrc').val();
	var paramDate = $('#paramDate').val();
	var paramDateEnd=$('#paramDateEnd').val();
	var Volume_No = $('#Volume_No').val();
	var Meter_Tag = $('#Meter_Tag').val();

	
	window.location.href = basePath+'queryHisChart.action?paramDate=' + paramDate
	+ '&paramDateEnd=' + paramDateEnd
	+ '&hisWarnInfo.company_ID=' + Company_ID
	+ '&hisWarnInfo.contrast_ID=' + contrast_ID
	+ '&hisWarnInfo.qrc=' + qrc
	+ '&hisWarnInfo.volume_No=' + Volume_No
	+ '&hisWarnInfo.meter_Tag=' + Meter_Tag;	
}

//function loadInitChart(company,contract){
//	window.location.href = basePath+'queryHisChart.action?paramDate=' + ''
//	+ '&hisWarnInfo.company_ID=' + company
//	+ '&hisWarnInfo.contrast_ID=' + contract
//	+ '&hisWarnInfo.qrc=' + ''
//	+ '&hisWarnInfo.volume_No=' + ''
//	+ '&hisWarnInfo.meter_Tag=' + '';	
//}
/*function resetSelectInfo(){
	$('#Company_ID').val('ALL');
	$('#contrast_ID').val('ALL');
	$('#qrc').val('');
	$('#Volume_No').val('');
	$('#Meter_Tag').val('');
//	$('#paramDate').val('ALL');
	loadData('contrast_ID',true);
}*/

//type：id值，flag:有点击进来的
/*function loadData(type, flag,thiz) {
//	alert("load");
//	alert(type+','+flag+','+thiz);
	//清空子菜单里的值
	if (null == flag || undefined == flag||true == flag) {
		var v = $(thiz).val();
		var id = $(thiz).attr("id");
		initWidget(type);
		if(id!='contrast_ID'&&'all'==v){
			return;
		}
	}
	
	var typeValue = $('#'+type).val();
	
	if('all'==typeValue){
		initWidget(type);
	}
	
	
	var paramDate = $('#paramDate').val();
	var contrast_ID = $('#contrast_ID').val();
	var qrc = $('#qrc').val();
	var Volume_No = $('#Volume_No').val();
	var Meter_Tagt = $('#Meter_Tagt').val();
//	var product = $('#product').val();
//	var spdt = $('#spdt').val();
//	var resolution_code = $('#resolution_code').val();
	
//	customer_group = customer_group.replace(/\&/g,"%26");
//	pdt = pdt.replace(/\&/g,"%26");
//	product = product.replace(/\&/g,"%26");

	var url = basePath + 'loadIPCondiction.action?type=' + type
	+ '&paramDate=' + paramDate
	+ '&ipInfo.spdt='+spdt
	+ '&ipInfo.resolution_code='+resolution_code
	+ '&ipInfo.customer_region=' + customer_region
	+ '&ipInfo.customer_office=' + customer_office
	+ '&ipInfo.customer_group=' + customer_group
	+ '&ipInfo.pdt=' + pdt
	+ '&ipInfo.product=' + product;
	
	//清空选项
	var target = document.getElementById(type);
	var html = '';
	target.innerHTML=html;
	
	//通过ajax获得树值
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		async : false,
		success: function(data, textStatus) {
			var dat = data.datas;
			if (null == dat || undefined == dat) {
				return ;
			}
			
			for (var i=0;i<dat.length;i++) {
				if (0 == i) {
					html += '<option value="all" selected="selected">ALL</option>';
				}
				if (type == 'customer_region') {
					html += '<option value="'+dat[i].key+'"'+(customer_region_bak==dat[i].key?"selected='true'":"")+'>'+dat[i].value+'</option>';
				} else if (type == 'customer_office') {
					html += '<option value="'+dat[i].key+'"'+(customer_office_bak==dat[i].key?"selected='true'":"")+'>'+dat[i].value+'</option>';
				} else if (type == 'customer_group') {
					html += '<option value="'+dat[i].key+'"'+(customer_group_bak==dat[i].key?"selected='true'":"")+'>'+dat[i].value+'</option>';
				} else if (type == 'pdt') {
					html += '<option value="'+dat[i].key+'"'+(pdt_bak==dat[i].key?"selected='true'":"")+'>'+dat[i].value+'</option>';
				} else if (type == 'product') {
					html += '<option value="'+dat[i].key+'"'+(product_bak==dat[i].key?"selected='true'":"")+'>'+dat[i].value+'</option>';
				} else {
					html += '<option value="'+dat[i].key+'">'+dat[i].value+'</option>';
				}
			}
			$(target).html(html);
		},
		error: function() {
			alert("服务器异常！");
		}
	});
}

//type：id值，flag:有点击进来的
function loadData2(type, flag,thiz) {
	//清空子菜单里的值
	if (null == flag || undefined == flag||true == flag) {
		var v = $(thiz).val();
		var id = $(thiz).attr("id");
		initWidget(type);
		if(id!='customer_region'&&'all'==v){
			return;
		}
	}
	
	var typeValue = $('#'+type).val();
	
	if('all'==typeValue){
		initWidget(type);
	}
	
	
	var paramDate = $('#paramDate').val();
	var customer_region = $('#customer_region').val();
	var customer_office = $('#customer_office').val();
	var customer_group = $('#customer_group').val();
	var pdt = $('#pdt').val();
	var product = $('#product').val();
	
	
	customer_group = customer_group.replace(/\&/g,"%26");
	pdt = pdt.replace(/\&/g,"%26");
	product = product.replace(/\&/g,"%26");

	var url = basePath + 'loadIPCondiction.action?type=' + type
	+ '&paramDate=' + paramDate
	+ '&ipInfo.customer_region=' + customer_region
	+ '&ipInfo.customer_office=' + customer_office
	+ '&ipInfo.customer_group=' + customer_group
	+ '&ipInfo.pdt=' + pdt
	+ '&ipInfo.product=' + product;
	
	//清空选项
	var target = document.getElementById(type);
	var html = '';
	target.innerHTML=html;
	
	//通过ajax获得树值
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		async : false,
		success: function(data, textStatus) {
			var dat = data.datas;
			if (null == dat || undefined == dat) {
				return ;
			}
			
			for (var i=0;i<dat.length;i++) {
				if (0 == i) {
					html += '<option value="all" selected="selected">ALL</option>';
				}
				if (type == 'customer_region') {
					html += '<option value="'+dat[i].key+'"'+'>'+dat[i].value+'</option>';
				} else if (type == 'customer_office') {
					html += '<option value="'+dat[i].key+'"'+'>'+dat[i].value+'</option>';
				} else if (type == 'customer_group') {
					html += '<option value="'+dat[i].key+'"'+'>'+dat[i].value+'</option>';
				} else if (type == 'pdt') {
					html += '<option value="'+dat[i].key+'"'+'>'+dat[i].value+'</option>';
				} else if (type == 'product') {
					html += '<option value="'+dat[i].key+'"'+'>'+dat[i].value+'</option>';
				} else {
					html += '<option value="'+dat[i].key+'">'+dat[i].value+'</option>';
				}
			}
			$(target).html(html);
		},
		error: function() {
			alert("服务器异常！");
		}
	});
}*/

	    
function initWidget(type) {
	var parent = document.getElementById(type);
	var html = '<option value="all" selected="selected">ALL</option>'

	$(parent).html(html);
	var childId = $(parent).attr('child');
	var child = document.getElementById(childId);
	if (null != child && undefined!= child) {
		initWidget(childId);
	}
}

//导出
function exportExcel(param){
//	alert(param);
	var Company_ID = $('#Company_ID').val();
	var contrast_ID = $('#contrast_ID').val();
	var qrc = $('#qrc').val();
	var Volume_No = $('#Volume_No').val();
	var Meter_Tag = $('#Meter_Tag').val();
	var paramDate = $('#paramDate').val();
	var paramDateEnd = $('#paramDateEnd').val();
//	alert(Company_ID);
	/*var customer_office = $('#customer_office').val();
	var customer_group = $('#customer_group').val();
	var pdt = $('#pdt').val();
	var product = $('#product').val();*/
	
	/*customer_group = customer_group.replace(/\&/g,"%26");
	pdt = pdt.replace(/\&/g,"%26");
	product = product.replace(/\&/g,"%26");*/

	window.location.href = 'exportHisInfoExcel.action?paramDate=' + paramDate
	+ '&paramDateEnd=' + paramDateEnd
	+ '&hisWarnInfo.company_ID=' + Company_ID
	+ '&hisWarnInfo.contrast_ID=' + contrast_ID
	+ '&hisWarnInfo.qrc=' + qrc
	+ '&hisWarnInfo.volume_No=' + Volume_No
	+ '&hisWarnInfo.meter_Tagt=' + Meter_Tag
	+ '&loadType=' + param;
}


//********************第一版表格*****************************
function getData(pageNum,pageSize,$scope){
	
	var Company_ID = $('#Company_ID').val();
	var contrast_ID = $('#contrast_ID').val();
	var qrc = $('#qrc').val();
	var paramDate = $('#paramDate').val();
	var paramDateEnd=$('#paramDateEnd').val();
	var Volume_No = $('#Volume_No').val();
	var Meter_Tag = $('#Meter_Tag').val();
	/*var customer_group = $('#customer_group').val();
	var pdt = $('#pdt').val();
	var product = $('#product').val();
	customer_group = customer_group.replace(/\&/g,"%26");
	pdt = pdt.replace(/\&/g,"%26");
	product = product.replace(/\&/g,"%26")*/;
	
	var url = 'ajaxLoadHisWarnData.action?'
		+ 'paramDate=' + paramDate
		+ '&paramDateEnd=' + paramDateEnd
		+ '&hisWarnInfo.company_ID=' + Company_ID
		+ '&hisWarnInfo.contrast_ID=' + contrast_ID
		+ '&hisWarnInfo.qrc=' + qrc
		+ '&hisWarnInfo.volume_No=' + Volume_No
		+ '&hisWarnInfo.meter_Tag=' + Meter_Tag
		+ '&page.pageNumber='+pageNum
		+ '&page.pageCount='+pageSize;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		success: function(data, textStatus) {
				if (!data) {
					alert("获取数据失败失败！");
					return;
				}
				$scope["eviewtable"].attr("dataset",data.objs);//data.objs待后台确定
				$scope["eviewtable"].attr("total-records",data.totalCount);//data.totalCount待后台确定
				window.tableiframe.setIframeHeight();
				initContentHeight();
		}
		,
		error: function() {
			alert("获取数据失败！");
		}
	});	

}
//*****************************第一版表格*****************************
//=============================第二版表格=============================
function getData2( sSource, aoData, fnCallback ){
//	alert("here"); 进入成功
	var Company_ID = $('#Company_ID').val();
	var contrast_ID = $('#contrast_ID').val();
	var qrc = $('#qrc').val();
	var paramDate = $('#paramDate').val();
	var paramDateEnd=$('#paramDateEnd').val();
	var Volume_No = $('#Volume_No').val();
	var Meter_Tag = $('#Meter_Tag').val();
//	alert(Company_ID); 获取成功
	var url =sSource + '?'
		+ 'paramDate=' + paramDate
		+ '&paramDateEnd=' + paramDateEnd
		+ '&hisWarnInfo.company_ID=' + Company_ID
		+ '&hisWarnInfo.contrast_ID=' + contrast_ID
		+ '&hisWarnInfo.qrc=' + qrc
		+ '&hisWarnInfo.volume_No=' + Volume_No
		+ '&hisWarnInfo.meter_Tag=' + Meter_Tag;
	 askData(url, aoData, fnCallback);
	 getPushData(url, aoData, fnCallback);
}

function getPushData(url, aoData, fnCallback){
	var projName =  document.getElementById("projectName").value;
	var cometname = projName+'/comet';
	JS.Engine.stop(cometname);
	JS.Engine.start(cometname); 
	JS.Engine.on({  
		His_Table_RRU : function(data){//侦听一个channel  
			var b=data;
			askData(url, aoData, fnCallback);
				
		}
	});  
}

function askData( url, aoData, fnCallback ){
	$.ajax( {  
        url: url,   
        type: "POST", 
        async: true, //异步请求
        /* contentType: 'application/json',  */ 
        dataType: "json",  
        data: {
        	"aoData" : JSON.stringify(aoData)
        },// 以json格式传递
        success: function(data) { 
        	
        	//alert(JSON.stringify(data));
        	fnCallback(data);
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/* alert(XMLHttpRequest.status);
             alert(XMLHttpRequest.readyState);
             alert(textStatus); */
		}
    }); 
}
//=============================第二版表格=============================

//***************** 新版下拉框开始 ******************************************
//title:名字  value:id
var Company_IDs = [{'title':'ALL','value':'all'}];
var contrast_IDs = [{'title':'ALL','value':'all'}];
var qrcs = [];//{'title':'ALL','value':'all'}];
var paramDates = [];
var Volume_Nos = [];//[{'title':'ALL','value':'all'}];
var Meter_Tags = [];//;[{'title':'ALL','value':'all'},{'title':'1555mxak','value':'1555mxak'}];

var Company_ID;
var contrast_ID;
var qrc;
var paramDate;
var Volume_No;
var Meter_Tag;

$(function() {
	
	var Company_ID_val = $('#Company_ID').val();
	var contrast_ID_val = $('#contrast_ID').val();
	var qrc_val = $('#qrc').val();
	var paramDate_val = $('#paramDate').val();
	var paramDateEnd_val=$('#paramDateEnd').val();
	var Volume_No_val = $('#Volume_No').val();
	var Meter_Tag_val = $('#Meter_Tag').val();
	Volume_No = $('#Volume_No');
	Meter_Tag = $('#Meter_Tag');
	
	
	//初始加载时，将所有供应商推入列表
//	if('all' == Company_ID_val || '' == Company_ID_val) {
		$.ajax({
			url: 'loadHisWarnField.action?type=Companys',
			type: 'POST',
			async:false,
			dataType: 'json',
			success: function(data) {
				for(var i in data){//.Company_IDs) {
//					使供应商输入框显示为承担该订单的供应商
					Company_IDs.push(data[i]);//data.Company_IDs[i]);
				}	
			},
			error: function() {
				
			}
		});
//	}
	
	//若供应商已选定，将所有订单推入订单号下拉框（根据供应商，查询所有相关订单号）
	if(null != Company_ID_val && '' != Company_ID_val && 'all' != Company_ID_val) {
		$.ajax({
			url: 'loadHisWarnField.action?type=contrasts&hisWarnInfo.company_ID='+Company_ID_val,//注意，是批量订单号
			type: 'POST',
			async:false,
			dataType: 'json',
			success: function(data) {
				for(var i in data) {
					contrast_IDs.push(data[i]);
				}		
			},
			error: function() {
//				alert("cuo");
			}
		});
	}
	
	//若订单号确定，显示出关联供应商（根据订单号查询供应商）
	if(null != contrast_ID_val && '' != contrast_ID_val && 'all' != contrast_ID_val) {
		$.ajax({
			url: 'loadHisWarnField.action?type=Company&hisWarnInfo.contrast_ID='+contrast_ID_val,
			type: 'POST',
			async:false,
			dataType: 'json',
			success: function(data) {
//				for(var i in data.Volume_Nos) {
////					使供应商输入框显示为承担该订单的供应商
//					Volume_Nos.push(data.Volume_Nos[i]);
//				}	
				Company_IDs=data.Company_IDs;
			},
			error: function() {
				
			}
		});
	}
	//当读取到二维码时，同时显示供应商,订单号和相关盘号并进行数据跳转
	if(null != qrc_val && '' != qrc_val && 'all' != qrc_val) {
		$.ajax({
			//当type=contrast_ID,（单个订单）同时返回订单和合同
			url: 'loadHisWarnField.action?type=Company_contrast_volumes&hisWarnInfo.qrc='+qrc_val,
			type: 'POST',
			async:false,
			dataType: 'json',
			success: function(data) {
				//显示供应商和订单号
//				for(var i in data.Volume_IDs) {
//					Volume_Nos.push(data.Volume_Nos[i]);
//				}	
				Company_IDs=data.Company_IDs;
				contrast_IDs=data.contrast_IDs;
			},
			error: function() {
				
			}
		});
	}
	if(null != paramDate_val && '' != paramDate_val ){
		$('#paramDate').val(paramDate_val);
	}
	if(null != paramDateEnd_val && '' != paramDateEnd_val ){
		$('#paramDateEnd').val(paramDateEnd_val);
	}
		
	//盘号定位到合同号和订单号  盘号是最小单位，不需要再推入其他数据
//	if(null != Volume_No_val && '' != Volume_No_val && 'all' != Volume_No_val) {
////		var pdt_val_temp = pdt_val;
////		pdt_val_temp = pdt_val_temp.replace(/\&/g,"%26");
//		$.ajax({
//			url: 'loadHisWarnField.action?type=Company_contrast_ID&hisWarnInfo.Volume_No='+Volume_No_val,
//			type: 'POST',
//			async:false,
//			dataType: 'json',
//			success: function(data) {
//				//显示供应商和订单号
////				for(var i in data) {
////					products.push(data[i]);
////				}		
//			},
//			error: function() {
//				
//			}
//		});
//	}

	//当米标和时间同时选择时，显示供应商，订单号和盘号
//	if((null != Meter_Tag_val && '' != Meter_Tag_val && 'all' != Meter_Tag_val)&&(null != paramDate_val && '' != paramDate_val && 'all' != paramDate_val)) {
////		var pdt_val_temp = pdt_val;
////		pdt_val_temp = pdt_val_temp.replace(/\&/g,"%26");
//		$.ajax({
//			//同时返回供应商，订单号，盘号
//			url: 'loadHisWarnField.action?type=Company_contrast_Volume&hisWarnInfo.Meter_Tag='+Meter_Tag_val+'&paramData='+paramDate_val,
//			type: 'POST',
//			async:false,
//			dataType: 'json',
//			success: function(data) {
//				//显示供应商,订单号,盘号
//				Company_IDs=data.Company_IDs;
//				contrast_IDs=data.contrast_IDs;
//				Volume_IDs=data.Volume_IDs;
//			},
//			error: function() {
//				
//			}
//		});
//	}
	
//	spdt=new UCD.Droplist("#default_spdt", spdts);	
//	spdt.enableSingle(true);
//	spdt.init();
//	spdt.selectItem('Router');
	
	Company_ID=new UCD.Droplist("#default_Company_ID", Company_IDs);	
	Company_ID.enableSingle(true);
	Company_ID.init();
	Company_ID.selectItem('ALL');
	
	contrast_ID=new UCD.Droplist("#default_contrast_ID", contrast_IDs);	
	contrast_ID.enableSingle(true);
	contrast_ID.init();
	contrast_ID.selectItem('ALL');
	
	qrc=new UCD.Droplist("#default_qrc", qrcs);	
	qrc.enableSingle(true);
	qrc.init();
	qrc.enableInput(false);

	
//	Volume_No=new UCD.Droplist("#default_Volume_No", Volume_Nos);	
//	Volume_No.enableSingle(true);
//	Volume_No.init();
//	Volume_No.selectItem('ALL');
//	
//	Meter_Tag=new UCD.Droplist("#default_Meter_Tag", Meter_Tags);	
//	Meter_Tag.enableSingle(true);
//	Meter_Tag.init();

		
	if(null != Company_ID_val && '' != Company_ID_val) {
		var Company_ID_title = '';
		for(var i in Company_IDs) {
			var obj = Company_IDs[i];
			if(Company_ID_val == obj.value) {
				Company_ID_title = obj.title;
			}
		}
		Company_ID.selectItem(Company_ID_title);
	}
	
	if(null != contrast_ID_val && '' != contrast_ID_val && 'all' != contrast_ID_val) {
		var contrast_ID_title = '';
		for(var i in contrast_IDs) {
			var object = contrast_IDs[i];
			if(contrast_ID_val == object.value) {
				contrast_ID_title = object.title;
			}
		}
		contrast_ID.selectItem(contrast_ID_title);
	}
	
//	if(null != Volume_No_val && '' != Volume_No_val) {
//		var Volume_No_title = '';
//		for(var i in Volume_Nos) {
//			var obj = Volume_Nos[i];
//			if(Volume_No_val == obj.value) {
//				Volume_No_title = obj.title;
//			}
//		}
//		Volume_No.selectItem(Volume_No_title);
//	}
	

	Company_ID.setOnValueChange(function(self,items){
		$('#Company_ID').val(items.params.value);
//		var value = items.params.value.replace(/\&/g,"%26");
//		alert(items.params.value);
		$.ajax({
			url: 'loadHisWarnField.action?type=contrasts&hisWarnInfo.company_ID='+items.params.value,
			type: 'POST',
			async:false,
			dataType: 'json',
			success: function(data) {
//				alert("ti");
				clearSelected('contrast_ID');
				contrast_ID.setData(data);		
				contrast_ID.init();		
//				Volume_No.val('');
//				Meter_Tag.val('');
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
//				alert(XMLHttpRequest.status);
//                alert(XMLHttpRequest.readyState);
//                alert(textStatus);
			}
		});
		if(items.params.value == 'all'){
			$('#contrast_ID').val('all')
		}
		onSelectInfo();	
	});
	
	contrast_ID.setOnValueChange(function(self,items){		
		$('#contrast_ID').val(items.params.value);
//		Volume_No.val('');
//		$.ajax({
//			url: 'loadHisWarnField.action?type=volumes&hisWarnInfo.contrast_ID='+items.params.value,//暂不实现
//			type: 'POST',
//			async:false,
//			dataType: 'json',
//			success: function(data) {
////				Volume_No.setData(data.Volume_Nos);		
////				Volume_No.init();
////				customer_office.selectItem('ALL');	
////				$('#contrast_ID').val('all'); 	
//			},
//			error: function() {
//				
//			}
//		});	
//		clearSelected('Volume_No');
		onSelectInfo();	
	});
	Volume_No.blur(function(){
		Volume_No_val=$('#Volume_No').val();
		pushCompanyAndContrast('volume');
	});
	Meter_Tag.blur(function(){
//		paramDate_val=$('#paramDate').val();
		Volume_No_val=$('#Volume_No').val();
		if('undefined' == Volume_No_val || '' == Volume_No_val){
			alert("查询米标，盘号不可为空!");
			return;
		}
		pushCompanyAndContrast('meter');
	});
	Volume_No.bind('keypress',function(event){
         if(event.keyCode == "13")    
         {
        	 Volume_No_val=$('#Volume_No').val();
        	 pushCompanyAndContrast('volume');
         }
     });
	Meter_Tag.bind('keypress',function(event){
         if(event.keyCode == "13")    
         {
//        	 paramDate_val=$('#paramDate').val();
        	Volume_No_val=$('#Volume_No').val();
     		if('undefined' == Volume_No_val || '' == Volume_No_val){
     			alert("查询米标，盘号不可为空!");
     			return;
     		}
        	pushCompanyAndContrast('meter');
         }
     });
	//当输入盘号时，自动推入供应商名字和订单号（订单号列表需要更换）;当输入米标时，自动推入供应商，订单列表和所选订单，还有盘号
	function pushCompanyAndContrast(type){
		var url;
		if('volume' == type){
			url = 'loadHisWarnField.action?type=company_contrast&hisWarnInfo.volume_No='+Volume_No_val;
		}
		else{
			url = 'loadHisWarnField.action?type=company_contrast_volume&hisWarnInfo.meter_Tag='+Meter_Tag_val+'&hisWarnInfo.paramDate='+paramDate_val;
		}
		$.ajax({
			url: url,
			type: 'POST',
			async:false,
			dataType: 'text',
			success: function(data) {
				var temp = "";
				temp = data;
				if("" === temp){
//					alert("数据不存在！");
					return;
				}
//				var da=eval("("+data+")")[0].datas;
//				var jsonstr=JSON.stringify(da);
				var json=JSON.parse(data);
//				alert(json[0].datas.Company_ID);

//				var je ="{\"Company_ID\":\"ZhongDe\",\"contrast_ID\":\"x13241\"}";
//				var tj = JSON.parse(je);
				var success = json[0].success;
				var obj=json[0].datas;
				var o=eval("("+obj+")");
				if(success){
					if('volume' == type){;
//						Company_ID.selectItem(o.Company_ID);
//						contrast_ID.setData(data.contrast_IDs);		
//						contrast_ID.init();	
//						contrast_ID.selectItem(o.contrast_ID);
					}
					else{
//						Company_ID.selectItem(o.Company_ID);
//						contrast_ID.setData(data.contrast_IDs);		
//						contrast_ID.init();
//						contrast_ID.selectItem(o.contrast_ID);
//						Volume_No.text=o.Volume_No;
					}	
				}
				else{
					if('volume' == type){
						alert('当前输入的盘号不存在！');
					}
					else{
						alert('当前输入的米标不存在！');
					}
				}
					
			
			},
			error: function() {
				
			}
		});
		onSelectInfo();
	}
	
//	Volume_No.setOnValueChange(function(self,items){		
//		$('#Volume_No').val(items.params.value);
////		$.ajax({
////			url: 'loadHisWarnField.action?type=company_contrast&hisWarnInfo.Volume_No='+Volume_No_val,
////			type: 'POST',
////			async:false,
////			dataType: 'json',
////			success: function(data) {
//////				customer_group.setData(data);		
//////				customer_group.init();
//////				customer_group.selectItem('ALL');	
//////				$('#customer_group').val('all'); 	
////			},
////			error: function() {
////				
////			}
////		});	
////		clearSelected('pdt');
//		onSelectInfo();	
//	});
//	var paramDate ='';
//	paramDate = $('#paramDate').val();
//	Meter_Tag.setOnValueChange(function(self,items){		
//		$('#Meter_Tag').val(items.params.value);
//		onSelectInfo();				
////		if('' != paramDate || undefined != paramDate || null!= paramDate){
////			alert(paramDate);
////		}
////		else{
////			alert("请先选择日期");
////		}
//	});
	//还应该设定paramDate
	

	
	$('#default_Company_ID .Droplist').css('width','140%');
	$('#default_contrast_ID .Droplist').css('width','140%');
//	$('#default_Meter_Tag .Droplist').css('width','140%');
	$('#default_qrc .Droplist').css('width','140%');
//	$('#default_Volume_No .Droplist').css('width','140%');
//	$('#default_pdt .Droplist').css('width','140%');
//	$('#default_product .Droplist').css('width','140%');
	
})


function clearSelected(location) {
	var data = [{'title':'ALL','value':'all'}];
	var loc_temp = eval(location);
	loc_temp.setData(data);
	loc_temp.init();
	loc_temp.selectItem('ALL');
	$('#'+location).val('all');
	var child = $('#'+location).attr('child');
	if(null != child && '' != child) {
		clearSelected(child);
	}
}

//***************** 新版下拉框结束 ******************************************
//检测米标值得变化
function dateValueChanged(){
	/*var mt=$('#Meter_Tag').val(); 
	if('' != mt && 'all'!= mt && null !=mt || 'undefined' != mt){
	}*/	
	onSelectInfo();
}
