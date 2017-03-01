<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	//String contrast_now = (String)request.getAttribute("contrast_first");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />

<title>InstantInformation</title>
<link rel="shortcut icon" href="http://hinsight.huawei.com/HUMEPInsight/img/favicon.png" />
<link href="<%=basePath%>HUMEPInsight/CN/warning/new3/css/basic.css" type="text/css" rel="stylesheet" />
<link href="<%=basePath%>HUMEPInsight/CN/warning/new3/css/index.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/warning/new3/css/smartQuery.css" />
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/warning/new3/css/bme.min_zh.css" />
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/warning/new3/css/style.css" />
<!--  link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/warning/new/css/According.css" />-->
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/assets/asset/css/monokai.css" />
<!--link rel="stylesheet" href="<%=basePath%>HUMEPInsight/css/bootstrap.css"-->
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/css/font-awesome/css/font-awesome.min.css" />
<!--link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/echarts/asset/css/echartsHome.css"-->
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/InsHisView/css/according/accordingmenu.css" />
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/InsHisView/css/complexchart.css" />

<script src="<%=basePath%>HUMEPInsight/CN/assets/asset/js/echarts.js"></script>
<script src="<%=basePath%>HUMEPInsight/CN/warning/new3/js/jquery.js" type="text/javascript"></script>
<script src="<%=basePath%>HUMEPInsight/CN/warning/new3/js/Carousel.js" type="text/javascript"></script>
<script src="<%=basePath%>HUMEPInsight/CN/warning/new3/js/index.js" type="text/javascript"></script>
<script src="<%=basePath%>HUMEPInsight/CN/warning/new3/js/jquery.easing.js" type="text/javascript"></script>
<script src="<%=basePath%>HUMEPInsight/CN/assets/asset/js/esl/esl.js"></script>
<script src="<%=basePath%>HUMEPInsight/CN/assets/asset/js/codemirror.js"></script>
<script src="<%=basePath%>HUMEPInsight/CN/echarts/asset/js/echarts-map.js"></script>
<script src="<%=basePath%>HUMEPInsight/js/chart/bar.js"></script>
<script src="<%=basePath%>HUMEPInsight/js/chart/line.js"></script>

<link href="<%=basePath%>HUMEPInsight/CN/InsHisView/css/according/accordingmenu.css" type="text/css" rel="stylesheet" />
<link href="<%=basePath%>HUMEPInsight/CN/InsHisView/css/according/According.css" type="text/css" rel="stylesheet" />
<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/according/According.js"></script>
<style>
.deomBox{margin-left:30px}
</style>
</head>
<body style="background-color:#FFFFFF">


<div id="mainContainer" style="margin-top: 6px;" >
		
				
				<div style="width:100%;">
					<div style="float:left;height:680px;overflow:auto;overflow-x:hidden;margin-left:10px;align:center;">
						<%-- div id="main" style="height:510px;"></div>
						<div class="demmoTreesBox" style="margin-left:30%;color:#009ae7;">
		    				<div style="text-align:center;">供应商和订单</div>
		    				<div style="align:right;" id="demoBox" class="treeRevice"></div>
	   					 </div>
	   					 --%>
	   					 <div class="deomBox">
					    	<div class="boxHead">
					            <ul class="visitMs">
					                <%-- <li class="msList">测试程序</li>
					                <li class="msList">IP:10.137.59.6</li>
					                <li class="msList">NE20E-X6</li>
					                <li class="msList">供应商总数:<span class="healthIcon">82</span></li> --%>
					            </ul>
					        </div>
					    	<div id="demo"></div>
					    </div>
					</div>
					<div id="mainparent" style="width:60%;height:680px;float:left;overflow-y:scroll;overflow-x:hidden;backgroud-color:#009ae7;margin-left:100px">
					<%-- <input id="cn" type="text" value="<s:property value="contrast_first"/>"/> --%>
						<%-- div id="main1" style="height:170px;"></div>
						<div id="main1" class="mainchart"></div>
						<div id="main2" class="mainchart"></div>
						<div id="main3" class="mainchart""></div>
						<div id="main4" class="mainchart"></div>
						<div id="main5" class="mainchart"></div>
						 <div id="main2" style="height:170px;margin-top:10px"></div>--%>
					</div>
				</div>
				
</div>


<script type="text/javascript">
	var basePath = '<%=basePath%>';
	var contrast_now = encodeURI(encodeURI("${contrast_first}")); //分配初始值和控制页面手风琴菜单每次选中的条目（保持用户选中的条目) 
	/* var test=decodeURI(decodeURI(contrast_now));
	alert(test); */
	/* var timeIndexs = '<s:property value="datas.timeIndex" escape="false" />';
	var oneSeries = '<s:property value="datas.seriesOne" escape="false" />';
	
	var zeroSeries = '<s:property value="datas.seriesZero" escape="false" />';
	var threeSeries = '<s:property value="datas.seriesThree" />';
	
	var twoSeries = "<s:property value="datas.seriesTwo"/>";
	var timeIndex = eval(timeIndexs);
	
	var seriesZero = eval(zeroSeries);
	var seriesOne = eval(oneSeries);
	var seriesTwo = eval(twoSeries);  
	var seriesThree = eval(threeSeries); */ 
	
	
	//var processes_now=[];//保存当前订单下存在的工序
	
	
	/* var str="",imgarr;
	str=",{title: '"+23131+"xyz',collapsed: true,items:[{title:\"x2308773287\",selected:true,url:\"12345\"},{title:\"x2038879298768\",url:\"875456\"}]}";
	for (var i=1;i<9;i++){
	  str+=",{title: '"+i+"xyz',collapsed: false,items:[{title:\"x2308773287\",selected:false,url:\"12345\"},{title:\"x2038879298768\",url:\"875456\"}]}";
	}
	imgarr=eval("["+str.substr(1)+"]");
	var company_contrast = imgarr; */
</script>
<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/option.js"></script>
<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/chart_global.js"></script>
<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/according/accoringmenu.js"></script> 
<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/charts/chartbase.js"></script>



<script>
	//option123();
</script>


<script>
 $(function () {
	 //loadmenu(company_contrast);
	 //定时跳转，保存当前点开的供应商及订单号,将订单号回传服务器，若此订单依然是活动状态则返回时保持该订单依然是点击状态
	 loadCompany_contrast(contrast_now);
	 loadProcess_contrast(contrast_now);
	 setInterval(function(){
		 console.log(contrast_now);
		 loadCompany_contrast(contrast_now);
		 loadProcess_contrast(contrast_now);
	 },360000); 	
	//showChart();
	//实时调用
	//setInterval("showChart()", 3000);
	//获得查询条件中，缺省选中的时间按钮
	//last_time_click = $("#timeClick_true");
});
</script>
<s:debug></s:debug>
<div id="test"></div>
</body>
</html>