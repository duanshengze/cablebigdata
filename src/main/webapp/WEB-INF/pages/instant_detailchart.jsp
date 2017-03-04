<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<% 
	String volume_id=request.getParameter("volume_id");
	String machine_no=request.getParameter("machine_no");
	String contrast_now=request.getParameter("contrast_id");
	//String process_now=request.getParameter("process_now");
	//String processlist=request.getParameter("processlist");
	//String machinelist=request.getParameter("machinelist");
	%> <!-- 本页面内全局唯一 -->
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="yuwenjie1@huawei.com">
	<title>线缆实时参数显示</title>
	
  

	<link rel="shortcut icon" href="<%=basePath%>HUMEPInsight/img/favicon.png">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/syntax.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>HUMEPInsight/CN/SiteHardware/css/style.css">    
	<link rel="stylesheet" type="text/css" href="<%=basePath%>avenue/date/jquery-ui-1.7.3.custom.css"/>

	<script src="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/js/jquery-1.8.3.min.js"></script>
	<!--DataTables-->
	<link href="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/css/jquery.dataTables.min.css" rel="stylesheet">
	<script src="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/js/jquery.dataTables.min.js"></script>
	<link href="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/css/dataTables.tableTools.css" rel="stylesheet">
	<script src="<%=basePath%>HUMEPInsight/CN/assets/DataTables-1.10.9/js/dataTables.tableTools.js" charset="utf-8"></script>
	
	
	<style>
		body,.btn{
			font-size:12px;
		}
		table.dataTable tbody th, table.dataTable tbody td {
			padding:5px 10px;
		}
		table.dataTable thead th, table.dataTable thead td {
			padding: 4px 0 8px 6px;
			border-top: 1px solid #eee;
		}
		.dataTables_wrapper .dataTables_filter {
			 margin-bottom: 0;
		}
		select{
			margin-top:4px;
			font-size:12px;
			height:26px;
			line-height:26px;
			border-radius:2px;
			background-color:rgba(0,0,0,0);
			border-color:#ccc;
			box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
			color:#666;
			min-width:120px;
		}
		.dataTables_length select{
			min-width:0;
		}
		.DataTable_select{
			margin-top:4px;
			font-size:12px;
			height:26px;
			line-height:26px;
			border-radius:2px;
			background-color:rgba(0,0,0,0);
			border-color:#e7e7e7;
			appearance:none;
			box-shadow:none;
			color:#999;
			min-width:30px;
			-moz-appearance:none; /* Firefox */
			-webkit-appearance:none; /* Safari 和 Chrome */
		}
		.option{
			line-height:16px;
		}
		*
        {
            line-height: 25px;
            list-style:none
        }
        #tabContainer
        {
            margin: 30px;
        }
        #tabContainer li
        {
            float: left;
            width: 80px;
            margin: 0 4px;
            background: #f1f1f1;
            text-align: center;
        }
        #tabContainer #tab_a
        {
            display: block;
			font-size:14px;
			padding:5px 8px;
			color:#009ae7;
			text-decoration:none;
			
        }
		
        #tabContainer #tab_a.on,#tabContainer #tab_a:hover
        {
            font-size:14px;
			padding:5px 8px;
			background: #0AF;
			color:#FFF;
			text-decoration:none;
			font-weight:bold
        }
        #tabContainer #tab_b
        {
            display: block;
			font-size:14px;
			padding:5px 8px;
			color:#009ae7;
			text-decoration:none;
        }
	</style>
</head>

<body style="margin-top:10px" onload="">
	<%-- <div style="margin-left:40px;"><a href="<%=basePath%>loadComplexMsg.action" >返回首页</a></div> --%>
	 <div id="tabContainer">
        <ul id="processtab" style="border-bottom:2px solid #0AF;line-height:40px;height:40px">
        </ul>
        <div style="clear: both"></div>
        <div id="con1">
           <iframe id="pframe" src="<%=basePath%>firstSeriesDataAndCpk.action?volume_id=<s:property value="params.volume_id"/>&machine_no=<%=machine_no%>&contrast_id=<s:property value="params.contrast_id"/>&type=newAdd" style="width:100%;height:1600px" 
           id="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
        </div>
    </div>
	<script src="<%=basePath%>HUMEPInsight/CN/InsHisView/js/common.js" type="text/javascript"></script>
	<script>//同一道工序可能涉及多台机器？？？
	var machine_no=decodeURI(decodeURI("${machine_no}"));
	var machine_no=("${machine_no}");
	//alert(machine_no);
	<%--var contrast_now=decodeURI(decodeURI('<%=contrast_now%>'));--%>
	var contrast_now=("${contrast_id}");
	
	var volume_id = ("${volume_id}");
	//alert(volume_id);
	var processes_id=[];//'1','2','3','4'
	var process_now="${process_now}";//当前机台所在工序（未处理）
	var processes =eval("${processlist}");//按顺序,要输入的数据  ['挤护套','挤绝缘','绞线','缠线']
	var machines=eval("${machinelist}");
	
	for(var i=0,iL=processes.length;i<iL;i++){
		processes_id.push(i+1);
	}
	
	function makeli(processes,process_now){
		var parent = id("processtab");
		var stop = getProcessPosition(processes,process_now);
		for(var i=0,len=processes.length;i<len;i++){
			var child = document.createElement("li");
			if(i<=stop){
				if(process_now==processes[i]){
					child.className="on";
				}
				child.id = 'tab_a';//processes_id[i];
			}
			else{
				child.id = 'tab_b';
			}
			child.innerHTML = processes[i];
			child.href="#";
			parent.appendChild(child);
		}
	}
	function getProcessPosition(processes,process_now){
		for(var i=0,iL=processes.length;i<iL;i++){
			if(process_now==processes[i]){
				return i;
			}
		}
	}     
	makeli(processes,process_now);
	window.onload = function() {
	    //获取test下的所有li对象
	    var li = tag(id("processtab"), "li");
	    //用循环绑定鼠标单击事件
	    var stop = getProcessPosition(processes,process_now);
	    for(var i=0; i<=stop; i++) {
	        (function() {
	            var t = i;
	            li[i].onclick = function() {
		            li[t].className="on";
		            changeSrc(t);
	              	for(var j=0,len=li.length;j<len;j++){
		              if(j!=t){
			              li[j].className="";
		              }
	              	}
	            }
	        })();
	    }
	}
	function changeSrc(process_id){
		document.getElementById("pframe").src="<%=basePath%>firstSeriesDataAndCpk.action?volume_id="+volume_id+"&process_id="+process_id+"&machine_no="+machine_no+"&type=old";
	}
	
	</script>
    <script type="text/javascript">
		//DateTables
		/*$(document).ready(function() {
			var dataSet = "<s:property value="AAA" />";
			console.log("dataSet:::"+dataSet);
			$('#sitedatas').html('');
		} );*/
	</script>
	<!-- <div id="test"></div> -->
	<%-- <s:debug></s:debug> --%>
</body>
</html>
