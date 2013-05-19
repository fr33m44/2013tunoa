/*edited by fukai*/

(function($){
	$.fn.hintbox = function(options){
		// selector
		inputs = this;
	
		// press actions
		var ACTIONS = {
			ENTER: 13,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40,
			SPACE: 32,
			PAGEDOWN: 34
		}
		
		// match rules
		var MATCHRULE = {
			STARTS_WITH: "S",
			ENDS_WITH: "E",
			CONTAINS: "C"
		}
		
		// default options
		var defaults = {
			backgroundColor: '#3369F9',
			color: '#FFF',
			autoDimentions: false, /* if autoDimentions is true,  width option will assume the input element width.  */
			minChars: 1,
			immediateList: false,
			width: '120px',
			separator: '\n',
			delay: 400, //milliseconds,
			slideDownTime: 0, //milliseconds
			slideUpTime: 0,
			inputClass: '',
			inputLoadingClass: 'hintbox_loading',
			hintboxContainerClass: 'hintbox_list_container',
			zIndex: 100,
			url: '',
			params: { },
			extraParams: '',
			json: false,
			useCache: true,
			matchHint: true,
			matchRule: MATCHRULE.STARTS_WITH, // options can be: S (Starts with), E (Ends with), C (Contains)
			sort: false,
			limit: 0,
			onBeforeListLoad: function(){ },
			onListRetrieved: function(){ },
			onListLoaded: function(){ },
			onItemSelected: function(){ }
		}
		
		// check  given options
		if (options.matchRule != undefined){
			options.matchRule = options.matchRule.toUpperCase();
			if(options.matchRule != MATCHRULE.STARTS_WITH && options.matchRule != MATCHRULE.ENDS_WITH && options.matchRule != MATCHRULE.CONTAINS){
				options.matchRule = defaults.matchRule;
			}
		}
		
		// merge options
		var options = jQuery.extend(defaults, options);
		
		// levenshtein distance between words 'a' and 'b'
		var levenshtein = function(a, b){
			var i;
			var j;
			var cost;
			var d = new Array();
		 
			if (a.length == 0){ return b.length; }
			if (b.length == 0){ return a.length; }
		 
			for (i = 0; i <= a.length; i++){
				d[i] = new Array();
				d[i][0] = i;
			}
		 
			for (j = 0; j <= b.length; j++){
				d[0][j] = j;
			}
		 
			for (i = 1; i <= a.length; i++){
				for (j = 1; j <= b.length; j++){
					cost = (a.charAt(i - 1) == b.charAt(j - 1)) ? 0 : 1;
					d[ i ][ j ] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
					if(i > 1 && j > 1 &&  a.charAt(i - 1) == b.charAt(j - 2) && a.charAt(i - 2) == b.charAt(j - 1)){
						d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
					}
				}
			}
		 
			return d[a.length][b.length];
		}
		
		// start service functions
		var bindKeyboard = function(input){
			// manage keyboard behaviours
			jQuery(document).bind('keydown', function(event){
				selectHintElement(event, input);
			});
		}
		
		var unbindKeyboard = function(){
			jQuery(document).unbind('keydown');
		}
		
		var rebindKeyboard = function(input){
			unbindKeyboard();
			bindKeyboard(input);
		}
		
		var getUnsortedList = function(input){
			return getHintListContainer(input).find('ul');
		}
		
		var getHintListContainer = function(input){
			return input.next('.' + options.hintboxContainerClass);
		}
		
		var hintListContainerExists = function(input){
			return getHintListContainer(input).get() != '';
		}
		// end service functions
		
		// init and manage hintbox
		var init = function(input){
			input.attr('autocomplete', 'off');
		
			var prevQueryString = "";
			var currentQueryString = "";
			
			input.keyup(function(event){
				if (event.keyCode != ACTIONS.UP && event.keyCode != ACTIONS.DOWN && 
				    event.keyCode != ACTIONS.ENTER && event.keyCode != ACTIONS.LEFT && 
					event.keyCode != ACTIONS.RIGHT && event.keyCode != ACTIONS.PAGEDOWN){
					
					currentQueryString = jQuery.trim(input.val());
					if(currentQueryString == ""){
						getHintListContainer(input).slideUp(options.slideUpTime);
					}
					else {
						if (currentQueryString != prevQueryString){
							if(currentQueryString.length >= options.minChars){
								// load ajax list
								setTimeout(function(){
									loadList(input, currentQueryString);
								}, options.delay);
							}
							else {
								// hide ajax list
								getHintListContainer(input).slideUp(options.slideUpTime);
							}
						}
					}
					
					// update prevQueryString
					prevQueryString = currentQueryString;
				}
				
				
				// hide dropdown list when pressed enter from input text
				if (event.keyCode == ACTIONS.ENTER){
					prevQueryString = "";
					currentQueryString = "";
					var container = getHintListContainer(input);
					if (container.get() != ""){
						closeHintResults(input);
					}					
				}
				//if immediateList option is enabled
				if(options.immediateList){
					if (event.keyCode == ACTIONS.PAGEDOWN){
						currentQueryString = jQuery.trim(input.val());
						if(currentQueryString == ""){
							loadList(input, currentQueryString);
						}
					}
				}
				
				
			});
		}
		
		// select li lement by click
		var selectHintElementByClick = function(input){
			if (hintListContainerExists(input)){
				var unsortedList = getUnsortedList(input);
				unsortedList.find('li').click(function(){
					var item = jQuery(this);
					input.val(item.text());
					closeHintResults(input);
					// execute onItemSelected event
					options.onItemSelected(item);
				});
			}
		}
		
		// navigte into hint list and manage li element selection by keyboard
		var selectHintElement = function(event, input){
			if (hintListContainerExists(input)){
				var cssBackup = jQuery.data(input, "cssBackup");
				var unsortedList = getUnsortedList(input);
				var firstLi = unsortedList.find('li:first');
				var lastLi = unsortedList.find('li:last');
				
				// selectd proper li element
				var selectedLi = unsortedList.find('.selected');
				
				// select fist navication li element
				if (selectedLi.get() == ''){
					if (event.keyCode == ACTIONS.DOWN){
						selectedLi = firstLi;
					}
					else if (event.keyCode == ACTIONS.UP){
						selectedLi = lastLi;
					}
					selectLi(selectedLi);
					return;
				}	
				
				// move selection down
				if (event.keyCode == ACTIONS.DOWN){
					deselectLi(selectedLi, cssBackup);
					var nextLi = selectedLi.next('li');
					if (nextLi.get() == ''){
						nextLi = firstLi;	
						input.focus();
						unsortedList.find('.selected').removeClass('selected');
					}
					else {
						selectedLi = nextLi;
						selectLi(selectedLi);
					}
				}
				
				// move selection up
				else if (event.keyCode == ACTIONS.UP){
					deselectLi(selectedLi, cssBackup);
					var prevLi = selectedLi.prev('li');
					if (prevLi.get() == ''){
						prevLi = lastLi;
						input.focus();
						unsortedList.find('.selected').removeClass('selected');
					}
					else {
						selectLi(prevLi);
						selectedLi = prevLi;
					}
				}
				
				// select list value enter
				else if (event.keyCode == ACTIONS.ENTER){
					if (selectedLi.get() != ''){
						input.val(selectedLi.text());
					}
					closeHintResults(input);
					options.onItemSelected(selectedLi);
				}
				
			}
		}
			
		// build URL
		var buildUrl = function(queryString){
			var url = options.url;
			url.indexOf('?') != -1 ? url += '&' : url += '?';
			url += 'q=' + escape(queryString);
			
			// add params
			for (i in options.params){
				url += '&' + i + '=' + escape(jQuery.trim(options.params[i]));
			}
			var extraParams = jQuery.trim(options.extraParams);
			if(extraParams.length > 0){
				if(extraParams.indexOf('&') > 0){
					url += '&' + extraParams;
				}
				else {
					url += extraParams;
				}
			}
			return url;
		}
		
		// create and give the cache, if useCache option is true
		var getCache = function(){
			var cache = jQuery(document).data('hintbox_cache');
			if (cache == undefined){
				var cache = new Array();
				cache.getItem = function(cKey){
					return this[cKey];
				}
				cache.putItem = function(cKey, cValue){
					this[cKey] = cValue;
				}
				cache.hasItem = function(cKey){
					if (this[cKey] == undefined){
						return false;
					}
					return true;
				}
				jQuery(document).data('hintbox_cache', cache);
			}
			return cache;
		}
		
		// jQuery.ajax success handler
		var onAjaxCallSuccess = function(input, queryUrl, serverData){
			input.removeClass(options.inputLoadingClass);

			if(serverData.length > 0){
				// create entries var
				var entries = ( typeof serverData == "object" ? serverData : serverData.split(options.separator) );
				
				// execute onListRetrieved
				options.onListRetrieved(entries);
				
				// check cache option and save data in cache
				if(options.useCache){
					var cache = getCache();
					if(!cache.hasItem(queryUrl)){
						cache.putItem(queryUrl, entries);
					}
				}
				
				// create list and populate div container and ul pointers
				createList(input, entries);
				
				// backup old css li values
				var cssBackup = {
					backgroundColor: getUnsortedList(input).find('li').css('background-color'),
					color: getUnsortedList(input).find('li').css('color')
				}
				jQuery.data(input, 'cssBackup', cssBackup);
				
				// execute necessary operations
				applyOptions(input);
				fixIssues(input);
				highlight(input);
				
				rebindKeyboard(input);
				selectHintElementByClick(input);
				
				// execute onListLoaded()
				options.onListLoaded(getUnsortedList(input));
			}
		}
		
		// load list by ajax call
		var loadList = function(input, queryString) {
			
			if(options.immediateList || queryString.length >= options.minChars){
				
				// create queryUrl
				var queryUrl = buildUrl(queryString);
				
				// add loading animation
				input.addClass(options.inputLoadingClass);
				
				// execute onBeforeListLoad()
				options.onBeforeListLoad();
				
				var entries = null;
				if(options.useCache){
					var cache = getCache();
					if(cache.hasItem(queryUrl)){
						entries = cache.getItem(queryUrl);
					}
				}
				
				if(entries == null){
					if(!options.json){
						jQuery.ajax({
							url: queryUrl,
							//cache: false,
							success: function(html){
								onAjaxCallSuccess(input, queryUrl, jQuery.trim(html));
							}
						});
					}
					else {
						jQuery.getJSON(queryUrl, function(data){
							var str = "";
							var list = jQuery(data.list);
							var listSize = list.size();
							var i = 1;
							list.each(function(){
								str += this;
								if(i < listSize){
									str += options.separator;
								}
								i++;
							});
							onAjaxCallSuccess(input, queryUrl, str);
						});
					}
				}
				else {
					onAjaxCallSuccess(input, queryUrl, entries);
				}
			}
		}
		
		// positionate ListContainer correctly
		var positionateHintListContainer = function(input){
			var offset = input.offset();
			var container = getHintListContainer(input);
			var unsortedList = getUnsortedList(input);
			
			var leftFix=0;
			if($("#scrollContent").attr("offsetLeft")!=null){
				leftFix=parseInt($("#scrollContent").attr("offsetLeft"))
			}
			var topFix=0;
			if($("#scrollContent").length>0){
				topFix=$("#scrollContent").scrollTop()
			}
			container.css({
				'display' : 'block',
				'position' : 'absolute',
				'top' : offset.top +topFix+ input.outerHeight() - parseInt(input.css('border-bottom-width')),
				'left' : offset.left-leftFix - parseInt(unsortedList.css('border-left-width')) + parseInt(input.css('border-left-width'))
			});
		}
		
		// sort entries, if sort option is true
		var sortList = function(input, entries){
			var inputVal = jQuery.trim(input.val());
			var matrix = new Array();
			
			var i = 0;
			jQuery.each(entries, function(){
				var distance = levenshtein(inputVal, jQuery.trim(this));
				if(matrix[i] == undefined){
					matrix[i] = new Array();
				}
				matrix[i] = new Array(distance, jQuery.trim(this));
				i++;
			});
			
			// sort array ascending
			var swap = function(i, j){
				if (parseInt(matrix[j]) < parseInt(matrix[i])){
					var temp = matrix[i];
					matrix[i] = matrix[j]
					matrix[j] = temp;
					if(i > 0){
						swap(i - 1, i);
					}
				}
			}
			for(var j = 0; j < matrix.length -1; j++){
				swap(j, j + 1);
			}
			
			// get only values and not Levenshtein distance
			entries = new Array();
			for(var j = 0; j < matrix.length; j++){
				var temp = matrix[j];
				entries.push(temp[1]);
			}
			
			// return sorted entries
			return entries;
		}
		
		// match hint, if matchHint option is true
		var matchHint = function(input, entries){
			var inputVal = jQuery.trim(input.val());
			var matched = new Array();
			
			jQuery.each(entries, function(){
				var curItem = jQuery.trim(this).toLowerCase();
				var toMatch = inputVal.toLowerCase();
				
				if(options.matchRule == MATCHRULE.STARTS_WITH){
					if(curItem.match("^" + toMatch) == toMatch){
						matched.push(jQuery.trim(this));
					}
				}
				else if (options.matchRule == MATCHRULE.ENDS_WITH){
					if(curItem.match(toMatch + "$") == toMatch){
						matched.push(jQuery.trim(this));
					}
				}
				else {
					if(curItem.match(toMatch) == toMatch){
						matched.push(jQuery.trim(this));
					}
				}
			});
			
			return matched;
		}
		
		// create div container for ul list
		var createList = function(input, entries){
			
			var divContainer = getHintListContainer(input);
			if (divContainer.get() == ''){
				divContainer = jQuery('<div></div>').addClass(options.hintboxContainerClass).css({
					'margin': 0,
					'padding': 0,
					'display': 'none',
					'z-index': options.zIndex
				});
			}
			else {
				divContainer.empty();
			}
			
			// create UL dom element
			var ul = jQuery('<ul></ul>').css({'cursor': 'default'});
			//var entries = jQuery.trim(html).split(options.separator);
			
			// match hint
			if(options.matchHint){
				entries = matchHint(input, entries);
			}
			
			// sort by levenshtein distance
			if(options.sort){
				entries = sortList(input, entries);
			}
			
			// limit option
			if(options.limit > 0){
				entries = entries.slice(0, options.limit);
			}
			
			jQuery.each(entries, function(){
				ul.append(jQuery('<li></li>').text(jQuery.trim(this)));
			});

			// append ul to div and show
			divContainer.append(ul);
			input.after(divContainer);
			// positionate container
			positionateHintListContainer(input);
			// show container
			divContainer.slideDown(options.slideDownTime);
		}
		
		
		// apply loaded options
		var applyOptions = function(input){
			var unsortedList = getUnsortedList(input);
			if(unsortedList.find('li').length > 0){
				if (options.autoDimentions){
					// ovverride options.width
					var blw = parseInt(input.css('border-left-width'));
					var brw = parseInt(input.css('border-right-width'));
					var w = input.outerWidth();
					options.width = (w - blw - brw) + 'px';
					// normalize li height
					unsortedList.find('li').css({
						'line-height': input.outerHeight() + 'px'
					});	
				}
				unsortedList.css({
					'width': options.width,
					'overflow-x': 'hidden'
				});
			}
			else {
				unsortedList.remove();
			}
		}
		
		
		// close hit results for givel input
		var closeHintResults = function(input){
			unbindKeyboard();
			var container = getHintListContainer(input);
			container.slideUp(options.slideUpTime, function(){
				jQuery(this).remove();
			});
		}
		
		// highlight or not highlight, this is the question :-)
		var highlight = function(input){
			var unsotedList = getUnsortedList(input);
			var cssBackup = jQuery.data(input, 'cssBackup');
			
			unsotedList.find('li').hover(
				function(){
					deselectLi(unsotedList.find('.selected'), cssBackup);
					selectLi(jQuery(this));
				},
				function(){
					deselectLi(jQuery(this), cssBackup);
				}
			);
		}
		
		// hilight current selected li element
		var selectLi = function(li){
			li.css({
				'background-color': options.backgroundColor,
				'color': options.color
			});
			li.addClass('selected');
		}
		
		// deselect pevious selected li element
		var deselectLi = function(li, cssBackup){
			li.css({
				'background-color': cssBackup.backgroundColor,
				'color': cssBackup.color
			});
			li.removeClass('selected');
		}
		// end css behaviours
		
		
		// fix browsers issues
		var fixIssues = function(input){
			// fix i.e. issues
			if (!jQuery.support.boxModel){
				getUnsortedList(input).css({
					'width': (parseInt(options.width) + parseInt(input.css('border-left-width')) * 2) + 'px'
				}).find('li').css({
					'width': (parseInt(options.width) + parseInt(input.css('border-left-width')) * 2) + 'px'
				});
			}
		}
		
		
		// startup jquery.hintbox for each selected input
		jQuery(inputs).each(function(){
			var input = jQuery(this);
			if (!input.hasClass(options.inputClass)){
				input.addClass(options.inputClass);
			}
			
			// init main controls and behaviours
			init(input);
			
			input.click(function(){
				rebindKeyboard(input);
			});
			input.focus(function(){
				rebindKeyboard(input);
			});
			input.blur(function(){
				rebindKeyboard(input);
			});
			
		});
		
		// returning selector
		return inputs;
		
	};
})(jQuery);