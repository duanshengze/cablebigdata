function option_process(process_name,machines){
	var h=3;
	var hs=[];
	for(var i=0,len=machines.length;i<len;i++){
		hs.push(h);
	}
	var option = {
    		title: {
    	        x: 'left',
    	        text: process_name,
    	       // subtext: '工序内容',
//    	        link: 'http://echarts.baidu.com/doc/example.html',
	        	textStyle:{
    	    		fontSize:20,
    	    		fontFamily:'微软雅黑',
    	    		color: '#666'
    	    	}
    	    },
//    	    legend: {
//    	    	x:'left',
//    	    	y:'top',
//    	    	data:process_name,
//    	    	textStyle:{
//    	    		fontSize:20,
//    	    		fontFamily:'微软雅黑'
//    	    	}
//    	    },
    		tooltip: {
    			show:true,
    	        trigger: 'item'
    	    },
    	    toolbox: {
    	        show: true,
    	        feature: {
    	            //dataView: {show: true, readOnly: false},
    	            restore: {show: true},
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
    	            itemStyle: {
    	            	normal:{
    	                    barBorderColor:'rgba(200,200,200,0.8)',
    	                    color:'#52CC52',//rgba(100,100,100,1)',
    	                    //label: {
    	                    //    show: true,
    	                    //    position: 'top',
    	                   // }
    	                    label:{
        	                	show:true,
        	                	position:'top',
        	                	formatter:"{b}",
        	                	textStyle:{
        	                		color:'blue'
        	                	}
        	                }
    	                },
    	                emphasis:{
    	                    barBorderColor:'rgba(200,120,100,0.5)',
    	                    color:'rgba(200,120,210,0.5)'
    	                }
    	                
    	            },
    	            data: hs
    	            
    	        }
    	    ]
    };
	return option;
}