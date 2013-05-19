
/**
 * 淡隐淡现
**/
$.switchable.addEffect("fade", function(i, done) {
	var self = this,
		cfg = self.getCfg(),
		items = self.getPanels(),
		thisItem = self.getVisiblePanel(i);

	items.hide();
	thisItem.fadeIn(cfg.speed * 1000, done);
});

/**
 * 滚动
 *
 * Panel's HTML Makeup:
 * <container>
 *    <wrapper>
 *       <panel />
 *       <panel />
 *       <panel />
 *    </wrapper>
 * </container>
**/
$.switchable.addEffect("scroll", function(i, done) {
	var self = this,
		cfg = self.getCfg(),
		thisItem = self.getVisiblePanel(i),
		wrap = self.getPanels().parent(),
		current = self.getIndex(),
		len = self.getTriggers().length - 1,

		// 从第一个反向滚动到最后一个 or 从最后一个正向滚动到第一个
		isCritical = (current === 0 && i === len) || (current === len && i === 0),
		isBackward = (current === 0 && i === len) ? true : false,
		prop = cfg.vertical ? { top : -thisItem.position().top } : { left : -thisItem.position().left };
	
	// 开始动画
	if ( wrap.is(":animated") ) {
		wrap.stop(true);
	}
	wrap.animate(prop, cfg.speed * 1000, cfg.easing, function() {
		done.call();
		// 复原位置（为了兼容plugin-carousel.js）
		if ( isCritical ) {
			self.resetPosition(isBackward);
		}
	});
});


;(function($) {		

	var t = $.switchable; 
	t.plugin = t.plugin || {};
	
	t.plugin.autoplay = {
		cfg: {
			// 自动播放
			autoplay: true,
			// 自动播放间隔
			interval: 3, // 3000ms
			// 鼠标悬停暂停
			autopause: true,
			api: false
		}
	};	
	
	$.fn.autoplay = function(cfg) { 

		if ( typeof cfg == 'number' ) {
			cfg = { interval: cfg };	
		}
		
		var opts = $.extend({}, t.plugin.autoplay.cfg), ret;
		$.extend(opts, cfg);   	
		
		this.each(function() {		
				
			var api = $(this).switchable();			
			if ( api ) {
				ret = api;
			}
			
			var timer, hoverTimer, stopped = true;
	
			api.play = function() {
	
				// do not start additional timer if already exists
				if ( timer ) {
					return;
				}
				
				stopped = false;
				
				// construct new timer
				timer = setInterval(function() {
					api.next();
				}, opts.interval*1000);
				
				api.next();
			};	

			api.pause = function() {
				timer = clearInterval(timer);	
			};
			
			// when stopped - mouseover won't restart 
			api.stop = function() {
				api.pause();
				stopped = true;	
			};
		
			/* when mouse enters, autoplay stops */
			if ( opts.autopause ) {
				api.getPanels().hover(function() {			
					api.pause();
					clearTimeout(hoverTimer);
				}, function() {
					if ( !stopped ) {						
						hoverTimer = setTimeout(api.play, opts.interval*1000);						
					}
				});
			}			
			
			if ( opts.autoplay ) {
				setTimeout(api.play, opts.interval*1000);				
			}

		});
		
		return opts.api ? ret : this;
		
	}; 
	
})(jQuery);

;(function($) {		

	$.fn.carousel = function() {

		this.each(function() {
				
			var api = $(this).switchable(),
				cfg = api.getCfg(),
				panels = api.getPanels(),
				wrap = panels.parent(),

				index = api.getTriggers().length -1,
				firstItem = panels.slice(0, cfg.steps),
				lastItem = panels.slice(index * cfg.steps),

				lastPosition = cfg.vertical ? lastItem.position().top : lastItem.position().left,
				direction = cfg.vertical ? "top" : "left",

				allow = panels.length > cfg.visible,
				size = 0;

			panels.css("position", "relative").each(function() {
				size += cfg.vertical ? $(this).outerHeight(true) : $(this).outerWidth(true);
			});

			if ( allow && lastItem.length < cfg.visible ) {
				wrap.append( panels.slice(0, cfg.visible).clone().addClass("clone") );
			}

			$.extend(api, {

				move: function(i) {
					if ( wrap.is(":animated") || !allow ) {
						return this;
					}

					// 从第一个反向滚动到最后一个
					if ( i < 0 ) {
						// 调整位置
						this.adjustPosition(true);
						// 触发最后一组 panels
						return this.click(index);
					}
					// 从最后一个正向滚动到第一个
					else if ( i > index ) {
						// 调整位置
						this.adjustPosition(false);
						// 触发第一组 panels
						return this.click(0);
					}
					else {
						return this.click(i);
					}
				}, 

				adjustPosition: function(isBackward) {
					var theItem = isBackward ? lastItem : firstItem;

					// 调整 panels 到下一个视图中
					$.each(theItem, function() {
						$(this).css(direction, isBackward ? -size : size + "px");
					});
				},

				resetPosition: function(isBackward) {
					var theItem = isBackward ? lastItem : firstItem;
					
					// 滚动完成后，复位到正常状态
					$.each(theItem, function() {
						$(this).css(direction, "0px");
					});
					// 瞬移到正常位置
					wrap.css(direction, isBackward ? -lastPosition : 0 + "px");
				}
			
			});

		});
		
		return this;
		
	}; 
	
})(jQuery);

