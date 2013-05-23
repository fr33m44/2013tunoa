<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!--框架必需start-->
<script type="text/javascript" src="/public/assets/js/jquery-1.4.js"></script>
<script type="text/javascript" src="/public/assets/js/framework.js"></script>
<link href="/public/assets/css/import_basic.css" rel="stylesheet" type="text/css"/>
<link  rel="stylesheet" type="text/css" id="skin" prePath="/public/assets/" />
<!--框架必需end-->

<!--修正IE6不支持PNG图start-->
<script type="text/javascript" src="/public/assets/js/method/pngFix/supersleight.js"></script>
<!--修正IE6不支持PNG图end-->

<!--鼠标移入变色start-->
<script>
	$(function(){
		$(".navIcon").hover(function(){
			$(this).addClass("navIcon_hover");
		},function(){
			$(this).removeClass("navIcon_hover");
		})
	})
</script>
<!--鼠标移入变色end-->
<body>
<div class="position">
	<div class="center">
	<div class="left">
	<div class="right">
		<span>当前位置：主页 >> 单位管理 </span>
	</div>	
	</div>	
	</div>
</div>	
<div id="scrollContent">
    <div class="box2" panelTitle="单位管理" showStatus="false">
    <table class="tableStyle" transMode="true">
<?php foreach ($cfgs as $cfg) { ?>
        <tr>
            <td>
                                
    <?= $cfg['cfg_name'] ?>：
            </td>
            <td>
    <?php if ($cfg['cfg_type'] == 'text') { ?>
            <label for="value[<?= $cfg['cfg_id'] ?>]">
                <input name="value[<?= $cfg['cfg_id'] ?>]" type="text" value="<?= $cfg['cfg_value'] ?>" style="width:500px" />
    <?php } ?>
            </label>
    <?php if ($cfg['cfg_type'] == 'textarea') { ?>
            <span class="float_left"><textarea name="value[<?= $cfg['cfg_id'] ?>]"  style="width:500px"><?= $cfg['cfg_value']?></textarea></span>
    <?php } ?>
    
            </td>
        </tr>
<?php } ?>
        <tr>
        	<td colspan="2">
        		<input type="submit" value=" 提 交 "/>
        		<input type="reset" value=" 重 置 "/>
        	</td>
        </tr>
    </table>
    </div>
</div>
</body>
</html>