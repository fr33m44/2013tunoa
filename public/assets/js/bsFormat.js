/*created by fukai */
var leftOverHeight=0;
var rightOverHeight=0;
var exitMenu=0;
var hexitMenu=0;
var progressFlag=0;
var oldBannerHeight=0;
var oldFootHeight=0;
var broswerFlag="";
$(function(){
	//判断浏览器
	 if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            var bb = window.navigator.userAgent.substring(30, 33);
            if(bb=="6.0"){
				broswerFlag="IE6";
			}
        }
	oldBannerHeight=$("#bs_bannercenter").outerHeight();
	oldFootHeight=$("#fbox").outerHeight();
	leftOverHeight=$("#hbox").outerHeight()+$("#fbox").outerHeight()+$("#lbox_topcenter").outerHeight()+$("#lbox_bottomcenter").outerHeight();
	rightOverHeight=$("#hbox").outerHeight()+$("#fbox").outerHeight()+$("#rbox_topcenter").outerHeight()+$("#rbox_bottomcenter").outerHeight();
	var pResizeTimer = null;
	autoReset();
	window.onresize = function(){
		if ( pResizeTimer ) clearTimeout (pResizeTimer);
   		pResizeTimer = setTimeout ("autoReset()", 100);
	}
	var ht = document.getElementsByTagName('html')[0];
    ht.style.overflow = 'hidden';
    $("#bs_center").toggle(function(){//点击主界面小箭头弹出或收回
		$("#hideCon").hide(200);
        $(this).removeClass("bs_leftArr");
        $(this).addClass("bs_rightArr");
		$(this).attr("title","展开面板");
		enableTooltips();
		hideTooltip();
        return false;
    }, function(){
         $("#hideCon").show();
        $(this).removeClass("bs_rightArr");
        $(this).addClass("bs_leftArr");
		$(this).attr("title","收缩面板");
		enableTooltips();
		hideTooltip();
        return false;
    })
	var font=12;
	try {
		var cookFont=jQuery.jCookie('fontSize');
		if(cookFont!=false){
			font=parseInt(cookFont);
		}
	}
	catch(e){}
	if(font==12){
		$(".fontChange").eq(2).find("a").addClass("fontChange_cur");
	}
	else if(font==14){
		$(".fontChange").eq(1).find("a").addClass("fontChange_cur");
	}
	else if(font==16){
		$(".fontChange").eq(0).find("a").addClass("fontChange_cur");
	}	
	$(".fontChange a").each(function(){
		$(this).click(function(){
			$(".fontChange a").removeClass("fontChange_cur");
			$(this).addClass("fontChange_cur");
			var num=parseInt($(this).attr("setFont"));
			jQuery.jCookie('fontSize',num);
			try {
				document.getElementById("frmright").contentWindow.changeFont(num);
			}
			catch(e){}
			try {
				document.getElementById("frmleft").contentWindow.changeFont(num);
			}
			catch(e){}
			
		});
	});
	
	if($("#vmenu").length>0){
		exitMenu=1;
		$(".vbaseItem").height(30);
		$(".vbaseItem").css({
			"overflow":"hidden"
		});
	}
	if($("#menu").length>0){
		hexitMenu=1;
	}
	enableTooltips();
	$("#fullSrceen").toggle(function(){
		$("#bs_bannercenter").hide();
		$("#bs_bannercenter").height(0);
		if(broswerFlag!="IE6"){
			$("#fbox").hide();
			$("#fbox").height(0);
		}
		else{
			$(".fontChange").hide();
			$(".fontTitle").hide();
		}
		if($(this).attr("hideLeft")=="true"){
			if($("#hideCon")[0].style.display!="none"){
				$("#bs_center").click();
			}
		}
		autoReset();
		$(this).text("退出全屏");
		$(this).removeClass("icon_btn_up");
		$(this).addClass("icon_btn_down");
	},function(){
		$("#bs_bannercenter").show();
		$("#fbox").show();
		$("#bs_bannercenter").height(oldBannerHeight);
		$("#fbox").height(oldFootHeight);
		if($(this).attr("hideLeft")=="true"){
			if($("#hideCon")[0].style.display=="none"){
				$("#bs_center").click();
			}
		}
		autoReset();
		$(this).text("全屏");
		$(this).removeClass("icon_btn_down");
		$(this).addClass("icon_btn_up");
	});
});


function autoReset(){
	leftOverHeight=$("#hbox").outerHeight()+$("#fbox").outerHeight()+$("#lbox_topcenter").outerHeight()+$("#lbox_bottomcenter").outerHeight();
	rightOverHeight=$("#hbox").outerHeight()+$("#fbox").outerHeight()+$("#rbox_topcenter").outerHeight()+$("#rbox_bottomcenter").outerHeight();
	 try {
			document.getElementById("frmleft").contentWindow.scrollContent();
        } 
     catch (e) {}
	 try {
			document.getElementById("frmright").contentWindow.scrollContent();
        } 
     catch (e) {}
	 var currentheight =document.documentElement.clientHeight;
	  try {
			var leftHeight= currentheight-leftOverHeight-parseInt($("#lbox").css("paddingTop"))-parseInt($("#lbox").css("paddingBottom"));
			$("#bs_left").height(leftHeight);
        } 
     catch (e) {}
	 try {
			 var rightHeight= currentheight-rightOverHeight-parseInt($("#rbox").css("paddingTop"))-parseInt($("#rbox").css("paddingBottom"));
			 $("#bs_right").height(rightHeight);
        } 
     catch (e) {}
	
	 if(exitMenu==1){
	 	try {
			$(".vbaseItem").show();
			var num=parseInt((leftHeight-10)/30)-1;
			var total=parseInt($(".vbaseItem").length);
			for(var i=num;i<total;i++){
				$(".vbaseItem").eq(i).hide();
			}
			
        } 
     	catch (e) {}
	 }
}

/*信息提示*/
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
	    el.onmousemove = Locate;
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
    document.getElementById("btc").style.top = (posy + 10) + "px";
    var clientWidth=window.document.documentElement.clientWidth;
	var tipWidth=$("#btc").width();
	if(clientWidth-tipWidth<posx - 20){
		document.getElementById("btc").style.left = (clientWidth-tipWidth) + "px";
	}
	else{
		document.getElementById("btc").style.left = (posx - 20) + "px";
	}
}
/*信息提示*/


jQuery.jCookie = function(sCookieName_, oValue_, oExpires_, oOptions_) {
	
	// cookies disabled
	if (!navigator.cookieEnabled) { return false; }
	
	// enfoce params, even if just an object has been passed
	var oOptions_ = oOptions_ || {};
	if (typeof(arguments[0]) !== 'string' && arguments.length === 1) {
		oOptions_ = arguments[0];
		sCookieName_ = oOptions_.name;
		oValue_ = oOptions_.value;
		oExpires_ = oOptions_.expires;
	}
	
	// escape characters
	sCookieName_ = encodeURI(sCookieName_);
	
	// basic error handling 
	if (oValue_ && (typeof(oValue_) !== 'number' && typeof(oValue_) !== 'string' && oValue_ !== null)) { return false; }
	
	// force values 
	var _sPath = oOptions_.path ? "; path=" + oOptions_.path : "";
	var _sDomain = oOptions_.domain ? "; domain=" + oOptions_.domain : "";
	var _sSecure = oOptions_.secure ? "; secure" : "";
	var sExpires_ = "";
	
	// write ('n delete ) cookie even in case the value === null 
	if (oValue_ || (oValue_ === null && arguments.length == 2)) {
	
		// set preceding expire date in case: expires === null, or the arguments have been (STRING,NULL)  
		oExpires_ = (oExpires_ === null || (oValue_ === null && arguments.length == 2)) ? -1 : oExpires_;
		
		// calculate date in case it's no session cookie (expires missing or expires equals 'session' )
		if (typeof(oExpires_) === 'number' && oExpires_ != 'session' && oExpires_ !== undefined) {
			var _date = new Date();
			_date.setTime(_date.getTime() + (oExpires_ * 24 * 60 * 60 * 1000));
			sExpires_ = ["; expires=", _date.toGMTString()].join("");
		}
		// write cookie
		document.cookie = [sCookieName_, "=", encodeURI(oValue_), sExpires_, _sDomain, _sPath, _sSecure].join("");
		
		return true;
	}
	
	// read cookie 
	if (!oValue_ && typeof(arguments[0]) === 'string' && arguments.length == 1 && document.cookie && document.cookie.length) {
		// get the single cookies 
		var _aCookies = document.cookie.split(';');
		var _iLenght = _aCookies.length;
		// parse cookies
		while (_iLenght--) {
			var _aCurrrent = _aCookies[_iLenght].split("=");
			// find the requested one 
			if (jQuery.trim(_aCurrrent[0]) === sCookieName_) { return decodeURI(_aCurrrent[1]); }
		}
	}
	
	return false;
};
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
function myTestFunc(){
	alert($("#_Container_a1").height())
	
}
