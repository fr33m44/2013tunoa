$(function(){
	//密码框检测大写键
	$("input:password").each(function(){
		$(this).caps(function(caps){
		    if(jQuery.browser.safari) return; 
		    if(caps){
				$.cursorMessage('注意：大写键开启了');
		    }else{
		    }
		});
	})
})

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