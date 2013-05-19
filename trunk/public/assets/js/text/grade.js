(function($){
	$.fn.grade = function(settings){
            settings = jQuery.extend({
                speed : "normal",
                addNum : 1,
                gradetype : "zoom"
            }, settings);
            return this.each(function() {
                $.fn.grade.point( $( this ), settings );
            });
        };
	$.fn.grade.point = function($this, settings){
            var num
            var clickLink=$("a",$this);
            $("<div class='aimbox'></div>").css(settings.fontStyle).insertAfter($(".numbox",$this)).html(num);
            if(settings.gradetype=="zoom"){
                clickLink.click(function(even){
                    num = parseInt($(".numbox",$this).html(),10);
                    $(".aimbox",$this).animate({"font-size":"60px","opacity":"0.5"},settings.speed,function(){
                        $(".aimbox,.numbox",$this).html(num+settings.addNum);
                    }).animate({"font-size":"36px","opacity":"1"},settings.speed);
                    even.preventDefault();
                });
            }else if(settings.gradetype=="upmove"){
                 clickLink.click(function(even){
                    num = parseInt($(".numbox",$this).html(),10);
                    var aimboxNum=settings.addNum>0?"+"+settings.addNum:settings.addNum;
                    $(".aimbox",$this).html(aimboxNum).css("opacity",0);
                    $(".aimbox",$this).animate({"font-size":"60px","top":"-100px","opacity":"1"},settings.speed,function(){
                        $(".numbox",$this).html(num+settings.addNum);
                    }).animate({"opacity":"0","top":"0","font-size":"18px"},settings.speed);
                    even.preventDefault();
                });
            }
	};
})(jQuery);

