var parentTopHeight;
var parentBottomHeight;
var parentTopHeight_left;
var parentBottomHeight_left;
var fixHeight;
var skinName;
var themeColor="blue";
var broswerFlag;
var fontSize=12;
var prePath="../";
var exitVtab=0;
var vtabIdx=0;
var hasIframe=0;
var parentScrollHeight;
$(function(){
	//判断浏览器
	 if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            var bb = window.navigator.userAgent.substring(30, 33);
            if(bb=="6.0"){
				broswerFlag="IE6";
			}
			else if(bb=="7.0"){
				broswerFlag="IE7";
			}
			else if(bb=="8.0"){
				broswerFlag="IE8";
			}
			else if(bb=="9.0"){
				broswerFlag="IE9";
			}
        }
        else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                broswerFlag="Firefox";
            }
        else if (window.navigator.userAgent.indexOf("Opera") >= 0) {
            broswerFlag="Opera";
        }
        else if (window.navigator.userAgent.indexOf("Safari") >= 1) {
           broswerFlag="Safari";
        }
        else {
            broswerFlag="Other";
        }
	//得到子页面相对于skins路径的前缀，默认为../		
	var parentSkinUrl;
	if($("#skin").attr("prePath")!=null){
		prePath=$("#skin").attr("prePath");
		
	}
	
	if(broswerFlag=="IE6"||broswerFlag=="IE7"){
		if($(window.top.document.getElementById("skin")).attr("href")==""){//当子页面单独打开时
			parentSkinUrl="skins/sky/import_skin.css";
		}
		else{
			parentSkinUrl=$(window.top.document.getElementById("skin")).attr("href");
		}
	}
	else{
		if($(window.top.document.getElementById("skin")).attr("href")==null){//当子页面单独打开时
			parentSkinUrl="skins/sky/import_skin.css";
		}
		else{
			parentSkinUrl=$(window.top.document.getElementById("skin")).attr("href");
		}
	}
	//读取父的皮肤设置得到主题色
	if($(window.top.document.getElementById("skin")).attr("themeColor")!=null){
		themeColor=$(window.top.document.getElementById("skin")).attr("themeColor");
	}
	//读取父的皮肤设置更换皮肤
	var parentSkinArr=parentSkinUrl.split('/');
	var skinIdx=getPosition("skins",parentSkinArr)+1;
	skinName=parentSkinArr[skinIdx];
	
	if(broswerFlag=="IE6"||broswerFlag=="IE7"){
		if($(window.top.document.getElementById("skin")).attr("href")==""){//当子页面单独打开时
		}
		else{
			//检测是否正确设置了prePath
			$.ajax({
				url: prePath+"skins/"+skinName+"/import_skin.css",
				error:function(){
					alert("无法通过路径："+prePath+"skins/"+skinName+"/import_skin.css加载CSS，请检查prePath设置的是否正确。详情请参照“使用帮助>>内页结构及注意事项”");
				}
			})
		}
	}
	else{
		if($(window.top.document.getElementById("skin")).attr("href")==null){//当子页面单独打开时
		}
		else{
			//检测是否正确设置了prePath
			$.ajax({
				url: prePath+"skins/"+skinName+"/import_skin.css",
				error:function(){
					alert("无法通过路径："+prePath+"skins/"+skinName+"/import_skin.css加载CSS，请检查prePath设置的是否正确。详情请参照“使用帮助>>内页结构及注意事项”");
				}
			})
		}
	}
	
	$("#skin").attr("href",prePath+"skins/"+skinName+"/import_skin.css");
	
	
	//设置初始时字体大小
	try {
		var font=jQuery.jCookie('fontSize');
		if(font!=false){
			fontSize=parseInt(font);
		}
	}
	catch(e){}
	if(fontSize!=12){
		$("body").css({
			"fontSize":fontSize+"px"
		});
		if ($("table:[class=tableStyle]").length > 0) {
			$("table:[class=tableStyle]").css({
				"fontSize":fontSize+"px"
			});
		}
		if ($("pre").length > 0) {
			$("pre").css({
				"fontSize":fontSize+"px"
			});
		}
	}     
	
	/*盒子模型start*/
	if($(".box2").length>0){
		$(".box2").each(function(){
			var con=$(this).html();
			$(this).html("");
			$("<div class='box2_topcenter'><div class='box2_topleft'><div class='box2_topright'><div class='title'></div>"+
			"<div class='status'><span class='ss'><a></a></span></div><div class='clear'></div></div></div></div>").appendTo($(this));
			$("<div class='box2_middlecenter'><div class='box2_middleleft'><div class='box2_middleright'><div class='boxContent'></div></div></div></div>").appendTo($(this));
			var $bottom1=$("<div class='box2_bottomcenter' id='box2_bottomcenter'><div class='box2_bottomleft'><div class='box2_bottomright'></div></div></div>");
			var $bottom2=$("<div class='box2_bottomcenter2' id='box2_bottomcenter'><div class='box2_bottomleft2'><div class='box2_bottomright2'></div></div></div>");
			
			if($(this).attr("roller")=="false"){
				$bottom1.appendTo($(this));
			}
			else{
				$bottom2.appendTo($(this));
			}
						
			if($(this).attr("panelTitle")!=null){
				$(this).find(".title").append($(this).attr("panelTitle"));
			}
			if($(this).attr("panelWidth")!=null){
				var panelWidth=$(this).attr("panelWidth");
				var lastStr=panelWidth.substr(panelWidth.length-1,1);
				if(lastStr=="%"){
					$(this).width(panelWidth);
				}
				else{
					var trueWidth=Number($(this).attr("panelWidth"));
					$(this).width(trueWidth);
				}
				
			}
			
			if($(this).attr("panelHeight")!=null){
				var useHeight=Number($(this).attr("panelHeight"))-$(this).find(".box2_topcenter").outerHeight()-$(this).find("#box2_bottomcenter").outerHeight();
				$(this).find(".boxContent").height(useHeight);
			}
			$(this).find(".boxContent").html(con);
			if($(this).attr("overflow")!=null){
				$(this).find(".boxContent").css({
					"overflow":$(this).attr("overflow")
				})
			}
			var showSt="true";
			if ($(this).attr("showStatus") != null) {
				showSt=$(this).attr("showStatus");
			}
			var useUrl="#";
			if ($(this).attr("panelUrl") != null) {
				useUrl=$(this).attr("panelUrl");
			}
			var useTarget="_self";
			if ($(this).attr("panelTarget") != null) {
				useTarget=$(this).attr("panelTarget");
			}
			var useStatusText="收缩";
			if ($(this).attr("statusText") != null) {
				useStatusText=$(this).attr("statusText");
			}
			
			var oldHeight;
			if(useStatusText=="收缩"&&showSt=="true"){
				$(this).find(".ss").text(useStatusText);
				$(this).find(".ss").toggle(function(){
					var obj=$(this).parents(".box2").find(".boxContent");
					oldHeight=obj.height();
					if(broswerFlag=="IE6"){
						obj.fadeOut(300,resetHeight);
					}
					else{
						obj.hide(300,resetHeight);
					}
					$(this).text("展开");
				},function(){
					var obj=$(this).parents(".box2").find(".boxContent");
					obj.height(oldHeight);
					if(broswerFlag=="IE6"){
						obj.fadeIn(300,resetHeight);
					}
					else{
						obj.show(300,resetHeight);
					}
					if($(this).parents(".box2").attr("panelHeight")==null){
						setTimeout(function(){
							obj.css({
							"height":"auto"
						});
						},500);
					}
					$(this).text("收缩");
				})
			}
			else if(useStatusText=="展开"&&showSt=="true"){
				$(this).find(".ss").text(useStatusText);
				var obj=$(this).find(".boxContent");
				oldHeight=obj.height();
				obj.hide();
				$(this).find(".ss").toggle(function(){
					var obj=$(this).parents(".box2").find(".boxContent");
					obj.height(oldHeight);
					if(broswerFlag=="IE6"){
						obj.fadeIn(300,resetHeight);
					}
					else{
						obj.show(300,resetHeight);
					}
					if($(this).parents(".box2").attr("panelHeight")==null){
						setTimeout(function(){
							obj.css({
							"height":"auto"
						});
						},500);
					}
					$(this).text("收缩");
				},function(){
					if(broswerFlag=="IE6"){
						obj.fadeOut(300,resetHeight);
					}
					else{
						obj.hide(300,resetHeight);
					}
					$(this).text("展开");
				
					
				})
			}
			else if(showSt=="true"||$(this).attr("statusText") != null){
				$(this).find(".ss").find("a").attr("href",useUrl);
				$(this).find(".ss").find("a").attr("target",useTarget);
				$(this).find(".ss").find("a").text(useStatusText);
			}
			else{
				$(this).find(".ss").hide();
			}
		})
	}
	/*盒子模型end*/
	
	/*垂直选项卡*/
	if($(".list_menu3").length>0){
		$("#scrollContent").css({
			"position":"static"
		});
		try {
			$(".list_menu3 >div span").each(function(){
				$(this).click(function(){
					$(".list_menu3 >div").removeClass("current");
					$(this).parent("div").addClass("current");
				});
				$(this).hover(function(){
					$(this).animate({
						paddingLeft:'40px'
					},'fast');
				},function(){
					$(this).animate({
						paddingLeft:'20px'
					});
				});
			});
		}
		catch(e){}
	}
	if($(".list_menu3_min").length>0){
		$("#scrollContent").css({
			"position":"static"
		});
		try {
			$(".list_menu3_min >div span").each(function(){
				$(this).click(function(){
					$(".list_menu3_min >div").removeClass("current");
					$(this).parent("div").addClass("current");
				});
				$(this).hover(function(){
					$(this).animate({
						paddingLeft:'30px'
					},'fast');
				},function(){
					$(this).animate({
						paddingLeft:'10px'
					});
				});
			});
		}
		catch(e){}
	}
	/*垂直选项卡*/
	
	
	/*基本日期控件start*/
	if($(".date").length>0){
		var scrpt = document.createElement("script");  
	  	scrpt.type="text/javascript";
	  	scrpt.src= prePath+"js/form/datePicker/WdatePicker.js";  
	  	document.body.appendChild(scrpt); 
		$(".date").each(function(){
			var dateFormat="yyyy-MM-dd";
			if($(this).attr("dateFmt")!=null){
				dateFormat=$(this).attr("dateFmt");
			}
			$(this).focus(function(){
				WdatePicker({
					skin:themeColor,isShowClear:true,dateFmt:dateFormat,
					onpicked:function(dp){
						$(this).blur();
					}
				});
			});
		});
	}
	/*基本日期控件end*/
	
	
	/*表单start*/

	//button模式按钮
	$("button").each(function(){
			if($(this).attr("class")==""){
				$(this).addClass("button");
				var btnTextNum=_getStrLength($(this).text());
				if(btnTextNum<5){
					$(this).width(60);
				}
				
				var textNum=0;
				var textWidth=50;
				textNum=_getStrLength($(this).filter(":has(span)").find("span").text());
				if(textNum!=0){
					textWidth=20+7*textNum+10;
				}
				if(broswerFlag=="Firefox"||broswerFlag=="Opera"||broswerFlag=="Safari"){
					$(this).filter(":has(span)").css({
						"paddingLeft":"5px",
						"width":textWidth+8+"px"
					});
				}
				else{
					$(this).filter(":has(span)").css({
						"paddingLeft":"5px",
						"width":textWidth+"px"
					});
				}
				
				$(this).filter(":has(span)").find("span").css({
					"cursor":"default"
				});
			}
	});
	
	//按钮加样式并且修正2个字以内的按钮宽度
	$("input:button[class=''],input:submit[class=''],input:reset[class='']" ).each(function(){
		$(this).addClass("button");
		var btnTextNum=_getStrLength($(this).val());
		if(btnTextNum<5){
			$(this).width(60);
		}
	});
	
	//input模式按钮
	var focusFlag;
	$("input:button[class='button'],input:submit[class='button'],input:reset[class='button'],button[class='button']").each(function(){
		
		$(this).hover(
			function() {
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("button");
					$(this).addClass("button_hover");
				}
				},
			function(){
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("button_hover");
					$(this).addClass("button");
				}
				}
		);
		$(this).focus(function(){
			$(this).removeClass("button");
			$(this).addClass("button_hover");
		});
		$(this).blur(function(){
			$(this).removeClass("button_hover");
			$(this).addClass("button");
		});
	});
	/*表单end*/
	
	/*灯泡start*/
	if($(".img_light").length>0){
		$(".img_light").addClass("hand");
		$(".img_light").hover(function(){
			$(this).removeClass("img_light");
			$(this).addClass("img_lightOn");
		},function(){
			$(this).addClass("img_light");
			$(this).removeClass("img_lightOn");
		});
	}
	/*灯泡end*/
	
	//信息提示特效
	enableTooltips();
	

	//基本水平选项卡（样式1）
	if($(".simpleTab").length>0){
			$(".simpleTab").each(function(){
				$(this).find(".simpleTab_con").not(':eq(0)').hide();
				$(this).find(".simpleTab_top li").each(function(i){
					$(this).click(function(){
						$(this).parent().find("li").removeClass("current");
						$(this).addClass("current");
						if($(this).parents(".simpleTab").attr("iframeMode")!="true"){
							$(this).parents(".simpleTab").find(".simpleTab_con").hide();
							$(this).parents(".simpleTab").find(".simpleTab_con").eq(i).fadeIn();
						}
					});
				});
			});
		}
	//基本水平选项卡（样式3）
	if($(".cusTab").length>0){
			$(".cusTab").each(function(){
				$(this).find(".cusTab_con").not(':eq(0)').hide();
				var maxNum=$(this).find(".cusTab_normal_center").length;
				$(this).find(".cusTab_normal_center").each(function(i){
					$(this).click(function(){
						$(this).prevAll("li").removeClass("cusTab_current_left");
						$(this).prevAll("li").removeClass("cusTab_current_center");
						$(this).prevAll("li").removeClass("cusTab_current_middle");
						$(this).prevAll("li").removeClass("cusTab_current_middle2");
						$(this).prevAll("li").removeClass("cusTab_current_right");
						
						$(this).nextAll("li").removeClass("cusTab_current_left");
						$(this).nextAll("li").removeClass("cusTab_current_center");
						$(this).nextAll("li").removeClass("cusTab_current_middle");
						$(this).nextAll("li").removeClass("cusTab_current_middle2");
						$(this).nextAll("li").removeClass("cusTab_current_right");
						
						$(this).addClass("cusTab_current_center");
						if(i==0){
							$(this).prev().addClass("cusTab_current_left");
							$(this).next().addClass("cusTab_current_middle");
						}
						else if(i==maxNum-1){
							$(this).prev().addClass("cusTab_current_middle2");
							$(this).next().addClass("cusTab_current_right");
						}
						else{
							$(this).prev().addClass("cusTab_current_middle2");
							$(this).next().addClass("cusTab_current_middle");
						}
						if($(this).parents(".cusTab").attr("iframeMode")!="true"){
							$(this).parents(".cusTab").find(".cusTab_con").hide();
							$(this).parents(".cusTab").find(".cusTab_con").eq(i).fadeIn();
						}
					})
				})					
			});
		}
	
	//简易型弹出菜单
	if($(".simpleMenu").length>0){
		refreshSimpleMenu();
	}
	
	
	
	
	if ($("#scrollContent").length > 0) {//如果是右侧内页:设置scrollContent布局、修正表格和box、设置表格样式
		//设置滚动区域不出现横向滚动条
		if(broswerFlag=="IE6"){
			$("#scrollContent").css({
				overflowX: "hidden",
				width:"100%"
			});
		}
		else{
			$("#scrollContent").css({
				overflowX: "hidden"
			});
		}
		$("body").addClass("trans_bg");
		
		//获得框架头尾高度
		parentTopHeight = $(window.parent.document.getElementById("hbox")).outerHeight() + $(window.parent.document.getElementById("rbox_topcenter")).outerHeight()+parseInt($(window.parent.document.getElementById("rbox")).css("paddingTop"))+parseInt($(window.parent.document.getElementById("rbox")).css("paddingBottom"));
		parentBottomHeight = $(window.parent.document.getElementById("fbox")).outerHeight() + $(window.parent.document.getElementById("rbox_bottomcenter")).outerHeight();
		
		parentTopHeight_left = $(window.parent.document.getElementById("hbox")).outerHeight() + $(window.parent.document.getElementById("lbox_topcenter")).outerHeight()+parseInt($(window.parent.document.getElementById("lbox")).css("paddingTop"))+parseInt($(window.parent.document.getElementById("lbox")).css("paddingBottom"));
		parentBottomHeight_left = $(window.parent.document.getElementById("fbox")).outerHeight() + $(window.parent.document.getElementById("lbox_bottomcenter")).outerHeight();
		
		parentScrollHeight=$(window.parent.document.getElementById("scrollContent")).outerHeight();
		
		if(parentTopHeight>0||parentScrollHeight>0){
			if($("body").attr("leftFrame")=="true"){
				$("body").addClass("contentStyleLeft");
			}
			else{
				$("body").addClass("contentStyle");
			}
			$("#scrollContent").css({
			overflowY: "auto"
		});
		}
		
		//获得滚动之外内容高度
		getFixHeight();
		
		//计算滚动区域应得的高度
		scrollContent();
		
		scrollChildContent();
		
		var pResizeTimer = null;
		if (document.all) {}
		else {
			window.onload = function(){//当内容加载完毕后再次取得滚动之外内容高度重新计算滚动区域高度（为了兼容webkit内核）
				resetHeight();
			}
		}
		
		var boxIe6Flag = 0;
		var boxIe7Flag = 0;
		
		/*表格start*/
		if ($("table:[class=tableStyle]", "#scrollContent").length > 0) {
			var isHeadFixMode = 0;
			
			var $innerTable = $("table:[class=tableStyle]", "#scrollContent").eq(0);//获得scrollContent里的表格
			var $outerTable;
			if ($("table:[class=tableStyle]").length > 1) {//当有两个以上tableStyle是(一般是表头固定模式)
				$outerTable = $("table:[class=tableStyle]").eq(0);//获得scrollContent外的表格(一般是表头)
				if ($outerTable.attr("headFixMode") == "true") {//如果是表头固定模式,里表格上边框为0
					isHeadFixMode = 1;
					$innerTable.css({
						"borderTop": 0
					});
					$outerTable.addClass("noBottomLine");
				}
			}
			
			if ($innerTable.height() > $("#scrollContent").height()) {//当scrollContent出滚动条时
				if(broswerFlag=="IE6"){
					boxIe6Flag = 1;//IE6生效，修正滚动条在页面外部
				}
				else if(broswerFlag=="IE7"){
					boxIe7Flag = 1;//IE7生效，修正table内容会被滚动条盖住
				}
			
				if (isHeadFixMode == 1) {//如果是表头固定模式
					if (broswerFlag!="IE6") {//修正非IE6上下列宽不一致
						var $lastTh = $outerTable.find("th").last();
						var lastThWidth = $lastTh.width();
						if(broswerFlag=="IE9"||broswerFlag=="IE8"){
							$lastTh.width(lastThWidth + 16);
						}
						else{
							$lastTh.width(lastThWidth + 17);
						}
					}
				}
			}
			
			setTableStyle();
		}
		else 
			if ($(".flexiStyle", "#scrollContent").length > 0) {
				$("#scrollContent").css({
					overflowY: "hidden",
					overflowX: "hidden"
				});
				//修正flexiGrid在ie7的表现
				$(".contentStyle").css({
					paddingRight: "8px"
				});
			//修正flexiGrid在ie6的表现
			}
		
		
		if ($(".box1,.box2,.box3", "#scrollContent").length > 0) {
			$(".box1,.box2,.box3").each(function(){
				var yb = $(this).attr("panelWidth");
				if (yb == "100%" || yb == null) {//当盒子宽度为100%时
					if(broswerFlag=="IE6"){
						boxIe6Flag = 1;//修正IE6滚动条在外面
					}
					else if(broswerFlag=="IE7"){
						boxIe7Flag = 1;//修正IE7盒子内容会被滚动条盖住
					}
				}
			});
			
		}
		
		if (boxIe6Flag == 1) {
			//setTimeout(fixIe6Padding, 500);
		}
		if (boxIe7Flag == 1) {
			setTimeout(fixIe7Padding, 100);
		}
	
		function fixIe6Padding(){
			var bodyOldPadding = $("body").css("paddingRight");
			var truePadding = parseInt(bodyOldPadding) + 17;
			$("body").css({
				"paddingRight": truePadding + "px"
			});
		}
		function fixIe7Padding(){
			$("#scrollContent").css({
				"paddingRight": "17px"
			});
		}
		
	/*表格end*/
	}
	else if($("body").attr("rel")=="layout"){//如果使用了布局框架，设置表格样式和iframe高度（不使用scrollContent布局）
		$("body").addClass("trans_bg");
		setTableStyle();
		parentTopHeight = $(window.parent.document.getElementById("hbox")).outerHeight() + $(window.parent.document.getElementById("rbox_topcenter")).outerHeight();
		parentBottomHeight = $(window.parent.document.getElementById("fbox")).outerHeight() + $(window.parent.document.getElementById("rbox_bottomcenter")).outerHeight() + 1;
		var parentMainHeight = window.parent.document.documentElement.clientHeight;
		try {
			window.top.document.getElementsByTagName('iframe')['frmright'].style.height = parentMainHeight-parentTopHeight-parentBottomHeight+'px'; 
		}
		catch(e){}
		
	}
	else{//如果是弹窗内页，设置表格样式，修正ie6横向滚动条bug
		setTableStyle();
		$("body").addClass("zDialogCon");
		if(broswerFlag=="IE6"){
			var bodyWidth=$("body").width();
			$("body").width(bodyWidth-17);
		}
	}
	closeProgress();
});
function refreshSimpleMenu(){
	$(".simpleMenu").hover(function(){
		if($(this).find(".simpleMenu_link").attr("noBorder")!="true"){
			$(this).find(".simpleMenu_link").addClass("hoverBorder");
		}
		$(this).find(".simpleMenu_con").show();
	},function(){
		$(this).find(".simpleMenu_link").removeClass("hoverBorder");
		$(this).find(".simpleMenu_con").hide();
	});
}
function getFixHeight(){//获得滚动之外内容高度
	fixHeight=0;
	$("#scrollContent").parent().find(">*").not("div").not("#btc").hide();
	$("#scrollContent").parent().find(">div").not("#scrollContent").not(".searchMain").not(".jquery_rgbmultiselect_options_container").not("#cursorMessageDiv").not(".simplemenu").not(".iconmenu").not(".megamenu").not(".b-m-mpanel").each(function(){
		if($(this).css("display")!="none"){
			fixHeight=fixHeight+$(this).outerHeight();
			if($(this).css("marginBottom")!="auto"){
				fixHeight=fixHeight+parseInt($(this).css("marginBottom"));
			}
			if($(this).css("marginTop")!="auto"){
				fixHeight=fixHeight+parseInt($(this).css("marginTop"));
			}
		}
	});
}
function scrollChildContent(){
	if(parentScrollHeight>0&&$(window.parent.document.getElementById("scrollContent")).attr("childScrollContent")=="true"){
		$(window.parent.document.getElementById("scrollContent")).css({
			overflowY: "hidden",
			overflowX: "hidden"
		})
		$(window.parent.document.getElementById("scrollContent")).find("iframe").attr("scrolling","no");
		scrollChildContentHandler()
		var pResizeTimer = null;
		$(window).resize(function(){
			if ( pResizeTimer ) clearTimeout (pResizeTimer);
   			pResizeTimer = setTimeout ("scrollChildContentHandler()", 200);
		})
	}
}
function scrollChildContentHandler(){
	parentScrollHeight=$(window.parent.document.getElementById("scrollContent")).outerHeight();
	$("#scrollContent").height(parentScrollHeight-fixHeight-10);
	$(window.parent.document.getElementById("scrollContent")).find("iframe").height(parentScrollHeight);
	$(window.parent.document.getElementById("scrollContent")).css({
			overflowY: "hidden",
			overflowX: "hidden"
		})
}
function scrollContent(){//计算滚动区域应得的高度
	try {
		var parentMainHeight = window.top.document.documentElement.clientHeight;
		
		if(parentTopHeight>0){
			parentTopHeight = $(window.parent.document.getElementById("hbox")).outerHeight() + $(window.parent.document.getElementById("rbox_topcenter")).outerHeight()+parseInt($(window.parent.document.getElementById("rbox")).css("paddingTop"))+parseInt($(window.parent.document.getElementById("rbox")).css("paddingBottom"));
			parentBottomHeight = $(window.parent.document.getElementById("fbox")).outerHeight() + $(window.parent.document.getElementById("rbox_bottomcenter")).outerHeight();
			
			parentTopHeight_left = $(window.parent.document.getElementById("hbox")).outerHeight() + $(window.parent.document.getElementById("lbox_topcenter")).outerHeight()+parseInt($(window.parent.document.getElementById("lbox")).css("paddingTop"))+parseInt($(window.parent.document.getElementById("lbox")).css("paddingBottom"));
			parentBottomHeight_left = $(window.parent.document.getElementById("fbox")).outerHeight() + $(window.parent.document.getElementById("lbox_bottomcenter")).outerHeight();
			if($("body").attr("leftFrame")=="true"){
				$("#scrollContent").height(parentMainHeight-parentTopHeight_left-parentBottomHeight_left-fixHeight);
			}
			else{
				$("#scrollContent").height(parentMainHeight-parentTopHeight-parentBottomHeight-fixHeight);
			}
			if($(".flexiStyle").length>0){
				var flexiGridHeight=parentMainHeight-parentTopHeight-parentBottomHeight-fixHeight-45;
				$(".bDiv").height(flexiGridHeight);
			}
			if($(".jqGrid").length>0){
				var jqGridHeight=parentMainHeight-parentTopHeight-parentBottomHeight-fixHeight-100;
				var jqGridWidth=window.document.documentElement.clientWidth-10;
				$(".ui-jqgrid-bdiv").height(jqGridHeight);
				$(".jqGrid").setGridWidth(jqGridWidth);
				
			}
		}
	}
	catch(e){}
	if($("body").attr("leftFrame")=="true"){
		try {
			window.top.document.getElementsByTagName('iframe')['frmleft'].style.height = parentMainHeight-parentTopHeight_left-parentBottomHeight_left+'px';  
		}
		catch(e){}
	}
	else{
		try {
			window.top.document.getElementsByTagName('iframe')['frmright'].style.height = parentMainHeight-parentTopHeight-parentBottomHeight+'px';  
		}
		catch(e){}
	}
	if(exitVtab==1){
	 	try {
			$("#vtabConIn").height(parentMainHeight-parentTopHeight_left-parentBottomHeight_left);
			$(".vtab").height(parentMainHeight-parentTopHeight_left-parentBottomHeight_left-20);
		}
		catch(e){}
	 }
	try {
			customHeightSet()
	}
	catch(e){}
}
function resetHeight(){//再次取得滚动之外内容高度重新计算滚动区域高度
	try {
		getFixHeight();
		scrollContent();
	}
	catch(e){}
}
function changeFont(num){//更改字体大小
	$("body").css({
		"fontSize":num+"px"
	});
	if ($("table:[class=tableStyle]").length > 0) {
		$("table:[class=tableStyle]").css({
			"fontSize":num+"px"
		});
	}
	if ($("pre").length > 0) {
		$("pre").css({
			"fontSize":num+"px"
		});
	}
	if($("iframe").length>0){
		for(var i=0;i<$("iframe").length;i++){
			document.getElementsByTagName("iframe")[i].contentWindow.changeFont(num);
		}
	}
}
(function($) {
	$.fn.tableRenderer = function() {
		return this.each(function() {
			$(this).find('th').addClass("th");
				if($(this).find('tr').eq(1).find("td").eq(0).find('input[type="checkbox"]').length==1){
					if($(this).attr("useCheckBox")!="false"){
						$(this).attr("useCheckBox","true");
					}
					if($(this).attr("useMultColor")!="false"){
						$(this).attr("useMultColor","true");
					}
				}
				if($(this).find('tr').eq(1).find("td").eq(0).find('input[type="radio"]').length==1){
					if($(this).attr("useRadio")!="false"){
						$(this).attr("useRadio","true");
					}
				}
				if ($(this).attr("formMode") == "true") {//表单布局模式1
					$(this).attr("useColor", "false");
					$(this).attr("useHover", "false");
					$(this).attr("useClick", "false");
					$(this).find("th").css({
						"fontWeight": "bold",
						"text-align": "center"
					});
					$(this).find("tr").not("tr:last").find("td:even").css("text-align", "right");
					if($(this).attr("footer")!=null){
						if($(this).attr("footer")=="left"){
							$(this).find("tr:last").find("td").css("text-align", "left");
						}
						else if($(this).attr("footer")=="right"){
							$(this).find("tr:last").find("td").css("text-align", "right");
						}
						else if($(this).attr("footer")=="center"){
							$(this).find("tr:last").find("td").css("text-align", "center");
						}
						else if($(this).attr("footer")=="normal"){
							$(this).find("tr:last").find("td:even").css("text-align", "right");
						}
					}
					else{
						$(this).find("tr:last").find("td").css("text-align", "center");
					}
					$(this).find("td").css({
						"paddingTop": "3px",
						"paddingBottom": "3px"
					});
				}
				if ($(this).attr("transMode") == "true"){//表单布局模式2
					$(this).attr("useColor", "false");
					$(this).attr("useHover", "false");
					$(this).attr("useClick", "false");
					$(this).find("th").css({
						"fontWeight": "bold",
						"text-align": "center"
					});
					$(this).css({
						"border":"none",
						"backgroundColor":"transparent"
					});
					$(this).find("tr").css({
						"border":"none",
						"backgroundColor":"transparent"
					});
					$(this).find("tr").not("tr:last").find("td:even").css("text-align", "right");
					if($(this).attr("footer")!=null){
						if($(this).attr("footer")=="left"){
							$(this).find("tr:last").find("td").css("text-align", "left");
						}
						else if($(this).attr("footer")=="right"){
							$(this).find("tr:last").find("td").css("text-align", "right");
						}
						else if($(this).attr("footer")=="center"){
							$(this).find("tr:last").find("td").css("text-align", "center");
						}
						else if($(this).attr("footer")=="normal"){
							$(this).find("tr:last").find("td:even").css("text-align", "right");
						}
					}
					else{
						$(this).find("tr:last").find("td").css("text-align", "center");
					}
					$(this).find("td").css({
						"paddingTop": "3px",
						"paddingBottom": "3px",
						"border":"none"
					});
				}
				if ($(this).attr("useColor") != "false") {//默认隔行换色
					$(this).find('tr:even').addClass('odd');
				}
				if ($(this).attr("useHover") != "false") {//默认鼠标移入变色
					$(this).find('tr').hover(function(){
						$(this).addClass('highlight');
					}, function(){
						$(this).removeClass('highlight');
					});
				}
				if ($(this).attr("sortMode") == "true") {//排序模式
					$(this).find('th').filter(":has(span)").hover(function(){
						$(this).removeClass("th");
						$(this).addClass("th_over");
					}, function(){
						$(this).removeClass("th_over");
						$(this).addClass("th");
					});
					$(this).find('th span').addClass("sort_off");
					$(this).find('th').click(function(){
					
					});
				}
				
				if ($(this).attr("useClick") != "false") {//useClick默认为true
					$(this).attr("useClick", "true");
				}
				if ($(this).attr("useClick") == "true" && $(this).attr("useMultColor") == "true") {//如果useClick与useMultColor都为true则useClick为false
					$(this).attr("useClick", "false");
				}
				if ($(this).attr("useRadio") != "true") {//useRadio默认为false
					$(this).attr("useRadio", "false");
				}
				if ($(this).attr("useCheckBox") != "true") {//useCheckBox默认为false
					$(this).attr("useCheckBox", "false");
				}
				
				if ($(this).attr("useClick") != "false") {//useClick为false时useRadio即使为true也不生效
					if ($(this).attr("useRadio") == "false") {//如果useRadio不做设置（为false）则采用单行点击变色模式
						$(this).find("tr").click(function(){
							$(this).siblings().removeClass('selected');
							$(this).addClass('selected');
						});
					}
					else {//如果useRadio为true则采取radio模式
						$(this).find('input[type="radio"]:checked').parents('tr').addClass('selected');
						$(this).find("tr").click(function(){
							$(this).siblings().removeClass('selected');
							$(this).addClass('selected');
							$(this).find('input[type="radio"]').attr('checked', 'checked');
						});
					}
				}
				if ($(this).attr("useMultColor") == "true") {
					if ($(this).attr("useCheckBox") == "false") {//如果checkBox为false采用普通多选模式
						$(this).find("tr").click(function(){
							$(this).toggleClass('selected');
						});
					}
					else {//如果checkBox为true采用checkBox多项模式
						$(this).find('input[type="checkbox"]:checked').parents('tr').addClass('selected');
						if($(this).find("th").length>0){
							var $checkIcon=$('<img src='+prePath+'icons/checkAllOff.gif title="点击全选" class="hand"></span>');
							$(this).find("th").eq(0).addClass("ali02").html("").append($checkIcon);
							
							try {
								enableTooltips();
							}
							catch(e){}
							if ($(this).attr("headFixMode") == "true"){
								$checkIcon.toggle(function(){
									$("table:[class=tableStyle]").find("tr").each(function(){
										$(this).addClass('selected');
										$(this).find('input[type="checkbox"]').attr('checked', 'checked');
									});
									//$(this).removeClass("img_checkAllOff");
									//$(this).addClass("img_checkAllOn");
									$(this).attr("src",prePath+'icons/checkAllOn.gif');
									$(this).attr("title","取消全选");
									try {
										hideTooltip();
										enableTooltips();
									}
									catch(e){}
								},function(){
									$("table:[class=tableStyle]").find("tr").each(function(){
										if ($(this).hasClass('selected')) {
											$(this).removeClass('selected');
											$(this).find('input[type="checkbox"]').removeAttr('checked');
										}
									});
									//$(this).removeClass("img_checkAllOn");
									//$(this).addClass("img_checkAllOff");
									$(this).attr("src",prePath+'icons/checkAllOff.gif');
									$(this).attr("title","点击全选");
									try {
										hideTooltip();
										enableTooltips();
									}
									catch(e){}
								});
							}else{
								$checkIcon.toggle(function(){
									$(this).parents('table').find("tr").each(function(){
										$(this).addClass('selected');
										$(this).find('input[type="checkbox"]').attr('checked', 'checked');
									});
									//$(this).removeClass("img_checkAllOff");
									//$(this).addClass("img_checkAllOn");
									$(this).attr("src",prePath+'icons/checkAllOn.gif');
									$(this).attr("title","取消全选");
									try {
										hideTooltip();
										enableTooltips();
									}
									catch(e){}
								},function(){
									$(this).parents('table').find("tr").each(function(){
										if ($(this).hasClass('selected')) {
											$(this).removeClass('selected');
											$(this).find('input[type="checkbox"]').removeAttr('checked');
										}
									});
									//$(this).removeClass("img_checkAllOn");
									//$(this).addClass("img_checkAllOff");
									$(this).attr("src",prePath+'icons/checkAllOff.gif');
									$(this).attr("title","点击全选");
									try {
										hideTooltip();
										enableTooltips();
									}
									catch(e){}
								});
							}
						}
						$(this).find("tr:has(td)").find('input[type="checkbox"]').each(function(){
							$(this).parents('td').addClass("ali02");
							$(this).unbind("click");
							$(this).bind("click",function(){
								if ($(this).parents("tr").hasClass('selected')) {
									$(this).parents("tr").removeClass('selected');
								}
								else {
									$(this).parents("tr").addClass('selected');
								}
							})
						})
					}
				}
		});
	};
})(jQuery);

function setTableStyle(){//设置表格样式
	$('.tableStyle').tableRenderer()
}
function tableRefresh(compId){
	var $curTable;
	if(typeof(compId)=="object"){
		$curTable=compId;
	}
	else{
		$curTable=$("#"+compId);
	}
	$curTable.tableRenderer();
}
function getPosition(value,array){//获得数组值的索引
		for(var i=0;i<array.length;i++){
			if(value==array[i]){
				return i;
				break;
			}
		}
	}


/*信息提示*/
var tipDirection="down";
function enableTooltips(id){
    var links,links2, i, h;
    if (!document.getElementById || !document.getElementsByTagName) 
        return;
    AddCss();
    h = document.createElement("span");
    h.id = "btc";
    h.setAttribute("id", "btc");
    h.style.position = "absolute";
	h.style.zIndex=9999;
	$("body").append($(h));
    $("a[title],span[title],input[title],textarea[title],img[title],div[title]").each(function(){
		if($(this).attr("defaultTip")!="false"){
			Prepare($(this)[0]);
		}
	});
}
function _getStrLength(str){
	var i;
	var len;
	for(i=0,len=0;i<str.length;i++){
		if(str.charCodeAt(i)<128){
			len++;
		}
		else{
			len=len+2;
		}
	}
	return len;
}
function Prepare(el){
    var tooltip, t, b, s, l;
    t = el.getAttribute("title");
     if (t != null && t.length != 0) {
	    el.removeAttribute("title");
	    if (_getStrLength(t) > 37||_getStrLength(t) ==37) {
	        tooltip = CreateEl("span", "tooltip");
	    }
		else  if (_getStrLength(t) > 10&&_getStrLength(t)<37) {
	        tooltip = CreateEl("span", "tooltip_mid");
	    }
	    else {
	        tooltip = CreateEl("span", "tooltip_min");
	    }
	    s = CreateEl("span", "top");
	   $(s).html(t);
	    tooltip.appendChild(s);
	    b = CreateEl("b", "bottom");
	    tooltip.appendChild(b);
	    setOpacity(tooltip);
	    el.tooltip = tooltip;
	    el.onmouseover = showTooltip;
	    el.onmouseout = hideTooltip;
	    el.onmousemove = Locate2;
	 }
}
function showTooltip(e){
    document.getElementById("btc").appendChild(this.tooltip);
    Locate(e);
}
function hideTooltip(e){
    var d = document.getElementById("btc");
    if (d.childNodes.length > 0) 
        d.removeChild(d.firstChild);
}
function setOpacity(el){
    el.style.filter = "alpha(opacity:95)";
    el.style.KHTMLOpacity = "0.95";
    el.style.MozOpacity = "0.95";
    el.style.opacity = "0.95";
}
function CreateEl(t, c){
    var x = document.createElement(t);
    x.className = c;
    x.style.display = "block";
    return (x);
}
function AddCss(){}
function Locate(e){
    var posx = 0, posy = 0;
    if (e == null) 
        e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else 
        if (e.clientX || e.clientY) {
            if (document.documentElement.scrollTop) {
                posx = e.clientX + document.documentElement.scrollLeft;
                posy = e.clientY + document.documentElement.scrollTop;
            }
            else {
                posx = e.clientX + document.body.scrollLeft;
                posy = e.clientY + document.body.scrollTop;
            }
        }
    
    var clientWidth=window.document.documentElement.clientWidth;
    var clientHeight=window.document.documentElement.clientHeight;
	var tipWidth=$("#btc").width();
	var tipHeight=$("#btc").height();
	if(clientWidth-tipWidth<posx - 20){
		document.getElementById("btc").style.left = (clientWidth-tipWidth) + "px";
	}
	else{
		document.getElementById("btc").style.left = (posx - 20) + "px";
	}
	
	if($(window).scrollTop()+clientHeight-tipHeight<posy){
		document.getElementById("btc").style.top = (posy-tipHeight-10) + "px";
		var oldClass=$("#btc >span")[0].className;
		if(oldClass=="tooltip"){
			$("#btc >span")[0].className="tooltip_r";
		}
		else if(oldClass=="tooltip_min"){
			$("#btc >span")[0].className="tooltip_min_r";
		}
		else if(oldClass=="tooltip_mid"){
			$("#btc >span")[0].className="tooltip_mid_r";
		}
		tipDirection="up";
	}
	else{
		document.getElementById("btc").style.top = (posy + 10) + "px";
		var oldClass=$("#btc >span")[0].className;
		if(oldClass=="tooltip_r"){
			$("#btc >span")[0].className="tooltip";
		}
		else if(oldClass=="tooltip_min_r"){
			$("#btc >span")[0].className="tooltip_min";
		}
		else if(oldClass=="tooltip_mid_r"){
			$("#btc >span")[0].className="tooltip_mid";
		}
		tipDirection="down";
	}
}
function Locate2(e){
    var posx = 0, posy = 0;
    if (e == null) 
        e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else 
        if (e.clientX || e.clientY) {
            if (document.documentElement.scrollTop) {
                posx = e.clientX + document.documentElement.scrollLeft;
                posy = e.clientY + document.documentElement.scrollTop;
            }
            else {
                posx = e.clientX + document.body.scrollLeft;
                posy = e.clientY + document.body.scrollTop;
            }
        }
    
    var clientWidth=window.document.documentElement.clientWidth;
    var clientHeight=window.document.documentElement.clientHeight;
	var tipWidth=$("#btc").width();
	var tipHeight=$("#btc").height();
	if(clientWidth-tipWidth<posx - 20){
		document.getElementById("btc").style.left = (clientWidth-tipWidth) + "px";
	}
	else{
		document.getElementById("btc").style.left = (posx - 20) + "px";
	}
	
	if(tipDirection=="up"){
		document.getElementById("btc").style.top = (posy-tipHeight-10) + "px";
		
	}
	else{
		document.getElementById("btc").style.top = (posy + 10) + "px";
	}
}
/*信息提示*/



/*可调用的提示*/
if(jQuery) {
	( function($) {
	$.cursorMessageData = {}; // needed for e.g. timeoutId

	$(window).ready(function(e) {
		if ($('#cursorMessageDiv').length==0) {
			
			   $('body').append('<div id="cursorMessageDiv">&nbsp;</div>');
			  $('#cursorMessageDiv').hide();
		}

		$('body').mousemove(function(e) {
			$.cursorMessageData.mouseX = e.pageX;
			$.cursorMessageData.mouseY = e.pageY;
			if ($.cursorMessageData.options != undefined) $._showCursorMessage();
		});
	});
	$.extend({
		cursorMessage: function(message, options) {
			if( options == undefined ) options = {};
			if( options.offsetX == undefined ) options.offsetX = 5;
			if( options.offsetY == undefined ) options.offsetY = 5;
			if( options.hideTimeout == undefined ) options.hideTimeout = 1000;

			$('#cursorMessageDiv').html(message).fadeIn('slow');
			if (jQuery.cursorMessageData.hideTimeoutId != undefined)  clearTimeout(jQuery.cursorMessageData.hideTimeoutId);
			if (options.hideTimeout>0) jQuery.cursorMessageData.hideTimeoutId = setTimeout($.hideCursorMessage, options.hideTimeout);
			jQuery.cursorMessageData.options = options;
			$._showCursorMessage();
		},
		hideCursorMessage: function() {
			$('#cursorMessageDiv').fadeOut('slow');
		},
		_showCursorMessage: function() {
			$('#cursorMessageDiv').css({ top: ($.cursorMessageData.mouseY + $.cursorMessageData.options.offsetY)+'px', left: ($.cursorMessageData.mouseX + $.cursorMessageData.options.offsetX) });
		}
	});
})(jQuery);
}
/*可调用的提示*/


/*iframe自适应高度*/
function iframeHeight(iframeId){
	var frm=document.getElementById(iframeId);
	frm.style.height =frm.contentWindow.document.body.scrollHeight+"px";
}
/*iframe自适应高度*/

/*设置弹窗内容滚动区域*/
function winScrollContent(str){
	var windowMainHeight=$(top.document.getElementById("_Container_"+str)).height();
	$(top.document.getElementById("_DialogFrame_"+str)).attr("scrolling","no")
	
	
	
	$("#winScrollContent").css({
		overflowY: "auto",
		overflowX: "hidden"
	})
	var winFixHeight=0;
	
	$("#winScrollContent").parent().find(">div").not("#winScrollContent").each(function(){
		if($(this).css("display")!="none"){
			winFixHeight=winFixHeight+$(this).outerHeight();
			if($(this).css("marginBottom")!="auto"){
				winFixHeight=winFixHeight+parseInt($(this).css("marginBottom"));
			}
			if($(this).css("marginTop")!="auto"){
				winFixHeight=winFixHeight+parseInt($(this).css("marginTop"));
			}
		}
	});
	 if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
	 	$("#winScrollContent").height(windowMainHeight-winFixHeight-10)
	 }
	else{
		$("#winScrollContent").height(windowMainHeight-winFixHeight+5)
	}
}
/*设置弹窗内容滚动区域*/	


/*Cookie*/
jQuery.jCookie = function(sCookieName_, oValue_, oExpires_, oOptions_) {
	if (!navigator.cookieEnabled) { return false; }
	
	var oOptions_ = oOptions_ || {};
	if (typeof(arguments[0]) !== 'string' && arguments.length === 1) {
		oOptions_ = arguments[0];
		sCookieName_ = oOptions_.name;
		oValue_ = oOptions_.value;
		oExpires_ = oOptions_.expires;
	}
	
	sCookieName_ = encodeURI(sCookieName_);
	
	if (oValue_ && (typeof(oValue_) !== 'number' && typeof(oValue_) !== 'string' && oValue_ !== null)) { return false; }
	
	var _sPath = oOptions_.path ? "; path=" + oOptions_.path : "";
	var _sDomain = oOptions_.domain ? "; domain=" + oOptions_.domain : "";
	var _sSecure = oOptions_.secure ? "; secure" : "";
	var sExpires_ = "";
	
	if (oValue_ || (oValue_ === null && arguments.length == 2)) {
	
		oExpires_ = (oExpires_ === null || (oValue_ === null && arguments.length == 2)) ? -1 : oExpires_;
		
		if (typeof(oExpires_) === 'number' && oExpires_ != 'session' && oExpires_ !== undefined) {
			var _date = new Date();
			_date.setTime(_date.getTime() + (oExpires_ * 24 * 60 * 60 * 1000));
			sExpires_ = ["; expires=", _date.toGMTString()].join("");
		}
		document.cookie = [sCookieName_, "=", encodeURI(oValue_), sExpires_, _sDomain, _sPath, _sSecure].join("");
		
		return true;
	}
	
	if (!oValue_ && typeof(arguments[0]) === 'string' && arguments.length == 1 && document.cookie && document.cookie.length) {
		var _aCookies = document.cookie.split(';');
		var _iLenght = _aCookies.length;
		while (_iLenght--) {
			var _aCurrrent = _aCookies[_iLenght].split("=");
			if (jQuery.trim(_aCurrrent[0]) === sCookieName_) { return decodeURI(_aCurrrent[1]); }
		}
	}
	
	return false;
};
/*Cookie*/

function showProgressBar(str){
	top.progressFlag=1;
	var titleStr="正在加载中...";
	if(str){
		titleStr=str;
	}
	var diag = new top.Dialog();
	diag.Width = 360;
	diag.Height = 70;
	diag.Title = titleStr;
	diag.InvokeElementId="progress"
	diag.show();
}
function closeProgress(){
	try {
		if(top.progressFlag==1){
			top.Dialog.close();
			top.progressFlag=0;
		}
	}
	catch(e){}
}
String.prototype.trim = function()
{
    // 用正则表达式将前后空格，用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
} 