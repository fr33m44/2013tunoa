/*created by fukai*/
$(function(){
	$("form[class=stepForm]").each(function(){
		if($(this).attr("stepFormTitle")=="true"){
			var $mainTitle=$("<div class='titleMain'><ul></ul><div class='clear'></div></div>");
			$(this).prepend($mainTitle)
			var $stepCon=$("form[class=stepForm] div[class=stepForm]");
			var $firstLi=$("<li class='stepFormTitleCur'><div class='left'></div><div class='center'></div><div class='right'></div><div class='clear'></div></li>");
			$firstLi.find(".center").text($stepCon.eq(0).attr("stepFormTitle"))
			$mainTitle.append($firstLi)
			var otherLiNum=$stepCon.length-1;
			for(var i=0;i<otherLiNum;i++){
				var $otherLi=$("<li class='stepFormTitle'><div class='left'></div><div class='center'></div><div class='right'></div><div class='clear'></div></li>")
				$otherLi.find(".center").text($stepCon.eq(i+1).attr("stepFormTitle"))
				$mainTitle.append($otherLi)
			}
			var $clear=$("<div class='clear'></div>");
			$mainTitle.append($clear);
			$mainTitle.after($("<br/>"))
			/*
var paddingLeft=($(this).width()-(otherLiNum+1)*119)/2-20;
			$mainTitle.css({
				"paddingBottom":"20px",
				"paddingLeft":paddingLeft
			})
*/
		}
	})
	$("form[class=stepForm] div[class=stepForm]").not(':eq(0)').hide()
	var curFlag=0;
	$("input:button").each(function(){
		var selfId=$(this).attr("selfTarget");
		if($(this).attr("nextTarget")!=null){
			var nextId=$(this).attr("nextTarget");
			$(this).click(function(){
				var access=true;
				try {
					access=$('#'+selfId).validationEngine({returnIsValid:true})
				}
				catch(e){}
				if(access==true){
					curFlag++
					$('#'+selfId).hide();
					$('#'+nextId).show(500);
					$("form[class=stepForm] div[class=titleMain] li").each(function(){
						$(this)[0].className="stepFormTitle";
					})
					try {
						$("form[class=stepForm] div[class=titleMain] li").eq(curFlag)[0].className="stepFormTitleCur";
					}
					catch(e){}
				}
			})
		}
		else if($(this).attr("prevTarget")!=null){
			var prevId=$(this).attr("prevTarget");
			$(this).click(function(){
				curFlag--
				$('#'+selfId).hide();
				$('#'+prevId).fadeIn(500);
				$("form[class=stepForm] div[class=titleMain] li").each(function(){
					$(this)[0].className="stepFormTitle";
				})
				try {
					$("form[class=stepForm] div[class=titleMain] li").eq(curFlag)[0].className="stepFormTitleCur";
				}
				catch(e){}
			})
		}
	})
})