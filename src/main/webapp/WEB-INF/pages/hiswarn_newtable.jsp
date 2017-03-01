
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
<title>失效数列表</title>
<link rel="stylesheet" href="<%=basePath %>/HUMEPInsight/CN/warning/css/style.css" />
<script type="text/javascript" language="javascript"
		src="<%=basePath %>/eview/3rd_tools/jquery/js/jquery-1.7.2.min.js"></script>
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
	<link class="include" rel="stylesheet" type="text/css" href="<%=basePath %>eview/css/eview/widgets/button.css" />	
	<link class="include" rel="stylesheet" type="text/css"
		href="<%=basePath%>/eview/css/eview/widgets/pagination/pagination.css" />
		<link type="text/css" rel="stylesheet" href="<%=basePath %>eview/css/eview/widgets/radioCheckbox/radioCheckbox.css">

	<script src="<%=basePath %>HUMEPInsight/CN/echarts/myCommon.js"></script>

	<script src="<%=basePath %>eview/3rd_tools/jquery/js/jquery-ui.custom.js"></script>
	
		<script type="text/javascript" language="javascript" src="<%=basePath %>eview/3rd_tools/angular/angular.min.js" ></script>
	<script language="javascript" type="text/javascript" src="<%=basePath %>eview/3rd_tools/jquery/js/jquery.caret.js"></script>
	<script type="text/javascript" language="javascript"
		src="<%=basePath %>/eview/i18n/resources.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/js/eview.widgets.table.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/js/eview.widgets.radiocheckbox.js"></script>
	<script type="text/javascript" language="javascript" src="<%=basePath %>eview/js/eview.widgets.button.js"></script>
	<style type="text/css">
	body {
		  font: normal normal 12px Microsoft YaHei;
	  }
	.table{
		width: 96%;
		margin: auto;
	}
	.table th span
	{
		font: normal normal 12px Microsoft YaHei;
	}
	
	.hide-input{display: none;width:60px;}
	
	.selectCloumnBtn {
		width: 16px;
		height: 16px;
		cursor: pointer;
		background-color: #F0F0F0;
		background-image: url('<%=basePath %>eview/images/table/filter_icon.png');
		position: absolute;
		right: 35px;
		margin-top: 4px;
		border: none;
		outline: none;
		z-index: 2;
	}
	
	#selectFieldList {
		position: absolute;
		/*right: 35px;*/
		padding: 10px;
		display: none;
		box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3), 0px 1px 0px #E5E5E5 inset;
		background: #fafafa;
		border-radius: 5px;
		overflow: hidden;
		z-index: 2;
	}
	
	.checkList table td{
		min-width: 125px;
		height: 20px;
	}
	
	.btnPlan{
	display: block;
	clear: both;
	width: 140px;
	margin: 0 auto;
	}
	
	.okBtn{
	margin-top: 5px;
	margin-right: 10px;
	}
	
	.cancelBtn{
	margin-top: 5px;
	}
	
	table.dataTable tbody tr.selected_row td{
      background-color:#E6FBE0;
    }
	::-webkit-scrollbar {height: 14px;width: 14px;}
	::-webkit-scrollbar-thumb {background:  rgb(225,225,225); -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.1);}
	::-webkit-scrollbar-thumb:hover {background: rgba(210,210,210,0.8);}
	::-webkit-scrollbar-track {background:  rgb(241,241,241);-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.1);}
	</style>
	<script type="text/javascript">
	var $tableScope=null;
		//查询失效数预警时间前后50条数据  
	 /*  function loadLastTime(data){
		
		var basePath = '${basePath}';
		
		//最后测试时间
		var alert_time = data.alert_time;
		
		//编码
		var component_code = data.component_code;
		//date code 
		var date_code = data.date_code;
		//lot code
		var lot_code = data.lot_code;
		//厂家
		var manufacturer = data.manufacturer;
		
		//alert_id 预警id
		var alert_id = data.alert_id;	
		var item_desc_ch = data.item_desc_ch;//物料品类			
		
		$('#component_code').val(component_code);
		$('#manufacturer').val(manufacturer);
		$('#date_code').val(date_code);
		$('#lot_code').val(lot_code);
		$('#alert_id').val(alert_id);
		$('#item_desc_ch').val(item_desc_ch);
		var materiel_type = parent.document.getElementById('materiel_type').value;
		if(!materiel_type){
			materiel_type = '';
		}
		
		var url = basePath + "massive_loadFailNum.action?params.component_code="+component_code+"&params.manufacturer="+encodeURI(encodeURI(manufacturer))+'&params.alert_time='+alert_time+'&params.date_code='+date_code+'&params.lot_code='+lot_code+"&params.alert_id="+alert_id+'&params.item_desc_ch='+encodeURI(encodeURI(item_desc_ch))+'&params.materiel_type='+materiel_type;
		
		window.parent.location.href = url;
		
	} */
		
	 
	   function getTableData(data,$scope,alert_id_key){
			var tabledata = data.objs;
			for(var i in data.objs){
				if(data.objs[i].alert_id!=alert_id_key){
					continue;
				}
				data.objs[i]['cls']="selected_row";
			}
			$scope["eviewtable"].attr("dataset",data.objs);
	       	$scope["eviewtable"].attr("total-records",data.totalCount);
	   }
	    function setIframeHeight(){
			var frame = $(window.parent.document).find("#content_frame_old");

			var div_height = $("#eviewtable_tableContent").height();
			var new_height = (div_height + 60) + "px";
			if($('#selectFieldList').is(':visible')) {
				var custom_height = $('#selectFieldList').height();
				if(div_height < custom_height) {
					new_height = (custom_height + 60) + "px";
				}
			}
			frame.attr("height", new_height);
		}
	   function TableController($scope)
       {
		   $tableScope=$scope;
           function loadData(pageNum,pageSize){
				window.parent.getData(pageNum,pageSize,$scope);
				//window.parent.initContentHeight();
		   }
           
           loadData(1,10);
		  
		  
           $scope.displayLengthOptions=[10,20,30,50,100];
			
			$scope.paginationHandler = function(event){
				// event.displayLength
				window.parent.getData(Number(event.currentPage),Number(event.displayLength),$scope);
				//setIframeHeight();
				//window.parent.initContentHeight();
			}
			
		
			
			<%-- $scope.customGradeEditor = function(obj)
           {
				var url = '<%=basePath%>massive_queryDetailPage.action';
				var alertId = obj.rowData['alert_id'];
				url = url +'?params.alert_id='+alertId;
				return '<a class="tablebtm" href="'+url+'" target="_blank">详情</a>';
           } --%>
		   
		   $scope.samplelisteners = {click:clickHandler};
			function clickHandler(event)
			{
				var target = event.evtObj.target;
                
                if (!$(target).hasClass('tablebtm')) {
				    var data = event.data.rowData;
                    /* loadLastTime(data); */
                }
			}
       }
	   
	   function fieldCheckboxController($scope){
		var fieldListJson = $("#fieldListJson").val()?JSON.parse($("#fieldListJson").val()):'';

		$scope.allAlertFieldList = {
			"company_Name":{"checked":fieldListJson?fieldListJson.company_Name:true,"label":"供应商","value":"company_Name","disabled":false},
			"contrast_ID":{"checked":fieldListJson?fieldListJson.contrast_ID:true,"label":"订单号","value":"contrast_ID","disabled":false},
			"process_Id":{"checked":fieldListJson?fieldListJson.process_Id:true,"label":"工序","value":"process_Id","disabled":false},
			"machine_No":{"checked":fieldListJson?fieldListJson.machine_No:true,"label":"机床","value":"machine_No","disabled":false},
			"volume_No":{"checked":fieldListJson?fieldListJson.volume_No:true,"label":"盘号","value":"volume_No","disabled":false},
			"operator_RFID":{"checked":fieldListJson?fieldListJson.operator_RFID:true,"label":"操作员","value":"operator_RFID","disabled":false},
			"material":{"checked":fieldListJson?fieldListJson.material:true,"label":"材料","value":"material","disabled":false},
			"meter_Tag":{"checked":fieldListJson?fieldListJson.meter_Tag:true,"label":"米标","value":"meter_Tag","disabled":false},
			"collected_DATE":{"checked":fieldListJson?fieldListJson.collected_DATE:true,"label":"时间","value":"collected_DATE","disabled":false},
			"outerDiameter":{"checked":fieldListJson?fieldListJson.outerDiameter:true,"label":"外径值","value":"outerDiameter","disabled":false},
			"firstVelocity":{"checked":fieldListJson?fieldListJson.firstVelocity:true,"label":"放线速度","value":"firstVelocity","disabled":false},
			"temperature10":{"checked":fieldListJson?fieldListJson.temperature10:true,"label":"水槽温度","value":"temperature10","disabled":false},
			"temperature7":{"checked":fieldListJson?fieldListJson.temperature7:true,"label":"颈部温度","value":"temperature7","disabled":false},
			"temperature9":{"checked":fieldListJson?fieldListJson.temperature9:true,"label":"眼模温度","value":"temperature9","disabled":false},
			"temperature8":{"checked":fieldListJson?fieldListJson.temperature8:true,"label":"机头温度","value":"temperature8","disabled":false},
			"temperature1":{"checked":fieldListJson?fieldListJson.temperature1:true,"label":"一段温度","value":"temperature1","disabled":false},
			"temperature2":{"checked":fieldListJson?fieldListJson.temperature2:true,"label":"二段温度","value":"temperature2","disabled":false},
			"temperature3":{"checked":fieldListJson?fieldListJson.temperature3:true,"label":"三段温度","value":"temperature3","disabled":false},
			"temperature4":{"checked":fieldListJson?fieldListJson.temperature4:true,"label":"四段温度","value":"temperature4","disabled":false},
			"temperature5":{"checked":fieldListJson?fieldListJson.temperature5:true,"label":"五段温度","value":"temperature5","disabled":false},
			"temperature6":{"checked":fieldListJson?fieldListJson.temperature6:true,"label":"六段温度","value":"temperature6","disabled":false},
			"firststress":{"checked":fieldListJson?fieldListJson.firststress:true,"label":"放线张力","value":"firststress","disabled":false},
			"finishedVelocity":{"checked":fieldListJson?fieldListJson.finishedVelocity:true,"label":"收线速度","value":"finishedVelocity","disabled":false},
			"motorVelocity":{"checked":fieldListJson?fieldListJson.motorVelocity:true,"label":"主机转速","value":"motorVelocity","disabled":false}
			/* "outpress":{"checked":fieldListJson?fieldListJson.outpress:true,"label":"挤出压力","value":"outpress","disabled":false}, */
			/* 
			"savelineStress":{"checked":fieldListJson?fieldListJson.savelineStress:true,"label":"储线张力","value":"savelineStress","disabled":false}, */
			/* "concave_convex_value":{"checked":fieldListJson?fieldListJson.concave_convex_value:true,"label":"凹凸检测","value":"concave_convex_value","disabled":false}, 
			"spark_value":{"checked":fieldListJson?fieldListJson.spark_value:true,"label":"火花报警次数","value":"spark_value","disabled":false}*/
		};
		
	$scope.okHander = function(){
		var values = $scope.checklist.attr('values');
		if(!values){
			//popupTip(2,"页面数据异常！");
			return;
		}
		var jsonData={};
		var fieldListJson={};
		for(var field in values){
			$tableScope.eviewtable.setColumnDisplay(field, values[field].checked);
			jsonData["params."+field]=values[field].checked;
			fieldListJson[field]=values[field].checked;
		}
		jsonData["params.fieldListJson"]=JSON.stringify(fieldListJson);
		$.ajax({
			type: "POST",
			url: 'saveSessionHisWarnFieldList.action?t='+(new Date()).valueOf(),
			data: jsonData,
			dataType: "json",
			success: function(data){
				if(!data || !data.result || data.result!='sucess' ){
					//popupTip(2,"当前会话显示/隐藏字段列保存失败！");
					return;
				}
			},
			error: function(){
				//popupTip(2,"服务器异常！");
			}
		});
		$("#selectFieldList").hide();
		$('#company_Name_sorticon').css('margin-left','18px');
		setIframeHeight();
	};
	
	$scope.cancelHander = function(){
		$("#selectFieldList").hide();
		setIframeHeight();
	};
  } 
		
	$(function(){
		
		$("#selectCloumnBtn").click(function(){
			$("#selectFieldList").css({"top":($(this).offset().top+20)+"px","left":$(this).offset().left+"px"}).toggle();	
			setIframeHeight();
			window.parent.initContentHeight();
		});
		
		$('#company_Name_sorticon').css('margin-left','18px');
		var top = $('#company_Name_sorticon');
		top=top.parent().parent();
		top=top.offset();
		top=top.left + 4.5;
		$('#selectCloumnBtn').css('left',top+'px');
		
	});
	
	</script>
	
</head>
<body>
<input type='hidden' id='tabledatas' value=''/>
<div id="main" ng-controller="TableController">
<div id="selectCloumnBtn" class="selectCloumnBtn" title="选择列"></div>
		<div id="selectFieldList" ng-controller="fieldCheckboxController">
			<input id="fieldListJson" type="hidden" value="<s:property value="#session.fieldListJson" />" />
			<eview:checkbox-list id="checklist" rows="0:1|2:3|4:5|6:7|8:9|10:11|12:13|14:15|16:17|18:19|20:21|22" cls="checkList" values="allAlertFieldList" label-field="label" value-field="value" checked-field="checked" disabled-field="disabled"></eview:checkbox-list>
			<div class="btnPlan">
				<eview:button id="okBtn" type="default" cls="okBtn" text="确定" click="okHander"></eview:button>
				<eview:button id="cancelBtn" type="default" cls="cancelBtn" text="取消" click="cancelHander"></eview:button>
			</div>
		</div>	
		<eview:table id="eviewtable" disable="false" cls="table"
			caption="Table Caption"  scroll="true"
			auto-hide-tip="false" selection-type="singless"
			enable-pagination="true"  listeners="samplelisteners"
			display-length="10" display-length-options="displayLengthOptions"
			dataset="tableDataSet" enable-tooltip="true"  enable-pagination="true" pagination-handler="paginationHandler"   empty-table-msg="当前无数据">
			<!-- <eview:table-column id="alert_id" display="false" caption="alertId"
				sortable="true" ></eview:table-column> -->
			<eview:table-column id="company_Name" width="10%" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('company_Name')}" />" caption="供应商"
				sortable="true"  enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="contrast_ID" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('contrast_ID')}" />" caption="订单号"
			sortable="true"  enable-tooltip="true" width="9%"></eview:table-column>
			<eview:table-column id="process_Id"  display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('process_Id')}" />" caption="工序"
			sortable="true" enable-tooltip="true"></eview:table-column>
			<eview:table-column id="machine_No" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('machine_No')}" />" caption="机床"
			sortable="true" enable-tooltip="true"></eview:table-column>
			<eview:table-column id="volume_No" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('volume_No')}" />"  caption="盘号"
			sortable="true" enable-tooltip="true" width="7%"></eview:table-column>
			<eview:table-column id="operator_RFID" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('operator_RFID')}" />" caption="操作员"
			sortable="true" enable-tooltip="true"></eview:table-column>
			<eview:table-column id="material" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('material')}" />"  caption="材料"
			sortable="true" enable-tooltip="true" width="7%"></eview:table-column>
			<eview:table-column id="meter_Tag" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('meter_Tag')}" />" caption="米标"
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="collected_DATE" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('collected_DATE')}" />" caption="采集时间" 
			sortable="true" enable-tooltip="true" width="9%"></eview:table-column>
			<eview:table-column id="outerDiameter" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('outerDiameter')}" />" caption="外径值" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="firstVelocity" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('firstVelocity')}" />" caption="放线速度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature10" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature10')}" />" caption="水槽温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature7" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature7')}" />" caption="颈部温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature9" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature9')}" />" caption="眼模温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature8" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature8')}" />" caption="机头温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature1" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature1')}" />" caption="一段温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature2" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature2')}" />" caption="二段温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature3" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature3')}" />" caption="三段温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature4" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature4')}" />" caption="四段温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature5" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature5')}" />" caption="五段温度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="temperature6" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('temperature6')}" />" caption="六段温度" 
			sortable="true" enable-tooltip="true"></eview:table-column>
			<eview:table-column id="firststress" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('firststress')}" />" caption="放线张力" 
			sortable="true" enable-tooltip="true"></eview:table-column>
			<eview:table-column id="finishedVelocity" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('finishedVelocity')}" />" caption="收线速度" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			<eview:table-column id="motorVelocity" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('motorVelocity')}" />" caption="主机转速" 
			sortable="true" enable-tooltip="true" ></eview:table-column>
			
			<!-- <eview:table-column id="outpress" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('outpress')}" />" caption="挤出压力" 
			sortable="true" enable-tooltip="true" width=11%></eview:table-column> -->
			<!-- 
			<eview:table-column id="savelineStress" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('savelineStress')}" />" caption="储线张力"
			sortable="true" enable-tooltip="true" width=11%></eview:table-column>  -->
			<!-- <eview:table-column id="concave_convex_value" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('concave_convex_value')}" />" caption="预凹凸检测" 
			sortable="true" enable-tooltip="true" width=11%></eview:table-column> -->
			<!-- <eview:table-column id="spark_value" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('spark_value')}" />" caption="火花报警次数" 
			sortable="true" enable-tooltip="true" ></eview:table-column> -->
			<!--<eview:table-column id="" display="true" caption="处理状态"
			sortable="true" enable-tooltip="true"></eview:table-column>-->
			<!-- <eview:table-column id="howto" display="<s:property value="%{#session.fieldList==null?true:#session.fieldList.get('howto')}" />" caption="操作" 
			sortable="true" column-type="custom"  custom-editor="customGradeEditor" width="200px" ></eview:table-column> -->
		</eview:table>
	</div>
</body>


</html>