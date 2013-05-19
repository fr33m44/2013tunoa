(function($) {    

    function debug_log(text)
    {
        if (window.console && window.console.log) window.console.log(text);
    }

    function PCtrlsHolder()
    {
        var c = this;	
        PCtrlsHolder.inst = c;	
        setInterval(function() { c.update(c); }, 200);
    }
    
    function extractImgName(url)
    {
        var m = url.match(/[\/\\]*([^\/\\]+)\.(png|jpg|jpeg|gif)$/i);
        return (m && m[1]) || "";
    }
    
    PCtrlsHolder.prototype =
    {
        _skinList: {},
        
        _ctrls: {},
        
        _wlQueue: [],
        
        addControl: function(el, skinUrl, onInit)
        {	    
            if (el != null && !this.hasControl(el.id))
            {
                var skinUrlList = skinUrl.split(";");
                var $this = this;
                        		
                this._ctrls[el.id] = {"skinList":{}, "skinSyn":skinUrlList.length, "skinUrlList":[], "items":[]};

                var on_skinLoad = function(_el)
                {
			         return function(img)
			         {				
				        _ctrl = $this.getControl(_el.id);				                                        
				        _ctrl.skinList[extractImgName(img.src.toLowerCase())] = img;
                        		
				        if ((--_ctrl.skinSyn) == 0) onInit(_el, _ctrl.skinList[_ctrl.skinUrlList[0]]);
			         }; 
                };
		
                for (idx in skinUrlList)
                {
                    url = $.trim(skinUrlList[idx].toLowerCase());
                    this._ctrls[el.id].skinUrlList.push(extractImgName(url));
                                                            
                    if (url !== "") this.loadSkin(el, url, on_skinLoad(el));
                }
            }
        },
	
        getControl: function(id)
        {
	       return this._ctrls[id];
        },
	
        hasControl: function(id)
        {
            return (this._ctrls[id] != undefined);
        },
   
        addItem: function(ctrlId, obj, onProgress)
        {
            if (this.hasControl(ctrlId))
            {		
                this._ctrls[ctrlId].items.push({"ref":obj, "onProgress":onProgress});
            }
        },
	
        progress: function(ctrlId, val)
        {
            if (this.hasControl(ctrlId))
            {
                var val = isFinite(val)? Math.max(Math.min(val, 100), 0): 0;
		
                for (i = 0; i < this._ctrls[ctrlId].items.length; ++i)
                {
                    this._ctrls[ctrlId].items[i].onProgress(this._ctrls[ctrlId].items[i].ref, val);
                }
            }
        },
	
        update: function(c)
        {   
            var upd = [];
            
            for (var i = 0; i < c._wlQueue.length; ++i)
            {
                var skin = c._skinList[c._wlQueue[i].url];
                if (skin && skin.state == 1)
                {
                    upd.push(i);
                    c._wlQueue[i].cb(skin.img);
                }
            }
            if (upd.length > 0)
            {
                this._wlQueue = $.grep(this._wlQueue, function(n, i){ return $.inArray(i, upd) == -1; });
            }
        },

        loadSkin: function(el, url, onComplete)
        {
	    url = url.toLowerCase();
	    
            if (this._skinList[url] == undefined)
            {
                var img = document.createElement("img");
                var $img = $(img);
                $img.css({'visibility':'hidden', 'position':'absolute'});
                
                this._skinList[url] = {"img": img, "state": 0};
                                            
                $img.load((function(skin){ return function(){ skin.state = 1; onComplete(skin.img); }; }(this._skinList[url])));
                $img.error(function(e){ debug_log("unable to load skin '"+this.src+"'"); });
            
                img.src = url;
                $(el).before($img);
            }
            else
            {
                this._wlQueue.push({"url":url, "cb":onComplete});
            }            
        }
    };
          
    $.fn.progressCtrl = function(arg1, opts)
    {            
        var _pch = (PCtrlsHolder.inst != undefined)? PCtrlsHolder.inst: (new PCtrlsHolder());        
        var so_param = function() { return (typeof(arg1) == "string")? {'setter': arg1, 'args': opts}: arg1 || {}; };
	
        var options = (typeof(arg1) == "number")? $.extend({"pos" : arg1}, opts || {}): so_param(); 		
        var _opts = $.extend({pos:0}, $.fn.progressCtrl.defaults, options);        
                                                
        function initCtrl(el, img)
        {                        
            if (_pch.hasControl(el.id))
            {
                var cap_w = _opts.capWidth || (img.width / 4);
                var width = Math.max(_opts.width, (cap_w * 2) + 2);
                var height = _opts.height || (img.height / (_opts.useCaps? 3: 2));
                var track_w = _opts.useCaps? width - (cap_w * 2): width;
                                
                var pb_container = $("<div />");
                
                pb_container.css({"width":width+"px", "height":height+"px", "padding":"0"});                
                
                if (_opts.title === "")
                    _pch.addItem(el.id, pb_container, function(obj, val){ obj.attr("title", val+"%");});
                else                    
                    pb_container.attr("title", _opts.title);
                    
                var label = $('#'+el.id+'-label');
                if (_opts.label && label.is("span"))
                {
                    _pch.addItem(el.id, label, function(obj, val){ obj.text(val+"%");});
                }

                pb_container.addClass(_opts.containerClass);
    
                function add_cap(capType)
                {
                    if (_opts.useCaps == false || cap_w == 0) return;
                    
                    posy = -height * 2;
                    
                    var pb_cap = $("<div />");
		   
                    pb_cap.attr("id", el.id+"-cap-"+capType);
                    pb_cap.css({"width":cap_w+"px", "height":height+"px", "padding":"0", "margin":"0", "float":"left"});
                    pb_cap.css("background-image", "url(" + img.src + ")");
                    pb_cap.css("overflow", "hidden");
                                        
                    var onProgress = (function(type, w, y){ return function(obj, val)
                    {
                        var posx_m = (type == "left")? ((val == 0)? 0: 1): ((val == 100)? 3: 2);
                        obj.css("background-position", (-posx_m*w)+"px "+y+"px");
                    };})(capType, cap_w, posy);
 
                    _pch.addItem(el.id, pb_cap, onProgress);
                    pb_container.append(pb_cap);
                }
                            
                add_cap("left");
                
                var pb_track = $("<div />");

                pb_track.attr("id", el.id+"-track");
                pb_track.css({"width":track_w+"px", "height":height+"px", "padding":"0", "margin":"0", "float":"left"});
                pb_track.css("overflow", "hidden");
                pb_track.css("background", "transparent url(" + img.src + ") repeat-x left "+(-height).toString()+"px");
                                
                pb_container.append(pb_track);
                
                var pb_ctrl = $("<div />");

                pb_ctrl.attr("id", el.id+"-ctrl");
                pb_ctrl.css({"width":track_w+"px", "height":height+"px", "padding":"0", "margin":"0"});
                pb_ctrl.css("background", "transparent url(" + img.src + ") repeat-x left top");
                
                var onProgress = (function(w, m){ return function(obj, val)
                {
                    var offset = Math.ceil(w * (val / 100.0));
                    obj.css("margin-left", offset+"px");
                };})(track_w, null);

                _pch.addItem(el.id, pb_ctrl, onProgress);
                pb_track.append(pb_ctrl);

                add_cap("right");
                
                _pch.progress(el.id, _opts.pos);
                
                $(el).append(pb_container);
            }	    	    
        }
	
        function changeSkin(el, idx)
        {                       
            var ctrl = _pch.getControl(el.id);                               
            idx = (typeof(idx) != "number")? 0: idx;
     			                                                        		
            if (ctrl && idx >= 0 && idx < ctrl.skinUrlList.length)
            {
                function chs_item(item)
                {
                    var item_el = $('#'+(el.id+'-'+item));
                    var img = ctrl.skinList[ctrl.skinUrlList[idx]];
                    if (item_el.is("div")) item_el.css("background-image", "url(" + img.src + ")");
                }
            			
                chs_item("cap-left");
                chs_item("track");
                chs_item("ctrl");
                chs_item("cap-right");
            }		
        }
        
        function progress(el, pos)
        {
            _pch.progress(el.id, pos);
        }
	
        var allow_sf = {"skinIdx":changeSkin, "progress":progress};
        
        return this.each(function()
        {
            var el = this;

            if (!_pch.hasControl(this.id))
            {            
                $(el).empty();
                _pch.addControl(el, _opts.skin, initCtrl);
            }
            else
            {
                if (typeof(_opts.setter) == 'string' && allow_sf[_opts.setter] != undefined)
                {
                    allow_sf[_opts.setter](el, _opts.args || []);
                }
                else
                    _pch.progress(el.id, _opts.pos);
            }               
        });            
    };            

    $.fn.progressCtrl.defaults = 
    {
        skin: "",
        width: 100,
        height: 0,
        useCaps: true,
        capWidth: 0,
        title: "",        
        containerClass: "pbContainer",
        label: true
    };
})(jQuery);
