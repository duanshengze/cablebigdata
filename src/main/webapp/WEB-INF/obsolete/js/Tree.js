var UCD = UCD || {Core:jQuery};
(function(ucd, $){
	ucd.Tree = function(container, data, onCreateItem){
		var settings = this._settings = $.extend({
			container:document.body,
			data:null,
			onCreateItem:null,
			//events:{},
			bindEvents:{},
			items:{},//存储节点对象item信息
			levelCounter:[],//纪录每个层级的counter
			selection:[],//存储选中的节点
			mode:null
		},{
			container:container,
			data:data,
			onCreateItem:onCreateItem
		});
		init(this);
	}

	ucd.Tree.prototype = {
		constructor: ucd.Tree,
		//默认为单选树radio
		//还有复选树checkbox、三态树triStatus
		setMode:function(type){
			var settings = this._settings;
			var oldMode = settings.mode;
			if( type != "checkbox" && type != "triStatus" ){
				type = "radio";
			}
			if( oldMode !== null && oldMode === type ){
				return;
			}
			for(var i in settings.bindEvents){
				tree.unbind(i);
			}
			settings.mode = type;
			this.setData(settings.data);
			settings.$dom.removeClass("radioTree checkboxTree triStatusTree").addClass(type+"Tree");
			this.bind("click",function(e,tree,level,index,$node,data){
				var $target = $(e.target);
				if($target.is(".treeBranchIco")){
					var flag = !$node.is(".collapsed");
					tree.collapse(level,index,flag);
				}
			});
			this.bind("click",function(e,tree,level,index,$node,data){
				var $target = $(e.target);
				if(!$target.is(".treeBranchIco") && !$target.closest(".treeNodeToolbar")[0]){
					$node = $node.children(".treeNode");
					var flag = $node.is(".selected");
					if(flag){
						this.removeSelection(level,index);
					} else {
						var selection = tree.getSelection();
						//单选树
						if(tree._settings.mode == "radio"){
							if(selection && (selection[0].level != level || selection[0].index != index) ){
								this.removeSelection(selection[0].level,selection[0].index);
							}
						}
						this.setSelection(level,index);
					}
				}
			});
			selected(this,settings.data);
		},
		getSelection: function(){
			var selection = this._settings.selection;
			return selection.length == 0 ? null : selection;
		},
		//选中节点
		setSelection:function(level,index,fn){
			setSelection(this,level,index,fn)
		},
		removeSelection:function(level,index,fn){
			removeSelection(this,level,index,fn);
		},
		//展开、折叠节点
		collapse:function(level,index,flag){
			var $node = getNode(this,level,index);
			if(!$node || !isParentNode(this,level,index)){
				return;
			}
			$node[flag?"addClass":"removeClass"]("collapsed");
		},
		//给level index对应的节点添加节点
		//若level为0，index为null或undefined，则为根节点树添加节点
		addNode: function(level, index, data, fn){
			var settings = this._settings;
			var $tree = $root = settings.$dom;
			var forRoot = level == 0 && (index === null || index === undefined);//给root树增加节点
			var item = {
				children:[]
			};//节点对象item信息
			//找到子树，未创建则先创建
			var $tree,_level = level;
			if(!forRoot){
				var $parentNode = getNode(this,level,index);
				if(!$parentNode){
					alert("未找到与 level:"+level+" index:"+index+" 匹配的节点！");
					return null;
				}
				//存储parent信息
				var parentNode = item.parentNode = {
					level:level,
					index:index
				};
				_level = item.level = level+1;
				item.$tree = getParentTree(this,$parentNode);//节点所在树
				$tree = item.$subTree = createTree(this,getRefNode($parentNode));//节点的子树
				
				if($tree.closest(".treeNodeCon").attr("isOpen")){
					$tree.closest(".treeNodeCon").addClass("collapsed")
				}
				
			} else {
				$tree = item.$tree = settings.$dom;
				level = item.level = 0;
			}
			var $parentNode = getNode(this,level,index);
			item.data = {};
			for(var i in data){
				//不存储子节点数据
				if( i != "items" ){
					item.data[i] =  data[i];
				}
			}
			//将节点相关信息存储到items
			var $nodeCon = item.$node = createNode(this,$tree,data);
			var $node = item.$nodeDom = $find($nodeCon,".treeNode");
			setNode(this,$node,item,data,true);
			var _index = item.index = settings.levelCounter[_level] - 1;
			settings.items["node_"+_level+"_"+_index] = item;
			if(!forRoot){
				//item存储到parentItem中
				var parentItem = getNodeItem(this,parentNode.level,parentNode.index);
				if(!parentItem.children){
					parentItem.children = [];
				}
				var parent = node = {
					level:_level,
					index:_index
				}
				parentItem.children.push(node);
				setAsParentNode(this,level,index);
				if(this._settings.mode == "triStatus"){
					while(parent = this.getParentNode(parent.level,parent.index)){
						setTristatusTreeNodeStyle(this,parent.level,parent.index);
					}
				}
			}
			if(!$.isFunction(fn)){
				fn = settings.onCreateItem;
			}
			_callback(fn,this,[this,_level,_index,$nodeCon,data]);
			return item;
		},
		//根据data设置节点
		//只设置节点，不会更改其子节点。即忽略掉data中的items对象
		setNode: function(level, index, data, fn){
			var $node = getNode(this,level,index);
			if(!$node){
				return;
			}
			var item = getNodeItem(this,level,index);
			setNode(this,item.$nodeDom,item,data);
			_callback(fn,this,[this,$node,item.data]);
		},
		getParentNode:function(level,index){
			var $node = getNode(this,level,index);
			if(!$node){
				return null;
			} else {
				var item = getNodeItem(this,level,index);
				return item && item.parentNode;
			}
		},
		getChildrenNodes:function(level,index){
			var $node = getNode(this,level,index);
			if(!$node){
				return null;
			} else {
				var item = getNodeItem(this,level,index);
				return !item ? null : (item.children.length==0?null:item.children);
			}
		},
		//重新加载数据，生成树。一般是用于支撑查询功能。
		//不做组件内的客户端查询能力
		setData: function(data){
			var settings = this._settings;
			if($.type(data)=="array"){
				reset(this);
				settings.data = data;
				var level = 0,index = null;
				var _createNode = function(tree,level,index,data,fn){
					for(var i = 0; i < data.length; i++){
						var _each = data[i];
						var item = tree.addNode(level,index,_each,fn);
						if($.isArray(_each.items)){
							arguments.callee(tree,index==null?0:level+1,item.index,_each.items,fn);
						}
					}
				}
				_createNode(this,level,index,data,settings.onCreateItem);
			}
		},
		// fn(e,tree,level, index, $node, itemData)
		// 用委托的方式实现该方法，否则无意义。因为在onCreateItem中也可以达成bind的各种绑定。
		bind: function(type, fn){
			if(!$.isFunction(fn) && $.type(type) != "string"){
				return;
			}
			var self = this;
			var settings = this._settings;
			var bindEvents = settings.bindEvents;
			//找出对应type事件的勾子
			var evt = bindEvents[type];
			//没绑定过事件，则先绑定
			if(!evt){
				//返回false时，停止执行之后绑定的事件
				//同一事件不允许多次绑定
				evt = bindEvents[type] = {
					length:0,//记录已帮回调数量
					handler:$.Callbacks("unique stopOnFalse")
				};
				settings.$dom.delegate(".treeNode",type,{evt:evt},function(e){
					var $target = $(e.target);
					var $node = getRefNode($target);
					if($node && $node[0]){
						var level = getLevel(self,$target);
						var index = $node.attr("data-index") - 0;
						var item = getNodeItem(self,level,index);
						var data = item ? item.data : null;
						
						evt.handler.fireWith(self,[e,self,level,index,$node,data]);
					}
				});
			}
			if(!evt.handler.has(fn)){
				evt.length++;
				evt.handler.add(fn);
			}
		},
		unbind: function(type,fn){
			if($.type(type) != "string" || (fn && !$.isFunction(fn))){
				return;
			}
			var settings = this._settings;
			var bindEvents = settings.bindEvents;
			//找出对应type事件的勾子
			var evt = bindEvents[type];
			//未绑定过type对应的事件
			if(!evt){
				return;
			}
			//传入了fn参数
			if(fn){
				//清空对应的回调，并将计数器-1
				if(evt.handler.has(fn)){
					evt.handler.remove(fn);
					evt.length--;
				}
			} else {
				evt.handler.empty();//清空所有回调
				evt.length = 0;
			}
			//当回调个数为0时，解绑事件
			if( evt.length == 0 ){
				delete bindEvents[type];
				this._settings.$dom.undelegate(".treeNode",type);
			}
		},
		removeNode: function(level, index){
			$node = getNode(this,level,index);
			if($node){
				//考虑到遍历大数据时性能，暂不开放
				/*//删除子节点及子节点信息
				var items = this._settings.items;
				for(var i in items){
					var each = items[i];
					var $subNode = $find($node,each.$node);
					if($subNode[0]){
						delete items[i];
					}
				}
				//删除自身节点及自身节点信息
				delete items["node_"+level+"_"+index];*/
				var parent = _parent = this.getParentNode(level,index)
				$node.remove();
				if(this._settings.mode == "triStatus"){
					while(_parent){
						setTristatusTreeNodeStyle(this,_parent.level,_parent.index);
						_parent = this.getParentNode(_parent.level,_parent.index)
					}
				}
				//在parentItem中删除item
				if(parent){
					var children = this.getChildrenNodes(parent.level,parent.index);
					var parentItem = getNodeItem(this,parent.level,parent.index);
					var len = children.length;
					for(var i = 0; i < len; i++){
						var each = children[i];
						if( each.level === level && each.index === index ){
							var p1 = children.slice(0,i);
							var p2 = children.slice(i-(len-1));
							var newChildren = p1.concat(p2);
							parentItem.children = newChildren.length == 0 ? null : newChildren;
							break;
						}
					}
				}
			}
		},
		resize: function(fn){
			return _callback(fn,this);
		}
	}
	
	/********************平台公用函数************************/
	//按id取元素
	function $id(id){
		return $("#"+id);
	}
	//按标签名取
	function $tagName(ele,tagName){
		if(ele instanceof $){
			ele = ele[0];
		}
		if(!tagName){
			tagName = "*";
		}
		if(!ele) return $();
		return $(ele.getElementsByTagName(tagName));
	}
	//取所有子元素
	function $children(ele){
		return $tagName(ele);
	}
	//替换jq find方法，解决IE7下效率问题
	function $find(context,selector){
		if(context instanceof $){
			context = context[0];
		}
		if(!context){
			return $();
		}
		var $child = $children(context);
		return $child.filter(selector);
	}
	
	//执行一个回调
	function _callback(fn,context,args){
		if(typeof fn == "function"){
			if($.type(args) != "array"){
				return fn.call(context,args);
			}
			var aLen = args.length,a1 = args[0],a2 = args[1],a3 = args[2];
			switch(aLen){
				case 1:
					return fn.call(context,a1);
					break;
				case 2:
					return fn.call(context,a1,a2);
					break;
				case 3:
					return fn.call(context,a1,a2,a3);
					break;
				default:
					return fn.apply(context,args);
					break;
			}
		}
	}
	/********************平台公用函数结束************************/
	//处理默认选中
	function selected(self,data){
		var level = 0;
		var childrenNode = function(dataNode,level){
			for(var j=0;j<dataNode.length;j++){
				if(dataNode[j].selected){
					self.setSelection(level,j);	
				}
				if(dataNode[j].items && dataNode[j].items.length > 0){
					childrenNode(dataNode[j].items,level+1);
				}
			}
		}
		for(var i=0;i<data.length;i++){
			if(data[i].selected){
				self.setSelection(0,i);	
			}
			if(data[i].items && data[i].items.length > 0){
				childrenNode(data[i].items,level+1);
			}
		}	
	}
	//创建一棵树
	function createTree(tree,$container){
		if($container[0] == tree._settings.$container[0]){
			return $('<ul class="treeCon tree treeLevel0" data-level="0"/>').appendTo($container);
		}
		var $tree = getSubTree(tree,$container);
		if(!$tree){
			var level = getLevel(tree,$container)+1;
			$tree = $('<ul class="treeCon treeLevel'+level+'" data-level="'+level+'"/>').appendTo($container);
		}
		return $tree;
	}
	//添加节点 li DOM
	function createNode(tree,$tree,data){
		var level = getLevel(tree,$tree);
		var counter = tree._settings.levelCounter[level];
		if(!counter){
			counter = tree._settings.levelCounter[level] = 0;
		}
		counter = tree._settings.levelCounter[level] = ++counter;
		var li = $("<li class='treeNodeCon' data-index="+(counter-1)+"><div class='treeNode'></div></li>").appendTo($tree);
		if(data.isOpen == false){
			li.attr("isOpen",data.isOpen);
		}
		return li;
	}
	//设置node html
	function setNode(tree,$nodeDom,item,data,newNode){
		var settings = tree._settings;
		//添加节点
		if(newNode){
			item.$toolbar = $('<div class="treeNodeToolbar"/>').appendTo($nodeDom);
			item.$label = $('<div class="treeNodeLabel"/>').appendTo($nodeDom);
			if( settings.mode != "radio" ){
				item.$check = $('<div class="treeNodeStatus"/>').insertBefore(item.$label);
			}
			if(typeof data.icoTheme == "string"){
				item.$ico = $('<div class="treeNodeIco"></div>').insertBefore(item.$label);
			}
		}
		//设置工具条
		if($.isArray(data.tools)){
			var tools = item.data.tools = data.tools;
			for( var i = 0; i < tools.length; i++ ){
				$('<span class="treeNodeToolbarIco '+tools[i].theme+'" title="'+tools[i].title+'"></span>').appendTo(item.$toolbar);
			}
		}
		
		//设置label
		if(typeof data.label == "string"){
			item.data.label = data.label;
			item.$label.text(data.label).attr("title",data.label);
		}
		
		if(typeof data.icoTheme == "string"){
			item.data.icoTheme = data.icoTheme;
			item.$ico.addClass(data.icoTheme);
		}
	}
	//设置三态树节点样式
	function setTristatusTreeNodeStyle(tree,level,index){
		var $node = getNode(tree,level,index);
		var $dom = $node.children(".treeNode");
		var $subTree = getSubTree(tree,$node);
		if(!$subTree){
			return;
		}
		var $children = $find($subTree,".treeNode");
		var total = $children.length;
		var selectedLength = $children.filter(".selected").length;
		//所有子孙节点都处于选中状态
		if(selectedLength == total){
			$dom.removeClass("halfSelected").addClass("selected");
		}
		//全未选中
		else if( selectedLength == 0 ){
			$dom.removeClass("halfSelected selected");
		}
		//半选
		else {
			$dom.removeClass("selected").addClass("halfSelected");
		}
	}
	//将node设置/取消父节点
	function setAsParentNode(tree,level,index){
		var nodeItem = getNodeItem(tree,level,index);
		var flag = tree.getChildrenNodes(level,index);
		if(!flag && nodeItem.$branch){
			//移除branch节点
			nodeItem.$branch = null;
			nodeItem.$branch.remove();
		} else if(flag){
			//创建过branch则不处理
			if(nodeItem.$branch){
				return;
			}
			nodeItem.$branch = $("<div class='treeBranchIco'/>").prependTo(nodeItem.$nodeDom);
		}
	}
	//从items里取出节点item信息
	function getNodeItem(tree,level,index){
		return tree._settings.items["node_"+level+"_"+index];
	}
	//取树层级
	function getLevel(tree,$dom){
		var $tree = getParentTree(tree,$dom);
		return $tree.attr("data-level")-0;
	}
	//获取节点DOM
	function getNode(tree,level,index){
		var $root = tree._settings.$dom;
		if(!$root){
			return null;
		}
		var $tree = level == 0 ? $root : $find($root,".treeCon[data-level='"+level+"']");//找到对应层级所有树节点
		var $node = $tree.children("[data-index="+index+"]");
		return $node[0] ? $node : null;
	}
	//获取DOM节点相关联的树节点
	function getRefNode($target){
		var $node = $target.closest(".treeNodeCon");
		return $node[0]?$node:null;
	}
	//获取节点的子树节点，$node传入 tree.$dom 则返回树根节点
	function getSubTree(tree,$node){
		var $root = tree._settings.$dom;
		if( $root && $node[0] == $root[0] ){
			return $root;
		}
		var $tree = getRefNode($node).children(".treeCon");
		return !$tree[0]?null:$tree;
	}
	//取节点所在的树
	function getParentTree(tree,$node){
		return $node.closest(".treeCon");
	}
	//节点是否处于折叠状态
	function isNodeCollapsed($node){
		return $node.is(".collapsed");
	}
	//是否是父节点
	function isParentNode(tree,level,index){
		var $subNode = tree.getChildrenNodes(level,index);
		return $subNode?true:false;
	}
	
	//选中节点
	//recursion是否是setSelection递归执行的
	function setSelection(tree,level,index,fn,recursion){
		var $node = getNode(tree,level,index);
		if($node && $node[0]){
			var callee = arguments.callee;
			var triStatus = tree._settings.mode == "triStatus";
			$node = $node.children(".treeNode");
			if($node.is(".selected")){
				return;
			}
			$node.addClass("selected");
			var node = {
				level:level,
				index:index
			};
			tree._settings.selection.push(node);
			//三态树处理父子节点
			if(triStatus){
				$node.removeClass("halfSelected");
				var parent = node;
				//处理子节点
				var setChildrenNode = function(tree,node){
					var children = tree.getChildrenNodes(node.level,node.index);
					if(children){
						var len = children.length;
						for(var i = 0; i < len; i++){
							var each = children[i];
							callee(tree,each.level,each.index,null,true);
							arguments.callee(tree,each);
						}
					}
				}
				setChildrenNode(tree,node);
			}
			//处理父节点
			if(!recursion && triStatus){
				while(parent = tree.getParentNode(parent.level,parent.index)){
					setTristatusTreeNodeStyle(tree,parent.level,parent.index);
				}
				_callback(fn,tree,[tree,level,index,$node,getNodeItem(tree,level,index).data]);
			} else {
				_callback(fn,tree,[tree,level,index,$node,getNodeItem(tree,level,index).data]);
			}
		}
	}
	//去选中节点
	//recursion是否是setSelection递归执行的
	function removeSelection(tree,level,index,fn,recursion){
		var $node = getNode(tree,level,index);
		if($node && $node.children(".treeNode.selected")[0]){
			$node.children(".treeNode").removeClass("halfSelected selected");
			var callee = arguments.callee;
			var selection = tree.getSelection();
			var triStatus = tree._settings.mode == "triStatus";
			var len = selection.length;
			for(var i = 0; i < len; i++){
				var each = selection[i];
				if( each.level === level && each.index === index ){
					var p1 = selection.slice(0,i);
					var p2 = len == 1 ? [] : selection.slice(i-(len-1));
					selection = p1.concat(p2);
					break;
				}
			}
			//三态树处理父子节点
			if(triStatus){
				var node = {
					level:level,
					index:index
				}
				var parent = node;
				//处理子节点
				var setChildrenNode = function(tree,node){
					var children = tree.getChildrenNodes(node.level,node.index);
					if(children){
						var len = children.length;
						for(var i = 0; i < len; i++){
							var each = children[i];
							callee(tree,each.level,each.index,null,true);
							arguments.callee(tree,each);
						}
					}
				}
				setChildrenNode(tree,node);
			}
			tree._settings.selection = selection;
			//处理父节点
			if(!recursion && triStatus){
				while(parent = tree.getParentNode(parent.level,parent.index)){
					setTristatusTreeNodeStyle(tree,parent.level,parent.index);
				}
				_callback(fn,tree,[tree,level,index,$node,getNodeItem(tree,level,index).data]);
			} else {
				_callback(fn,tree,[tree,level,index,$node,getNodeItem(tree,level,index).data]);
			}
		}
	}
	
	//重置树
	function reset(tree){
		var settings = tree._settings;
		settings.$dom.empty();
		settings.items = {};
		settings.levelCounter = [];
		settings.selection = [];
	}
	
	var init = function(ins){
		var settings = ins._settings;
		var $container = settings.$container = $(settings.container);
		settings.$dom = createTree(ins,$container);
		ins.setMode(settings.mode);
	}
})(UCD,UCD.Core);


