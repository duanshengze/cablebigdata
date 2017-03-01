//data包含processes 和  machines[]
var data_=[{process:['挤护套'],machines:['as','wqe','we','ghh','awe']},
          {process:['挤绝缘'],machines:['as','wqe','we','ghh','awe']},
          {process:['绞线'],machines:['as','wqe','we','ghh','awe']}];
function chartReload(data){
//	alert(echarts);
//	var str = eval(data);
//	alert(str[i].machines);
	var myCharts = [];
	var options = [];
	var option;
	for(var i=0,iL=processes.length;i<iL;i++){
		myCharts[i]= echarts.init(document.getElementById(chartNames[i]));
		var machines = [];
		var status  = [];
		var d=data[i];
		for(var j=0,jL=d.length;j<jL;j++){
			//machines.push(d[j].machine_No);
			machines.push(d[j].machineName);
			status.push(d[j].isWorking);
		}
		option = option_process(processes[i],machines,status);
		options.push(option);
	}
	loadOption(myCharts,options);	
}
/* abandon */
function loadProcess_contrast(id){	
	var url = "processContrast.action";
	//通过ajax获得值
	$.ajax({
		url: url,
		type: 'POST',
		async: true, //异步请求
		dataType: 'json',
		data:{
			'contrast_id' : id
		},
		success: function(data, textStatus) {
//			var b=JSON.stringify(data.data);
			
			var success = data.success;
						
			//数据状态正确的情况下才进行解析
			if (null != success && undefined != success && '' != success && 'true' == success) {
//				alert(b);
				//调用每一个图表的回调函数，进行单独业务处理
				chartReload(eval(data.data));
			}else{
//				数据没有更新不需要任何操作
			}			
		},
		error: function() {
			//alert("error");
		}
	});
}




