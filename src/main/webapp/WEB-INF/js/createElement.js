// JavaScript Document

{
  /*创建logo开始*/	
  function createLogo($dom){
	$("<div></div>").addClass("mainlogo").appendTo($dom);
  }
  /*创建logo结束*/
}

{
/*创建菜单开始*/
/*
 container:jquery元素或者、选择器、dom元素，menu将会挂接的父容器
 data：数组的复杂对象  {name:"",title:"",url:"",subMenu:[] }
*/
function MainMenu(container,data){
  this._settings={
        $container:$(container),
		data:data	  
	  };
}
/*创建主要导航菜单*/
function _createTopMenu(self){
  var settings=self._settings;
  var data=settings.data;
  var $mainMenusContainer=$("<div></div>").addClass("mainMenusContainer hide").appendTo(settings.$container);
  settings.$mainMenusContainer=$mainMenusContainer;
  var $ul=$("<ul></ul>").addClass("mainMenus").appendTo($mainMenusContainer);
  var length=data.length;
  for(var i=0;i<length;i++){
     $("<li></li>").appendTo($ul)
	               .addClass("mainMenuItem")
				   .prop({"name":data[i].name})
	               .append($("<a></a>").addClass("itemLink").html(data[i].title).attr({"src":data[i].src})); 
  }
  $mainMenusContainer.removeClass("hide");	
  $firstMenuContainer=null;
  $ul=null;
}
/*创建子导航才到那*/
function _createSubMenus(self){
  var settings=self._settings;
  var data=settings.data;
  var length=data.length;
  var $subMenusContainer=$("<div></div>").addClass("subMenusContainer").appendTo(settings.$container);//所有二级目录放的dom位置
  settings.$subMenusContainer=$subMenusContainer;
  var $subMenus;
  for(var i=0;i<length;i++){
	  if(data[i].subMenus){
	   $subMenus=$("<div></div>").addClass("subMenus hide").prop({"name":data[i].name}).appendTo($subMenusContainer);//二级目录容器
	   data[i].subMenus&&_createSubMenu(data[i].subMenus,$subMenus); 
	   $subMenus.append($("<div></div>").addClass("menusArrow"));	  
	  }     
  }
    
}
//创建子集目录
function _createSubMenu(menus,$dom){
	var length=menus.length;
	var $subMenuItem;
	for(var i=0;i<length;i++){
	    $subMenuItemContainer=$("<div></div>").addClass("subMenuItemContainer").appendTo($dom); //二级目录容器
		$("<div></div>").appendTo($subMenuItemContainer)  //创建二级目录
                   .addClass("menuItemHead")
				   .append($("<a></a>").addClass("itemLink").prop({"src":menus[i].src}).text(menus[i].title));		   
		if(menus[i].subMenus&&menus[i].subMenus.length>0){  //创建三级目录
			var subMenus=menus[i].subMenus;
			var count=subMenus.length;
		    for(var j=0;j<count;j++){
			  $("<div></div>").appendTo($subMenuItemContainer)
                   .addClass("menuItem")
				   .append($("<a></a>").addClass("itemLink").prop({"src":subMenus[j].src}).text(subMenus[j].title));
			}
		}		   
     }   
}
/*对弹出来的二级菜单定位*/
function _locationMenu($mainMenu,$subMenu,$targetContainer){
   var mPosition=$mainMenu.offset();
   var mSize={width:$mainMenu.outerWidth(),height:$mainMenu.outerHeight()};
   var sPosition=$subMenu.offset();
   var sSize={width:$subMenu.outerWidth(),height:$subMenu.outerHeight()};
   var targetPosition=$targetContainer.offset();
   var $arrow=$subMenu.find(".menusArrow");//菜单箭头
   var aw=$arrow.width();//菜单箭头宽度
   var ah=$arrow.height();//菜单箭头高度
   var dX=0;//箭头偏移一级菜单中心位置x
   var dY=-3;//箭头偏移一级菜单中心位置y
   var rX=dX;/*二级菜单相对一级菜单左下角的X偏移量*/
   var rY=dY+ah;/*二级菜单相对一级菜单左下角的y偏移量*/
   var screenWidth=$(window).width;// screen.availWidth;
   var x;
   var y;
   y=(mPosition.top+mSize.height)+rY-targetPosition.top;
   x=mPosition.left+rX-targetPosition.left;
   if(x+sSize.width>screenWidth){
     x=screenWidth-sSize.width;
   }
   var ax= (mPosition.left+mSize.width/2)-(targetPosition.left+x)-aw/2;
   var ay= -ah;  //(mPosition.top+mSize.height)-(targetPosition.top+y);
   $subMenu.css({"left":x,"top":y});  
   $arrow.css({"left":ax,"top":ay});   
}
//菜单事件绑定
function _menusEventBind(self){
  var settings=self._settings;
  var $subMenus=settings.$subMenusContainer.find("div.subMenus");
  var $mainMenuItem=settings.$mainMenusContainer.find(".mainMenuItem");
  var timer;
  settings.$mainMenusContainer.find(".mainMenuItem").bind("mouseenter",function(e){
	                                         if(timer){
											   window.clearTimeout(timer);
											 }
	                                        var name=$(this).prop("name");
											var $self=$(this);
											console.log(11);
											$subMenus.addClass("hide").each(function(index,element){
												  var $this=$(element);
												  var currentName=$this.prop("name");
												 // alert(currentName);
												  if(currentName==name){
													   _locationMenu($self,$this,settings.$subMenusContainer);
													   $this.removeClass("hide");
													 }
													$this=null;	 
												});
											$self=null;
										})
                              .bind("mouseleave",function(){
								  console.log(22);
								        timer=window.setTimeout(function(){
											  $subMenus.addClass("hide");
											},500);
										});
 $subMenus.bind("mouseenter",function(){
	                      console.log(33);
						 if(timer){
							   window.clearTimeout(timer);
							 }
					 })										
				 .bind("mouseleave",function(){
					 console.log(44);
						$subMenus.addClass("hide");
					 });
 return function(){
	     settings.$mainMenusContainer.undelegate("mainMenuItem","mouseenter mouseleave");
		 $subMenus.unbind("mouseenter mouseleave");
		 timer=null;
		 $subMenus=null;
		 settings=null;
	 }
}
MainMenu.prototype={
 /*初始化对象*/
 init:function(){
	    var self=this;
		_createTopMenu(self);
		_createSubMenus(self);
		_menusEventBind(self);
	 },
 /*设置当前选中的节点*/	 
 setSelectByIndex:function(index){
	   var settings=this._settings;
	   settings.$mainMenusContainer.find(".mainMenuItem")
	                               .removeClass("select")
								   .eq(index)
								   .addClass("select");
	 },
 /*设置当前选中的节点*/	 
 setSelectById:function(id){
	 var settings=this._settings;
	 settings.$mainMenusContainer.find(".mainMenuItem")
	                             .each(function(index,element){
		                             $element=$(element);
									 $element.prop("name")===id?$element.addClass("select"):$element.removeClass("select");
									 $element=null;
								  });
	 },	 	 
 getSelectNode:function(){
	    var settings=this._settings;
	    return settings.$mainMenusContainer.find(".mainMenuItem.select");
	 },
 	 
};
/*创建菜单结束*/
}
	
/*创建辅助信息*/
{
 function WarItem($container,name){
   this._settings={
	    "$container":$container,
	    "needBackground":false,  //是否需要背景色
		"background":"transparent",//背景色颜色值
		"imageSrc":"",//元素上面图表
		"isNeedNotes":false,//是否需要显示提示信息
		"value":0,//数据
		"name":name
	   };
 }
WarItem.prototype={
	  /*初始化*/
	  init:function(){
		  var self=this;
		  var settings=self._settings;
		  var $dom=$("<div></div>").addClass("warItem  "+settings.name).appendTo(settings.$container);
		  var $graphInfo=$("<div></div>").addClass("graphInfo").appendTo($dom);
		  var $backInfo=$("<div></div>").addClass("backInfo").appendTo($graphInfo);
		  var $imageInfo=$("<div></div>").addClass("imageInfo").appendTo($backInfo);
		  var $notesInfo=$("<div></div>").addClass("notesInfo").appendTo($graphInfo);
		  var $valueInfo=$("<div></div>").addClass("valueInfo").appendTo($dom);
		  settings.$dom=$dom;
		  settings.$backInfo=$backInfo;
		  settings.$notesInfo=$notesInfo;
		  settings.$valueInfo=$valueInfo;
		  },
	 /*更新值 数据值*/	  
	 updateValue:function(value){
		   var settings=this._settings;
		   settings.$valueInfo.html(value);
		},
	/*更新背景 颜色值*/	
	 updateBackground:function(value){
		 var settings=this._settings;
		 settings.$backInfo.css({"background-color":value});
		 },	
	/*更新是否显示感叹号 bool*/	 	 
	updateNotes:function(value){
	      var settings=this._settings;
		  if(value){
		    settings.$notesInfo.removeClass("hide");
		  }else{
			  settings.$notesInfo.addClass("hide");
			  }
		},	  
	 update:function(value,background,notes){
		   this.updateValue(value);
		   this.updateBackground(background);
		   this.updateNotes(notes);
		},
	 /*获取*/	
	 getName:function(){
		   return this._settings.name;
		 },	
	  /*显示item*/	 	
	  show:function(tag){
		     this._settings.$dom[tag?"removeClass":"addClass"]("hide");
		  }	    
	}
  function WarItemCollect(showArray,$container){
      this._settings={
		    "showArray":showArray, /*需要显示的itme数组*/
			"$container":$container,/*显示item的容器*/
			objArray:[]/**/
		  }; 
  }
  WarItemCollect.prototype={
	   /*初始化*/
	   init:function(){
		     var self=this;
			 var settings=self._settings;
			 settings.$dom=$("<div></div>").addClass("warItemCollect hide").appendTo(settings.$container);
			 var showArray=settings.showArray;
             var count=showArray.length;
			 var tempItem;
			 for(var i=0;i<count;i++){
				  tempItem=new WarItem(settings.$dom,showArray[i]);
				  tempItem.init();
				  settings.objArray.push(tempItem);
			 }  
		   },
	   /*获取其中的某一项*/
	   getItemByName:function(name){
		     var settings=this._settings;
			 var objArray=settings.objArray;
			 var count=objArray.length;
			 for(var i=0;i<count;i++){
				    if(objArray[i].getName()===name){
						  return objArray[i];
						}
				 }
			 return null;	 
		   },
	   /*显示或者隐藏*/	   
	   show:function(tag){
		     this._settings.$dom[tag?"removeClass":"addClass"]("hide");
		   },
	   updateItemByName:function(name,value,background,notes){
		      var currentItem=this.getItemByName(name);
			  currentItem.update(value,background,notes);
		   },	   
	   updateCollects:function(list){
		     if(!list){ return;}
			 var count=list.length;
			 for(var i=0;i<count;i++){
				  this.updateItemByName(list[i].name,list[i].value,list[i].background,list[i].notes);
				}
		   },	   	   
	   	   
	  };
	  
	/*logout*/
	function _logout(){
	    alert("logout");	
	} 
	function bindLogout($userInfo){
	   $userInfo.bind("click",_logout);
	}
	function createUserInfo($container,userName){
	   var $userInfo=$("<div></div>").addClass("userInfo").appendTo($container).prop("title",userName);
	   $("<span></span>").addClass("userName").text(userName).appendTo($userInfo);
	   $("<div></div>").addClass("logout").appendTo($userInfo);
	   bindLogout($userInfo);
	}
	/*search*/
	function  _search(){
	  alert("s11");
	}
	function bindSearchBtn($searchBtn){
	   $searchBtn.bind("click",_search);     
	}
	function createSearch($container){
	   var $searchInfo=$("<div></div>").addClass("searchInfo").appendTo($container); 
	   var $searchBtn=$("<div></div>").addClass("searchBtn").appendTo($searchInfo);
	   bindSearchBtn($searchBtn);
	}  
	/*页面帮助辅助跳转按钮按钮*/
	/*array数据格式[{name:'',address:''}]*/
	function _asideBtnClick(){
	  alert("333");
	};
	function asideBtnBind($asideBtns){
		$asideBtns.delegate(".btnItem","click",_asideBtnClick)
	}
	
	function  createAsideBtns(array,$container){
		var $asideBtns=$("<div></div>").addClass("asideBtns").appendTo($container);
		var count=array.length;
		for(var i=0;i<count;i++){
		  $asideBtns.append($("<div></div>").addClass("btnItem "+array[i].name).prop("address",array[i].address));  
		}
		asideBtnBind($asideBtns);
	}
	function createSpinner($container){
	 var $spinnerContainer=$("<div></div>").addClass("spinnerContainer").appendTo($container);
	  $spinnerContainer.append($("<div></div>").addClass("spinner"));
	}
	
}



/*框架工具函数*/

/*
  $container需要是属于position: relative absolute fixed类型的元素
*/

function _beforeLoad(self){

}
function _afterLoad(self){

}
function FrameManager($container,id){
  this._settings={
	  "$container":$container,
	  id:id,
	   "$frame":null
	  };
}
FrameManager.prototype={
	 /*初始化*/
	 init:function(){
		 var settings=this._settings;
		 settings.$container.addClass("frameManageContainer");
		 settings.$iframeMask=$("<div></div>").addClass("iframeMask").appendTo(settings.$container);
		 settings.$frame=$("<iframe></iframe>").attr("id",settings.id).appendTo(settings.$container);
		 settings.id&&settings.$frame.addClass("manageFrame");
		 },
	/*设置加载之前的回调函数*/
	 setBeforeLoadFn:function(fn){
		    if(fn&& typeof fn =="function"){
			  this._settings.beforeLoadFn=fn;
			}
		 },
	/*设置加载完成后的回调函数*/	 
	setAfterLoadFn:function(fn){
		    if(fn&& typeof fn =="function"){
			  this._settings.afterLoadFn=fn;
			}
		},	
	/*该函数使frame占满屏幕剩余空间
	   该函数适用在window.top中的frame，否则无效
	 */	 	 	 
	 ajustForWindow:function(){
		   var $frame=this._settings.$frame;
		   var tag=$(window.top).find("iframe").has($frame);
		   if(!tag){
			   return;
			 }
		  // var screenWidth=$(window).width();
		   var screenHeight=$(window).height();
		   var fPosition=$frame.offset();
		 //  var width=screenWidth-fPosition.left;
		   var height=screenHeight-fPosition.top;
		   $frame.css({"width":"100%", "min-height":height});
		 },	
	/*
	  设置iframe适配父元素大小
	*/	 
	 ajustForParent:function(){
		  var $frame=this._settings.$frame;
		  $frame.css({"width":"100%","height":"100%"});
		 },	 
	/*
	  设置url，iframe进行加载
	*/	 
	 loadPageByUrl:function(url){
		  var settings=this._settings;
		  var $frame=this._settings.$frame;
		  if(settings.beforeLoadFn){
		    settings.beforeLoadFn();
		  }
		  $frame.css({"opacity":"0"}).attr("src",url);
		 },
	/*
	  加载完成后执行的回调函数
	*/	 
	 loadedPage:function(){
		  var settings=this._settings;
		  var $frame=this._settings.$frame;
		  if(settings.afterLoadFn){
		    settings.afterLoadFn();
		  }
		  $frame.css({"opacity":"1"});
		 },	
	 /*
	   更新$frame的宽度和高度
	 */
	 updateSize:function(width,height){
		   var $frame=this._settings.$frame;
		   $frame.css({"width":width,"height":height});
		 },
	/*
	   更新最小高度
	*/	 
	updateMinHeight:function(height){
		  var $frame=this._settings.$frame;
		  $frame.css({"min-height":height});
		},	 	 
	/*
	   获取frame
	*/	 
	get$frame:function(){
		  return this._settings.$frame;
		}	  	 
};


{ /*左右拉动框架*/

function _windowUnselect(event){
   event.stopDefault();
   event.stopPropgation();
}
function _spinnerBind(self){
  var settings=self._settings;
  var $spinnerContainer=settings.$spinnerContainer;
  var $frameContainer=settings.$frameContainer;
  var width;
  var sx;
  var sy;
  var $mask;
   function selectStart(){
	   return false;
	 } 
    function mousemoveFN(event){
	  var ex=event.pageX;
	  var ey=event.pageY;
	  $spinnerContainer.width(ex-sx+width);
	  $frameContainer.css("margin-left",ex-sx+width);
	 }
  function mouseupFN(){
	   window.setTimeout(function(){
		                         $(document).unbind("mouseup mousemove selectstart");//.unbind("selectstart");
                                 $mask.remove();
                                 $mask=null;
								 },0);
	  }	
  $spinnerContainer.delegate(".spinnerMover","mousedown",function(event){
	                              width=$spinnerContainer.width();
								  sx=event.pageX;
								  sy=event.pageY;
                                  $mask=$("<div></div>").css({"position":"absolute","left":0,"right":0,"top":0,"bottom":0,"cursor":"pointer"}).appendTo($(window.top.document.body));
                                  $(document).css({"-moz-user-select":"none"})
                                  .bind("selectstart",selectStart)
                                  .bind("mousemove",mousemoveFN)
                                  .bind("mouseup",mouseupFN);	
								 });  
  return function(){
         if($mask){
           $mask.remove();
           $mask=null;
         }
	     settings=null;
		 $spinnerContainer=null;
		 $frameContainer=null;
	  };	  
}

function SpinnerFrame($spinnerContainer,$frameContainer,minHeight){
      this._settings={
		    "$spinnerContainer":$spinnerContainer,//移动容器
			"$frameContainer":$frameContainer,//框架容器
			"minHeight":minHeight,//最小高度
			"unBindSpinner":null//清除bind事件过程中的内存，一般适用于清除该对象
		  };
}
SpinnerFrame.prototype={
	/*
	  初始化
	*/
	 init:function(){
		 var settings=this._settings;
		  settings.$spinnerMover=$("<div></div>").addClass("spinnerMover").appendTo(settings.$spinnerContainer);
		  if(settings.minHeight){
		     settings.$spinnerContainer.css({"min-height":height});
		     settings.$frameContainer.css({"min-height":height});
		  }
		  //settings.unBindSpinner=
		  _spinnerBind(this);
		  settings.isInit=true;
		 },
	/*
	  设置最小高度
	*/	 
	setMinHeight:function(height){
		 var settings=this._settings;
		 settings.minHeight=height;
		 if(!settings.isInit){
		   return;
		 }
		 settings.$spinnerContainer.css({"min-height":height});
		 settings.$frameContainer.css({"min-height":height});
		}	 	
	}
}


/*创建widget容器*/
{   
      /*
        $container:widget组件的容器，
        columns：列的个数
        data:[{name:,class:, },]
      */
      function PortalWidget($container,columns,data){
        this._settings={
           $container:$container,
           columns:columns,
           data:data,
           isInit:false
           };
      };
      /*
        创建所需的列
      */
      function _createColumn($container,count){
        var width=(100/count).toFixed(2)+"%";
        for(var i=0;i<count;i++){
          $("<div></div>").addClass("widgetColumn").appendTo($container).css("width",width);
        }
      }
      /*
       将数据添加到列中
      */
      function _addItems(data,$container){
       var $columns=$container.find(".widgetColumn");
       var count=data.length;
       var $currentColumn;
       var currentItems;
       var currentItem;
       var $item;
       var $title;
       var $titleInner;
       var $content;
       for(var i=0;i<count;i++){
         $currentColumn=$columns.eq(i);
         currentItems=data[i];
         if(!currentItems){return;}
         var length=currentItems.length;
         for(var j=0;j<length;j++){
           currentItem=currentItems[j];
           $item=$("<div></div>").addClass("columnItem "+currentItem.class).appendTo($currentColumn);
           $title=$("<div></div>").addClass("itemTitle").appendTo($item);
           $titleInner=$("<h3></h3>").addClass("titleText").text(currentItem.name).appendTo($title);
           $content=$("<div></div>").addClass("itemContent").appendTo($item);
         }
       }

      }
      PortalWidget.prototype={
        init:function(){
           var settings=this._settings;
           var count=settings.columns;
           var $container=settings.$container;
           var array=settings.data;
           _createColumn($container,count);
           _addItems(array,$container);
           settings.isInit=true;
        },
        deleteItems:function(){
          var settings=this._settings;
          settings.$container.find("widgetColumn").each(function(index,element){
            $(element).child().remove();
           });
        },
        setData:function(data){
          var settings=this._settings;
          settings.data=data;
          if(!settings.isInit){return;}
          this.deleteItems();
          _addItems(data,settings.$container);
        }
      };
}