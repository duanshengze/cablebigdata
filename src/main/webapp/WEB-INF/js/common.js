//根据ID获取对象
function id(v) { return document.getElementById(v); }
 
//根据标记获取对象
function tag(element, t) { return element.getElementsByTagName(t); }

//获取对象所有属性
function showattrs(src,id){
	var ob =eval(src);
	var property="";
	for(var i in ob) {
		property = property + "属性"+i+"<br/>";
	}
	document.getElementById(id).innerHTML=property;
}