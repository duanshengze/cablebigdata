var echarts ;
var fileLocation = basePath+"HUMEPInsight/CN/warning/new/js/";

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
//	   var myChart1 = ec.init(document.getElementById('main1'));
//	   var myChart2 = ec.init(document.getElementById('main2'));
//	   var myChart3 = ec.init(document.getElementById('main3'));
//	   var myChart4 = ec.init(document.getElementById('main4'));
//	   var myChart5 = ec.init(document.getElementById('main5'));
			var myCharts = [];
			var chartNames = createCharts('5');
			for(var i=0,len=chartNames.length;i<len;i++){
				myCharts[i]= ec.init(document.getElementById(chartNames[i]));
			}
			
			
//设置数据
			
			var machines = ['x383','asd23','2lkjd','asdlie','2345','234355'];
			var option = option_process(['挤绝缘'],machines);
			var options=[option,option,option,option,option];
			
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
//	showattrs(param,"test");
//	alert(param.seriesIndex);
//	alert(param.dataIndex);
//	alert(param.data);
//	alert(param.special);
//	alert(param.type);
//	alert(param.event);
//	alert(param.name);
//	alert(contrast_now);
	//需要传递工序  HUMEPInsight/CN/InsHisView/page/detailchart.jsp
	window.location.href=basePath+'getDynamicRefProcessAndMachines.action?machine_no='+param.name
	+'&contrast_now='+contrast_now;
}
//按照要求批量增加div
function createdivs(no){
	var parent = document.getElementById("mainparent");
	for(var i=1;i<=no;i++){
		var child=document.createElement("div");
		child.id="main"+i;
		parent.appendChild(child);
		child.className="mainchart";
	}
//	$('main10').addClass(".mainchart");
//	var test=document.getElementById("main10");
//	test.text="10";
//	showattrs(test,"test");
}
function createCharts(no)
{
	createdivs(no);
	var len = $("#mainparent").children().length;
//	alert(len);
	var mycharts = [];
	for(var i=1;i<=len;i++){
		mycharts.push("main"+i);
	}
	return mycharts;
}
function deleteChildren(){
	$("#mainparent").empty();
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