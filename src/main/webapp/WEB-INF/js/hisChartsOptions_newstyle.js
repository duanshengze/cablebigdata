
var echarts ;

function option(){
	
	var fileLocation = basePath+"HUMEPInsight/CN/echarts";
	
	require.config({
		paths:{ 
			echarts:fileLocation
		}
	});
	
	require(
	    [
			'echarts',
			'echarts/theme/shine',
			'echarts/chart/line',
			'echarts/chart/bar'
	    ],
		function (ec,defaultTheme) {
			echarts = ec;
			var myChart = ec.init(document.getElementById('main0'), defaultTheme);
			window.onresize = myChart.resize;
			var ecConfig = require('echarts/config');


			myChart.setOption(getLZLOption(xdata,seriesdata),true);
			myChart.on(ecConfig.EVENT.DBLCLICK,queryDatas);

		}
	);
}
//柱状图下钻功能
function queryDatas(param){
	alert("柱状图下钻功能待开发");
//	var customer_region = $('#Company_ID').val();
//	var customer_office = $('#constrast_ID').val();
//	var customer_group = $('#paramDate').val();
//	var pdt = $('#Volume_No').val();
//	var product = $('#Meter_Tag').val();
//	if('all' == customer_region){
//		if('中国区'==param.name){
//			$('#Company_ID').val('China Region');
//			onSelectInfo();
//			return
//		}
//		if('海外区'==param.name){
//			$('#paramDate').val('Other Region');
//			onSelectInfo();
//			return
//		}
//		$('#Volume_No').val(param.name);
//	}else if('all' == customer_office){
//		$('#Meter_Tag').val(param.name);
//	}else if('all' == customer_group){
//		$('#constrast_ID').val(param.name);
//	}else if('all' == pdt){
//		$('#constrast_ID').val(param.name);
//	}else if('all' == product){
//		$('#product').val(param.name);
//	}else{
//	  return;
//	}
//	
//	onSelectInfo();
}




//累积量报表
function getLZLOption(xdata,seriesdata,dataname){

	var lenbfb = 100;
	if(undefined != seriesdata){
		lenbfb = seriesdata.length;
		if(lenbfb > 5){
			lenbfb = (5/lenbfb*100);
		}else{
			lenbfb = 100;
		}
	}
	
	var width = undefined;
	if(seriesdata.length < 6){
		width = 50;
	}
	
	var option = {
		title : {
			text: '',
			subtext: ''
		},
		tooltip : {
	        trigger: 'axis',
	        backgroundColor: '#ffffff',
			borderColor:'#dfdfdf',
			borderWidth:1,
			axisPointer : {           
				type : 'line',         
				lineStyle : {
					color: '#d5d5d5'
				},
				crossStyle: {
					color: '#d5d5d5'
				},
				shadowStyle : {
					color: 'rgba(200,200,200,0.2)'
				}
			},
			textStyle:{
				fontFamily:'微软雅黑',
				fontSize:11,
				color:'#666'
			}
	    },
	    toolbox: {
	        show : true,
	        color : '#757575',
			effectiveColor:'#1ba4e8',
	        orient: 'vertical',
	                x: 'right',
	                y: 'center',
	        feature : {
	            dataView : {show: false, readOnly: true},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom : {
	        show : true,
	        realtime : true,
	        start : 0,
	        end : lenbfb,
	        dataBackgroundColor: 'rgba(0,0,0,0)',           
			dataBackgroundColor: '#eee',
			fillerColor: 'rgba(220,220,220,0.2)',   
			handleColor: '#a8a8a8' 
	    },
	    calculable : true,
		grid: {
			backgroundColor:'rgba(0,0,0,0)',
			borderWidth:1,
			borderColor:'rgba(0,0,0,0)',
			width:'90%',
			x:25,
			y : 25
		},
	    xAxis : [
	        {
	        	//name : '问题数',
	            type : 'category',
	            show:false,
	            nameTextStyle:{
	        		  color: '#000',
					  fontFamily:'微软雅黑',
	        	 },
				
	            axisLine: {
					lineStyle: {
					color: '#efefef',
					width: 1
					}
				},
				axisLabel : {
					 textStyle:{
						fontFamily:'微软雅黑',
					}
                 },
				splitLine: {show : false},
	            data : xdata
	        }
	    ],
	    yAxis : [
	        {
	        	name : '问题数',
	            type : 'value',
				position:'right',
				splitNumber:4,
	            nameTextStyle:{
	        		  color: '#000',
					  fontFamily:'微软雅黑',
	        	  },
				axisLabel : {
                     formatter: '{value}',
					 textStyle:{
						fontFamily:'微软雅黑',
					}
                 },
	            splitArea : {show : false},
	            axisLine: {
					lineStyle: {
					color: '#efefef',
					width: 1
					}
				},
				splitLine: {
					lineStyle: {
					color: '#efefef',
					width: 1,
					type: 'dashed'
					}
				}
				
	        }
	    ],
		animation: false,
	    color:['#CBCC52','#AECC52','#83CC52','#52CC52','#52CC84','#52CCA3','#52CCCC','#52B8CC','#52A4CC','#5299CC','#5290CC','#5285CC','#527ACC'],
	    series : [
		    {
				name: dataname,
				type: 'bar',
				barWidth:width,
				itemStyle: {
						normal: {
							color: function(params) 
								{
									var colorList = ['#CBCC52','#AECC52','#83CC52','#52CC52','#52CC84','#52CCA3','#52CCCC','#52B8CC','#52A4CC','#5299CC','#5290CC','#5285CC','#527ACC'];
									var i = (params.dataIndex%13);
									var colorvalue = colorList[i];
									return colorvalue;
								},
						label: { 
							show: true,
							position: 'top',
							formatter:function(params){
										var name=params.name;
										var i=0;
										var length=name.length;
										var newname=name;
										if(length>=30){
											newname='';
											for(i=0;i<length;i=i+20){
												newname+=name.substring(i,i+20)+'\n';
											}
											newname+=name.substring(i,length);
										}
										return newname+'\n'+params.data;
									}
                        }
				}
			 },
			 data: seriesdata
			}
		 ]
	};
	return option;
}


//月度报表
function getYDOption(xdata,legend,seriesdata){
	var option = {
		title : {
			text: '',
			subtext: ''
		},
		tooltip : {
			trigger: 'axis',
			backgroundColor: '#ffffff',
			borderColor:'#dfdfdf',
			borderWidth:1,
			
			textStyle:{
				fontFamily:'微软雅黑',
				fontSize:11,
				color:'#666'
			},
			showDelay : 0,
			axisPointer:{
//				type : 'cross',
//				lineStyle: {
//					type : 'dashed',
//					width : 1
//				},
				type : 'line',         
				lineStyle : {
					color: '#d5d5d5'
				},
				crossStyle: {
					color: '#d5d5d5'
				},
				shadowStyle : {
					color: 'rgba(200,200,200,0.2)'
				}
			}
//            axisPointer:{
//                type : 'cross',
//                lineStyle: {
//                    type : 'dashed',
//                    width : 1
//                }
//            }
		},
		legend: {
			data:legend,
			textStyle:{
				fontFamily:'微软雅黑',
			},
		},
		toolbox: {
			show : true,
			orient : 'vertical',
	        y:'center',
	        color : '#757575',
	        feature : {
	            dataView : {show: false, readOnly: true},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    grid: {
			backgroundColor:'rgba(0,0,0,0)',
			borderWidth:1,
			borderColor:'rgba(0,0,0,0)',
			width:'90%',
			height:'70%',
			x:50,
			y : 25
		},
	    xAxis : [
	        {
	          	 nameTextStyle:{
	       		     color: '#000',
					 fontFamily:'微软雅黑',
	       	  	 },
	            type : 'category',
	            boundaryGap : false,
	            axisLine: {
					lineStyle: {
					color: '#efefef',
					width: 1
					}
				},
				splitLine: {show : false},
				axisLabel:{
					textStyle:{
						fontFamily:'微软雅黑',
					}
				},
	            data : xdata
	        }
	    ],
	    yAxis : [
             {
               	name: '月度问题数',
				position:'right',
				splitNumber:4,
                nameTextStyle:{
          		     color: '#000',
					 fontFamily:'微软雅黑',
          	  	 },
          	  	scale:true,
				splitNumber:4,
                 type : 'value',
                 splitArea : {show : false},
                 axisLine: {
 					lineStyle: {
 					color: '#efefef',
 					width: 1
 					}
 				},
 				splitLine: {
 					lineStyle: {
 					color: '#efefef',
 					width: 1,
 					type: 'dashed'
 					}
 				},
                 axisLabel : {
                     formatter: '{value}',
					 textStyle:{
						fontFamily:'微软雅黑',
					}
                 }
             }
         ],
         color:['#5ecc49','#42ccef','#9592f0','#468bf3','#f87fa7','#5ed1b8','#de90f4'],
         series : seriesdata
	};
	return option;
}

//月度对比报表
function getYDDBOption(xdata,legend,seriesdata){
	var option = {
		title : {
			text: '',
			subtext: ''
		},
		tooltip : {
			trigger: 'axis',
			backgroundColor: '#ffffff',
			borderColor:'#dfdfdf',
			borderWidth:1,
			
			textStyle:{
				fontFamily:'微软雅黑',
				fontSize:11,
				color:'#666'
			},
			showDelay : 0,
			axisPointer:{
//				type : 'cross',
//				lineStyle: {
//					type : 'dashed',
//					width : 1
//				},
				type : 'line',         
				lineStyle : {
					color: '#d5d5d5'
				},
				crossStyle: {
					color: '#d5d5d5'
				},
				shadowStyle : {
					color: 'rgba(200,200,200,0.2)'
				}
			},
//            axisPointer:{
//                type : 'cross',
//                lineStyle: {
//                    type : 'dashed',
//                    width : 1
//                }
//            }
		},
		legend: {
			data:legend,
			textStyle:{
				fontFamily:'微软雅黑',
			},
		},
		toolbox: {
			show : true,
			orient : 'vertical',
	        y:'center',
	        color : '#757575',
	        feature : {
	            dataView : {show: false, readOnly: true},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    grid: {
			backgroundColor:'rgba(0,0,0,0)',
			borderWidth:1,
			borderColor:'rgba(0,0,0,0)', 
			width:'90%',
			height:'70%',
			x:50,
			y : 25
		},
	    xAxis : [
	        {
	          	 nameTextStyle:{
	       		     color: '#000',
					 fontFamily:'微软雅黑',
	       	  	 },
				
	            type : 'category',
	            boundaryGap : false,
	            axisLine: {
					lineStyle: {
					color: '#efefef',
					width: 1
					}
				},
				axisLabel : {
					 textStyle:{
						fontFamily:'微软雅黑',
					}
                 },
				splitLine: {show : false},
	            data : xdata
	        }
	    ],
	    yAxis : [
             {
               	name: '月度问题数',
                nameTextStyle:{
          		     color: '#000',
					 fontFamily:'微软雅黑',
          	  	 },
          	  	scale:true,
				position:'right',
				splitNumber:4,
                 type : 'value',
                 splitArea : {show : false},
                 axisLine: {
 					lineStyle: {
 					color: '#efefef',
 					width: 1
 					}
 				},
 				splitLine: {
 					lineStyle: {
 					color: '#efefef',
 					width: 1,
 					type: 'dashed'
 					}
 				},
                axisLabel : {
                     formatter: '{value}',
					 textStyle:{
						fontFamily:'微软雅黑',
					}
                 }
             }
         ],
         color:['#5ecc49','#42ccef','#9592f0','#468bf3','#f87fa7','#5ed1b8','#de90f4'],
         series : seriesdata
	};
	return option;
}

//更换报表
function changeChart(type){
	var myChart = echarts.init(document.getElementById('main0'));
	
	$('#loadType').val(type);
	
	var url = '';
	if(type == null || type == undefined){
		return;
	}
	if(type == 1){
		url = basePath+'loadCumulantChartDataJson.action';
	}
	if(type == 2){
		url = basePath + 'loadIpTrendChartDataJson.action';
	}
	if(type == 3){
		url = basePath +'loadIpContrastChartDataJson.action';
	}
	//查询条件
	var spdt = $('#spdt').val();
	var resolution_code = $('#resolution_code').val();
	var paramDate = $('#paramDate').val();
	var customer_region = $('#customer_region').val();
	var customer_office = $('#customer_office').val();
	var customer_group = $('#customer_group').val();
	var pdt = $('#pdt').val();
	var product = $('#product').val();
	
	/*异步请求查询报表*/
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data:{'ipInfo.spdt':spdt,'ipInfo.resolution_code':resolution_code,'ipInfo.customer_region':customer_region,'ipInfo.customer_office':customer_office,'ipInfo.customer_group':customer_group,'ipInfo.pdt':pdt,'ipInfo.product':product,'paramDate':paramDate},
		success: function(data) {
			myChart.clear();
			if (!data) {
				alert("获取数据失败失败！");
				return;
			}
			CurrentSelect(type);
			var jsonxAxis = data[0].xAxis;
			var jsonlenged = data[0].lenged;
			var jsonserise = data[0].serise;
			var x = eval(jsonxAxis);
			var l = eval(jsonlenged);
			var s = eval(jsonserise);
			if(1 == type){
				myChart.setOption(getLZLOption(x,s),true);
			}
			if(2 == type){
				myChart.setOption(getYDOption(x,l,s),true);
			}
			if(3 == type){
				myChart.setOption(getYDDBOption(x,l,s),true);
			}
		},
		error: function() {
			alert("获取数据失败！");
		}
	});	
	window.onresize = myChart.resize;

}
