<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>dept_edit</title>
        <link href="/themes/default/style.css" rel="stylesheet" type="text/css" />
        <link href="/themes/css/core.css" rel="stylesheet" type="text/css" />
        <link href="/css/common.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <div id="treeview">
            treeview
        </div>
        <form method="post" action="/sys/dept/update" class="pageForm required-validate">
            <table align="center" style="width:720px;">

                <tr>
                    <td class="label">当前部门/职位：</td>
                    <td><?php
                    $dept_str = '';
                    foreach ($dept_class as $key => $dept) {
                        $key == count($dept_class) - 1 ? $dept_str.=$dept : $dept_str.=$dept . "->";
                    }
                    echo $dept_str;
                    ?></td>
                </tr>
                <tr>
                    <td class="label">部门排序号：</td>
                    <td>
                        <input type="text" maxlength="3" size="10" class="BigInput" name="DEPT_SORT" value="<?= $dept_info->DEPT_SORT ?>">&nbsp;3位数字，用于同一级次部门排序，不能重复
                    </td>
                </tr>
                <tr>
                    <td class="label">部门名称：</td>
                    <td>
                        <input type="text" maxlength="25" size="25" class="BigInput" name="dept_name" value="<?= $dept_info->dept_name ?>">&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">电话：</td>
                    <td>
                        <input type="text" maxlength="25" size="25" class="BigInput" name="TEL_NO" value="<?= $dept_info->TEL_NO ?>">&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">传真：</td>
                    <td>
                        <input type="text" maxlength="25" size="25" class="BigInput" name="FAX_NO" value="<?= $dept_info->FAX_NO ?>">&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">部门地址：</td>
                    <td>
                        <input type="text" maxlength="40" size="40" class="BigInput" name="DEPT_ADDR" value="<?= $dept_info->DEPT_ADDR ?>">&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">上级部门：</td>
                    <td class="TableData">
                        <select class="BigSelect" name="parent_id">
                            <?php print_r($dept_line); ?>
                        </select>
                    </td>
                </tr>
                <!--
                <tr>
                    <td class="label">是否是分支机构：</td>
                    <td>
                        <input type="checkbox" id="IS_ORG" name="IS_ORG"  <?php if ($dept_info->DEPT_ADDR) { ?>checked="checked"<?php } ?>><label for="IS_ORG">做为分支机构</label>
                    </td>
                </tr>
                <tr>
                    <td class="label">部门主管(选填)：</td>
                    <td>
                        <input type="hidden" value="" name="MANAGER">
                        <textarea readonly="" rows="1" name="TO_NAME"></textarea>
                        <a  href="javascript:;" onclick="alert('fdsafds')">添加</a>
                        <a href="javascript:;">清空</a>
                    </td>
                </tr>
                <tr>
                    <td class="label">上级主管领导(选填)：</td>
                    <td>
                        <input type="hidden" value="" name="LEADER1">
                        <textarea readonly="" rows="1" name="TO_NAME3"></textarea>
                        <a  href="javascript:;">添加</a>
                        <a href="javascript:;">清空</a>
                    </td>
                </tr>
                <tr>
                    <td class="label">上级分管领导(选填)：</td>
                    <td>
                        <input type="hidden" value="" name="LEADER2">
                        <textarea readonly="" rows="1" name="TO_NAME4"></textarea>
                        <a href="javascript:;">添加</a>
                        <a href="javascript:;">清空</a>
                    </td>
                </tr>
                -->
                <tr>
                    <td class="label">部门职能：</td>
                    <td>
                        <textarea rows="5" cols="60" name="DEPT_DUTY"></textarea>
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2">
                        <input type="hidden" name="dept_id" value="<?= $dept_info->dept_id ?>" />
                        <div style="margin-left:300px;margin-top:20px;">
                            <!--
                            <div class="buttonActive"><div class="buttonContent"><button type="submit">保存</button></div></div>
                            <div class="buttonActive"><div class="buttonContent"><button type="button">新建下级部门/职位</button></div></div>
                            <div class="buttonActive"><div class="buttonContent"><button type="button">删除当前部门/职位</button></div></div>
                            -->
                            <a class="button"><span>保存</span></a>
                            <a class="button"><span>新建下级部门/职位</span></a>
                            <a class="button"><span>删除当前部门/职位</span></a>
                        </div>
                    </td>

                </tr>
                </tbody>
            </table>
        </form>
    </body>

</html>
