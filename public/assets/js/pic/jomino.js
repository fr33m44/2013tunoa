
(function($){

    // Definition
    jQuery.fn.jomino = function(options){
    
        //default options
        var defaults = {
			//basics
            interval: "200",
            duration: "400",
            easing: 'swing',
            reverse: false,
            random: false,
			autostart: true,
			
			//callbacks
			onAnimate: null,
			onComplete: null
        };
        
        //setup options
        var opts = jQuery.extend({}, defaults, options);
        
        //private variables
        var elems = jQuery.makeArray(this);
		var elemsCollection = new Array;
		var reverse = opts.reverse;
		var intervalTimer = null;
        
        //adjust sequence in array based on options
        elems = opts.reverse ? elems.reverse() : elems; // for backwards direction
        elems = opts.random ? elems.sort(function(){ return 0.5 - Math.random() }) : elems; //elements in array scrambled for randomness
        
        //global methods
		jQuery.jomino = {
            forward: function(){
				reverse = false;
				if (!intervalTimer) {
					intervalTimer = fireElement();
				}
            },
			rewind: function() {
                if (!reverse) {
                    jQuery.jomino.stop();
                    reverse = true;
                    intervalTimer = fireElement();
                }
			},
			stop: function() {
				clearTimeout(intervalTimer);
				intervalTimer = null;
				reverse = false;
			}
        };
		
		//recursive function which executes the animation on the elements in array, one element at a time
        function fireElement(){
			var elemsSize = reverse ? elemsCollection.length : elems.length;
			var nextElem = null;
            if (elemsSize > 0) {
				if(!reverse) {
					nextElem = elems.shift();
                	elemsCollection.push(nextElem);
				} else {
					nextElem = elemsCollection.pop();
					elems.unshift(nextElem);
				}
                jQuery.fn.jomino.animateElement(nextElem, reverse, opts.duration, opts.easing);
                setTimeout(function(){
                    fireCallback(opts, "onAnimate", nextElem);
                }, opts.duration);
				intervalTimer = setTimeout(function(){
                    fireElement();
                }, opts.interval);
                
            } else if (elemsSize == 0) {
                    setTimeout(function(){
                        fireCallback(opts, "onComplete", nextElem);
                    }, opts.duration);
					reverse = false;
					intervalTimer = null;
                }
            }
		
		if(opts.autostart)
			jQuery.jomino.forward();
 
    };
	
	//exposed functions
  	//animation on current element
    jQuery.fn.jomino.animateElement = function(elem, reverse, duration, easemethod){
		reverse ? jQuery(elem).fadeOut(duration, easemethod) : jQuery(elem).fadeIn(duration, easemethod);  
    };
	
	//private functions
    //callback
    function fireCallback(opts, name, obj){
        var fn = opts[name];
        if ($.isFunction(fn)) {
            try {
                return fn.call(obj);
            } 
            catch (error) {
                log("jomino." + name + ": ", error);
                return false;
            }
        }
        return true;
    }
     
	 // For debugging using firebug
     function log($txt, $obj){
         if (window.console && window.console.log) 
             window.console.log($txt, $obj);
     };
    
    })(jQuery);
