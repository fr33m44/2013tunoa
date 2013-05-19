/*edited by fukai*/
(function ($) {
  $.fn.readmore = function (settings) {

    var opts =  $.extend({}, $.fn.readmore.defaults, settings);

    this.each(function () {
      $(this).data("opts", opts);
      if ($(this).html().length > opts.substr_len) {
        abridge($(this));
        linkage($(this));
      }
    });

    function linkage(elem) {
      elem.append(elem.data("opts").more_link);
     var $more=elem.children(".more");
	
	  $more.click( function () {
		 if(broswerFlag=="IE6"||broswerFlag=="IE7"){
		 	if($(this).attr("href")==""){
				$(this).hide();
	        	$(this).siblings("span:not(.hidden)").hide().siblings("span.hidden").animate({'opacity' : 'toggle'},1000);
			}
		 }
		 else{
		 	if($(this).attr("href")==null){
				$(this).hide();
	        	$(this).siblings("span:not(.hidden)").hide().siblings("span.hidden").animate({'opacity' : 'toggle'},1000);
			}
		 }
        
		
      });
    }

    function abridge(elem) {
      var opts = elem.data("opts");
      var txt = elem.html();
      var len = opts.substr_len;
      var dots = "<span>" + opts.ellipses + "</span>";
      var shown = txt.substring(0, len) + dots;
      var hidden = '<span class="hidden" style="display:none;">' + txt.substring(len, txt.length) + '</span>';
      elem.html(shown + hidden);
    }
    
    return this;
  };

  $.fn.readmore.defaults = {
    substr_len: 500,
    ellipses: '&#8230;',
    more_link: ''
  };

})(jQuery);
