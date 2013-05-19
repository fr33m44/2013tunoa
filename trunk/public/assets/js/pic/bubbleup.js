
(function($){
	$.fn.bubbleup = function(settings){
		settings=$.extend({
			tooltip: false,//是否提示文本
			scale:120,//放大后的图片宽度
			fontFamily:'Helvetica, Arial, sans-serif',//提示文本字体
			color:'#333333',//提示文本字体颜色
			fontSize:12,//提示文本字体大小
			fontWeight:'bold',//提示文本字体粗细
			inSpeed:'fast',//鼠标划过放大时的速度
			outSpeed:'fast'//鼠标已出缩小时时的速度
			},settings);
			return this.each(function(){
				$.fn.bubbleup.runing( $( this ), settings );
			})
	};
	$.fn.bubbleup.runing=function($this,settings){
		var smallImgW=$this.width();
		$this.mouseover(function(){
			if (settings.tooltip) {
				tip=$('<div>' + $(this).attr('alt') + '</div>').css({
					fontFamily: settings.fontFamily,
					color: settings.color, 
					fontSize: settings.fontSize, 
					fontWeight: settings.fontWeight, 
					position: 'absolute', 
					zIndex: 100000
				}).remove().css({top:0,left: 0,visibility:'hidden',display:'block'}).appendTo(document.body);
				var position=$.extend({},$this.offset(),{width:this.offsetWidth,height:this.offsetHeight});
				var tipWidth = tip[0].offsetWidth;
				var tipHeight = tip[0].offsetHeight;
				tip.stop().css({
						top: position.top - tipHeight, 
						left: position.left + position.width / 2 - tipWidth / 2,
						visibility: 'visible'
					}).animate({top:'-='+(settings.scale/2-smallImgW/2)},settings.inSpeed); 
			}
			$this.closest('li').css({'z-index':100000});
			$this.stop().css({'z-index':100000,'top':0,'left':0,'width':smallImgW}).animate({
				left:-settings.scale/2+smallImgW/2,
				top:-settings.scale/2+smallImgW/2,
				width:settings.scale
			},settings.inSpeed)
		}).mouseout(function(){
			$this.closest('li').css({'z-index':100});
			$this.closest('li').next().css({'z-index':0});
			$this.closest('li').next().css({'z-index':0});
			$this.closest('li').next().children('img').css({'z-index':0});
			if(settings.tooltip){tip.remove()}
			$this.stop().animate({left:0,top:0,width:smallImgW},settings.outSpeed,function(){
				$this.css({'z-index':0});
			});
		});
		
	}
})(jQuery);