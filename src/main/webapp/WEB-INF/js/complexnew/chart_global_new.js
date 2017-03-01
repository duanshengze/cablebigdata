var echarts ;
var fileLocation = basePath+"HUMEPInsight/CN/warning/new/js/";
var processes=["工序一：绞线","工序二：挤绝缘","工序三：成缆","工序四：编织","工序五：挤护套"];
var chartNames = ['main0','main1','main2','main3','main4'];

require.config({
	paths:{ 
		echarts:fileLocation
	}
});
require(
		[
		 'echarts',
		 'echarts/chart/bar',
		 'echarts/chart/pie',
		 'echarts/chart/line',
		 'echarts/chart/scatter',
		 'echarts/chart/k',
		 'echarts/chart/radar',
		 'echarts/chart/chord',
		 'echarts/chart/force',
		 'echarts/chart/funnel'
		 //'echarts/macarons'
		 ], 
		 function(ec) {

			echarts=ec;

			// 基于准备好的dom，初始化echarts图表
			var myCharts = [];
			
			for(var i=0,len=chartNames.length;i<len;i++){
				myCharts[i]= ec.init(document.getElementById(chartNames[i]));
			}
			
			
//设置数据
			var tail = ['JX','JJY','CL','BZ','JHT'];
			var machines = ['CA6130','CA6140','CA6150','CA6160','CA6170','CA6180'];
			
//			var option = option_process(['挤绝缘'],machines);
//			var options=[option,option,option,option,option];
			
			var mm = [];
			for(var i=0,iL=tail.length;i<iL;i++){
				var mt=machines.concat();//深度复制
				for(var j in machines){
					mt[j] = mt[j] + tail[i];
				}
				mm.push(mt);
			}
			var options = [];
			var option;
			for(var i=0,iL=processes.length;i<iL;i++){
				if(0==i%2){//测试
					option=option_process(processes[i],mm[i]);//,[1]
				}
				else if(0==i%3){
					option=option_process(processes[i],mm[i]);//,[-1]
				}
				else{
					option=option_process(processes[i],mm[i]);
				}
				options.push(option);
			}
			
			
			loadOption(myCharts,options);
			
			//alert("show yourself");
		}
);


function loadOption(charts,options){
	var size=charts.length;
	var ecConfig = require('echarts/config');
	for(var i=0;i<size;i++){
		charts[i].setOption(options[i],true);
		charts[i].on(ecConfig.EVENT.CLICK,queryDatas);
	}
}
//柱状图下钻功能
function queryDatas(param){
	var transfer = (param.name).replace('#','_');
//	alert(transfer);
//	showattrs(param,"test");
//	alert(param.seriesIndex);
//	alert(param.dataIndex);
//	alert(param.data);
//	alert(param.special);
//	alert(param.type);
//	alert(param.event);
//	alert(param.name);
//	alert(contrast_now);
	//通过机台名称判断  工作的机台（包括正常的和异常的）可以下钻 ，不工作的机台不允许下钻
	if(0==wholeInfo.length) return;
	var f=false;
	for(var i=0,iL=wholeInfo.length;i<iL;i++){
		var row=wholeInfo[i];
		for(var j=0,jL=row.length;j<jL;j++){
			if(param.name == row[j].machine_No){
				if(-1==row[j].isWorking || 1==row[j].isWorking){
					f=true;
				}
			}
		}
	}
	if(f)
		window.location.href=basePath+'getDynamicRefProcessAndMachines.action?machine_no='+transfer;
}

//获取对象所有属性
function showattrs(src,id){
	var ob =eval(src);
	var property="";
	for(var i in ob) {
		property = property + "属性"+i+"<br/>";
	}
	document.getElementById(id).innerHTML=property;
}