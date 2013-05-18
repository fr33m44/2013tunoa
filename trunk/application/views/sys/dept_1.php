<div class="page">
    <div id="treeview">
        <?= $tree_str ?>
    </div>
    <div id="tree-node-form">
        <form method="post" action="/sys/dept/update" class="pageForm required-validate">
            <table align="center">

                <tr>
                    <td class="label">当前部门/职位：</td>
                    <td></td>
                </tr>
                <tr>
                    <td class="label">部门排序号：</td>
                    <td>
                        <input type="text" maxlength="3" size="10" class="BigInput" name="DEPT_SORT" >&nbsp;3位数字，用于同一级次部门排序，不能重复
                    </td>
                </tr>
                <tr>
                    <td class="label">部门名称：</td>
                    <td>
                        <input type="text" maxlength="25" size="25" class="BigInput" name="dept_name" >&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">电话：</td>
                    <td>
                        <input type="text" maxlength="25" size="25" class="BigInput" name="TEL_NO" >&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">传真：</td>
                    <td>
                        <input type="text" maxlength="25" size="25" class="BigInput" name="FAX_NO" >&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">部门地址：</td>
                    <td>
                        <input type="text" maxlength="40" size="40" class="BigInput" name="DEPT_ADDR" >&nbsp;
                    </td>
                </tr>
                <tr>
                    <td class="label">上级部门：</td>
                    <td class="TableData">
                        <select class="BigSelect" name="parent_id">

                        </select>
                    </td>
                </tr>
                <!--
                <tr>
                    <td class="label">是否是分支机构：</td>
                    <td>
                        <input type="checkbox" id="IS_ORG" name="IS_ORG"  ><label for="IS_ORG">做为分支机构</label>
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
                        <input type="hidden" name="dept_id" />
                        <div style="margin-left:300px;margin-top:20px;">
                            <a class="button"><span>保存</span></a>
                            <a class="button"><span>新建下级部门/职位</span></a>
                            <a class="button"><span>删除当前部门/职位</span></a>
                        </div>
                    </td>

                </tr>
                </tbody>
            </table>
        </form>
    </div>
</div>