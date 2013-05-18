<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>首页</title>

<link href="/public/assets/dwz/themes/default/style.css" rel="stylesheet" type="text/css" />
<link href="/public/assets/dwz/themes/css/core.css" rel="stylesheet" type="text/css" />
<link href="/public/assets/dwz/themes/css/core-extend.css" rel="stylesheet" type="text/css" />
<link href="/public/assets/dwz/uploadify/css/uploadify.css" rel="stylesheet" type="text/css" />
<script src="/public/assets/dwz/speedup.js" type="text/javascript"></script>
<script src="/public/assets/dwz/jquery-1.4.4.js" type="text/javascript"></script>
<script src="/public/assets/dwz/jquery.cookie.js" type="text/javascript"></script>
<script src="/public/assets/dwz/jquery.validate.js" type="text/javascript"></script>
<script src="/public/assets/dwz/jquery.bgiframe.js" type="text/javascript"></script>
<script src="/public/assets/dwz/xheditor/xheditor-1.1.6-zh-cn.min.js" type="text/javascript"></script>
<script src="/public/assets/dwz/uploadify/scripts/swfobject.js" type="text/javascript"></script>
<script src="/public/assets/dwz/uploadify/scripts/jquery.uploadify.v2.1.0.js" type="text/javascript"></script>

<script src="/public/assets/dwz/dwz.core.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.util.date.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.validate.method.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.regional.zh.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.barDrag.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.drag.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.tree.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.accordion.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.ui.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.theme.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.switchEnv.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.alertMsg.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.contextmenu.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.navTab.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.tab.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.resize.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.jDialog.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.dialogDrag.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.cssTable.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.stable.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.taskBar.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.ajax.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.pagination.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.database.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.datepicker.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.effects.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.panel.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.checkbox.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.history.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.combox.js" type="text/javascript"></script>
<script src="/public/assets/dwz/dwz.regional.zh.js" type="text/javascript"></script>
<script src="/public/assets/dwz/jquery.jstree.js" type="text/javascript"></script>
<script src="/public/assets/dwz/treeview.js" type="text/javascript"></script>

<script type="text/javascript">
$(function(){
	DWZ.init("/public/assets/dwz/dwz.frag.xml", {
		loginUrl:"login",	// 跳到登录页面
		debug:false,	// 调试模式 【true|false】
                statusCode:{ok:200, error:300, timeout:301}, //【可选】
		pageInfo:{pageNum:"pageNum", numPerPage:"numPerPage", orderField:"orderField", orderDirection:"orderDirection"}, //【可选】
		callback:function(){
			initEnv();
			$("#themeList").theme({themeBase:"themes"});
		}
	});
        //$(".pageContent").dragsort({ itemSelector: ".panel" , dragSelector: "h1", dragBetween: true , placeHolderTemplate: "<li class='placeHolder'><div></div></li>" });
});

</script>
</head>

<body scroll="no">
	<div id="layout">
		<div id="header">
			<div class="headerNav">
				<a class="logo" href="javascript:void(0)">标志</a>

				<ul class="nav">
					<li id="switchEnvBox"><a href="javascript:">（<span>北京</span>）切换角色</a>
						<ul>
							<li><a href="sidebar_1.html">北京</a></li>
							<li><a href="sidebar_2.html">上海</a></li>
							<li><a href="sidebar_2.html">南京</a></li>

							<li><a href="sidebar_2.html">深圳</a></li>
							<li><a href="sidebar_2.html">广州</a></li>
							<li><a href="sidebar_2.html">天津</a></li>
							<li><a href="sidebar_2.html">杭州</a></li>
						</ul>
					</li>
					<li><a href="changepwd.html" target="dialog">设置</a></li>

					<!--<li><a href="javascript:void(0)">反馈</a></li>-->
					<li><a href="http://bbs.dwzjs.com" target="_blank">论坛</a></li>
					<li><a href="login.html">退出</a></li>
				</ul>
				<ul class="themeList" id="themeList">
					<li theme="default"><div class="selected">蓝色</div></li>
					<li theme="green"><div>绿色</div></li>

					<!--<li theme="red"><div>红色</div></li>-->
					<li theme="purple"><div>紫色</div></li>
					<li theme="silver"><div>银色</div></li>
				</ul>
			</div>
		</div>

		<div id="leftside">

			<div id="sidebar_s">
				<div class="collapse">
					<div class="toggleCollapse"><div></div></div>
				</div>
			</div>
			<div id="sidebar">
				<div class="toggleCollapse"><h2>主菜单</h2><div>收缩</div></div>
                                
				<div class="accordion" fillSpace="sidebar">
                                    <?=$template?>
				</div>
			</div>
		</div>
		<div id="container">
			<div id="navTab" class="tabsPage">
				<div class="tabsPageHeader">

					<div class="tabsPageHeaderContent"><!-- 显示左右控制时添加 class="tabsPageHeaderMargin" -->
						<ul class="navTab-tab">
							<li tabid="main" class="main"><a href="javascript:void(0)"><span><span class="home_icon">首页</span></span></a></li>
						</ul>
					</div>
					<div class="tabsLeft">left</div><!-- 禁用只需要添加一个样式 class="tabsLeft tabsLeftDisabled" -->
					<div class="tabsRight">right</div><!-- 禁用只需要添加一个样式 class="tabsRight tabsRightDisabled" -->

					<div class="tabsMore">more</div>
				</div>
				<ul class="tabsMoreList">
					<li><a href="javascript:void(0)">首页</a></li>
				</ul>
				<div class="navTab-panel tabsPageContent">
                                    <div class="page">
                                        <div class="pageContent" layoutH="42" >
                                            <div style="float:left; display:block; overflow:hidden; width:50%;">
                                                <div class="panel collapse" defH="200" style="width:97%;float:left;margin:10px;">
                                                        <h1>新闻公告</h1>
                                                        <div id="news-widget">
                                                            <ul id="news-widget-list">
                                                                <li><a href="#">关于聘用医生军训的通知<span class="post-time">(5-12)</span></a></li>
                                                                <li><a href="#">关于4月份医疗质量检查通报及医院感染监测通报<span class="post-time">(5-11)</span></a></li>
                                                                <li><a href="#">关于野战医疗所训练安排的通知<span class="post-time">(5-10)</span></a></li>
                                                                <li><a href="#">关于明早交班的通知<span class="post-time">(5-09)</span></a></li>
                                                                <li><a href="#">关于野战医疗所召开动员会的通知<span class="post-time">(5-08)</span></a></li>
                                                                <li><a href="#">关于办理2009年度医疗卡的通知书<span class="post-time">(5-07)</span></a></li>
                                                                <li><a href="#">领取软姓名牌通知<span class="post-time">(5-06)</span></a></li>
                                                                <li><a href="#">关于喜迎建国六十周年征文活动通知<span class="post-time">(5-05)</span></a></li>
                                                            </ul>
                                                            <div id="tnt_pagination">
                                                                <span class="disabled_tnt_pagination">Prev</span><a href="#1">1</a><a href="#2">2</a><a href="#3">3</a><span class="active_tnt_link">4</span><a href="#5">5</a><a href="#6">6</a><a href="#7">7</a><a href="#8">8</a><a href="#9">9</a><a href="#10">10</a><a href="#forwaed">Next</a>
                                                            </div>
                                                        </div>
                                                </div>
                                                <div class="panel collapse" defH="200" style="width:97%;float:left;margin:10px;">
                                                        <h1>参阅通知</h1>
                                                        <div>内容</div>
                                                </div>
                                                <div class="panel collapse" defH="200" style="width:97%;float:left;margin:10px;">
                                                        <h1>我的邮件</h1>
                                                        <div>内容</div>
                                                </div>
                                            </div>
                                            <div style="float:left; display:block; overflow:hidden; width:50%;">
                                                <div class="panel collapse" defH="200" style="width:97%;float:left;margin:10px;">
                                                        <h1>待办流程</h1>
                                                        <div>内容</div>
                                                </div>
                                                <div class="panel collapse" defH="200" style="width:97%;float:left;margin:10px;">
                                                        <h1>计划日程</h1>
                                                        <div>内容</div>
                                                </div>
                                                <div class="panel collapse" defH="200" style="width:97%;float:left;margin:10px;">
                                                        <h1>任务待办</h1>
                                                        <div>内容</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
				</div>
			</div>
		</div>

		<div id="taskbar" style="left:0px; display:none;">
			<div class="taskbarContent">
				<ul></ul>
			</div>
			<div class="taskbarLeft taskbarLeftDisabled" style="display:none;">taskbarLeft</div>
			<div class="taskbarRight" style="display:none;">taskbarRight</div>

		</div>
		<div id="splitBar"></div>
		<div id="splitBarProxy"></div>
	</div>

	<div id="footer">Copyright &copy; 2011 <a href="http://tunps.com" target="dialog">tunpishuang</a></div>

<!--拖动效果-->

	<div class="resizable"></div>
<!--阴影-->
	<div class="shadow" style="width:508px; top:148px; left:296px;">
		<div class="shadow_h">
			<div class="shadow_h_l"></div>
			<div class="shadow_h_r"></div>
			<div class="shadow_h_c"></div>
		</div>
		<div class="shadow_c">

			<div class="shadow_c_l" style="height:296px;"></div>
			<div class="shadow_c_r" style="height:296px;"></div>
			<div class="shadow_c_c" style="height:296px;"></div>
		</div>
		<div class="shadow_f">
			<div class="shadow_f_l"></div>
			<div class="shadow_f_r"></div>
			<div class="shadow_f_c"></div>
		</div>

	</div>
	<!--遮盖屏幕-->
	<div id="alertBackground" class="alertBackground"></div>
	<div id="dialogBackground" class="dialogBackground"></div>

	<div id='background' class='background'></div>
	<div id='progressBar' class='progressBar'>数据加载中，请稍等...</div>
</body>
</html>