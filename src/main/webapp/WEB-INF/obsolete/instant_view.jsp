<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns:eview="ignored" ng-app="eviewWidgets">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>实时数据查询</title>
 
	<link rel="stylesheet" href="<%=basePath %>/HUMEPInsight/CN/warning/css/style.css" />
	<link rel="stylesheet" href="<%=basePath %>/HUMEPInsight/CN/warning/css/warninglist.css" />
    <script type="text/javascript" language="javascript" src="<%=basePath %>eview/3rd_tools/jquery/js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="<%=basePath %>HUMEPInsight/CN/echarts/myCommon.js"></script>
    <script type="text/javascript" src="<%=basePath%>HUMEPInsight/CN/config/js/common.js"></script>
   
    <!-- 下拉框选项，下拉框支持多选 -->
	<link rel="stylesheet" type="text/css" href="<%=basePath %>UIControls/css/Droplist.css"/>
	<script language="JavaScript" type="text/javascript" src="<%=basePath %>UIControls/js/Droplist.js"></script>

	<link rel="stylesheet" type="text/css" href="<%=basePath %>eview/css/eview/widgets/datechooser/datechooser.css">   
	<script src="<%=basePath %>HUMEPInsight/CN/warning/js/dialog.js"></script>

	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/3rd_tools/jquery/css/jquery-ui.custom.css" />
	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/3rd_tools/jquery/css/ColVis.css" />
	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/3rd_tools/jquery/css/jquery.dataTables.css" />
	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/css/eview/widgets/table/custom_table_jui.css" />
	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/css/eview/widgets/tip.css" />
	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/css/eview/widgets/button.css" />
	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/css/eview/widgets/pagination/pagination.css" />
	<link type="text/css" rel="stylesheet" href="<%=basePath %>eview/css/eview/widgets/radioCheckbox/radioCheckbox.css">

	<script src="<%=basePath %>eview/3rd_tools/jquery/js/jquery-ui.custom.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/3rd_tools/angular/angular.min.js" ></script> 
	<script language="javascript" type="text/javascript" src="<%=basePath %>eview/3rd_tools/jquery/js/jquery.caret.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/i18n/resources.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/js/eview.widgets.table.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/js/eview.widgets.radiocheckbox.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/js/eview.widgets.button.js"></script>
	<script src="<%=basePath %>eview/js/eview.widgets.datetimechooser.js"></script>

	<script src="<%=basePath %>HUMEPInsight/CN/warning/js/warninglist_new.js"></script>

</head>

<body onload="backTop();" class="showBodyFont" style="background-color: #ffffff;">
<input type="hidden" value="<%=basePath %>" id="basePath"/>
<input type="hidden" value="<s:property value="datas.dataList" />" id="dataList"/>
<input type="hidden" value="<s:property value="datas.warnModules" />" id="warn_modules"/>
	

<div style="font-family:'Microsoft YaHei';font-size:14px;color:#333;margin-top:10px;margin-bottom:10px;font-weight:bold;margin-left:10px;" onClick="showit();">实时数据查询</div>
<div><iframe id="loadInstantView" name='loadInstantView' frameborder='0' src='<%=basePath%>loadComplexMsg.action' width='100%' height='760px'></iframe></div>

<script>
	function showit(){
		alert("<%=basePath%>");
	}
</script>	 
<s:debug></s:debug>
<div class="smartMenu" >
</div>

<div style="clear: both;"></div>
</body>
</html>