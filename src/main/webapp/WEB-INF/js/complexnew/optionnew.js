function option_process(process_name,machines,status){
	//status 应为机台状态组成的数组
	if('undefined'==typeof(status) || '' == status || 0 == status.length){
		status=[];
		for(var i=0,iL=machines.length;i<iL;i++){
			status.push(0);
		}
	}	
	var h=3;
	var hs=[];
	for(var i=0,len=machines.length;i<len;i++){
		hs.push(h);
	}
	var width = undefined;
	if(machines.length < 6){
		width = 200;
	}
	var it;//临时状态存储
	var option = {
    		title: {
    	        x: 'center',
    	        text: process_name,
//    	        subtext: '绿色：运行         灰色：停止        红色：预警',
//    	        link: 'http://echarts.baidu.com/doc/example.html',
	        	textStyle:{
    	    		fontSize:18,
    	    		fontFamily:'微软雅黑',
    	    		color: '#666'
    	    	}
    	    },
    	   /* legend: {
    	    	x:'left',
    	    	y:'top',
    	    	data:process_name,
    	    	textStyle:{
    	    		fontSize:20,
    	    		fontFamily:'微软雅黑'
    	    	}
    	    },*/
//    		tooltip: {
//    			show:true,
//    	        trigger: 'item'
//    	    },
    	    toolbox: {
    	        show: true,
    	        feature: {
//    	            restore: {show: true},
    	            saveAsImage: {show: true}
    	        }
    	    }, 
    	    calculable: false,
    	    grid: {
    	        borderWidth: 1,
    	        x:40,
    	        y: 50,
    	        y2: 30,
    	        borderColor:'#C6E579'
    	    },
    	    animation:false,
    	    xAxis: [
    	        {
    	            type: 'category',
    	            show: false,
    	            axisLine:false,
    	            axisLabel:false,
    	            splitLine:{show: false},
    	            data: machines
    	        }
    	    ],
    	    yAxis: [
    	        {
    	            type: 'value',
    	            min:'-1',
    	            max:'6',
    	            scale:true,
    	            axisLine:false,
    	            axisLabel:false,
    	            splitLine:{show: false},
    	            show: false
    	            
    	        }
    	    ],
    	    series: [
    	        {
    	            name: '机台',
    	            type: 'bar',
    	            barWidth: width,
    	            itemStyle: {
    	            	normal:{
    	                    barBorderColor:'rgba(200,200,200,0.8)',
    	                    color:function(params) 
    	        			{
    	        				it = params.dataIndex;
    	        				if(1 == status[it]){//正常工作状态
    	        					color='#5ECC49';
    	        				}
    	        				else if(-1 == status[it]){//报警和预警状态
    	        					color='#FC5043';
    	        				}
    	        				else{//不工作
    	        					color='#E5E5E5';
    	        				}
    	        				return color;
    	        			},
			    	        label:{
			                	show:true,
			                	position:'inside',
			                	textStyle:{
			                		color: '#009ae7',
			                			/*function(params){  //'#009ae7',
			                			if(status[it] == 1){//正常工作状态
		    	        					color='#009ae7';
		    	        				}
		    	        				else if(-1 == status[it]){//报警和预警状态
		    	        					color='#009ae7';
		    	        				}
		    	        				else {//不工作
		    	        					color='#E5E5E5';
		    	        				}
			                			return color;
			                		},*/
			                		fontFamily:'微软雅黑',
			                	},
			                	formatter:function(params){
									var name=params.name;
//									it=params.dataIndex;
									var work='';
									if(status[it] == 1){//正常工作状态
	    	        					work='正常运行';
	    	        				}
	    	        				else if(-1 == status[it]){//报警和预警状态
	    	        					work='预警';
	    	        				}
	    	        				else {//不工作
	    	        					work='停止运行';
	    	        				}
									return name+'\n'+work;
								}
			                },
			                barBorderWidth: 1,
		                    barBorderRadius:3
    	                },
    	                emphasis:{
    	                    barBorderColor:'rgba(200,120,100,0.5)',
    	                    color: function(params) 
    	        			{
//    	        				var i = params.dataIndex;
    	        				if(status[it] == 1){//正常工作状态
    	        					color='#51c03b';
    	        				}
    	        				else if(-1 == status[it]){//报警和预警状态
    	        					color='#F34538';
    	        				}
    	        				else{//不工作
    	        					color='#E5E5E5';//'#777777';
    	        				}
    	        				return color;
    	        			}
    	                }
    	                
    	            },
    	            data: hs
    	            
    	        }
    	    ]
    };
	return option;
}