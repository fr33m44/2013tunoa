<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!--框架必需start-->
<script type="text/javascript" src="/public/assets/js/jquery-1.4.js"></script>
<script type="text/javascript" src="/public/assets/js/framework.js"></script>
<link href="/public/assets/css/import_basic.css" rel="stylesheet" type="text/css"/>
<link  rel="stylesheet" type="text/css" id="skin" prePath="/public/assets/" />
<!--框架必需end-->

<!--多选框脚本start-->
<script type="text/javascript" src="/public/assets/js/form/multiselect.js"></script>
<!--多选框脚本end-->
<!--表单验证脚本start-->
<script type="text/javascript" src="/public/assets/js/form/loadmask.js"></script>
<script src="/public/assets/js/form/validationEngine-cn.js" type="text/javascript"></script>
<script src="/public/assets/js/form/validationEngine.js" type="text/javascript"></script>
<!--表单验证脚本end-->
<script>
$(document).ready(function(){
	$("#submit").bind("click", function () {
		$("#form_div").mask("表单正在提交...");
	});
	
	$("#cancel").bind("click", function () {
		$("#form_div").unmask();
	});
});
</script>


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
    <div class="box2" panelTitle="单位管理" showStatus="false"  id="form_div">
    <form method="post" action="index.php?d=sys&c=unit&m=update">
    <table class="tableStyle" transMode="true">
<?php foreach ($cfgs as $cfg) { ?>
        <tr>
            <td>
                                
    <?= $cfg['cfg_name'] ?>：
            </td>
            <td>
    <?php if ($cfg['cfg_type'] == 'text') { ?>
            <label for="value[<?= $cfg['cfg_id'] ?>]">
                <input name="value[<?= $cfg['cfg_id'] ?>]" type="text" value="<?= $cfg['cfg_value'] ?>"  style="width:500px" class="textinput <?=$cfg['validate']?>"/>
    <?php } ?>
            </label>
    <?php if ($cfg['cfg_type'] == 'textarea') { ?>
            <span class="float_left"><textarea name="value[<?= $cfg['cfg_id'] ?>]"  style="width:500px;height:100px" class="textinput <?=$cfg['validate']?>"><?= $cfg['cfg_value']?></textarea></span>
    <?php } ?>
    
            </td>
        </tr>
<?php } ?>
        <tr>
        	<td colspan="2">
        		<input type="submit" id="submit" value=" 提 交 "/>
        		<input type="button" id="cancel" value=" 取 消 "/>
        	</td>
        </tr>
    </table>
    </form>
    </div>
</div>
</body>
</html>