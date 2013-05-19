/*edited by fukai*/
var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)return data[i].identity}else if(dataProp)return data[i].identity}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();
function isIE6or7or8(){if(BrowserDetect.browser == "Explorer" && (BrowserDetect.version == 8 || BrowserDetect.version == 7 || BrowserDetect.version == 6)){return true;}else {return false;}}

(function($) {
	$.fn.lister = function(el){
		$.sortA = [];
		$.sortB = [];
		$.ie = isIE6or7or8();
		var mainUL = this;
		var otherUL = "#"+el;
		var outerDiv = $(mainUL).parent("div");
		$.create = function(element) {
		   return $(document.createElement(element));
		 }
		$.fn.fillLister = function(){
			$(mainUL).scrollTop(0).children("li").each(function(){
				if(!$(this).children("span").hasClass("left")){
					var spn = $.create("span").addClass("left").html("&#9658;");
					$(this).bind("click", sendTo).prepend(spn);
				}
			});
		}
		
		$.fn.sendAll = function(bool){
			if(bool){
				var elmnt = mainUL;
				var other = otherUL;
				var htm = "&#9668;";
			}
			else{
				var elmnt = otherUL;
				var other  = mainUL;
				var htm = "&#9658;";
			}
			$(elmnt).children("li[el]").each(function(){
				var li = $(this);
				var span = $(li).children("span");
				var ulid = $(this).parent("ul").attr("id");
				$(span).each(function(){$(this).html(htm)});
				if (bool) {
					$(otherUL).prepend(li);
				}
				else {
					$(mainUL).prepend(li);
				}
			});
			//console.log("sendAll");
			$(elmnt).empty();
			//$(elmnt).sortLists(other);
			//$(other).sortLists(elmnt);
		}
		
		$.fn.getList=function(attr){
			var rry = [];
			$(otherUL).children("li[el]").each(function(){
				if (!attr) {
					var txt = $.trim($(this).attr("el"));
				}
				else {
					var txt = $(this).attr(attr);
				}
				if (txt != "" && txt != null) {
					rry.push($.trim(txt));
				}
			});
			return rry.toString().replace(/\s+/g,'');
		}
		
		$.fn.tclass = function(clss){
			$(this).bind("mouseover",function(){
				$(this).addClass(clss);
			});
			$(this).bind("mouseout",function(){
				$(this).removeClass(clss);
			});
			return this;
		}
		
		function sendTo(bool){
			var li = $(this);
			var span = $(li).children("span");
			var ulid = $(this).parent("ul").attr("id");
			if(ulid == el){
				$(mainUL).prepend(li);
				$(span).removeClass("right").addClass("left").html("&#9658;");
			}
			else{
				$(otherUL).prepend(li);
				$(span).removeClass("left").addClass("right").html("&#9668;");
			}
			//$(mainUL).sortLists(otherUL);
			//$(otherUL).sortLists(mainUL);
			$(this).removeClass("hover").removeClass("listerHover");
		}
		$.fn.sendItem = function($item,bool){
			//alert(11)
			var li = $item;
			var span = $(li).children("span");
			var ulid = $item.parent("ul").attr("id");
			if(bool){
				if(ulid == el){
					//$(mainUL).prepend(li);
					//$(span).removeClass("right").addClass("left").html("&#9658;");
				}
				else{
					$(otherUL).prepend(li);
					$(span).removeClass("left").addClass("right").html("&#9668;");
				}
			}
			else{
				if(ulid == el){
					$(mainUL).prepend(li);
					$(span).removeClass("right").addClass("left").html("&#9658;");
				}
				else{
					//$(otherUL).prepend(li);
					//$(span).removeClass("left").addClass("right").html("&#9668;");
				}
			}
			//$(mainUL).sortLists(otherUL);
			//$(otherUL).sortLists(mainUL);
			$item.removeClass("hover").removeClass("listerHover");
		}
		
		$.fn.sortLists = function(el){


			var mylist = $(el);
			
			if (!$.ie) {
			 	$(mylist).children("li[tx]").each(function(){$(this).remove()});
				$(mylist).parent("div").children("a").each(function(){$(this).remove()});
				$(mylist).parent("div").children("span").each(function(){$(this).remove()});
			}

			var listitems = mylist.children('li').get();
			listitems.sort(function(a, b){
			   var compA = $(a).text().toUpperCase();
			   var compB = $(b).text().toUpperCase();
			   return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
			});
			
			if (!$.ie) {
				var prev = '';
				var ltr = '';
			}
			
			$.each(listitems, function(idx, itm) {
			if (!$.ie) {
				ltr = $(itm).text().substring(1,2);
				if(ltr.toUpperCase() != prev.toUpperCase()){
					$(mylist).append($.create("li").text(ltr).attr("tx",ltr.toUpperCase()).addClass("liTitles"));
					$(mylist).before($.create("a").bind("click",scrollA).text(ltr.toUpperCase())).before($.create("span").text(" | "));
				}
			}
				mylist.append(itm); 
				if (!$.ie) {
					prev = ltr;
				}
			});

		}

		function divNester(){	
			var listDivA = $.create("div").addClass("listerLinksLeft").append(mainUL);
			var listDivB = $.create("div").addClass("listerLinksRight").append($(otherUL));
			$(outerDiv).prepend(listDivA).append(listDivB);
		}
		
		function scrollA(){
			var ul  = $(this).parent("div").children("ul");
			var txt = $(this).text();
			$(ul).scrollTop(0);
			var os = $(ul).children("li[tx="+txt+"]").offset().top - $(ul).offset().top;
			$(ul).animate({scrollTop: os}, 500);
		}
		
		if ($(mainUL).parent("div").hasClass("listerLinksLeft") == false) {
			$(mainUL).parent("div").addClass("lister");
			$(mainUL).addClass("lister").children("li").each(function(){
				var spn = $.create("span").addClass("left").html("&#9658;");
				
				$(this).bind("click", sendTo)
				.tclass("listerHover")
				.prepend(spn)
				.bind("mouseover",function(){$(this).addClass("hover")})
				.bind("mouseout",function(){$(this).removeClass("hover")});
				
			}).scrollTop(0);
			divNester();
			$(otherUL).addClass("lister").children("li").each(function(){
				var newImg = $.create("span").addClass("right").html("&#9668;");
				$(this).bind("click", sendTo).tclass("listerHover").prepend(newImg);
			}).scrollTop(0);
			
		}
		//$(mainUL).sortLists(otherUL);
		//$(otherUL).sortLists(mainUL);
		return this;
	};
})(jQuery);