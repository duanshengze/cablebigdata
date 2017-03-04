<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%
	String process_id = request.getParameter("process_id");
	String volume_id = request.getParameter("volume_id");
	String machine_no=request.getParameter("machine_no");/* 第一次传入数据使用 */
	/* machine_no = machine_no.replace("_","#");
	machine_no = new String(machine_no.getBytes("iso8859-1"),"utf-8");
	machine_no = new String(machine_no.getBytes("iso8859-1"),"utf-8"); */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="China">
	<meta name="author" content="yuwenjie1@huawei.com">

	<title>实时多参数阅读</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/syntax.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/style.css">    
	<link rel="stylesheet" type="text/css" href="<%=basePath%>avenue/date/jquery-ui-1.7.3.custom.css"/>

	<script src="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/js/jquery-1.8.3.min.js"></script>
	<link href="<%=basePath%>/HUMEPInsight/CN/InsHisView/css/parameters/bootstrap.css" rel="stylesheet">
    <link href="<%=basePath%>/HUMEPInsight/CN/InsHisView/css/parameters/bootstrap-responsive.css" rel="stylesheet">
    <link rel="shortcut icon" href="<%=basePath%>HUMEPInsight/img/favicon.png">
	<script  language="javascript">

		self.moveTo(0,0);
		
		self.resizeTo(screen.availWidth,screen.availHeight);
	
	</script>
	
	<style type="text/css">
        * {
            font-family: "Microsoft YaHei" !important;
        }
        body{
            <%-- background-image: url(<%=basePath%>/HUMEPInsight/CN/InsHisView/img/params/groovepaper.png);背景图片 --%>
            background-repeat: repeat;    
        }
        header {
            background-image: url(<%=basePath%>/HUMEPInsight/CN/InsHisView/img/params/tweed.png);
            background-repeat: repeat;
        }
        h1 {
            color: #FFF;
            font-weight : bolder;
            margin:20px 0 5px 0;
        }
        header p {
            color: #FFF;
            margin-bottom: 20px;
        }
        section {
            background-image: url(<%=basePath%>/HUMEPInsight/CN/InsHisView/img/params/ticks.png);
            background-repeat: repeat;
            padding: 10px;
        }
        footer {
            height: 100px;
            background-image: url(<%=basePath%>/HUMEPInsight/CN/InsHisView/img/params/tweed.png);
            background-repeat: repeat;
            font-size: 14px;
            color: #CCC;
            text-align: center;
            padding-top: 15px;
            margin-top:15px;
        }
        .nav.nav-tabs.nav-justified {
            margin-bottom:0;
        }
        .ctrl-wrap {
            padding:20px 20px 0 20px;
            text-align: center;
            border-left: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
        }
        .ctrl-content .btn{
            width: 7%;
        }
        .tab-content {
            padding:20px;
            border: 1px solid #dddddd;
            border-top: 0px;
        }
        .g2wrap {
            height:300px;
            width:30%;
            float:left;
        }
        input[type="radio"] {
            margin: -5px 5px 0;
        }
        label {
            display: inline-block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        footer a:hover {
            color:#62C462
        }
        ul li {
        	list-style:none;
        	text-align:center;
        	margin:0;
        }
        .subtextItem{
        	display:inline-block;
        	padding:0 30px;
        	font-size:14px;
        	line-height:30px;
        }
    </style>
</head>
<body>
	<div class="container">
        <!-- CONTAINER -->
        <!--  div class="row">-->
            <!-- <h3 style="text-align: center">实时参数预览</h3> -->
            <ul>
            	<div style="text-align: center">
	            	<li class="subtextItem">订单号：<span id="c_s"><s:property value="params.contrast_id"/></span></li>
	            	<li class="subtextItem">操作员：<span id="e_s"><s:property value="params.employee"/></span></li>
	            	<li class="subtextItem">机台号：<span id="m_s"><%=machine_no%></span></li><%-- <%=machine_no%> --%>
	            	<li class="subtextItem">材料：<span id="ma_s"><s:property value="params.material"/></span></li>
	            	<li class="subtextItem">盘号：<span id="v_s"><s:property value="params.volume_id"/></span></li>
	            	<li class="subtextItem">米数：<span id="meter_s"><s:property value="params.meter"/></span></li>
	            	<li class="subtextItem">火花报警次数：<span id="spark_s"><s:property value="spark_value"/></span></li>
	            </div>
            </ul>
            <%-- <h5 style="text-align: center">订单号：<s:property value="params.contrast_id"/>&nbsp;,&nbsp;操作员：<s:property value="params.employee"/>&nbsp;,&nbsp;机台号：<%=machine_no%> ,   
            材料：<s:property value="params.material"/>&nbsp;,&nbsp;盘号：<s:property value="params.volume_id"/>&nbsp;,&nbsp;米数：<s:property value="params.meter"/>&nbsp;,&nbsp;火花报警次数：<s:property value="spark_value"/></h5> --%>
            <div class="span12" style="margin-top:15px;">
                <!-- <div id="g1" style="height:400px"></div> -->
                <div id="ps1" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps2" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps3" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps4" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps5" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps6" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps7" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps8" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps9" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps10" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps11" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps12" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps13" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps14" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps15" class="g2wrap" style="margin-left:10px;"></div>
                <!-- <div id="ps16" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps17" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps18" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps19" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps20" class="g2wrap" style="margin-left:10px;"></div>
                <div id="ps21" class="g2wrap" style="margin-left:10px;"></div> -->
            </div>
       <!-- </div>/row-->
       <input type="hidden" name="projectName" id="projectName" value="${pageContext.request.contextPath}"/> 
    </div>
    <!-- FOOTER -->
    <!-- <footer>
      <p>&copy; 2014 <a href="http://www.huawei.com" target="_blank">华为</a>（华为）  &middot; <a href="http://weibo.com/kenerlinfeng" target="_blank">Jez Yu</a> &middot; <a href="http://www.iconpng.com/" target="_blank">iconpng</a></p>
      <p><a href="http://echarts.baidu.com" target="_blank">Data Visualization by ECharts</a></p>
    </footer> -->
    <script type="text/javascript" charset="utf-8">
    	var machine_no="<%=machine_no%>";
    	machine_no=machine_no.replace('_','#');
    	machine_no=decodeURI(decodeURI(machine_no));
    	//alert(machine_no);
    	var basePath='<%=basePath%>';
    	var process_id = '<%=process_id%>';
    	var volume_id = '<%=volume_id%>';    //利用盘号和工序号定位到当前的生产参数    //JSON.parse("${datas}");
    	var str=str = JSON.stringify("${datas}");
    	var datas = JSON.parse(str);//eval('('+str+')');//eval("${datas}");
    	datas = eval('('+datas+')');
    	//alert(datas);
    	document.getElementById('spark_s').innerHTML='UNKNOWN';
    	document.getElementById('meter_s').innerHTML='UNKNOWN';
    	//alert("${datas}");
    	//alert(process_id + '  ' + volume_id);
    </script>
    <script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/comet4j.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/warning/new3/js/jquery.js" type="text/javascript"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/warning/new3/js/jquery.easing.js" type="text/javascript"></script>
	
	<script src="<%=basePath%>HUMEPInsight/CN/assets/asset/js/echarts.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/assets/asset/js/esl/esl.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/echarts/asset/js/echarts-map.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/parameters/poption.js"></script>
	<script type="text/javascript">var timeTicket;</script>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/parameters/parameters.js"></script>

</body>
</html>