
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!--框架必需start-->
<script type="text/javascript" src="/public/assets/js/jquery-1.4.js"></script>
<script type="text/javascript" src="/public/assets/js/framework.js"></script>
<link href="/public/assets/css/import_basic.css" rel="stylesheet" type="text/css"/>
<link  rel="stylesheet" type="text/css" id="skin" prePath="/public/assets/" />
<!--框架必需end-->
<script type="text/javascript" src="/public/assets/js/tree/dtree/dtree.js"></script>
<link href="/public/assets/js/tree/dtree/dtree.css" rel="stylesheet" type="text/css"/>
<script>
	//打开内页时出现进度条
	$(function(){
		$(".dTreeNode a[target*=frmright]").click(function(){
			showProgressBar();
		})
	})
</script>
</head>
<script>
	//打开内页时出现进度条
	$(function(){
		$(".dTreeNode a[target*=frmright]").click(function(){
			showProgressBar();
		})
	})
</script>
</head>
<body leftFrame="true">
	<div style="text-align:center;" >
	<br />
	<a href="javascript: d.openAll();">展开所有</a> | <a href="javascript: d.closeAll();">关闭所有</a>
	</div>
	<div id="scrollContent">
	<script type="text/javascript">
		<!--
        var d = new dTree('d');d.add(0,-1,'操作目录');
        
        <?php  echo $template?>
        	 
	 
		
		document.write(d);

		//-->
	</script>
</div>

</body>

</html>