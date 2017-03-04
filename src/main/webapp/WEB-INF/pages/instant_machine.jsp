
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
    <title>实时监控</title>
    <link href="<%=basePath %>HUMEPInsight/CN/echarts/asset/css/bootstrap.css" rel="stylesheet">
	<link rel="shortcut icon" href="<%=basePath%>HUMEPInsight/img/favicon.png">

	<link href="<%=basePath %>HUMEPInsight/css/bootstrap-reset.css" rel="stylesheet">
	<link href="<%=basePath %>HUMEPInsight/CN/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<!--ADD-->
	  <link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/warning/new/css/smartQuery.css">
	  <link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/warning/new/css/bme.min_zh.css">
	  <link rel="stylesheet" href="<%=basePath%>HUMEPInsight/CN/warning/new/css/According.css">
	<!--END-->
	
    <script type="text/javascript" src="<%=basePath %>HUMEPInsight/CN/log/js/jquery.js"></script>
	
	<!-- 下拉框选项，下拉框支持多选 -->
	<link rel="stylesheet" type="text/css" href="<%=basePath %>UIControls/css/Droplist.css"/>
	<script language="JavaScript" type="text/javascript" src="<%=basePath %>UIControls/js/Droplist.js"></script>
	
    <script src="<%=basePath %>HUMEPInsight/CN/echarts/echarts.js"></script>

    <script src="<%=basePath %>HUMEPInsight/CN/echarts/bootstrap.min.js"></script>
    <script src="<%=basePath %>HUMEPInsight/CN/echarts/myCommon.js"></script>

	<script	class="include" type="text/javascript"	src="<%=basePath %>HUMEPInsight/js/jquery.dcjqaccordion.2.7.js"></script>
	<script src="<%=basePath %>HUMEPInsight/js/jquery.scrollTo.min.js"></script>
	<script src="<%=basePath %>HUMEPInsight/js/respond.min.js"></script> <!--right slidebar-->
	<script src="<%=basePath %>HUMEPInsight/js/slidebars.min.js"></script>
	<!--common script for all pages--> 
	<script src="<%=basePath %>HUMEPInsight/js/common-scripts.js"></script>
	
	
	<link rel="stylesheet" type="text/css" href="<%=basePath %>HUMEPInsight/CN/MassiveDevices/css/messive_devices_fail_num.css"/>


	 <style type="text/css">
        * {
            font-family: "Microsoft YaHei" ;
        }
		.affix {
            width:160px;
        }
        .affix li {
            list-style-type : none;
            height : 35px;
            line-height:35px;
            vertical-align:middle;
        }
        .col-md-10 h3 {
            clear:both;
            margin:10px 0;
            padding-bottom:10px;
            border-bottom:1px solid #ccc;
			font-size:15px;
			font-weight: bold;
        }
        .col-md-10 h3 a {
            display:inline-block;
            *zoom:1;
            padding-top:35px;
        }
        #chartsTypeNav ul li {
            transition: background-color 0.3s;
            -moz-transition: background-color 0.3s; 
            -webkit-transition: background-color 0.3s; 
            -o-transition: background-color 0.3s;
            padding-left:10px;
        }
		.changePattern {
			width: 35px;
			height: auto;
			border-radius: 0 3px 3px 0;
			background-color: lightgrey;
			position: fixed;
			top: 700px;
			right: 0;
			padding-top: 10px;
			z-index: 1000;
		}
		.container{
        	border: 1px solid #e3e3e3;
        	border-bottom-color: #e0e0e0;
        	border-right-color: #ececec;
        	box-shadow: 1px 2px 1px rgba(0,0,0,0.072);
        	border-top:1px solid #F1F2F7;
        	padding-left: 30px;
        	width: 100%;
        }
		#insighthref a{text-decoration:none;color:Black;}
		#insighthref a:hover{border:none;color:Blue;}
		.select-control{display:inline;width:150px;font-size: 12px;}
		.list-title{vertical-align: top;height:30px;width:60px;border: 1px solid #ddd;}
		.list-data{height:30px;width:60px;border: 1px solid #ddd;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;}
		.hide-input{display: none;width:60px;}
		.pageselect{width: 70px;display: inline;padding: 5px 0px;}
        .showText{width:90px;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;}
 	    .btnDemo{ padding:0 15px;font-size:12px; line-height:23px; color:#FFF; background:#32BBFF; border:none;border-radius:3px;margin-left:10px}
        .btnDemo:hover{ color:#FFF; background:#55C7FF;}
        .btnDemo:active{ color:#FFF; background:linear-gradient(to bottom,#1aaef7,#32bbff);}
        .btnDemo.disabled{ color:#fff; background:#ccc;}
        .button{ padding:0 15px;font-size:12px; line-height:23px; color:#FFF; background:#32BBFF; border:none;border-radius:3px;margin-left:10px}
        .button:hover{color:#FFF; background:#55C7FF;}
        .spanStyle{text-decoration:underline;color:#009ae7;}
        .spanStyle:hover{text-decoration:underline;color:#0088cc;}
        .divDomeStyle{border-radius:3px;width: 170px;height:25px; display: inline-block;border:1px solid #C4C4C4;}
        .con-pencil{
		    width:70px;
			margin-left:25px;
		    background-color: #fff;
		    font-size:12px;
			border-radius:3px;
			height:25px; 
			display: inline-block;
			border-radius: 6px;
			border:1px solid #C4C4C4;
			padding:2px;	
		}
		.con-pencil.selected{ box-shadow: none;}
		.con-pencil.disabled{ color:#000; background:#000;}
		.con-pencil:hover{ color:#55C7FF;background:#FFF;}
		.con-pencil:active{ color:#0F0E0E; background:linear-gradient(to bottom,#F1EDED,#F1EDED);}
		.fast_link{
				  background-color:#f5f5f5;
				  color:#666666;
				  display: inline-block;
				  padding: 0px 10px;			 
				  line-height: 14px;
				  border: 1px solid transparent;
				  border-radius: 15px;			 
	        }
			
		
.customTime{
	background: url("<%=basePath%>HUMEPInsight/CN/warning/new/img/custom.png") no-repeat 0 center;
	padding-left: 20px;
	margin-right: 0px;
}
.mainbox{
	background-color:#fefefe;height:850px;width:82%;float:left;
	border-left:1px solid #D3D3D3;border-right:1px solid #D3D3D3;border-bottom:1px solid #D3D3D3;
}
.divDomeStyle{border-radius:3px;width: 105px;height:21px; display: inline-block;border:1px solid #C4C4C4;}
.show_describe{
            background:#f5f5f5;
            display: none;
            font-size:14px;
            color:#333;
            margin-left:30px;
            margin-top:10px;
            margin-bottom:10px;
            font-family: "Microsoft YaHei" ;
         }			
    </style>
    <script type="text/javascript">	 
    //全局分工序机台信息：数据包括工序，机台名称，工作状态，工作状态包括三种（不工作0，预警-1和正常1），工序按顺序排
    //数据结构[[{name:xx,status:xx},{{machine_no:xx,workstatus:xx}},{{machine_no:xx,workstatus:xx}}],[]]
    var wholeInfo=[[{machine_No:'CA6130JX',isWorking:0},{machine_No:'CA6130JX',isWorking:0}],[{machine_No:'CA6130CL',isWorking:0}],
                   [{machine_No:'CA6130BZ',isWorking:0}],[{machine_No:'CA6130JHT',isWorking:0}]];
    
    
        function initContentHeight(selector) {
	        var frame = window.frameElement;
	        var height = $(selector || 'body').outerHeight();
	        var frameHeight = $(frame).height();
	        $(frame).height(height);      
    	}
    	
		
		function clearShortSelected() {
			$('#warn_shortCutSelect').val('');
		}
		
		//清空子菜单里的值
    	function initWidget(type) {
    		var parent = document.getElementById(type);
    		$(parent).html('');
    		var childId = $(parent).attr('child');
    		var child = document.getElementById(childId);
    		if (null != child && undefined!= child) {
    			initWidget(childId);
    		}
    	}
				
	
		var basePath='<%=basePath%>';
		//var contrast_now = encodeURI(encodeURI("${contrast_first}"));
    	</script>
    
</head>
<body style="font-family: '微软雅黑';font-size:12px;background-color:#ffffff;">
	<input id="companys" type="hidden" value="<s:property value="datas.alertResult.component_code"  />" />
	<input type="hidden" name="projectName" id="projectName" value="${pageContext.request.contextPath}"/>
	<%-- <input type="hidden" name="projectName" id="projectName" value="<%=basePath%>"/>  --%>
	<%-- <input id="contrasts" type="hidden" value="<s:property value="datas.alertResult.item_desc_ch"  />" /> --%>
    <div style="width:100%;">
    		<div  style="width:100%;font-color:#333333;" >
			
				<table  style="width:100%;">
					<tbody>
						<tr class="conditionBar">
						    <td class="conditionRowLabel inlineblock" colspan="8">
							<label class="link_label" style="font-size:16px;font-weight: bold;color: #666;margin-bottom: 5px;margin-top: 5px;"  onclick="showOrHideDescribe(this)">
							<img src="<%=basePath%>HUMEPInsight/img/move_right_all.gif" style="margin-top: -3px;">
							<B><s:property value="company" /></B>供应商<B><s:property value="contrast" /></B>机台&nbsp;实时监控</label>
							</td>
						</tr>
						<tr class="conditionRow">
							
							<td class="conditionRowLabel inlineblock">
								<label class="link_label">供应商:</label>
			          		</td>	
			          		<td class="inlineblock conditionContent">
								<div id="default_companys" name="companys" class="inlineblock" class="form-control filter-input" style="margin-top:5px"></div>
							</td>
							<%-- <td class="conditionRowLabel inlineblock">
								<span class="isSpan">|</span>
			          			<label class="link_label">订单:</label>
			          		</td>
			          		<td class="inlineblock conditionContent">	
							<div id="default_contrasts" name="contrasts" class="inlineblock" class="form-control filter-input" style="margin-top:5px"></div> --%>
		          		</td>
						</tr>	
					</tbody> 
				</table>	
				
			    
				<!-- 添加报表收起功能 -->
				<section class="panel" style="min-width:1020px;padding-right: 5px;border: 1px solid #e3e3e3;box-shadow: 1px 2px 1px rgba(0,0,0,0.072);margin-top:15px;margin-left:10px;margin-right:10px;">
					<header class="panel-heading" style="border-width:0px;padding:0px 0px 0px 0px;" >
					
						<span class="tools pull-right" style="margin-top:5px;">
							<a href="javascript:;" class="fa fa-chevron-down" style="font-size:12px;color:#a7a7a7;"></a>
							<!--<a href="javascript:;" class="fa fa-times" style="font-size:12px;color: #a7a7a7;"></a>-->
						</span>
					</header>
					<div class="panel-body" style="padding-top:-10px;height:800px;overflow:auto;">
						<div id="warning_chart" align="center">
							<br/>
							<div id="main0" style="height:250px;width:100%;margin-top:-5px;" align="center"></div> <br/>
							<div id="main1" style="height:250px;width:100%;margin-top:-10px" align="center"></div>  <br/>
							<div id="main2" style="height:250px;width:100%;margin-top:-10px;" align="center"></div>  <br/>
							<div id="main3" style="height:250px;width:100%;margin-top:-10px;" align="center"></div>  <br/>
							<div id="main4" style="height:250px;width:100%;margin-top:-10px;" align="center"></div>  <br/>
						</div>
					</div>
				</section>

				
		    </div>
	</div>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/comet4j.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/complexnew/complexchart_new.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/complexnew/optionnew.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/complexnew/chart_global_new.js"></script>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/complexnew/chartbase_new.js"></script>
</body>
</html>