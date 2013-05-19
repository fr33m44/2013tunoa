
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!--框架必需start-->
<script type="text/javascript" src="/public/assets/js/jquery-1.4.js"></script>
<script type="text/javascript" src="/public/assets/js/framework.js"></script>
<link href="/public/assets/css/import_basic.css" rel="stylesheet" type="text/css"/>
<link  rel="stylesheet" type="text/css" id="skin" prePath="/public/assets/"/>
<!--框架必需end-->
<script type="text/javascript" src="/public/assets/js/pic/jomino.js"></script>
<script>
$(function(){
	$('.framegrid.nocaption').each(function(){
		$(".framegrid_cover", this).css({
			top:"128px",
			height:"0px"
		})
		$(".framegrid_title", this).hide()
		$(".framegrid_con", this).hide()
	})
	$('.framegrid.nocaption').hover(function(){
		$(".framegrid_cover", this).stop().animate({top:'58px',height:'70px'},{queue:false,duration:160});
		$(".framegrid_title", this).show()
		$(".framegrid_con", this).show()
	}, function() {
		$(".framegrid_cover", this).stop().animate({top:'125px',height:'0px'},{queue:false,duration:160});
		$(".framegrid_title", this).hide()
		$(".framegrid_con", this).hide()
	});
	$(".framegrid").jomino();
})
function showPreview(str){
	top.Dialog.open({InnerHtml:"<div style=\"text-align:center;\"><img  width='900' height='544' src='/public/assets/pages/main_preview/"+str+"'/></div>",Title:"皮肤预览",Width:920,Height:550});
}
function changeSkin(str1,str2){
	showProgressBar();
	document.getElementById("sessionSkin").src="index.php?c=skin&m=change&skin_name="+str1+"&style_name="+str2;
}
</script>
<style>
	.framegrid_con{
		padding:0 5px 0 0;
		text-align:right;
		height:20px;
		overflow:hidden;
		line-height:20px;
	}
</style>
<body>
	<!--
    <span class="red font_bold underLine hand" onclick="top.Dialog.open({URL:'lesson/useSkin.html',Title:'皮肤应用方法',Width:880,Height:550});">点击这里</span>查看皮肤应用方法
    -->
	<div class="clear"></div>
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/sky_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：sky<br />主题风格：blue</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>
		<div class="ali02">
			<button onclick="showPreview('sky_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
			<button onclick="changeSkin('sky','blue')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/orange_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：orange<br />主题风格：red</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>
		<div class="ali02">
			<button onclick="showPreview('orange_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
			<button onclick="changeSkin('orange','red')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/darkBlue_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：darkBlue<br />主题风格：darkBlue</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>
		<div class="ali02">
		<button onclick="showPreview('darkBlue_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('darkBlue','darkBlue')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="clear"></div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/vistaBlue_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：vistaBlue<br />主题风格：blue</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>
		<div class="ali02">
		<button onclick="showPreview('vistaBlue_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('vistaBlue','blue')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/grass_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：grass<br />主题风格：green</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>	
		<div class="ali02">
		<button onclick="showPreview('grass_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('grass','green')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/chinaRed_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：chinaRed<br />主题风格：red</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>
		<div class="ali02">
		<button onclick="showPreview('chinaRed_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('chinaRed','red')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	<div class="clear"></div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/armyYellow_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：armyYellow<br />主题风格：yellowGreen</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>	
		<div class="ali02">
		<button onclick="showPreview('armyYellow_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('armyYellow','yellowGreen')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/darkCrystal_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：darkCrystal<br />主题风格：darkYellow</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>	
		<div class="ali02">
		<button onclick="showPreview('darkCrystal_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('darkCrystal','darkYellow')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/lightBlue_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：lightBlue<br />主题风格：lightBlue</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>	
		<div class="ali02">
		<button onclick="showPreview('lightBlue_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('lightBlue','lightBlue')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="clear"></div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/skyAgain_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：skyAgain<br />主题风格：blue</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>	
		<div class="ali02">
		<button onclick="showPreview('skyAgain_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('skyAgain','blue')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="framegrid nocaption" style="display:none;">
		<div class="picItem3"><img src="/public/assets/pages/main_preview/skyThird_accordtion_small.jpg"/></div>	
		<div class="framegrid_cover">
			<div class="framegrid_title">皮肤名称：skyThird<br />主题风格：blue</div>
			<div class="framegrid_con">
				designed by fukai
			</div>
		</div>	
		<div class="ali02">
		<button onclick="showPreview('skyThird_accordtion.jpg')"><span class="icon_find">点击预览</span></button>
		<button onclick="changeSkin('skyThird','blue')"><span class="icon_ok">点击更换</span></button>
		</div>
	</div>
	
	<div class="clear"></div>
	<iframe id="sessionSkin" src="" width="0" height="0" style="display:none;"></iframe>
</body>
</html>