/*edited by fukai*/
var bw;
(function (jQuery){
	this.version = '@1.1';
	this.layer = {'width' : 200, 'height': 100};
	this.title = '信息提示';
	this.time = 4000;
	this.anims = {'type' : 'slide', 'speed' : 600};
	
	this.inits = function(title, text){
		if($("#message").is("div")){ return; }
		var $box_msg=$('<div id="message" class="box_msg" style="z-index:800;width:'+this.layer.width+'px;height:'+this.layer.height+'px;position:absolute; display:none;bottom:0; right:0; overflow:hidden;"></div>')
		var $box_msg_top=$('<div class="box_msg_topcenter"><div class="box_msg_topleft"><div class="box_msg_topright"><div class="box_msg_title">'+title+'</div><div class="box_msg_close" id="message_close"></div></div></div></div>')
		var $box_msg_middle=$('<div class="box_msg_middlecenter"><div class="box_msg_middleleft"><div class="box_msg_middleright"><div class="boxContent" style="height:'+(this.layer.height-35)+'px;">'+text+'</div></div></div></div>')
		var $box_msg_bottom=$('<div class="box_msg_bottomcenter"><div class="box_msg_bottomleft"><div class="box_msg_bottomright"></div></div></div>')
		//$(document.body).prepend('<div id="message" class="mesMain" style="z-index:100;width:'+this.layer.width+'px;height:'+this.layer.height+'px;position:absolute; display:none;bottom:0; right:0; overflow:hidden;"><div class="mesTop"><span class="mesClose" id="message_close" style="float:right;padding:5px 0 5px 0;width:16px;line-height:auto;text-align:center;cursor:pointer;overflow:hidden;">×</span><div class="mesTitle" style="padding:5px 0 5px 5px;width:100px;line-height:18px;text-align:left;overflow:hidden;">'+title+'</div><div style="clear:both;"></div></div> <div class="mesCon"><div id="message_content" class="mesConIn" style="width:'+(this.layer.width-17)+'px;height:'+(this.layer.height-50)+'px;text-align:left;overflow:hidden;">'+text+'</div></div></div>');
		$box_msg.append($box_msg_top).append($box_msg_middle).append($box_msg_bottom);
		$(document.body).append($box_msg);
	};
	this.show = function(title, text, time,sound){
		if($("#message").is("div")){ return; }
		if(title==0 || !title)title = this.title;
		this.inits(title, text);
		if(time){
			this.time = time;
		}
		
		switch(this.anims.type){
			case 'slide':$("#message").slideDown(this.anims.speed);break;
			case 'fade':$("#message").fadeIn(this.anims.speed);break;
			case 'show':$("#message").show(this.anims.speed);break;
			default:$("#message").slideDown(this.anims.speed);break;
		}
		$("#message_close").click(function(){		
			mesclose()
			
		});
		//$("#message").slideDown('slow');
		if(sound!=null){
			try {
				 var $sound=$("<embed src="+sound+"  AutoStart='true' type='application/x-mplayer2'></embed>")
				 $("body").append($sound)
			}
			catch(e){}
		}
		this.rmmessage(this.time);
	};
	this.lays = function(width, height){
		if($("#message").is("div")){ return; }
		if(width!=0 && width)this.layer.width = width;
		if(height!=0 && height)this.layer.height = height;
	}
	this.anim = function(type,speed){
		if($("#message").is("div")){ return; }
		if(type!=0 && type)this.anims.type = type;
		if(speed!=0 && speed){
			switch(speed){
				case 'slow' : ;break;
				case 'fast' : this.anims.speed = 200; break;
				case 'normal' : this.anims.speed = 400; break;
				default:					
					this.anims.speed = speed;
			}			
		}
	}
	this.rmmessage = function(time){
		if(time!='stay'){
			bw=setTimeout('mesclose()', time);
		}
	};
	this.mesclose = function(){
		clearTimeout(bw)
		switch(this.anims.type){
			case 'slide':$("#message").slideUp(this.anims.speed);break;
			case 'fade':$("#message").fadeOut(this.anims.speed);break;
			case 'show':$("#message").hide(this.anims.speed);break;
			default:$("#message").slideUp(this.anims.speed);break;
		};
	
		var msgTimeOut=setTimeout('$("#message").remove();', this.anims.speed);
		setTimeout('$("#messageSound").remove();', this.anims.speed);
		this.original();
	};
	this.original = function(){	
		this.layer = {'width' : 200, 'height': 100};
		this.title = '信息提示';
		this.time = 4000;
		this.anims = {'type' : 'slide', 'speed' : 600};
	};
    jQuery.messager = this;
    return jQuery;
})(jQuery);