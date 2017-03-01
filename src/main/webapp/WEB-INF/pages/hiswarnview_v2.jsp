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
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>预警数据回溯</title>
    <link href="<%=basePath %>HUMEPInsight/CN/echarts/asset/css/bootstrap.css" rel="stylesheet">

	<link href="<%=basePath %>HUMEPInsight/css/bootstrap-reset.css" rel="stylesheet">
	<link href="<%=basePath %>HUMEPInsight/CN/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link rel="shortcut icon" href="<%=basePath%>HUMEPInsight/img/favicon.png">
	<!-- 页面样式-->
	<link href="<%=basePath %>HUMEPInsight/CN/ip/css/ipcharts.css" rel="stylesheet">
	<!-- jQuery -->
		<script src="<%=basePath %>HUMEPInsight/js/jquery.min.js"></script>
	
    <script type="text/javascript" src="<%=basePath %>HUMEPInsight/CN/log/js/jquery.js"></script>

	 
    <script type="text/javascript" src="<%=basePath%>HUMEPInsight/CN/ip/js/global.js"></script>
	<!--DataTables-->
	<link href="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/css/jquery.dataTables.min.css" rel="stylesheet">
	<script src="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/js/jquery.dataTables.min.js"></script>
	<link href="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/css/dataTables.tableTools.css" rel="stylesheet">
	<script src="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/js/dataTables.tableTools.js" charset="utf-8"></script>
	<!-- 下拉框选项，下拉框支持多选 -->
	<link rel="stylesheet" type="text/css" href="<%=basePath %>UIControls/css/Droplist.css"/>
	<script language="JavaScript" type="text/javascript" src="<%=basePath %>UIControls/js/Droplist.js"></script>	
	
    <script src="<%=basePath %>HUMEPInsight/CN/echarts/echarts.js"></script>
    <link href="<%=basePath %>HUMEPInsight/CN/echarts/topic/FDPPM/My97DatePicker/skin/WdatePicker.css" rel="stylesheet">
    <script src="<%=basePath %>HUMEPInsight/CN/echarts/topic/FDPPM/My97DatePicker/WdatePicker.js"></script>
    <script src="<%=basePath %>HUMEPInsight/CN/echarts/bootstrap.min.js"></script>
    <script src="<%=basePath %>HUMEPInsight/CN/echarts/myCommon.js"></script>

	<script	class="include" type="text/javascript"	src="<%=basePath %>HUMEPInsight/js/jquery.dcjqaccordion.2.7.js"></script>
	<script src="<%=basePath %>HUMEPInsight/js/jquery.scrollTo.min.js"></script>
	<script src="<%=basePath %>HUMEPInsight/js/respond.min.js"></script> <!--right slidebar-->
	<script src="<%=basePath %>HUMEPInsight/js/slidebars.min.js"></script>
	<!--common script for all pages--> 
	<!--script src="<%=basePath %>HUMEPInsight/js/common-scripts.js"></script-->
	<script type="text/javascript" src="<%=basePath %>HUMEPInsight/CN/config/js/common.js"></script>
	<!--页面功能js--> 
	<script src="<%=basePath %>HUMEPInsight/CN/InsHisView/js/hisCharts_newstyle.js"></script>
	 <!-- 报表js -->
    <script src="<%=basePath %>HUMEPInsight/CN/InsHisView/js/hisChartsOptions_newstyle.js"></script>
	<link rel="stylesheet" href="<%=basePath %>HUMEPInsight/CN/echarts/topic/Tx_PwrVerify_Value/css/tx_power.css"></link>
	
	<!--button-->
	<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/css/button.css">
	
	<!--Ebro tab accordions -->
	<!-- bootstrap framework-->
		<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/bootstrap/css/bootstrap.min.css">
	<!-- font awesome -->        
		<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/css/Ebro/font-awesome/css/font-awesome.min.css">
	<!-- ebro styles -->
		<link rel="stylesheet" href="<%=basePath%>HUMEPInsight/css/Ebro/style.css">
		
	<!--[if lt IE 9]>
		<link rel="stylesheet" href="<%=basePath %>HUMEPInsight/css/Ebro/ie.css">
		<script src="<%=basePath %>HUMEPInsight/js/ie/html5shiv.js"></script>
		<script src="<%=basePath %>HUMEPInsight/js/ie/respond.min.js"></script>
		<script src="<%=basePath %>HUMEPInsight/js/ie/excanvas.min.js"></script>
	<![endif]-->
	
	<!--DatePicker-->
	<script src="<%=basePath%>avenue/date/ui.datepicker.js"></script>
	<script src="<%=basePath%>avenue/date/zn_datepicker.js"></script>
	<script src="<%=basePath%>avenue/a.js" type="text/javascript"></script>
	<script src="<%=basePath%>avenue/c.js" type="text/javascript"></script>
	<!--DropdownList-->

	
	
	<style type="text/css">
		input[type="radio"], input[type="checkbox"], input.form-control, select{
			margin: 4px 0 0;
			line-height: normal;
			box-sizing: border-box;
			padding: 0;
			color: #555;
			background-color: #fff;
			background-image: none;
			border: 1px solid #ccc;
			border-radius: 4px;
		}
		input.filter-input{
			display:inline;
			width:225px;
			font-size: 12px;
			padding:2px 2px 2px 2px;
			height:25px;
		}
		.fast_link{
			text-align: center;
			cursor: pointer;
			line-height: 13px;
		}
		.Droplist {
			position: relative;
			font-size: 12px;
			margin-top: 5px;
		}	
		.h5,.h4,.accordion-toggle{
			font-family:'微软雅黑'
		}
		body,.btn{
			font-size:12px;
		}
	
		.table th span
		{
		    font: normal normal 12px Microsoft YaHei;
		}
		.table {
			width:96%;
		    margin:auto;
		}
		.tb1 {
			float: left;
			margin-top: 5px;
		}
		.tb2 {
			float: right;
			margin-top: 15px;
			margin-bottom: 5px;
			margin-right: 30px;
		}
		a {
		    color: #009ae7;
		}
		a:hover {
		    color: #0088cc;
		}
		a, a:hover, a:focus {
		    text-decoration: none;
		}
	</style>
	
	<!--style ip upload-->
	<style type="text/css">
		.table th span
		{
			font: normal normal 12px Microsoft YaHei;
		}
		.table {
			width:96%;
			margin:auto;
		}
		.tb1 {
			float: left;
			margin-top: 5px;
		}
		.tb2 {
			float: right;
			margin-top: 15px;
			margin-bottom: 5px;
			margin-right: 30px;
		}
		.download_model {
			color: #009ae7;
		}
		.download_model:hover {
			color: #0088cc;
		}
		.download_model, .download_model:hover, .download_model:focus {
			text-decoration: none;
		}
		h5{
			font-family:'Microsoft YaHei'
		}
	</style>
</head>
<body style="margin-top:0px;font-family: '微软雅黑';font-size:12px;background-color:#ffffff;">
	<input type="hidden" name="projectName" id="projectName" value="${pageContext.request.contextPath}"/>
	<input type="hidden" id="Company_ID" value="${hisWarnInfo.company_ID}"/>
	<input type="hidden" id="contrast_ID" value="${hisWarnInfo.contrast_ID}"/> <!-- child='Company_ID'  -->
	<input type="hidden" id="qrc" readonly="readonly" value="${hisWarnInfo.qrc}"/>
	<%-- <input type="hidden" id="Volume_No" value="${hisWarnInfo.Volume_No}"/>  <!-- child='contrast_ID' --> 
	<input type="hidden" id="Meter_Tag" value="${hisWarnInfo.Meter_Tag}"/> --%>
	<input type="hidden" id="loadType" value="${loadType}"/>

	<div style="margin:10px">
		<div class="col-sm-12" style="">
			<div class="panel-group" id="accordion1">
				<div class="panel panel-default" style="border-radius: 0px;border-left: none;border-right: none;">
					<div class="panel-heading" style="margin-left:-10px;margin-right:-10px">
						<h4 class="panel-title" style="border-bottom:1px solid #d3d3d3">
							<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#acc1_collapseOne">
								订单预警数据查询
							</a>
						</h4>
					</div>
					<!--chart-->
					<div class="col-sm-12">	
						<!--search options-->
						<div class="row" style="padding:0 10px 0 10px">
							<div class="col-sm-12" style="margin-top:3px;border-bottom:1px dotted #e7e7e7;line-height:20px">
								<div class="col-sm-1" style="width:10%;padding-right:0"><h5>供应商：</h5></div>
								<div class="col-sm-3" style="width:23%">
									<div id="default_Company_ID" class="inlineblock"></div>
								</div>
								<div class="col-sm-1" style="width:10%;padding-right:0"><h5>订单号：</h5></div>
								<div class="col-sm-3" style="width:23%">
									<div id="default_contrast_ID" class="inlineblock"></div>
								</div>
								<div class="col-sm-1" style="width:10%;padding-right:0"><h5>二维码：</h5></div>
								<div class="col-sm-3" style="width:23%">
									<div id="default_qrc" class="inlineblock"></div>
								</div>
							</div>
							<div class="col-sm-12" style="border-bottom:1px dotted #e7e7e7;line-height:20px">
								<div class="col-sm-1" style="width:10%;padding-right:0"><h5>盘号：</h5></div>
								<div class="col-sm-3" style="width:23%">
									<!-- <div id="default_Volume_No" class="inlineblock"> -->
										<input type="text" id="Volume_No" class="form-control filter-input" value="${hisWarnInfo.volume_No}"/>
									<!-- </div> -->
								</div>
								<div class="col-sm-1" style="width:10%;padding-right:0"><h5>米标：</h5></div>
								<div class="col-sm-3" style="width:23%">
									<!-- <div id="default_Meter_Tag" class="inlineblock"></div> -->
									<input type="text" id="Meter_Tag"" class="form-control filter-input" value="${hisWarnInfo.meter_Tag}"}"/>
								</div>
								<div class="col-sm-1" style="width:10%;padding-right:0"><h5>时间：</h5></div>
								<div class="col-sm-3" style="width:23%">
									<div class="col-sm-3" style="width:26%;padding-left:0px;"><!-- dateFmt:'yyyy/mm/dd',  -->
										<input id="paramDate" type="text" onClick="var start=$dp.$('paramDate');WdatePicker({skin:'whyGreen',onpicked:function(){dateValueChanged();},isShowOthers:false,maxDate:'%y'})" 
												value='${requestScope.paramDate}' readonly="readonly" 
												style="width:95px;float:left;margin:5px 0px;display:inline;font-size: 12px;height:25px;border-radius: 5px;border: 1px solid #c3c3c3;padding-left: 5px;background: url('<%=basePath %>HUMEPInsight/img/date.PNG') #fff no-repeat right;"/>
									</div>
									<label style="line-height:35px;position:relative;overflow:hidden;float:left;padding-left:5px;margin:0px 8px;" title="到">到</label>
									<div class="col-sm-3" style="width:26%;padding-left:0px;"><!-- dateFmt:'yyyy/mm/dd',  -->
										<input id="paramDateEnd" type="text" onClick="var start=$dp.$('paramDateEnd');WdatePicker({onpicked:function(){dateValueChanged();},isShowOthers:false, maxDate:'%y'})" 
												value='${requestScope.paramDateEnd}' readonly="readonly" 
												style="width:95px;float:left;margin:5px 0px;display:inline;font-size: 12px;height:25px;border-radius: 5px;border: 1px solid #c3c3c3;padding-left: 5px;background: url('<%=basePath %>HUMEPInsight/img/date.PNG') #fff no-repeat right;"/>
									</div>
								</div>
					
							</div>
							<div class="col-sm-12" >
								<div class="col-sm-1" style="width:10%;padding-right:0"><h5>图形显示：</h5></div>
								<!-- <div class="col-sm-5">
									<ul style="display: inline-block;padding-top:10px  ">	          	           
									   <li  class="fast_link" style="" onclick="changeChart(1)" >订单预警数据总计</li>
									   <li  class="fast_link" style="" onclick="changeChart(2)">工序预警数据分计</li>
									   <li  class="fast_link" style="" onclick="changeChart(3)">机台预警数据分计</li>
									</ul>
								</div> -->
							</div>
						</div>
						<!--main chart-->
						<div id="main0" style="height:220px;"></div>
					</div>
				</div>
			</div>
		</div>

		
	</div>
		  
	  <%-- <div style ="float:left;margin:-5px 0 10px 15px;" class="btnDemo btnIcon" onclick="exportExcel(0);"><span>导出异常</span></div>
	  <div style ="float:left;margin:-5px 0 10px 15px;" class="btnDemo btnIcon" onclick="exportExcel(1);"><span>导出所有</span></div> --%>
	  <div id="widget-foot"></div>
<script type="text/javascript">
		//对Date的扩展，将 Date 转化为指定格式的String   
		//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
		//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
		//例子：   
		//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
		//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
		Date.prototype.Format = function(fmt)   
		{ //author: meizz   
			var o = {   
				 "M+" : this.getMonth()+1,                 //月份   
				 "d+" : this.getDate(),                    //日   
				 "h+" : this.getHours(),                   //小时   
				 "m+" : this.getMinutes(),                 //分   
				 "s+" : this.getSeconds(),                 //秒   
				 "q+" : Math.floor((this.getMonth()+3)/3), //季度   
				 "S"  : this.getMilliseconds()             //毫秒   
			};   
			if(/(y+)/.test(fmt))   
			 	fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
			for(var k in o)   
			 	if(new RegExp("("+ k +")").test(fmt))   
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
			return fmt;   
		} 
		/* $("#paramDate").val(new Date().Format("yyyy-MM-dd")); */
		
		if(null == $('#paramDate').val() && '' == $('#paramDate').val() ){
			$("#paramDate").val('2010-01-01');
		}
		if(null == $('#paramDateEnd').val() && '' == $('#paramDateEnd').val() ){
			$("#paramDateEnd").val(new Date().Format("yyyy-MM-dd"));
		}
	    var Company_ID_bak = '${hisWarnInfo.company_ID}'; 
	    var contrast_ID_bak = '${hisWarnInfo.contrast_ID}';
		var qrc_bak = '${hisWarnInfo.qrc}';
		var Volume_No_bak = '${hisWarnInfo.volume_No}';
		var Meter_Tag_bak = '${hisWarnInfo.meter_Tag}';
		var loadType = '${loadType}'; 
		
		function initContentHeight() {
			var height = $('body').outerHeight();
			$(window.parent.document).find("#content_frame_0").height(height);
		}
		function CurrentSelect(index){
			//获取所有快捷选择按钮
			var selMap = $('.fast_link');
			if(undefined != index && '' != index){
					var selIndex = parseInt(index)-1;
					for(var i = 0;i < selMap.length;i++){
						var tmp_obj = $(selMap[i]);
						if(selIndex == i){
							var color = 'text-align: center;padding-top:3px;padding-bottom:3px;';
							$(tmp_obj).attr('style', color + 'border:1px solid #a6e1ff;color:#00aaff;background-color:#fff;');
						}else{
							$(tmp_obj).attr('style', '');
						}
					}
			}
		}
		$(function(){
			
			//初始化进入页面选中对应窗口
			if('' == loadType || undefined == loadType){
				loadType = '1';
			}
			CurrentSelect(loadType);
// 			 控制报表收起功能
			jQuery('.panel .tools .fa-chevron-down').click(function () {
				var el = jQuery(this).parents(".panel").children(".panel-body");
				if (jQuery(this).hasClass("fa-chevron-down")) {
					jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
					el.slideUp(200);
				} else {
					jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
					el.slideDown(200);
				}
				initContentHeight();
			});
			
			$("#widget-foot").after("<iframe id='content_frame_old' name='tableiframe' src='"+basePath+"HUMEPInsight/CN/InsHisView/histable_v2/index.jsp' width='100%' height='550px' frameborder='0' scrolling='no'/>");
			
			});
		
		var basePath = '<%=basePath %>';
		
		/* var tmp_xdata = "${xAxisStr}";
		tmp_xdata = tmp_xdata == ""?"['-']":tmp_xdata;
		var tmp_legend = "${lenged}";
		tmp_legend = tmp_legend == ""?"['-']":tmp_legend;
		var tmp_seriesdata = "${seriseData}";
		//[{name: '2015年问题积累',type: 'bar',itemStyle: {normal: {color: function(params) {var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD', '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'];return colorList[params.dataIndex]},label: { show: true,position: 'top',formatter: '{b}{c}'}}},data: [12,21]}]
		tmp_seriesdata = tmp_seriesdata == ""?"['-']":tmp_seriesdata;
		
		var xdata = eval(tmp_xdata);
		var legend = eval(tmp_legend);
		var seriesdata = eval(tmp_seriesdata);
		var dataname = "${dataname}"; */
		
		
		var tmp_xdata;
		var tmp_legend;
		var tmp_seriesdata;
		
		var xdata;
		var legend;
		var seriesdata;
		var dataname;
		
		
		
		function assembleChart(x,series,datan){
			tmp_xdata = x;
			tmp_xdata = tmp_xdata == ""?"['-']":tmp_xdata;
			tmp_legend = "${lenged}";
			tmp_legend = tmp_legend == ""?"['-']":tmp_legend;
			tmp_seriesdata = series;
			tmp_seriesdata = tmp_seriesdata == ""?"['-']":tmp_seriesdata;
			
			xdata = eval(tmp_xdata);
			legend = eval(tmp_legend);
			seriesdata = eval(tmp_seriesdata);
			dataname = datan;
			option();
		}
		
		
		
		$(function(){
			loadChart();
			loadingData();
		});
		
		function loadingData(){
			var projName =  document.getElementById("projectName").value;
			var cometname = projName+'/comet';
			JS.Engine.stop(cometname);
			JS.Engine.start(cometname); 
			JS.Engine.on({  
				His_Chart_RRU : function(data){//侦听一个channel  
					var b=data;
					loadChart();
				}
			});  
		}
		
		function loadChart(){
			var Company_ID = $('#Company_ID').val();
			var contrast_ID = $('#contrast_ID').val();
			var paramDate = $('#paramDate').val();
			var paramDateEnd=$('#paramDateEnd').val();
			var Volume_No = $('#Volume_No').val();
			var Meter_Tag = $('#Meter_Tag').val();
			
			var url = 'queryHisChart2.action?'
				+ 'paramDate=' + paramDate
				+ '&paramDateEnd=' + paramDateEnd
				+ '&hisWarnInfo.company_ID=' + Company_ID
				+ '&hisWarnInfo.contrast_ID=' + contrast_ID
				+ '&hisWarnInfo.volume_No=' + Volume_No
				+ '&hisWarnInfo.meter_Tag=' + Meter_Tag;
			
			$.ajax( {  
		        url: url,   
		        type: "POST", 
		        async: true, //异步请求
		        dataType: "json",  
		        success: function(data) { 
		        	
		        	if('true' == data.success)
		        		assembleChart(data.xAxisStr,data.seriesData,data.dataname);
		        	else
		        		document.getElementById("main0").innerHTML='数据正在加载中';
		        },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					/* alert(XMLHttpRequest.status);
		             alert(XMLHttpRequest.readyState);
		             alert(textStatus); */
				}
		    }); 
		}
		
		
		
		/* var companyinit = $('#Company_ID').val();
		var contrastinit = $('#contrast_ID').val();
		
		if((companyinit == 'undefined'  || companyinit == '') && ( contrastinit == ''||contrastinit == 'undefined')){
			
		} */
		
		

		/* xdata = ['挤护套','缠线','挤绝缘','绕线'];
		legend = ['测试图表'];
		seriesdata = ['1231','12','323','12654'];
		dataname = ['test']; */
		
		//option();

    </script>	

	<!-- bootstrap framework -->
		<script src="<%=basePath %>HUMEPInsight/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/comet4j.js"></script>
	<!-- ebro common scripts/functions -->
		<%-- <script src="<%=basePath %>HUMEPInsight/js/ebro_common.js"></script> --%>

	<!--[if lte IE 9]>
		<script src="<%=basePath %>HUMEPInsight/js/ie/jquery.placeholder.js"></script>
		<script>
			$(function() {
				$('input, textarea').placeholder();
			});
		</script>
	<![endif]-->

	
</body>
</html>