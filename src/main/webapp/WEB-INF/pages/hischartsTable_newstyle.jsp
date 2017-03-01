<%@page import="com.huawei.ssh.beans.lingthmodule.AlertIqcModule"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns:eview="ignored" ng-app="eviewWidgets">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>线缆预警数据列表</title>
<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/config/css/style.css">
	 <link class="include" rel="stylesheet" type="text/css"
		href="<%=basePath%>/eview/3rd_tools/jquery/css/jquery-ui.custom.css" />
	<link class="include" rel="stylesheet" type="text/css"
		href="<%=basePath%>/eview/3rd_tools/jquery/css/ColVis.css" />
	<link class="include" rel="stylesheet" type="text/css"
		href="<%=basePath%>/eview/3rd_tools/jquery/css/jquery.dataTables.css" />
	<link class="include" rel="stylesheet" type="text/css"
		href="<%=basePath%>/eview/css/eview/widgets/table/custom_table_jui.css" />
	<link class="include" rel="stylesheet" type="text/css"
		href="<%=basePath%>/eview/css/eview/widgets/tip.css" />
	<link class="include" rel="stylesheet" type="text/css"
		href="<%=basePath%>/eview/css/eview/widgets/pagination/pagination.css" />
	<script src="<%=basePath %>/eview/3rd_tools/angular/angular.min.js"></script>
	<script type="text/javascript" language="javascript"
		src="<%=basePath %>/eview/3rd_tools/jquery/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" language="javascript"
		src="<%=basePath %>/eview/i18n/resources.js"></script>
	<script type="text/javascript" language="javascript"
		src="<%=basePath %>/eview/js/eview.widgets.table.js"></script>
	<style type="text/css">
	body {
		  font: normal normal 12px Microsoft YaHei;
	  }
	.table{
		margin:0 0 0 15px;
		width:97.5%;
	}
	.table th span
	{
		font: normal normal 12px Microsoft YaHei;
	}
	

	::-webkit-scrollbar {height: 14px;width: 14px;}
	::-webkit-scrollbar-thumb {background:  rgb(225,225,225); -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.1);}
	::-webkit-scrollbar-thumb:hover {background: rgba(210,210,210,0.8);}
	::-webkit-scrollbar-track {background:  rgb(241,241,241);-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.1);}
	</style>
	<script type="text/javascript">
	
	   function TableController($scope)
       {
           function loadData(pageNum,pageSize){
				window.parent.getData(pageNum,pageSize,$scope);
		   }
           
           loadData(1,10);
		  
		  
           $scope.displayLengthOptions=[10,20,30,50];
			
			$scope.paginationHandler = function(event){
				// event.displayLength
				window.parent.getData(Number(event.currentPage),Number(event.displayLength),$scope);
			}
		
       }
	   function setIframeHeight(){
			var frame = $(window.parent.document).find("#content_frame_old");

			var div_height = $("#eviewtable_tableContent").height();
			var new_height = (div_height + 60) + "px";
			frame.attr("height", new_height);
	    }
		
		$(function(){
			setIframeHeight();
			window.parent.initContentHeight();
	   });
	</script>
	
</head>
<body>
		<div id="main" ng-controller="TableController" style="margin-left:0px">
		<eview:table id="eviewtable" disable="false" cls="table"
			caption="Table Caption"   scroll="true" 
			auto-hide-tip="false" selection-type="singless"
			enable-pagination="true"  listeners="samplelisteners"
			display-length="10" display-length-options="displayLengthOptions"
			dataset="tableDataSet" enable-tooltip="false"  enable-pagination="true" pagination-handler="paginationHandler"   empty-table-msg="当前无数据">
			<eview:table-column id="company_ID" display="true" caption="供应商"
				sortable="false"  enable-tooltip="false" width="6.8%" ></eview:table-column>
			<eview:table-column id="contrast_ID" display="true" caption="订单号"
			sortable="false"  enable-tooltip="false"  ></eview:table-column>
			<eview:table-column id="process_Id" display="true" caption="工序"
			sortable="false"  enable-tooltip="false"  ></eview:table-column>
			<eview:table-column id="machine_No" display="true" caption="机床"
			sortable="false" enable-tooltip="false"  ></eview:table-column>
			<eview:table-column id="volume_No" display="true" caption="盘号"
			sortable="false" enable-tooltip="false"  ></eview:table-column>
			<eview:table-column id="meter_Tag" display="true" caption="米标"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="paramDate" display="true" caption="日期"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature1" display="true" caption="一段温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature2" display="true" caption="二段温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature3" display="true" caption="三段温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature4" display="true" caption="四段温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature5" display="true" caption="五段温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature6" display="true" caption="六段温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature7" display="true" caption="颈部温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature8" display="true" caption="机头温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature9" display="true" caption="眼模温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="temperature10" display="true" caption="水槽温度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="outerDiameter" display="true" caption="外径值"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="outpress" display="true" caption="挤出压力"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="firststress" display="true" caption="放线张力"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="savelineStress" display="true" caption="储线张力"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="firstVelocity" display="true" caption="放线速度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="finishedVelocity" display="true" caption="收线速度"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="motorVelocity" display="true" caption="主机电机转速"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="concave_convex_value" display="true" caption="凹凸检测"
			sortable="false" enable-tooltip="false" ></eview:table-column>
			<eview:table-column id="spark_value" display="true" caption="火花报警次数"
			sortable="false" enable-tooltip="false" ></eview:table-column>
		</eview:table>
		</div>
</body>
<script type="text/javascript">



</script>

</html>