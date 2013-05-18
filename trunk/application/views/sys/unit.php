<h2 class="contentTitle">单位管理</h2>
<div class="pageContent">
    <form method="post" action="/sys/unit/update" class="pageForm required-validate" onsubmit="return validateCallback(this, navTabAjaxDone);">
        <div class="pageFormContent" id="unitForm" layoutH="56">
            <fieldset>
                <legend>单位管理</legend>
                <table>
                    <?php foreach ($cfgs as $cfg) {
 ?>
                        <tr>
                            <td class="label" valign="top">
                            <?php if ($cfg['cfg_desc']) {
 ?><a href="javascript:showNotice('notice{$var.code}');" title="{$lang.form_notice}"><img src="images/notice.gif" width="16" height="16" border="0" alt="{$lang.form_notice}" /></a><?php } ?>
<?= $cfg['cfg_name'] ?>：
                        </td>
                        <td>
<?php if ($cfg['cfg_type'] == 'text') { ?><input name="value[<?= $cfg['cfg_id'] ?>]" type="text" value="<?= $cfg['cfg_value']->read($cfg['cfg_value']->size()) ?>" size="40" /><?php } ?>
<?php if ($cfg['cfg_type'] == 'textarea') { ?><textarea name="value[<?= $cfg['cfg_id'] ?>]" class="editor" cols="100" rows="11"><?= $cfg['cfg_value']->read($cfg['cfg_value']->size()) ?></textarea><?php } ?>

                        </td>
                    </tr>
<?php } ?>
                </table>
            </fieldset>
        </div>
        <div class="formBar">
            <ul>
                <li>
                    <div class="buttonActive"><div class="buttonContent"><button type="submit">保存</button></div></div>
                </li>
                <li>
                    <div class="button"><div class="buttonContent"><button type="button" onclick="navTab.closeCurrentTab()">取消</button></div></div>
                </li>
            </ul>
        </div>

    </form>
</div>