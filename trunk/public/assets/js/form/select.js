var parentTopHeight=0;
var broswerFlag;
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
	//单选下拉框select渲染
	$(".selectinput").each(function(){
		$(this).selectbox();
	});
});

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


function getPosition(value,array){//获得数组值的索引
		for(var i=0;i<array.length;i++){
			if(value==array[i]){
				return i;
				break;
			}
		}
	}
String.prototype.trim = function()
{
    // 用正则表达式将前后空格，用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
} 