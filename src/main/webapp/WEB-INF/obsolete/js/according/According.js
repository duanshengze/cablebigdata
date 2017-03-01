var UCD = UCD || {Core:jQuery};

(function(ucd,$){
	var _M = "According";
	var $doc = $(document);
	var COUNT = 0;
	
	var M = ucd[_M] = function(container,data){
		this._settings = $.extend({
			container:document.body,
			//text:"Checkbox",
			//icon:null,
			//disabled:false,
			//onChange:null,
			data:null,
			bindEvents:{},
			selected:null,
			//checked:false,
			items:{},
			group:{}
		},{
			container:container,
			data:data//,
			//text:text,
			//group:group,
			//onChange:onChange
		});
		init(this);
	}
	
	M.ins = {};
	M.init = function(){
		$doc.undelegate(".according","click.collapse").delegate(".according","click.collapse",function(e){
			var target = e.target;
			var $target = $(target);
			var $d = $target.closest(".according");
			var ins = M.ins[$d.attr("data-uuid")];
			var settings = ins._settings;
			//点击折叠按钮
			if($target.is(".cbtn")){
				var $g = $target.closest(".ag");
				if(ins){
					var g = settings.group[$g.attr("data-uuid")];
					g && g.toggle();
				}
			} else {
				var $i = $target.closest(".i");
				if($i.is(":not(.ah)")){
					var iuuid = $i.attr("data-uuid");
					var i = settings.items[iuuid];
					var selected = settings.selected;
					selected && selected.select(false);
					i.select();
				}
			}
			e.stopPropagation();
		});
	}
	
	M.init();
	
	var FN = M.prototype;
	//绑定事件
	FN.bind = function(type,fn,handlerData){
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
				length:0,//记录已绑回调数量
				handler:$.Callbacks("unique stopOnFalse")
			};
			settings.$dom.bind(type,handlerData,function(e){
				if(!self.isDisabled()){
					evt.handler.fireWith(null,[e,self]);
				}
			});
		}
		if(!evt.handler.has(fn)){
			evt.length++;
			evt.handler.add(fn);
		}
	}

	FN.unbind = function(type,fn){
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
			this._settings.$dom.unbind(type);
		}
	}

	FN.trigger = function(type){
		this._settings.$dom.trigger(type,[this,this._settings.$dom,this.isChecked()]);
	}

	FN.enable = function(flag){
		var settings = this._settings;
		var $dom = settings.$dom;
		if( flag !== false ){
			$dom.removeClass("disabled");
			settings.disabled = false;
		} else {
			$dom.addClass("disabled");
			settings.disabled = true;
		}
	}

	FN.isDisabled = function(){
		return this._settings.disabled;
	}

	FN.setData = function(data){
		var len = data.length;
		for( var i = 0; i < len; i++ ){
			var _ = data[i];
			var __ = _.items;
			if( __ && $.isArray(__) && __.length > 0 ){
				new G(_,this);
			} else {
				var _i = new I(_,this);
				_i.appendTo(this._settings.$dom);
			}
		}
	}
	
	//组对象
	function G(data,parent){
		var uuid = createMarker("uag");
		this._root = parent._root;
		this.g = true;
		this.parent = parent;
		this.level = parent.g ? (parent.level+1) : parent.level;
		this.$dom = $("<div class='ag l"+this.level+"' data-uuid='"+uuid+"'/>");
		var h = new I(data,this);
		h.$dom.addClass("ah");
		h.appendTo(this.$dom);
		this.$body = $("<div class='ab l"+(this.level+1)+"'/>").appendTo(this.$dom);
		this.$collapse = $("<div class='cbtn'/>").appendTo(this.$dom);
		this.collapse(data.collapsed);
		this.children(data.items);
		this.$dom.appendTo(parent.g ? parent.$body : parent._settings.$dom);
		this._root._settings.group[uuid] = this;
	}
	
	var G_FN = G.prototype;
	
	G_FN.children = function(data){
		var len = data.length;
		for( var i = 0; i < len; i++ ){
			var _ = data[i];
			var __ = _.items;
			if( __ && $.isArray(__) && __.length > 0 ){
				new G(_,this);
			} else {
				var _i = new I(_,this);
				_i.appendTo(this.$body);
			}
		}
	}
	
	G_FN.collapse = function(flag){
		//折叠
		if( flag !== false ){
			this.collapsed = true;
			this.$dom.addClass("collapsed");
		} else {
			this.collapsed = false;
			this.$dom.removeClass("collapsed");
		}
	}
	
	G_FN.toggle = function(){
		this.collapse(!this.collapsed);
	}
	
	//单个对象
	function I(data,parent){
		this._root = parent._root;
		this.parent = parent;
		this.data = data;
		var mark = createMarker("uai");
		this.$dom = $("<div class='i' data-uuid='"+mark+"'/>");
		this.text(data.title);
		//if(parent.g){
			//this.$dom.addClass("ah");
		//}
		this._root._settings.items[mark] = this;
		if(data.selected){
			this.select();
		}
	}
	
	var I_FN = I.prototype;
	
	I_FN.text = function(text){
		this.$dom.text(text);
	}
	
	I_FN.appendTo = function($con){
		this.$dom.appendTo($con);
	}
	
	I_FN.select = function(flag){
		if( flag !== false ){
			//this.selectd = true;
			this._root._settings.selected = this;
			this.$dom.addClass("selected");
		} else {
			//this.selectd = false;
			this._root._settings.selected = null;
			this.$dom.removeClass("selected");
		}
	}

	function init(ins){
		var settings = ins._settings;
		var $container = settings.$container = $(settings.container).eq(0);
		var mark = createMarker("uac");
		var $dom = settings.$dom = $('<div class="according l0" data-uuid="'+mark+'"></div>');
		ins._root = ins;
		ins.level = 0;
		ins.setData(settings.data);
		$dom.appendTo($container);
		M.ins[mark] = ins;
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
	
	//创建一个唯一标识
	function createMarker(pre){
		return pre+("00000000"+(++COUNT)).substr(-5);
	}

})(UCD,UCD.Core);