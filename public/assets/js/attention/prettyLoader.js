/*edited by fukai*/
(function($) {
	$.prettyLoader = {version: '1.0.1'};
	var loaderPrePath="../";
	if($("#skin").attr("prePath")!=null){
		loaderPrePath=$("#skin").attr("prePath");
		
	}
	$.prettyLoader = function(settings) {
		settings = jQuery.extend({
			animation_speed: 'fast', 
			bind_to_ajax: true, 
			delay: false, 
			loader: loaderPrePath+'images/loading/ajax-loader.gif', 
			offset_top: 13,
			offset_left: 10 
		}, settings);
		
		scrollPos = _getScroll();

		imgLoader = new Image();
		imgLoader.onerror = function(){
			alert('图片路径有误');
		};
		imgLoader.src = settings.loader;
		
		if(settings.bind_to_ajax)
			jQuery(document).ajaxStart(function(){ $.prettyLoader.show() }).ajaxStop(function(){ $.prettyLoader.hide() });

		$.prettyLoader.positionLoader = function(e){
      		e = e ? e : window.event;

			cur_x = (e.clientX) ? e.clientX : cur_x;
			cur_y = (e.clientY) ? e.clientY : cur_y;

			left_pos = cur_x + settings.offset_left + scrollPos['scrollLeft'];
			top_pos = cur_y + settings.offset_top + scrollPos['scrollTop'];
			
			$('.prettyLoader').css({
				'top':top_pos,
				'left':left_pos
			});
		}
	
		$.prettyLoader.show = function(delay){
			if($('.prettyLoader').size() > 0) return;
			
			scrollPos = _getScroll();
			
			$('<div></div>')
				.addClass('prettyLoader')
				.addClass('prettyLoader_'+ settings.theme)
				.appendTo('body')
				.hide();
			
			if($.browser.msie && $.browser.version == 6)
				$('.prettyLoader').addClass('pl_ie6');

			$('<img />')
				.attr('src',settings.loader)
				.appendTo('.prettyLoader');

			$('.prettyLoader').fadeIn(settings.animation_speed);

			$(document).bind('click',$.prettyLoader.positionLoader);
			$(document).bind('mousemove',$.prettyLoader.positionLoader);
			$(window).scroll(function(){ scrollPos = _getScroll(); $(document).triggerHandler('mousemove'); });
			
			delay = (delay) ? delay : settings.delay;
			
			if(delay){
				setTimeout(function(){ $.prettyLoader.hide() }, delay);
			}
		};

		$.prettyLoader.hide = function(){
			$(document).unbind('click',$.prettyLoader.positionLoader);
			$(document).unbind('mousemove',$.prettyLoader.positionLoader);
			$(window).unbind('scroll');
						
			$('.prettyLoader').fadeOut(settings.animation_speed,function(){
				$(this).remove();
			});
		};
		
		function _getScroll(){
			if (self.pageYOffset) {
				return {scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};
			} else if (document.documentElement && document.documentElement.scrollTop) { 
				return {scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};
			} else if (document.body) {// all other Explorers
				return {scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};
			};
		};
		
		return this;
	};

})(jQuery);

$(function(){
	$.prettyLoader();
})
