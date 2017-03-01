//src 对象, id 元素id
function showattrs(src,id){
	var ob =eval(src);
	var property="";
	for(var i in ob) {
		property = property + "属性"+i+"<br/>";
	}
	document.getElementById(id).innerHTML=property;
}