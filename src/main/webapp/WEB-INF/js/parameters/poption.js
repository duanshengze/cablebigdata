function option_process(data,title,unit){
//	var parameter_name=data.parameter_name;
//	var unit = data.unit;
	//datastructure  [{xdata:[],instantdata:[],cpkdata:[],uppervalue:'',lowervalue:''},{}]
	var xdata = data.xdata;
	var instantdata = data.instantdata;
	var cpkdata = data.cpkdata;
	var uppervalue = data.uppervalue;
	var lowervalue = data.lowervalue;
	
	var option = {
		    title : {
		        text: title,
		        x: 'center',
		        y: 'top' ,
		        //subtext: '实时显示'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[title,'CPK'],
		        x : 'left' | '60',
		        y : 'top' | '30'
		    },
//		    grid: {
//    	        borderWidth: 1,
////    	        x:40,
////    	        y: 50,
////    	        y2: 30,
//    	        borderColor:'#C6E579'
//    	    },
//		    toolbox: {
//		        show : true,
//		        feature : {
//		            //mark : {show: true},
//		            dataView : {show: true, readOnly: false},
//		            //magicType : {show: true, type: ['line', 'line','bar','bar']},
//		            restore : {show: true}//,
//		            //saveAsImage : {show: true}
//		        },
//		        x : 'center',
//		        y : 'top' | '30'
//		    },
//		    animation: false,
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            axisLine: {onZero: false},
		            axisTick: {
		            	interval : 'auto'
		            },
		            data : xdata
		            	/*['10:31:25','10:31:26','10:31:27','10:31:28','10:31:29','10:31:30','10:31:31','10:31:32','10:31:33','10:31:34',
		                    '10:31:35','10:31:36','10:31:37','10:31:38','10:31:39','10:31:40','10:31:41','10:31:42','10:31:43','10:31:44']//xdata
*/		        }
		    ],
		    yAxis : [
		        {
//		        	name : '实时数值',
		            type : 'value',//对应实际值
		            scale: true,
		            position:'left',
		            boundaryGap:[0.2,0.2],
		            axisLabel : {
		                formatter: '{value}'+unit
		            }
		        },
		        {
					name : 'CPK值',
				    type : 'value',
				    position:'right',
				    min: -1,
				    max: 3,
				    scale:true,
				    boundaryGap:[0.2,0.2],
				    axisLabel : {
				        show : true,
				    	formatter: '{value}'
				    }
				}
		        
		    ],
		    series : [
		        {
		            name:title,
		            type:'line',
		            smooth:true,
		            yAxisIndex: 0,
		            data:instantdata,//[11, 11, 15, 13, 12, 13, 10,11, 15, 13, 12, 13, 10, 13, 10,11, 15, 13, 12, 13],//instantdata
		            markLine : {
		                data : [
		                        [
			                         {name: '下线起点', value: lowervalue, xAxis: 0, yAxis: lowervalue},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
			                         {name: '下限终点', xAxis: 200, yAxis: lowervalue },             // 当xAxis为类目轴时，字符串'周三'会被理解为与类目轴的文本进行匹配
			                     ],
			                     [
			                         {name: '上限起点', value: uppervalue, xAxis: 0, yAxis: uppervalue},     // 当xAxis或yAxis为数值轴时，不管传入是什么，都被理解为数值后做空间位置换算
			                         {name: '上限终点', xAxis: 200, yAxis: uppervalue}
			                     ]			                     
		                        		                  
		                ]
		            }
		        },
		        {
		            name:'CPK',
		            type:'line',
		            smooth:true,
		            yAxisIndex: 1,
		            data:cpkdata,//[1, -2, 2, 5, 3, 2, 0, -2, 2, 5, 3, 2, 0, -2, 2, 5, 3, 2, 0,7],//cpkdata
		            markLine : {
		                data : [
		                        [
			                         {name: '下线起点', value: 0, xAxis: 0, yAxis: 0},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
			                         {name: '下限终点', xAxis: 200, yAxis: 0 },             // 当xAxis为类目轴时，字符串'周三'会被理解为与类目轴的文本进行匹配
			                     ],
			                     [
			                         {name: '上限起点', value: 2, xAxis: 0, yAxis: 2},     // 当xAxis或yAxis为数值轴时，不管传入是什么，都被理解为数值后做空间位置换算
			                         {name: '上限终点', xAxis: 200, yAxis: 2}
			                     ]
		                ]
		            }
		        }
		    ]
		};
	return option;
}
