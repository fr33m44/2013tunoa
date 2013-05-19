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
	if($(".box1").length>0){
		$(".box1").each(function(){
			var con=$(this).html();
			$(this).html("");
			if($(this).attr("whiteBg")=="true"){
				$("<div class='box1_topcenter2'><div class='box1_topleft2'><div class='box1_topright2'></div></div></div>").appendTo($(this));
				$("<div class='box1_middlecenter'><div class='box1_middleleft2'><div class='box1_middleright2'><div class='boxContent'></div></div></div></div>").appendTo($(this));
				$("<div class='box1_bottomcenter2'><div class='box1_bottomleft2'><div class='box1_bottomright2'></div></div></div>").appendTo($(this));
			}
			else{
				$("<div class='box1_topcenter'><div class='box1_topleft'><div class='box1_topright'></div></div></div>").appendTo($(this));
				$("<div class='box1_middlecenter'><div class='box1_middleleft'><div class='box1_middleright'><div class='boxContent'></div></div></div></div>").appendTo($(this));
				$("<div class='box1_bottomcenter'><div class='box1_bottomleft'><div class='box1_bottomright'></div></div></div>").appendTo($(this));
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
				$(this).find(".box1_topcenter").height(20);
				$(this).find(".box1_bottomcenter").height(22);
				var useHeight=Number($(this).attr("panelHeight"))-$(this).find(".box1_topcenter").outerHeight()-$(this).find(".box1_bottomcenter").outerHeight();
				$(this).find(".boxContent").height(useHeight);
			}
			$(this).find(".boxContent").html(con);
			if($(this).attr("overflow")!=null){
				$(this).find(".boxContent").css({
					"overflow":$(this).attr("overflow")
				})
			}
		})
	}
	
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
	if($(".box3").length>0){
		$(".box3").each(function(){
			var con=$(this).html();
			$(this).html("");
			$("<div class='box3_topcenter'><div class='box3_topleft'><div class='box3_topright'><div class='title'></div>"+
			"<div class='status'><span class='ss'><a></a></span></div><div class='clear'></div></div></div></div>").appendTo($(this));
			$("<div class='box3_middlecenter'><div class='box3_middleleft'><div class='box3_middleright'><div class='boxContent'></div></div></div></div>").appendTo($(this));
			var $bottom=$("<div class='box3_bottomcenter'><div class='box3_bottomleft'><div class='box3_bottomright'></div></div></div>");
			$bottom.appendTo($(this));
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
				$(this).find(".box3_topcenter").height(29);
				$(this).find(".box3_bottomcenter").height(2);
				var useHeight=Number($(this).attr("panelHeight"))-$(this).find(".box3_topcenter").outerHeight()-$(this).find(".box3_bottomcenter").outerHeight();
				$(this).find(".boxContent").height(useHeight);
			}
			$(this).find(".boxContent").html(con);
			if($(this).attr("overflow")!=null){
				$(this).find(".boxContent").css({
					"overflow":$(this).attr("overflow")
				})
			}
			var showSt="false";
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
			var useStatusText="更多>>";
			if ($(this).attr("statusText") != null) {
				useStatusText=$(this).attr("statusText");
			}
			var oldHeight;
			if(useStatusText=="收缩"){
				$(this).find(".ss").text(useStatusText);
				$(this).find(".ss").toggle(function(){
					var obj=$(this).parents(".box3").find(".boxContent");
					oldHeight=obj.height();
					obj.hide(300,resetHeight);
					if($(this).parents(".box3").attr("panelHeight")==null){
						setTimeout(function(){
							obj.css({
							"height":"auto"
						})
						},500);
					}
					$(this).text("展开");
				},function(){
					var obj=$(this).parents(".box3").find(".boxContent");
					obj.height(oldHeight);
					obj.show(300,resetHeight);
					$(this).text("收缩");
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
	if($(".box4").length>0){
		$(".box4").each(function(){
			var con=$(this).html();
			$(this).html("");
			if($(this).attr("noTitle")=="true"){
				$("<div class='box4_topcenter2'><div class='box4_topleft2'><div class='box4_topright2'></div></div></div>").appendTo($(this));
			}
			else{
				$("<div class='box4_topcenter'><div class='box4_topleft'><div class='box4_topright'><div class='title'></div></div></div></div>").appendTo($(this));
			}
			
			$("<div class='box4_middlecenter'><div class='box4_middleleft'><div class='box4_middleright'><div class='boxContent'></div></div></div></div>").appendTo($(this));
			$("<div class='box4_bottomcenter'><div class='box4_bottomleft'><div class='box4_bottomright'></div></div></div>").appendTo($(this));
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
				$(this).find(".box4_topcenter").height(27);
				$(this).find(".box4_bottomcenter").height(5);
				var useHeight=Number($(this).attr("panelHeight"))-$(this).find(".box4_topcenter").outerHeight()-$(this).find(".box4_bottomcenter").outerHeight();
				$(this).find(".boxContent").height(useHeight);
			}
			$(this).find(".boxContent").html(con);
			if($(this).attr("overflow")!=null){
				$(this).find(".boxContent").css({
					"overflow":$(this).attr("overflow")
				})
			}
		})
	}
	/*盒子模型end*/
	
	/*标签式导航*/
	if($("#vtabConIn").length>0){
		exitVtab=1;
		
		try {
			var vtabIndex=jQuery.jCookie('vtabIndex');
			if(vtabIndex!=false){
				vtabIdx=parseInt(vtabIndex);
			}
			$(".list_menu2").not(':eq('+vtabIdx+')').hide();
			$(".vtab >div").eq(vtabIdx).addClass("vtab_cur");
			$(".vtab >div").each(function(i){
				$(this).click(function(){
					$(".vtab >div").removeClass("vtab_cur");
					$(this).addClass("vtab_cur");
					jQuery.jCookie('vtabIndex',i.toString());
					$(".list_menu2").hide();
					$(".list_menu2").eq(i).slideDown(600, function(){
						$(".list_menu2").not(':eq('+i+')').hide();
					});
				});
			});
			
		}
		catch(e){}
	}
	if($(".list_menu2").length>0){
		try {
			$(".list_menu2").each(function(){
				if($(this).attr("showAll")!="true"){
					$(this).find(".child").hide();
					$(this).find(".parent").each(function(){
						$(this).find("a").eq(0).click(function(){
							$(this).parents(".list_menu2").find(".child").hide();
							if(broswerFlag=="IE6"||broswerFlag=="IE7"){
								$(this).parent().find("ul").slideDown();
							}
							else{
								$(this).parent().next("ul").slideDown();
							}
						});
					});
				}
				$(this).find("dt").find("a").click(function(){
					$(this).parents(".list_menu2").find("dt").find("a").removeClass("current");
					$(this).addClass("current");
				});
			});
		}
		catch(e){}
	}
	/*标签式导航*/
	
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
	
	//上传控件
	$("input:file[class='']").addClass("file");
	$("input:file[class='file']").rebrushfileupload();

	
	//文本框
	var focusFlag;
	$("input:text[class=''],input:password[class=''],input:text[class*=validate],input:password[class*=validate]").each(function(){
		$(this).addClass("textinput");
		$(this).hover(
			function() {
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("textinput");
					$(this).addClass("textinput_hover");
				}
				},
			function(){
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("textinput_hover");
					$(this).addClass("textinput");
				}
				}
		);
		$(this).focus(function(){
			focusFlag=$(this)[0];
			$(this).removeClass("textinput");
			$(this).removeClass("textinput_hover");
			$(this).addClass("textinput_click");
		});
		$(this).blur(function(){
			focusFlag=null;
			$(this).removeClass("textinput_click");
			$(this).addClass("textinput");
		});
		if($(this).attr("clearable")=="true"){
			$(this).clearableTextField();
		}
		if ($(this).attr("maxNum")!=null) {
			$(this).maxlength();
		}
		if($(this).attr("checkStrength")=="true"){
			$(this).password_strength();
		}
		if ($(this).attr("watermark") != null) {
			$(this).watermark('watermark',$(this).attr("watermark"));
		}
	});
	
	//密码框检测大写键
	$("input:password[class='textinput'],input:password[class*=validate]").each(function(){
		$(this).caps(function(caps){
		    if(jQuery.browser.safari) return; 
		    if(caps){
				$.cursorMessage('注意：大写键开启了');
		    }else{
		    }
		});
	});
	
	//日期控件、软键盘和选色器的文本框样式
	$("input:text[class='date'],input:text[class='cusDate'],input:text[class='keypad'],input:text[class='color']").each(function(){
		
		$(this).hover(
			function() {
				if(focusFlag!=$(this)[0]){
					$(this).addClass("date_hover");
				}
				},
			function(){
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("date_hover");
				}
				}
		);
		$(this).focus(function(){
			focusFlag=$(this)[0];
			$(this).removeClass("date_hover");
			$(this).addClass("date_click");
		});
		$(this).blur(function(){
			focusFlag=null;
			$(this).removeClass("date_click");
		});
	});
	
	//文本域
	$("textarea[class*=validate]").each(function(){
		$(this).addClass("textarea");
		if ($(this).attr("maxNum")!=null) {
			$(this).maxlength({maxCharacters:parseInt($(this).attr("maxNum"))});
		}
		if ($(this).attr("resize")=="true"){
			$(this).TextAreaResizer();
		}
		if ($(this).attr("autoHeight")=="true"){
			$(this).css({
				height:"auto"
			});
			$(this).attr("rows",5);
			$(this).autoGrow();
		}
		if ($(this).attr("watermark") != null) {
			$(this).watermark('watermark',$(this).attr("watermark"));
		}
	});
	$("textarea").each(function(){
		if($(this).attr("class")==""){
			$(this).addClass("textarea");
			if ($(this).attr("maxNum")!=null) {
				$(this).maxlength({maxCharacters:parseInt($(this).attr("maxNum"))});
			}
			if ($(this).attr("resize")=="true"){
				$(this).TextAreaResizer();
			}
			if ($(this).attr("autoHeight")=="true"){
				$(this).css({
					height:"auto"
				});
				$(this).attr("rows",5);
				$(this).autoGrow();
			}
			if ($(this).attr("watermark") != null) {
				$(this).watermark('watermark',$(this).attr("watermark"));
			}
		}
	});
	
	//文本域焦点变换
	$("textarea[class='textarea'],textarea[class*='textarea'],textarea[class*=validate]").each(function(){
		
		$(this).hover(
			function() {
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("textarea");
					$(this).addClass("textarea_hover");
				}
				},
			function(){
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("textarea_hover");
					$(this).addClass("textarea");
				}
				}
		);
		$(this).focus(function(){
			focusFlag=$(this)[0];
			$(this).removeClass("textarea");
			$(this).removeClass("textarea_hover");
			$(this).addClass("textarea_click");
		});
		$(this).blur(function(){
			focusFlag=null;
			$(this).removeClass("textarea_click");
			$(this).addClass("textarea");
		});
	});
	
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
	
	//radio与checkbox渲染
	$(".render input:checkbox[class='']").custCheckBox();
	$(".render input:radio[class='']").custCheckBox();
	

	//单选下拉框select渲染
	$("select").each(function(){
		if($(this).attr("class")==""&&$(this).attr("multiple")==false){
			$(this).selectbox();
		}
	});
	$("select[class*=validate]").not("[multiple]").selectbox();
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
	
	//自定义树形表格
	if($(".cusTreeTable").length>0){
		$(".cusTreeTable").each(function(){
			$(this).find('tr').filter(":has(table)").hide();
			var cusTreeTableAjax=false;
			var cusTreeTableDataValue;
			var clickObj;
			
			if($(this).attr("ajaxMode")=="true"){
				cusTreeTableAjax=true;
			}
			if($(this).attr("trClick")=="true"){
				$(this).find("tr").eq(0).nextAll().not(":has(table)").each(function(){
					$(this).addClass("hand");
					$(this).hover(function(){
						$(this).addClass('highlight');
					}, function(){
						$(this).removeClass('highlight');
					});
					$(this).click(function(){
						if($(this).next().css("display")=="none"){
							if($(this).parents("table").attr("ohterClose")!="false"){
								$(this).parents("table").find(".img_remove2").attr("title","点击展开");
								$(this).parents("table").find(".img_remove2").addClass("img_add2");
								$(this).parents("table").find(".img_remove2").removeClass("img_remove2");
								$(this).next().nextAll().filter(":has(table)").hide();
								$(this).next().prevAll().filter(":has(table)").hide();
								
							}
							if (cusTreeTableAjax == true) {
								clickObj = $(this).find(".img_add2");
								clickObj.each(function(){
									$(this).removeClass("img_add2");
									$(this).addClass("img_loading");
								});
								cusTreeTableDataValue=clickObj.attr("url");
								window.setTimeout(function(){
									cusTreeTableLoadLater(clickObj, cusTreeTableDataValue);
								}, 200);
							}
							else {
								$(this).next().show();
								$(this).find(".img_add2").each(function(){
									$(this).attr("title","点击收缩");
									$(this).removeClass("img_add2");
									$(this).addClass("img_remove2");
								});
							}
							
						}
						else{
							$(this).next().hide();
							$(this).find(".img_remove2").each(function(){
								$(this).removeClass("img_remove2");
								$(this).addClass("img_add2");
								$(this).attr("title","点击展开");
							});
						}
						enableTooltips();
						hideTooltip();
					});
				});
			}
			else{
				$(this).find(".img_add2").click(function(){
					cusTreeTableDataValue=$(this).attr("url");
					if($(this).parents("tr").next().css("display")=="none"){
						if($(this).parents("table").attr("ohterClose")!="false"){
							$(this).parents("table").find(".img_remove2").attr("title","点击展开");
							$(this).parents("table").find(".img_remove2").addClass("img_add2");
							$(this).parents("table").find(".img_remove2").removeClass("img_remove2");
							$(this).parents("tr").next().nextAll().filter(":has(table)").hide();
							$(this).parents("tr").next().prevAll().filter(":has(table)").hide();
							
						}
						$(this).removeClass("img_add2");
						if(cusTreeTableAjax==true){
							$(this).addClass("img_loading");
							clickObj=$(this)
							window.setTimeout(function(){cusTreeTableLoadLater(clickObj,cusTreeTableDataValue);},200);
						}
						else{
							//alert(11)
							$(this).attr("title","点击收缩");
							$(this).addClass("img_remove2");
							$(this).parents("tr").next().show();	
						}
						
					}
					else{
						$(this).parents("tr").next().hide();
						$(this).removeClass("img_remove2");
						$(this).addClass("img_add2");
						$(this).attr("title","点击展开");
					}
					enableTooltips();
					hideTooltip();
				});
			}
		});
		
	}
	
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
				var maxNum=$(this).find(".cusTab_normal_center").length
				if($(this).attr("iframeMode")!="true"){
					$(this).find(".cusTab_normal_center").each(function(i){
						$(this).addClass("hand");
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
							$(this).parents(".cusTab").find(".cusTab_con").hide();
							$(this).parents(".cusTab").find(".cusTab_con").eq(i).fadeIn();
						})
					})
				}
				else{
					$(this).find(".cusTab_normal_center a").each(function(i){
						$(this).addClass("hand");
						$(this).click(function(){
							$(this).parent().prevAll("li").removeClass("cusTab_current_left");
							$(this).parent().prevAll("li").removeClass("cusTab_current_center");
							$(this).parent().prevAll("li").removeClass("cusTab_current_middle");
							$(this).parent().prevAll("li").removeClass("cusTab_current_middle2");
							$(this).parent().prevAll("li").removeClass("cusTab_current_right");
							
							$(this).parent().nextAll("li").removeClass("cusTab_current_left");
							$(this).parent().nextAll("li").removeClass("cusTab_current_center");
							$(this).parent().nextAll("li").removeClass("cusTab_current_middle");
							$(this).parent().nextAll("li").removeClass("cusTab_current_middle2");
							$(this).parent().nextAll("li").removeClass("cusTab_current_right");
							
							$(this).parent().addClass("cusTab_current_center");
							if(i==0){
								$(this).parent().prev().addClass("cusTab_current_left");
								$(this).parent().next().addClass("cusTab_current_middle");
							}
							else if(i==maxNum-1){
								$(this).parent().prev().addClass("cusTab_current_middle2");
								$(this).parent().next().addClass("cusTab_current_right");
							}
							else{
								$(this).parent().prev().addClass("cusTab_current_middle2");
								$(this).parent().next().addClass("cusTab_current_middle");
							}
						})
					})
				}
									
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
	_initComplete();
});

function cusTreeTableLoadLater(obj,value){
	$.ajax({
		url: value,
		error: function(){
			try {
				top.Dialog.alert("数据加载失败，请检查dataPath是否正确");
			}
			catch(e){
				alert("数据加载失败，请检查dataPath是否正确");
			}
		},
		success: function(xml){
			var $tableContent=obj.parents("tr").next().find("table").parents("td");
			$tableContent.html("");
			var $newTable=$(xml);
			$newTable.appendTo($tableContent);
			tableRefresh($newTable);
			obj.removeClass("img_loading");
			obj.addClass("img_remove2");
			obj.attr("title","点击收缩");
			enableTooltips();
			hideTooltip();
			obj.parents("tr").next().show();
		}
	})
}

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

/*radio与checkbox*/
(function($) {	
	$.fn.custCheckBox = function(options){
		
		var defaults = {
				disable_all:	false,		
				hover:	true,					
				wrapperclass:	"group",		
				callback:	function(){}		
			};
		var opts = $.extend(defaults, options);
		
		return this.each(function() { 
	 		 var obj = $(this);
	 		 
		$.fn.buildbox = function(thisElm){
			if(broswerFlag=="IE6"||broswerFlag=="IE7"||broswerFlag=="IE8"||broswerFlag=="IE9"){
				$(thisElm).css({display:"none"}).before("<span class=\"cust_checkbox\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
			}
			else{
				$(thisElm).css({display:"none"}).before("<span class=\"cust_checkbox\">&nbsp;&nbsp;&nbsp;</span>");
			}
			
			var isChecked = $(thisElm).attr("checked");
			var boxtype = $(thisElm).attr("type");
			var disabled = $(thisElm).attr("disabled");
			
			if(boxtype === "checkbox")
			{
				$(thisElm).prev("span").addClass("checkbox");
				if(disabled || opts.disable_all){boxtype = "checkbox_disabled";}
			}
			else
			{
				$(thisElm).prev("span").addClass("radio");
				if(disabled || opts.disable_all){boxtype = "radio_disabled";}
			}
			
			if(isChecked)
				$(thisElm).prev("span").addClass("cust_"+boxtype+"_on");
			else
				$(thisElm).prev("span").addClass("cust_"+boxtype+"_off");
			
			if(opts.disable_all)
				$(thisElm).attr("disabled","disabled");
			
			$(thisElm).prev("span").prev("label").css({
				"cursor":"pointer"
			});
			
			$(thisElm).prev("span").prev("label").unbind().click(function(){
				if($(thisElm).attr("onclick")!=null){
					$($(thisElm).attr("onclick"));	
				}		
				
				if(!opts.disable_all)
				{
					var custbox = $(this).next("span");
					var boxtype = $(custbox).next("input").attr("type");
					var disabled = $(custbox).next("input").attr("disabled");

					if($(custbox).hasClass("checkbox"))
					{
						if($(custbox).hasClass("cust_"+boxtype+"_off") && !disabled)
						{
							if(broswerFlag=="IE6"||broswerFlag=="IE7"||broswerFlag=="IE8"||broswerFlag=="IE9"){
								$(custbox).removeClass("cust_"+boxtype+"_off").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_on").next("input").attr("checked","checked"); //turn on
							}
							else{
								$(custbox).removeClass("cust_"+boxtype+"_off").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_on").next("input").removeAttr("checked"); //turn on
							}
							
						}
						else if(!disabled)		
						{
							if(broswerFlag=="IE6"||broswerFlag=="IE7"||broswerFlag=="IE8"||broswerFlag=="IE9"){
								$(custbox).removeClass("cust_"+boxtype+"_on").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_off").next("input").removeAttr("checked"); //turn off
							}
							else{
								$(custbox).removeClass("cust_"+boxtype+"_on").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_off").next("input").attr("checked","checked"); //turn off
							}
							$(custbox).removeClass("cust_"+boxtype+"_hvr");
						}
					}
					else if(!disabled)
					{
						$(custbox).parent().find(".cust_checkbox").removeClass("cust_"+boxtype+"_on").addClass("cust_"+boxtype+"_off").next("input").removeAttr("checked");
						$(custbox).removeClass("cust_"+boxtype+"_off").addClass("cust_"+boxtype+"_on").next("input").attr("checked","checked"); //turn on
						$(custbox).removeClass("cust_"+boxtype+"_hvr");
					}
					opts.callback.call(this);					 
				}
						
			}).hover(function(){
				var custbox = $(this).next("span");
				if($(custbox).hasClass("cust_checkbox_off") && opts.hover)
					$(custbox).addClass("cust_checkbox_hvr");
				else if($(custbox).hasClass("cust_radio_off") && opts.hover)
					$(custbox).addClass("cust_radio_hvr");
				
			},function(){
				var custbox = $(this).next("span");
				if($(custbox).hasClass("cust_checkbox_off") && opts.hover)
					$(custbox).removeClass("cust_checkbox_hvr");
				else if($(custbox).hasClass("cust_radio_off") && opts.hover)
					$(custbox).removeClass("cust_radio_hvr");
				
			});
		
			$(thisElm).prev("span").unbind().click(function(){
			
				if($(thisElm).attr("onclick")!=null){
					$($(thisElm).attr("onclick"));	
				}	
				if(!opts.disable_all)
				{
					var boxtype = $(this).next("input").attr("type");
					var disabled = $(this).next("input").attr("disabled");

					if($(this).hasClass("checkbox"))
					{
						if($(this).hasClass("cust_"+boxtype+"_off") && !disabled)
							$(this).removeClass("cust_"+boxtype+"_off").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_on").next("input").attr("checked","checked"); //turn on
						else if(!disabled)
						{
							$(this).removeClass("cust_"+boxtype+"_on").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_off").next("input").removeAttr("checked"); //turn off
							$(this).removeClass("cust_"+boxtype+"_hvr");
						}
					}
					else if(!disabled)
					{
						$(this).parent().find(".cust_checkbox").removeClass("cust_"+boxtype+"_on").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_off").next("input").removeAttr("checked");
						$(this).removeClass("cust_"+boxtype+"_off").removeClass("cust_"+boxtype+"_hvr").addClass("cust_"+boxtype+"_on").next("input").attr("checked","checked"); //turn on
					}
					opts.callback.call(this);
				}
			}).hover(function(){
				if($(this).hasClass("cust_checkbox_off") && opts.hover)
					$(this).addClass("cust_checkbox_hvr");
				else if($(this).hasClass("cust_radio_off") && opts.hover)
					$(this).addClass("cust_radio_hvr");
			},function(){
				if($(this).hasClass("cust_checkbox_off") && opts.hover)
					$(this).removeClass("cust_checkbox_hvr");
				else if($(this).hasClass("cust_radio_off") && opts.hover)
					$(this).removeClass("cust_radio_hvr");
			});			
			
		};
		$.fn.buildbox($(obj));
	}); 	
};
})(jQuery);

function radioRefresh(compId){
	var $curSel; 
	if(typeof(compId)=="object"){
		$curSel=compId; 
	}
	else{
		$curSel=$("#"+compId);
	}
	$curSel.find("span").remove(); 
	$curSel.find("input:radio[class='']").custCheckBox();
}
function checkRefresh(compId){
	var $curSel; 
	if(typeof(compId)=="object"){
		$curSel=compId; 
	}
	else{
		$curSel=$("#"+compId);
	}
	$curSel.find("span").remove(); 
	$curSel.find("input:checkbox[class='']").custCheckBox();
}
/*radio与checkbox*/	

/*单选下拉框start*/
jQuery.fn.extend({
	selectbox: function(options) {
		return this.each(function() {
			new jQuery.SelectBox(this, options);
		});
	}
});
if (!window.console) {
	var console = {
		log: function(msg) { 
	 }
	}
}
var depth=500;
var elm_id = 1;
jQuery.SelectBox = function(selectobj, options) {
	var opt = options || {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected";
	opt.debug = opt.debug || false;
	elm_id++;
	var active = 0;
	var inFocus = false;
	var hasfocus = 0;
	var $select = $(selectobj);
	var $container = setupContainer(opt);
	var $mainCon=setupMainCon();
	var $input = setupInput(opt);
	var autoWidth=false;
	var edit=false;
	var colNum=1;
	var colWidth;
	var selTrueWidth;
	var windowsFlag=0;
	var containerClick=0; 
	if(window.navigator.userAgent.indexOf("Windows")>-1){
			windowsFlag=1;
	}
	
	selTrueWidth=$select.width();
	if(selTrueWidth=="0"){
		selTrueWidth=116;
	}
	
	var $selBtn;
	
	if(windowsFlag==1){
		
		if(broswerFlag=="Safari"){
			$selBtn= $("<input type='button' value=' ' class='selBtn_safari'/>");
		}
		if(broswerFlag=="IE9"){
			$selBtn= $("<input type='button' value=' ' class='selBtn selBtn_ie9'/>");
		}
		else{
			$selBtn= $("<input type='button' value=' ' class='selBtn'/>");
		}
	}
	else{
		$selBtn= $("<input type='button' value=' ' class='selBtn_linux'/>");
	}
	
	
	if($select.attr("disabled")==true){
		$selBtn.attr("disabled",true);
		$selBtn.addClass("selBtn_disabled");
	}
	
	var $loader=$("<div class='loader'>数据加载中...</div>");
	
	if($select.attr("autoWidth")!=null){
		if($select.attr("autoWidth")=="true"){
			autoWidth=true;
		}
		else{
			autoWidth=false;
		}
	}
	if($select.attr("colNum")!=null){
		colNum=parseInt($select.attr("colNum"));
	}
	if($select.attr("colWidth")!=null){
		colWidth=Number($select.attr("colWidth"));
	}
	if(colNum!=1){
		if(autoWidth){
			$input.width(selTrueWidth-20);
		}
		else{
			$input.width(96);
		}
		if(colWidth!=null){
			$container.width(colWidth*colNum+40);
		}
		else{
			var selWidth=Number(selTrueWidth);
			$container.width(selWidth*colNum+40);
		}
	}
	else if(autoWidth){
		$input.width(selTrueWidth-20);
		$container.width(selTrueWidth+6);
	}
	else{
		$input.width(96);
		var normalWidth=96+4+22;
		var selWidth=Number(selTrueWidth);
		$container.width(Math.max(normalWidth,selWidth));
	}
	
	$select.hide().before($mainCon);

	$mainCon.append($input);
	$mainCon.append($selBtn);
	$mainCon.append($container);
	$mainCon.append($loader);
	$loader.hide();
	
	init();
	
	if($select.attr("editable")!=null){
		if($select.attr("editable")=="true"){
			edit=true;
		}
		else{
			edit=false;
		}
	}
	if (!edit) {
		$input.css({
			"cursor":"pointer"
		});
		$input.click(function(){
			var oldHeight;
			var $lis=$container.find("li").length;
			if (colNum == 1) {
				oldHeight=$lis*26;
			}
			else{
				if($lis%colNum==0){
					oldHeight=$lis*26/colNum;
				}
				else{
					oldHeight=($lis-$lis%colNum)*26/colNum+26;
				}
			}
			$container.height(oldHeight);//每次展开时还原初始高度
			var usefulHeight=200;
			if(parentTopHeight>0){
				var parentMainHeight = window.top.document.documentElement.clientHeight;
				usefulHeight= parentMainHeight - parentTopHeight - parentBottomHeight - $mainCon.offset().top - 30;
			}
			else{
				usefulHeight=window.document.documentElement.clientHeight-($mainCon.offset().top-$(window).scrollTop()) - 30;
			}
			
			//获取内容页中slect所在位置距离最底部的高度
			if (usefulHeight < $container.height()) {//如果底部容纳不下
				if($mainCon.offset().top>$container.height()){//如果上不部能容纳下,向上展开
					if(broswerFlag=="IE8"||broswerFlag=="IE9"){
						$container.css({
							top: -$container.height()-17
						});
					}
					else if($.browser.msie){
						$container.css({
							top: -$container.height()
						});
					}
					else{
						$container.css({
							top: -$container.height()-7
						});
					}
				}
				else if(usefulHeight<100&&$mainCon.offset().top>usefulHeight){//如果上部也容纳不下，并且底部不足100,向上展开并强制高度，出滚动条
					$container.height($mainCon.offset().top);
					$container.css({
						"overflow":"auto"
					});
					if(broswerFlag=="IE8"||broswerFlag=="IE9"){
						$container.css({
							top: -$container.height()-17
						});
					}
					else if($.browser.msie){
						$container.css({
							top: -$container.height()
						});
					}
					else{
						$container.css({
							top: -$container.height()-7
						});
					}
				}
				else{//上面容纳不下，下面大于100，则向下展开，并强制高度，出滚动条
					$container.css({
						"overflow":"auto"
					});
					if(broswerFlag=="IE8"||broswerFlag=="IE9"){
						$container.css({
							top:8
						});
					}
					else if($.browser.msie){
						$container.css({
							top:25
						});
					}
					else{
						$container.css({
							top:18
						});
					}
					$container.height(usefulHeight);
				}
			}
			else{
				if(broswerFlag=="IE8"||broswerFlag=="IE9"){
					$container.css({
						top:8
					});
				}
				else if($.browser.msie){
					$container.css({
						top:25
					});
				}
				else{
					$container.css({
						top:18
					});
				}
			}
			if (!inFocus) {
				depth++;
				$mainCon.css({
					"zIndex": depth
				});
				setTimeout(showCon2, 100);
			}
			function showCon2(){
				$container.toggle();
			}
		}).focus(function(){
			if ($container.not(':visible')) {
				depth++;
				$mainCon.css({
					"zIndex": depth
				});
				inFocus = true;
				setTimeout(showCon, 100);
			}
			function showCon(){
				$container.show();
			}
		}).keydown(function(event){
			switch (event.keyCode) {
				case 38: // up
					event.preventDefault();
					moveSelect(-1);
					break;
				case 40: // down
					event.preventDefault();
					moveSelect(1);
					break;
				//case 9:  // tab 
				case 13: // return
					event.preventDefault(); // seems not working in mac !
					$('li.' + opt.hoverClass).trigger('click');
					break;
				case 27: //escape
					hideMe();
					break;
			}
		}).blur(function(){
			if ($container.is(':visible') && hasfocus > 0) {
				if (opt.debug) 
					console.log('container visible and has focus');
			}
			else {
				if(containerClick==1){
					//alert("aa")
				}
				else{
					hideMe();
				}
			}
		});
	}
	else{
		$input.css({
			"cursor":"text"
		});
		$input.change(function(){
			$select.attr("editValue",$(this).val());
		});
	}
	
	$selBtn
	.click(function(){
			var oldHeight;
			var $lis=$container.find("li").length;
			if (colNum == 1) {
				oldHeight=$lis*26;
			}
			else{
				if($lis%colNum==0){
					oldHeight=$lis*26/colNum;
				}
				else{
					oldHeight=($lis-$lis%colNum)*26/colNum+26;
				}
			}
			$container.height(oldHeight);//每次展开时还原初始高度
			var usefulHeight=200;
			if(parentTopHeight>0){
				var parentMainHeight = window.top.document.documentElement.clientHeight;
				usefulHeight= parentMainHeight - parentTopHeight - parentBottomHeight - $mainCon.offset().top - 30;
			}
			else{
				usefulHeight=window.document.documentElement.clientHeight-($mainCon.offset().top-$(window).scrollTop()) - 30;
			}
			//获取内容页中slect所在位置距离最底部的高度
			if (usefulHeight < $container.height()) {//如果底部容纳不下
				if($mainCon.offset().top>$container.height()){//如果上不部能容纳下,向上展开
					if(broswerFlag=="IE8"||broswerFlag=="IE9"){
						$container.css({
							top: -$container.height()-17
						});
					}
					else if($.browser.msie){
						$container.css({
							top: -$container.height()
						});
					}
					else{
						$container.css({
							top: -$container.height()-7
						});
					}
				}
				else if(usefulHeight<100&$mainCon.offset().top>usefulHeight){//如果上部也容纳不下，并且底部不足100,向上展开并强制高度，出滚动条
					$container.height($mainCon.offset().top);
					$container.css({
						"overflow":"auto"
					});
					if(broswerFlag=="IE8"||broswerFlag=="IE9"){
						$container.css({
							top: -$container.height()-17
						});
					}
					else if($.browser.msie){
						$container.css({
							top: -$container.height()
						});
					}
					else{
						$container.css({
							top: -$container.height()-7
						});
					}
				}
				else{//上面容纳不下，下面大于100，则向下展开，并强制高度，出滚动条
					$container.css({
						"overflow":"auto"
					});
					if(broswerFlag=="IE8"||broswerFlag=="IE9"){
						$container.css({
							top:8
						});
					}
					else if($.browser.msie){
						$container.css({
							top:25
						});
					}
					else{
						$container.css({
							top:18
						});
					}
					$container.height(usefulHeight);
				}
			}
			else{
				if(broswerFlag=="IE8"||broswerFlag=="IE9"){
					$container.css({
						top:8
					});
				}
				else if($.browser.msie){
					$container.css({
						top:25
					});
				}
				else{
					$container.css({
						top:18
					});
				}
			}
	
    if (!inFocus) {
		depth++;
		$mainCon.css({
			"zIndex":depth
		});
		setTimeout(showCon4,100);
		}
		function showCon4(){
	   	  $container.toggle();
	   }
	})
	.focus(function(){
	   if ($container.not(':visible')) {
	     	depth++;
		  $mainCon.css({
				"zIndex":depth
			});
		   inFocus = true;
		   setTimeout(showCon3,100);
	   }
	   function showCon3(){
	   	 $container.show();
	   }
	})
	.keydown(function(event) {	   
		switch(event.keyCode) {
			case 38: // up
				event.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				event.preventDefault();
				moveSelect(1);
				break;
			//case 9:  // tab 
			case 13: // return
				event.preventDefault(); 
				$('li.'+opt.hoverClass).trigger('click');
				break;
			case 27: //escape
			  hideMe();
			  break;
		}
	})
	.blur(function() {
		if ($container.is(':visible') && hasfocus > 0 ) {
			if(opt.debug) console.log('container visible and has focus');
		} 
		else {
			if(containerClick==1){
				//alert("aa")
			}
			else{
				hideMe();
			}
		}
	});
	function hideMe() { 
		hasfocus = 0;
		$container.hide();
		containerClick=0; 
	}
	function init() {
		$container.append(getSelectOptions($input.attr('id'))).hide();
		var width = $input.css('width');
    }
	function setupMainCon() {
		var $con=$("<div></div>");
		$con.addClass("mainCon");
		return $con;
	}
	function setupContainer(options) {
		var $container=$("<div></div>");
		$container.attr('id', elm_id+'_container');
		$container.addClass(options.containerClass);
		$container.css({
		});
		$container.mouseover(function(){
			containerClick=1;
		})
		$container.mouseout(function(){
			containerClick=0;
		})
		return $container;
	}
	function setupInput(options) {
		var input = document.createElement("input");
		var $input = $(input);
		$input.attr("id", elm_id+"_input");
		$input.attr("type", "text");
		$input.addClass(options.inputClass);
		if(broswerFlag=="IE8"){
			$input.addClass("selectboxFont");
		}
		$input.attr("autocomplete", "off");
		var seledit=false;
		if($select.attr("editable")!=null){
			if($select.attr("editable")=="true"){
				seledit=true;
			}
			else{
				seledit=false;
			}
		}
		if(!seledit){
			$input.attr("readonly", "readonly");
		}
		else{
			$input.attr("readonly", false);
		}
		$input.attr("tabIndex", $select.attr("tabindex")); 
		
		if($select.attr("disabled")==true){
			$input.attr("disabled",true);
			$input.addClass("inputDisabled");
		}
		return $input;	
	}
	function moveSelect(step) {
		var lis = $("li", $container);
		if (!lis || lis.length == 0) return false;
		active += step;
		if (active < 0) {
			active = lis.size();
		} else if (active > lis.size()) {
			active = 0;
		}
    	scroll(lis, active);
		lis.removeClass(opt.hoverClass);
		$(lis[active]).addClass(opt.hoverClass);
	}
	function scroll(list, active) {
      var el = $(list[active]).get(0);
      var list = $container.get(0);
      if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;      
      } else if(el.offsetTop < list.scrollTop) {
        list.scrollTop = el.offsetTop;
      }
	}
	function setCurrent() {	
		var li = $("li."+opt.currentClass, $container).get(0);
		var ar = (li.id).split('_');
		var idLength=ar[0].length+ar[1].length+2;
		var str=li.id;
		var el=str.substr(idLength,str.length);
		$select.val(el);
		$select.attr("relText",$(li).text());
		//$input.val($(li).html());
		var str = $(li).html().trim();
		$input.val(str);
		if(edit==true){
			$select.attr("editValue",$input.val());
		}
		$select.focus();
		return true;
	}
	function getCurrentSelected() {
		return $select.val();
	}
	function getCurrentValue() {
		return $input.val();
	}
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement('ul');
		var otpArr=[];
		var idxFix=0;
		var rel;
		if($select.attr("childId")!=null){
			rel=true;
		}
		var colNum=1;
		var colWidth;
		if($select.attr("colNum")!=null){
			colNum=parseInt($select.attr("colNum"));
		}
		if($select.attr("colWidth")!=null){
			colWidth=Number($select.attr("colWidth"));
		}
		$select.find('option').each(function() {
			otpArr.push($(this)[0]);
			var li = document.createElement('li');
			li.setAttribute('id', parentid + '_' + $(this).val());
			li.innerHTML = $(this).html();
			if ($(this).is(':selected')) {
				var isEditable;
				if($select.attr("editable")!=null){
					if($select.attr("editable")=="true"){
						isEditable=true;
					}
					else{
						isEditable=false;
					}
				}
				if(isEditable==true){
					$input.val($(this).html());
					$(li).addClass(opt.currentClass);
				}
				else{
					var str = $(this).html().trim();
					$input.val(str);
					//$input.val($(this).html());
					$(li).addClass(opt.currentClass);
				}
			}
			if(colNum!=1){
				$(li).addClass("li_left");
				if(colWidth!=null){
					$(li).width(colWidth);
				}
				else{
					var selWidth=Number(selTrueWidth);
					$(li).width(selWidth);
				}
			}
			ul.appendChild(li);
			
			$(li)
			.mouseover(function(event) {
				hasfocus = 1;
				if (opt.debug) console.log('over on : '+this.id);
				jQuery(event.target, $container).addClass(opt.hoverClass);
			})
			.mouseout(function(event) {
				hasfocus = -1;
				if (opt.debug) console.log('out on : '+this.id);
				jQuery(event.target, $container).removeClass(opt.hoverClass);
			})
			.click(function(event) {
			    var fl = $('li.'+opt.hoverClass, $container).get(0);
				if (opt.debug) console.log('click on :'+this.id);
				var myId = $(this).attr("id").split('_');
				$('#' + myId[0] + '_container' + ' li.'+opt.currentClass).removeClass(opt.currentClass); 
				$(this).addClass(opt.currentClass);
				setCurrent();
				$select.get(0).blur();
				hideMe();
				if($select.attr("onchange")!=null){
					$($select.attr("onchange"))	;
				}
				$input.removeClass("tipColor");
				if(rel){
					ajaxLoad($select,$select.val());
				}
			});
		});
		$select.find('optgroup').each(function(){
			var idx=getPosition($(this).children("option").eq(0)[0],otpArr);
			var groupValue=$(this).attr("label");
			$(ul).find("li").eq(idx+idxFix).before("<li class='group'>"+groupValue+"</li>");
			idxFix++;
		});
		return ul;
	}
	function ajaxLoad(obj,value){
				if (value != "") {
					var child = obj.attr("childId");
					var $childLoader=$("#" + child).prev().find("div[class=loader]");
					$childLoader.show();
					window.setTimeout(function(){loadLater(obj,value);},200);
				}
	}
	function loadLater(obj,value){
					var dataPath;
					if (obj.attr("childDataType") == null) {
						dataPath = obj.attr("childDataPath") + value;
					}
					else 
						if (obj.attr("childDataType") == "url") {
							dataPath = obj.attr("childDataPath") + value;
						}
						else {
							dataPath = obj.attr("childDataPath") + value + "." + obj.attr("childDataType");
						}
					$.ajax({
						url: dataPath,
						error: function(){
							try {
								top.Dialog.alert("数据加载失败，请检查childDataPath是否正确");
							}
							catch(e){
								alert("数据加载失败，请检查childDataPath是否正确");
							}
						},
						success: function(xml){
							var child = obj.attr("childId");
							var $childLoader=$("#" + child).prev().find("div[class=loader]");
							$childLoader.hide();
							var $childUL = $("#" + child).prev().find("ul");
							var childOptId = $("#" + child).prev().find(">div").attr("id").split("_")[0];
							var $childInput = $("#" + child).prev().find("input:text");
							var childSel=$("#" + child)[0];
							$childUL.html("");
							childSel.options.length = 0;
							$(xml).find("node").each(function(){
								var text = $(this).attr("text");
								var value = $(this).attr("value");
								var li = document.createElement('li');
								$(li).text(text);
								$(li).attr("relValue", value);
								$childUL.append($(li));
								childSel.options[childSel.options.length] = new Option(text, value);
								$(li).mouseover(function(event){
									jQuery(event.target).addClass(opt.hoverClass);
								});
								$(li).mouseout(function(event){
									jQuery(event.target).removeClass(opt.hoverClass);
								});
								$(li).mousedown(function(event){
									$('#' + childOptId + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
									$(this).addClass(opt.currentClass);
									$("#" + child).attr("relText", $(this).text());
									$("#" + child).val($(this).attr("relValue"));
									$childInput.val($(this).html());
									$("#" + child).prev().find(">div").hide();
									$("#" + child).focus();
									
									if ($("#" + child).attr("onchange") != null) {
										$($("#" + child).attr("onchange"));
									}
									var rel;
									if ($("#" + child).attr("childId") != null) {
										rel = true;
									}
									if (rel) {
										ajaxLoad($("#" + child), $("#" + child).val());
									}
								});
							});
							if($(xml).find("node").length==0){
								var li = document.createElement('li');
								$(li).text("无内容");
								$childUL.append($(li));
							}
							var $firstLI = $childUL.find("li").eq(0);
							$childInput.val($firstLI.text());
							$firstLI.addClass(opt.currentClass);
							$("#" + child).attr("relValue", $firstLI.attr("relValue"));
							$("#" + child).attr("relText", $firstLI.text());
						}
					});
	}
};
function selRefresh(compId){
	var $curSel;
	if(typeof(compId)=="object"){
		$curSel=compId;
	}
	else{
		$curSel=$("#"+compId);
	}
	$curSel.prev(".mainCon").remove();
	$curSel.selectbox();
}

	
/*单选下拉框*/

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






/*文本域改变高度*/
(function($) {
	var textarea, staticOffset;  // added the var declaration for 'staticOffset' thanks to issue logged by dec.
	var iLastMousePos = 0;
	var iMin = 32;
	var grip;
	$.fn.TextAreaResizer = function() {
		return this.each(function() {
		    textarea = $(this).addClass('processed'), staticOffset = null;
		    $(this).wrap('<div class="resizable-textarea"><span></span></div>')
		      .parent().append($('<div class="grippie"></div>').bind("mousedown",{el: this} , startDrag));
		    var grippie = $('div.grippie', $(this).parent())[0];
		    grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';
		});
	};
	function startDrag(e) {
		textarea = $(e.data.el);
		textarea.blur();
		iLastMousePos = mousePosition(e).y;
		staticOffset = textarea.height() - iLastMousePos;
		textarea.css('opacity', 0.25);
		$(document).mousemove(performDrag).mouseup(endDrag);
		return false;
	}
	function performDrag(e) {
		var iThisMousePos = mousePosition(e).y;
		var iMousePos = staticOffset + iThisMousePos;
		if (iLastMousePos >= (iThisMousePos)) {
			iMousePos -= 5;
		}
		iLastMousePos = iThisMousePos;
		iMousePos = Math.max(iMin, iMousePos);
		textarea.height(iMousePos + 'px');
		if (iMousePos < iMin) {
			endDrag(e);
		}
		return false;
	}
	function endDrag(e) {
		$(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
		textarea.css('opacity', 1);
		textarea.focus();
		textarea = null;
		staticOffset = null;
		iLastMousePos = 0;
	}

	function mousePosition(e) {
		return { x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop };
	};
})(jQuery);
/*文本域改变高度*/

/*水印*/
(function($) {
	$.fn.watermark = function(css, text) {
		return this.each(function() {
			var i = $(this), w;
			i.focus(function() {
				w && !(w=0) && i.removeClass(css).data('w',0).val('');
			})
			.blur(function() {
				!i.val() && (w=1) && i.addClass(css).data('w',1).val(text);
			})
			.closest('form').submit(function() {
				w && i.val('');
			});
			i.blur();
		});
	};
	$.fn.removeWatermark = function() {
		return this.each(function() {
			$(this).data('w') && $(this).val('');
		});
	};
})(jQuery);
/*水印*/

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

/*监测Caps键*/
jQuery.fn.caps = function(cb){
    return this.keypress(function(e){
        var w = e.which ? e.which : (e.keyCode ? e.keyCode : -1);
        var s = e.shiftKey ? e.shiftKey : (e.modifiers ? !!(e.modifiers & 4) : false);
        var c = ((w >= 65 && w <= 90) && !s) || ((w >= 97 && w <= 122) && s);
        cb.call(this, c);
    });
};
/*监测Caps键*/

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

/*上传控件*/
;(function($) {
	$.rebrushfileupload = {
		defaults: {
			button_text: ' ',
			class_container: 'fileupload-rebrush',
			class_field: 'fileupload-rebrush-field',
			class_button: 'fileupload-rebrush-button'
		}
	};
	
	$.fn.extend({
		rebrushfileupload: function(settings) {
			settings = $.extend({}, $.rebrushfileupload.defaults, settings);
			var attributes = ["padding-left", "padding-right", "margin-left", "margin-right", "border-left-width", "border-right-width"];
			$(this).wrap('<div class="file-container"/>');
			var obj_container_div = $(this).parent();
			if ( broswerFlag == "IE9"){
				obj_container_div.prepend('<input type="text" class="textinput" value="" readonly="readonly" /><input type="button" class="fileBtn fileBtn_ie9" value="' + settings['button_text'] + '" />');
			}
			else if ( broswerFlag == "Firefox"){
				obj_container_div.prepend('<input type="text" class="textinput" value="" readonly="readonly" /><input type="button" class="fileBtn fileBtn_ff" value="' + settings['button_text'] + '" />');
			}
			else{
				obj_container_div.prepend('<input type="text" class="textinput" value="" readonly="readonly" /><input type="button" class="fileBtn" value="' + settings['button_text'] + '" />');
			}
			var obj_rebrush_field = obj_container_div.find("input[type=text]");
			var obj_rebrush_button = obj_container_div.find("input[type=button]");
			var wrapperwidth = 0;
			for (var attr in attributes) {
				var val_field = Math.round(parseFloat(obj_rebrush_field.css(attributes[attr]) + 0)) + 0;
				var val_button = Math.round(parseFloat(obj_rebrush_button.css(attributes[attr]) + 0)) + 0;
				wrapperwidth += (isNaN(val_field) ? 0 : val_field) + (isNaN(val_button) ? 0 : val_button);
			}
			wrapperwidth += Math.round(parseFloat(obj_rebrush_field.width())) + Math.round(parseFloat(obj_rebrush_button.width()));
			if($.browser.msie){
				obj_rebrush_field.width($(this).width()-65);
				obj_container_div.css({
					'position':'relative',
					'width':$(this).width()+10,
					'overflow':'hidden'
				});
			}
			else{
				obj_rebrush_field.width($(this).width()-90);
				obj_container_div.css({
					'position':'relative',
					'width':$(this).width(),
					'overflow':'hidden'
				});
			}
			if (broswerFlag == "IE8" || broswerFlag == "IE9") {
				$(this).css({
					'position': 'absolute',
					'z-index': 2,
					'font-size': '12px',
					'opacity': '0',
					'left': '0px',
					'top': '-18px'
				});
			}
			else if (broswerFlag == "Firefox") {
				$(this).css({
					'position': 'absolute',
					'z-index': 2,
					'font-size': '12px',
					'opacity': '0',
					'left': '0px',
					'top': '-8px'
				});
			}
			else{
				$(this).css({
					'position': 'absolute',
					'z-index': 2,
					'font-size': '12px',
					'opacity': '0',
					'left': '0px',
					'top': '0px'
				});
			}
				
			$(this).change(function() {
				$(this).parent().find("input[type=text]").val($(this).val());
				if($(this).attr("showInfo")!="false"){
					try {
						$(this).attr("title",$(this).val());
						enableTooltips();
					}
					catch(e){}
				}
			});
		}
	});
})(jQuery);
/*上传控件*/

/*文本框文字清除功能*/
(function($) {
  $.fn.clearableTextField = function() {
    if ($(this).length>0) {
      $(this).bind('keyup change paste cut', onSomethingChanged);
    
      for (var i=0; i<$(this).length; i++) {
        trigger($($(this)[i]));
      }
    }
  }
  
  function onSomethingChanged() {
    trigger($(this));
  }
  
  function trigger(input) {
    if(input.val().length>0){
      add_clear_button(input);
    } else {
      remove_clear_button(input);
    }    
  }
  
  function add_clear_button(input) {
    if (!input.next().hasClass('text_clear_button')) {
      // appends div
      input.after("<div class='text_clear_button'></div>");
    
      var clear_button = input.next();
      var w = clear_button.outerHeight(), h = clear_button.outerHeight();
      
      input.css('padding-right', parseInt(input.css('padding-right')) + w + 1);
      input.width(input.width() - w - 1);
          
      var pos = input.position();
      var style = {};  
      style['left'] = pos.left + input.outerWidth(false) - (w+2);
      var offset = Math.round((input.outerHeight(true) - h)/2.0);
     // style['top'] = pos.top + offset;
      style['top'] = pos.top +$("#scrollContent").scrollTop() + offset;
      clear_button.css(style);
          
      clear_button.click(function(){
        input.val('');
        trigger(input);
      });
    }
  }
  
  function remove_clear_button(input) {
    var clear_button = input.next();
    
    if (clear_button.hasClass('text_clear_button')) {
      clear_button.remove();
      var w = clear_button.width();

      input.css('padding-right', parseInt(input.css('padding-right')) - w -1);
      input.width(input.width() + w + 1);
    }
  }
})(jQuery);
/*文本框文字清除功能*/

/*剩余字数功能*/
(function($) 
{
	$.fn.maxlength = function(options)
	{
		var settings = jQuery.extend(
		{
			events:				      [], 
			maxCharacters:		  10, 
			status:				      true, 
			statusClass:		    "maxNum", 
			statusText:			    "剩余字数",
			notificationClass:	"notification",	
			showAlert: 			    false,
			alertText:			    "输入字符超出限制.", 
			slider:				      true
		}, options );
		$.merge(settings.events, ['keyup']);
		return this.each(function() 
		{
			var item = $(this);
			var charactersLength = $(this).val().length;
			function updateStatus()
			{
				var charactersLeft = settings.maxCharacters - charactersLength;
				
				if(charactersLeft < 0) 
				{
					charactersLeft = 0;
				}
				item.next("div").html(settings.statusText+ " :"+ charactersLeft  );
			}
			function checkChars() 
			{
				var valid = true;
				if(charactersLength >= settings.maxCharacters) 
				{
					valid = false;
					item.addClass(settings.notificationClass);
					item.val(item.val().substr(0,settings.maxCharacters));
					showAlert();
				} 
				else 
				{
					if(item.hasClass(settings.notificationClass)) 
					{
						item.removeClass(settings.notificationClass);
					}
				}

				if(settings.status)
				{
					updateStatus();
				}
			}
			function showAlert() 
			{
				if(settings.showAlert)
				{
					alert(settings.alertText);
				}
			}
			function validateElement() 
			{
				var ret = false;
				
				if(item.is('textarea')) {
					ret = true;
				} else if(item.filter("input[type=text]")) {
					ret = true;
				} else if(item.filter("input[type=password]")) {
					ret = true;
				}

				return ret;
			}
			if(!validateElement()) 
			{
				return false;
			}
			$.each(settings.events, function (i, n) {
				item.bind(n, function(e) {
					charactersLength = item.val().length;
					checkChars();
				});
			});
			if(settings.status) 
			{
				item.after($("<div/>").addClass(settings.statusClass).html('-'));
				updateStatus();
			}
			if(!settings.status) 
			{
				var removeThisDiv = item.next("div."+settings.statusClass);
				
				if(removeThisDiv) {
					removeThisDiv.remove();
				}
			}
			if(settings.slider) {
				item.next().hide();
				
				item.focus(function(){
					item.next().slideDown('fast');
				});
				item.blur(function(){
					item.next().slideUp('fast');
				}); 
			}
		});
	};
})(jQuery);
/*剩余字数功能*/

/*文本域自适应高度*/
var colsDefault = 0;
var rowsDefault = 5;
function setDefaultValues(txtArea)
{
	colsDefault = txtArea.cols;
	rowsDefault = $(txtArea).attr("rows");
}
function bindEvents(txtArea)
{
	txtArea.onkeyup = function() {
		grow(txtArea);
	}
}
function grow(txtArea)
{
    var linesCount = 0;
    var lines = txtArea.value.split('\n');

    for (var i=lines.length-1; i>=0; --i)
    {
        linesCount += Math.floor((lines[i].length / colsDefault) + 1);
    }

    if (linesCount >= rowsDefault)
        txtArea.rows = linesCount + 1;
	else
        txtArea.rows = rowsDefault;
}
jQuery.fn.autoGrow = function(){
	return this.each(function(){
		setDefaultValues(this);
		bindEvents(this);
	});
};
/*文本域自适应高度*/

/*密码强度*/
(function($){
var passwordStrength = new function()
{
	this.countRegexp = function(val, rex)
	{
		var match = val.match(rex);
		return match ? match.length : 0;
	};
	
	this.getStrength = function(val, minLength)
	{	
		var len = val.length;
		
		// too short =(
		if (len < minLength)
		{
			return 0;
		}
		
		var nums = this.countRegexp(val, /\d/g),
			lowers = this.countRegexp(val, /[a-z]/g),
			uppers = this.countRegexp(val, /[A-Z]/g),
			specials = len - nums - lowers - uppers;
		
		// just one type of characters =(
		if (nums == len || lowers == len || uppers == len || specials == len)
		{
			return 1;
		}
		
		var strength = 0;
		if (nums)	{ strength+= 2; }
		if (lowers)	{ strength+= uppers? 4 : 3; }
		if (uppers)	{ strength+= lowers? 4 : 3; }
		if (specials) { strength+= 5; }
		if (len > 10) { strength+= 1; }
		
		return strength;
	};
	
	this.getStrengthLevel = function(val, minLength)
	{
		var strength = this.getStrength(val, minLength);
		switch (true)
		{
			case (strength <= 0):
				return 1;
				break;
			case (strength > 0 && strength <= 4):
				return 2;
				break;
			case (strength > 4 && strength <= 8):
				return 3;
				break;
			case (strength > 8 && strength <= 12):
				return 4;
				break;
			case (strength > 12):
				return 5;
				break;
		}
		
		return 1;
	};
};

$.fn.password_strength = function(options)
{
	var settings = $.extend({
		'container' : null,
		'minLength' : 6,
		'texts' : {
			1 : '非常弱',
			2 : '弱密码',
			3 : '强度一般',
			4 : '强密码',
			5 : '非常强'
		}
	}, options);
	
	return this.each(function()
	{
		if (settings.container)
		{
			var container = $(settings.container);
		}
		else
		{
			var container = $('<span/>').attr('class', 'password_strength');
			$(this).after(container);
		}
		
		$(this).keyup(function()
		{
			var val = $(this).val();
			if (val.length > 0)
			{
				var level = passwordStrength.getStrengthLevel(val, settings.minLength);
				var _class = 'password_strength_' + level;
				
				if (!container.hasClass(_class) && level in settings.texts)
				{
					container.text(settings.texts[level]).attr('class', 'password_strength ' + _class);
				}
			}
			else
			{
				container.text('').attr('class', 'password_strength');
			}
		});
	});
};

})(jQuery);
/*密码强度*/

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
function _initComplete(){
	try {
		initComplete();
	}
	catch(e){}
}
String.prototype.trim = function()
{
    // 用正则表达式将前后空格，用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
} 
