<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<script type="text/javascript" src="/public/assets/js/jquery-1.4.js"></script>
<script type="text/javascript" src="/public/assets/js/framework.js"></script>
<link href="/public/assets/css/import_basic.css" rel="stylesheet" type="text/css"/>
<link  rel="stylesheet" type="text/css" id="skin" prePath="/public/assets/"/>
<script type="text/javascript" src="/public/assets/js/nav/tab.js"></script>
<script>
function tabAddHandler(mid,mtitle,murl){
		tab.add( {
		id :mid,
		title :mtitle,
		url :murl,
		isClosed :true
	});
	tab.activate(mid)
}
 var tab;	
$( function() {
	 tab = new TabView( {
		containerId :'tab_menu',
		pageid :'page',
		cid :'tab1',
		position :"top"
	});
	tab.add( {
		id :'tab1_index1',
		title :"快捷导航",
		url :"index.php?&c=index&m=shortcut",
		isClosed :false
	});
});
</script>
<body>
<div id="tab_menu"></div>
<div id="scrollContent" childScrollContent="true">
	<div id="page" style="width:100%;height:100%;"></div>
</div>				
</body>
</html>