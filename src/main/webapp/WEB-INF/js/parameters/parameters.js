var echarts ;
var fileLocation = basePath+"HUMEPInsight/CN/warning/new/js/";
var myCharts = [];
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
//			var myCharts = [];
			
			
//设置数据
			/*var titles = ['一段温度','二段温度','三段温度','四段温度','五段温度',
			              '六段温度','颈部温度','机头温度','眼模温度','水槽温度',
			              '外径值','挤出压力','放线张力','储线张力','收线张力',
			              '主机电机转速','收线速度','凹凸检出','火花报警'];*/
			var titles = ['外径值','线速度','水槽温度',
			              '颈部温度','眼模温度','机头温度',
			              '一段温度', '二段温度','三段温度',
			              '四段温度','五段温度','六段温度',
			              '放线张力','收线速度','主机电机转速'];              
			var units = ['mm','m/s','℃',
			             '℃','℃','℃',
			             '℃','℃','℃',
			             '℃','℃','℃',
			             'N','m/s','r/s'];
			
			
			for(var i=0,iL=titles.length;i<iL;i++){
				myCharts[i]= ec.init(document.getElementById('ps'+(i+1)));
			}
			
			var options=[];
			for(var i=0,iL=titles.length;i<iL;i++){
				var option = option_process(datas[i],titles[i],units[i]);
				options.push(option);
			}
			loadOption(myCharts,options);
			
			//alert("show yourself");
		}
);

/* 后台轮询的数据触加载机制-------------开始*/

$(document).ready(function(){
	var projName =  document.getElementById("projectName").value;
	var cometname = projName+'/comet';
	JS.Engine.stop(cometname);
	JS.Engine.start(cometname); 
	JS.Engine.on({  
		Parameter_RRU : function(data){//侦听一个channel  
			addInstantData(myCharts);
				
		//JS.Engine.stop(cometname);//调试用 
			
				
		}
	});  
});


/* 后台轮询的数据触加载机制-------------结束*/

var addInstantData = function(cs){
	//datastructure  {insdata:[],cpkdata:[],time:''}
	var datas;
	var insdata;
	var cpkdata;
	var time;
	getDataAndCpk();
	
	iL = datas[0].instantdata.length;
	
	for(var i=0; i<iL; i++){
		for(var c=0,cL=cs.length; c<cL ;c++){
			insdata = datas[c].instantdata;
			cpkdata = datas[c].cpkdata;
			time    = datas[c].xdata;
			cs[c].addData([
	               [
	                0,        // 系列索引
	                insdata[i], // 新增数据
	                false,     // 新增数据是否从队列头部插入
	                false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
	                time[i]  // 坐标轴标签
	                ],
	                [
	                 1,        // 系列索引
	                 cpkdata[i], // 新增数据
	                 false,    // 新增数据是否从队列头部插入
	                 false    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
	                 ]
			 ]);
		}
		
	}
		
	function getDataAndCpk(){
		//datastructrue  {success:true,data:{insdata:[],cpkdata:[],time:''}}
//		var result={insdata:[],cpkdata:[],time:''};
		var middle;
		var url = "getFirstSeriesDataAndCpk.action";
		//通过ajax获得值
		$.ajax({
			url: url,
			type: 'POST',
			async: false, //同步请求
			dataType: 'json',
			data:{
				"machine_no":machine_no,
				"volume_id":volume_id,
				"type":"newAdd",
			},
			success: function(data, textStatus) {
				datas = data;		
			},
			error: function() {
//				alert("数据获取异常");
			}
		});
	}


/*clearInterval(timeTicket);
timeTicket = setInterval(
	function (){
	    addInstantData(myCharts);
	}
, 3000);*/
//动态数据加载接口
/*var addInstantData = function(cs){
	//datastructure  {insdata:[],cpkdata:[],time:''}
	var insdata;
	var cpkdata;
	var time;
	getInstantDataAndCpk();
	for(var c=0,cL=cs.length; c<cL ;c++){
		cs[c].addData([
		           [
			            0,        // 系列索引
			            insdata[c], // 新增数据
			            false,     // 新增数据是否从队列头部插入
			            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			            time  // 坐标轴标签
			        ],
			        [
			            1,        // 系列索引
			            cpkdata[c], // 新增数据
			            false,    // 新增数据是否从队列头部插入
			            false    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			        ]
		 ]);
	}
		
	function getInstantDataAndCpk(){
		//datastructrue  {success:true,data:{insdata:[],cpkdata:[],time:''}}
//		var result={insdata:[],cpkdata:[],time:''};
		var middle;
		var url = "getInstantDataAndCpk.action";
		//通过ajax获得值
		$.ajax({
			url: url,
			type: 'POST',
			async: false, //同步请求
			dataType: 'json',
			data:{
				"machine_no":machine_no,
				"volume_id":volume_id
			},
			success: function(data, textStatus) {
				var success = data.success;		
				if (null != success && undefined != success && '' != success && 'true' == success) {
					var str=JSON.stringify(data.data);
					str=str.replace(/\"/g,"");
					middle=eval("("+str+")");
					insdata=middle.insdata;
					cpkdata=middle.cpkdata;
					time=middle.time;
					setMeterAndSpark(middle.meter,middle.spark);
//					alert(result.cpkdata);
				}else{
					var str=JSON.stringify(data.data);
					str=str.replace(/\"/g,"");
					middle=eval("("+str+")");
					insdata=middle.insdata;
					cpkdata=middle.cpkdata;
					time=middle.time;
					setMeterAndSpark(middle.meter,middle.spark);
//					result=data.data;
//					alert("当前没有数据返回！");
				}			
			},
			error: function() {
//				alert("数据获取异常");
			}
		});
	}*/
function setMeterAndSpark(m,s){
	setMeter(m);
	setSpark(s);
}
function setMeter(meter_s){
	document.getElementById('meter_s').innerHTML=meter_s;
}
function setSpark(spark_s){
	document.getElementById('spark_s').innerHTML=spark_s;
}
//	for(var c in cs){
//		lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
//	    lastData = lastData.toFixed(1) - 0;
//	    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
//		cs[c].addData([
//		           [
//			            0,        // 系列索引
//			            Math.round(Math.random() * 10), // 新增数据
//			            false,     // 新增数据是否从队列头部插入
//			            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
//			        ],
//			        [
//			            1,        // 系列索引
//			            lastData, // 新增数据
//			            false,    // 新增数据是否从队列头部插入
//			            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
//			            axisData  // 坐标轴标签
//			        ]
//		 ]);
//	}
}

function sleep(numberMillis) { //程序延迟执行  毫秒
	var now = new Date(); 
	var exitTime = now.getTime() + numberMillis; 
	while (true) { 
		now = new Date(); 
		if (now.getTime() > exitTime) 
			return; 
	}
}



function loadOption(charts,options){
	var size=charts.length;
	for(var i=0;i<size;i++){
		charts[i].setOption(options[i]);
		window.onresize=charts[i].resize;
	}
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