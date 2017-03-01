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

//***************** 新版下拉框开始 ******************************************
//title:名字  value:id
var Company_IDs = [];
var Company_ID;

$(function() {
	
	//初始加载时，将所有供应商推入列表

	$.ajax({
		url: 'loadHisWarnField.action?type=Companys',
		type: 'POST',
		async:false,
		dataType: 'json',
		success: function(data) {
			for(var i in data){//.Company_IDs) {
//				使供应商输入框显示为承担该订单的供应商
				Company_IDs.push(data[i]);//data.Company_IDs[i]);
			}	
		},
		error: function() {
		}
	});

	Company_ID=new UCD.Droplist("#default_companys", Company_IDs);	
	Company_ID.enableSingle(true);
	Company_ID.init();
	Company_ID.selectItem(Company_IDs[0]);
	
	
	var Company_ID_val = $('#companys').val();

		
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
	
	


	Company_ID.setOnValueChange(function(self,items){
		var company_val = items.params.value;
		$('#Company_ID').val(company_val);
//		var value = items.params.value.replace(/\&/g,"%26");
//		alert(items.params.value);
/*		$.ajax({
			url: 'loadMachinesAndStatus.action?company='+items.params.value,
			type: 'POST',
			async:false,
			dataType: 'json',
			success: function(data,textStatus) {
				//根据供应商分工序获取所有机台号码和机台工作状态
				chartReload(data);
				wholeInfo=data;
//				loadProcess_contrast(items.params.value);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
//				alert(XMLHttpRequest.status);
//              alert(XMLHttpRequest.readyState);
//              alert(textStatus);
			}
		});*/
		loadData(company_val);
		getPushData(company_val);
	});
	
	function loadData(company){
		$.ajax({
			url: 'loadMachinesAndStatus.action?company='+company,
			type: 'POST',
			async:false,
			dataType: 'json',
			success: function(data,textStatus) {
				//根据供应商分工序获取所有机台号码和机台工作状态
				chartReload(data);
				wholeInfo=data;
//				loadProcess_contrast(items.params.value);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
//				alert(XMLHttpRequest.status);
//              alert(XMLHttpRequest.readyState);
//              alert(textStatus);
			}
		});	
	}
	
	function getPushData(company){
		var projName =  document.getElementById("projectName").value;
		var cometname = projName+'/comet';
		JS.Engine.stop(cometname);
		JS.Engine.start(cometname); 
		JS.Engine.on({  
			Complex_RRU : function(data){//侦听一个channel  
				var b=data;
				loadData(company);
					
			//JS.Engine.stop(cometname);//调试用 
				
					
			}
		});  
	}
	

	
	$('#default_companys .Droplist').css('width','140%');
})