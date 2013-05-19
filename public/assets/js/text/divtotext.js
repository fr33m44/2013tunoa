/*edited by fukai */

(function($) {
	$.fn.divtotext = function(options) {
		//build main options before element iteration
		$.fn.divtotext.options = $.extend({}, $.fn.divtotext.defaults, options);
		
		//iterate and reformat each matched element
		this.each(function() {
			var $this = $(this);
			$this.click(function() {
				$.fn.divtotext.convert($(this));
			});
		});
		
		return false;
	};
	
	//convert the file
	$.fn.divtotext.convert = function($obj) {
		var html = $obj.html();
		$obj.unbind('click');
		
		$obj.addClass('divtotext');
		$obj.html('<input type="text" id="input-'+$obj.attr('id')+'" value="'+html+'" /><img src="'+$.fn.divtotext.options.saveImg+'" id="save-'+$obj.attr('id')+'" class="divtotextSave" />');
		
		
		
		$('#save-'+$obj.attr('id')).click(function(){
			$.fn.divtotext.convertBack($obj);
		});
		
		$('#input-'+$obj.attr('id')).keyup(function(e){
			var key = e.charCode || e.keyCode || 0;
			if (key == 13) {
				$.fn.divtotext.convertBack($obj);
		    }
		}).focus();
	}
	
	$.fn.divtotext.convertBack = function($obj) {
		var convert = false;
		var html = $('#input-'+$obj.attr('id')).val();
		
		$obj.removeClass('divtotext');
		
		$obj.html(html);
		$obj.click(function(){
			if (convert==true) {
				$.fn.divtotext.convert($(this));
			}
			convert = true;
		});
		
		//save the data if a url is provided
		if ($.fn.divtotext.options.saveUrl!='') {
			$.fn.divtotext.save($obj.attr('id'), html);
		}
		return false;
	}
	
	//expose the save function
	$.fn.divtotext.save = function(id, val, opts) {
		var opts = $.fn.divtotext.options;
		$.post(opts.saveUrl, {field: id, val: escape(val)}, function(resp){
			console.log(resp);
		});
	};

	//plugin defaults
	$.fn.divtotext.defaults = {
		saveUrl: '',
		saveImg: '../images/divtotext_save.gif'
	};
	$.fn.divtotext.options = {};

//end of closure
})(jQuery);

$(document).ready(function(){
	$('.editable').divtotext();
});