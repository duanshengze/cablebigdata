<html>
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>离线查询</title>
	
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css"/>
	<link rel="stylesheet" href="css/jquery.dataTables.min.css">	
	<link rel="stylesheet" href="css/dataTables.tableTools.css">
	<link rel="stylesheet" href="css/dataTables.colVis.css">
	<link rel="stylesheet" href="css/colReorder.dataTables.min.css">
	<!--JS-->
	<script src="js/jquery-1.11.3.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.dataTables.min.js"></script>
	<script src="js/dataTables.tableTools.js" charset="utf-8"></script>
	<script src="js/dataTables.colVis.js"></script>
	<script src="js/dataTables.colReorder.min.js"></script>
	<!--STYLE-->
	<style>
		table{
			font-size:12px
		}
		.row-fluid{
			margin:10px 20px
		}
		.bottom .dataTables_length{
			padding-top:1.1em;
		}
		.bottom .dataTables_length label,.ColVis_collection label{
			font-weight:normal
		}
		.ColVis_collection label{
			margin-bottom:0
		}
	</style>
</head>

<body>
	<div class="container-fluid">
		<!-- <div class="row-fluid">
			<div class="span12">
				<ul class="breadcrumb">
					<li><a href="#">首页</a> <span class="divider"></span></li>
					<li><a href="#">24H全球同步</a> <span class="divider"></span></li>
					<li class="active">所有预警</li>
				</ul>
			</div>
		</div> -->
		<div class="row-fluid">
			<div class="span12">
				<!-- Main Tables-->
				<div id="example_wrapper" class="dataTables_wrapper">
					<div id="index_table" style="width:100%;"></div>
				</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" charset="UTF-8">	
		$(document).ready(function() {
			
			$('#index_table').html( '<table cellspacing="0" border="0" class="stripe" id="example1" width="100%"><thead><tr>'+
					'<th>供应商</th><th>订单号</th><th>工序</th><th>机台编号</th><th>盘号</th>'+
					'<th>操作人员</th><th>材料</th><th>米标</th><th>采集日期</th><th>外径</th><th>线速度</th><th>水槽温度</th>'+
					'<th>颈部温度</th><th>眼模温度</th><th>机头温度</th><th>一段温度</th><th>二段温度</th><th>三段温度</th><th>四段温度</th>'+
					'<th>五段温度</th><th>六段温度</th><th>放线张力</th><th>收线速度</th><th>主机转速</th>'+
					'</tr></thead></table>' );
			var table1 = $('#example1').DataTable( {
				/* "ajax": function(data,callback,settings){
					window.parent.getData2(data,callback);
				}, */
				"bServerSide": true,                    //指定从服务器端获取数据  
				"sAjaxSource": "ajaxLoadHisWarnData.action",             //获取数据的url (一般是action) 
				"fnServerData": retrieveData,           //获取数据的处理函数  
				"scrollX": true,
				"scrollY":"400px",
				"scrollCollapse": "true",
				/*
					T - 选择列
					C - 导出
					f - Filtering input 搜索框
					r - pRocessing 加载等待显示信息
					t - The Table 表格
					l - Length changing 每页显示多少条数据选项
					i - Information 表格信息
					p - Pagination 分页按钮
				*/
				"sDom": '<"top"CT>frt<"bottom"lip>',
				"tableTools": {
					"sSwfPath": "copy_csv_xls_pdf.swf",
					"aButtons": [
					             {sExtends: "csv", oSelectorOpts: {page: "current" },sFileName: "离线数据.csv", //导出为csv文件，并且指定了文件的名称
					             "fnClick": function( nButton, oConfig , flash) { 
					            	 alert("导出所选异常数据,当数据较多时，请耐心等待！");
					            	 window.parent.exportExcel(0);
					             },
					             },
					             ]
				},
				"aoColumnDefs": [{
					sDefaultContent: '',
					aTargets: [ '_all' ],
					"orderable":false,
				}],
				"pagingType":   "full_numbers",
				"language": {
					 "lengthMenu": "每页 _MENU_ 条记录",
					 "zeroRecords": "没有找到记录",
					 "info": ", 第 _PAGE_ 页 / 共 _PAGES_ 页",
					 "infoEmpty": "无记录",
					 "infoFiltered": "(从 _MAX_ 条记录中筛选)",
					 'emptyTable': '没有数据',    
					 'loadingRecords': '加载中...',    
					 'processing': '查询中...',        
					 'paginate': {      
					 		'next':       '下一页',    
					 		'previous':   '上一页',
							'first':       '首页',    
					 		'last':   '尾页'  							
					 		}
				 },
				"columns": [
				{"data":"company_Name"},
				{"data":"contrast_ID"},
				{"data":"process_Id"},
				{"data":"machine_No"},
				{"data":"volume_No"},
				{"data":"operator_RFID"},
				{"data":"material"},
				{"data":"meter_Tag"},
				{"data":"collected_DATE"},
				{"data":"outerDiameter"},
				{"data":"firstVelocity"},
				{"data":"temperature10"},
				{"data":"temperature7"},
				{"data":"temperature9"},
				{"data":"temperature8"},
				{"data":"temperature1"},
				{"data":"temperature2"},
				{"data":"temperature3"},
				{"data":"temperature4"},
				{"data":"temperature5"},
				{"data":"temperature6"},
				{"data":"firststress"},
				{"data":"finishedVelocity"},
				{"data":"motorVelocity"}
				],
				colVis: {
					showAll: "全选",
					showNone: "清空"
				},
				stateSave: true,
				colReorder: {
					reorderCallback: function () {
						console.log( 'callback' );
					}
				}
			} );		
		});	
		
		function retrieveData( sSource, aoData, fnCallback ) {  
		    // 将客户名称加入参数数组
		   //aoData.push( { "name": "customerName", "value": "asdas" } );//添加自己的额外参数
		     //alert(aoData[0].name);
		    // alert(JSON.stringify(aoData));
		     //alert(sSource);
		     window.parent.getData2(sSource, aoData, fnCallback);
		   /* $.ajax( {  
		        url: sSource,   
		        type: "POST", 
		        async: true, //异步请求
		        contentType: 'application/json',
		        dataType: "json",  
		        data: {
		        	"aoData" : JSON.stringify(aoData)
		        },// 以json格式传递
		        success: function(data) { 
		        	fnCallback(data);
		        },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus); 
				}
		    }); */
		}  
		$(".ColVis").css("display","none");
		/* var child = document.createElement("button");
		child.className="ColVis_Button ColVis_MasterButton";
		var divs = document.getElementsByTagName("div");//$(".top,div");
		var div;
		for(var i=0,iL=divs.length;i<iL;i++){
			if(divs[i].className=="top")div=divs[i];
		}
		div=document.getElementById("index_table");
		div.appendChild(child); */
	</script>
	
</body>
</html>