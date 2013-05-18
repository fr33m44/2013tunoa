<form id="pagerForm" method="get" action="/sys/user/index">
    <input type="hidden" name="pageNum" value="1" />
    <input type="hidden" name="numPerPage" value="<?= $numPerPage ?>" />
    <input type="hidden" name="orderField" value="post_time" />
    <input type="hidden" name="orderSort" value="desc" />
</form>

<div class="pageHeader">
    <form onsubmit="return navTabSearch(this);" action="" method="post">
        <div class="searchBar">
            <table class="searchContent">
                <tr>
                    <td>
						关键字：<input type="text" name="keyword" />
                    </td>
                    <td>
                        <select class="combox" name="province">
                            <option value="">所有省市</option>
                            <option value="北京">北京</option>
                            <option value="上海">上海</option>
                            <option value="天津">天津</option>
                            <option value="重庆">重庆</option>
                            <option value="广东">广东</option>
                        </select>
                    </td>
                    <td>
						建档日期：<input type="text" class="date" readonly="true" />
                    </td>
                    <td>

                    </td>
                </tr>
            </table>
            <div class="subBar">
                <ul>
                    <li><div class="buttonActive"><div class="buttonContent"><button type="submit">检索</button></div></div></li>
                </ul>
            </div>
        </div>
    </form>
</div>
<div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li><a class="add" href="demo_page4.html" target="navTab"><span>添加</span></a></li>
            <li><a class="delete" href="ajaxDone.html?uid={sid_user}" target="navTabTodo" title="确定要删除吗?"><span>删除</span></a></li>
            <li><a class="edit" href="demo_page4.html?uid={sid_user}" target="navTab"><span>修改</span></a></li>
            <li class="line">line</li>
            <li><a class="icon" href="javascript:void(0);"><span>导入EXCEL</span></a></li>
        </ul>
    </div>
    <table class="table" width="100%" layouth="138">
        <thead>
            <tr>
                <th><input type="checkbox" group="user_id" class="checkboxCtrl"></th>
                <th orderField="login_name">用户名</th>
                <th orderField="real_name">姓名</th>
                <th orderField="position">职位</th>
                <th orderField="dept">部门</th>
                <th orderField="role">角色</th>
                <th orderField="manage">管理范围</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody><?php
foreach ($user_list as $item) {
    echo '<tr><td><input name="user_id" value="' . $item['user_id'] . '" type="checkbox"></td><td>' . $item['LOGIN_NAME'] . '</td><td>' . $item['REAL_NAME'] . '</td><td>' . $item['position'] . '</td><td>' . $item['parent_dept_name'] . '</td><td>' . '角色' . '</td><td>' . '管理范围' . '</td>
        <td><a title="删除 ' . $item['REAL_NAME'] . '？" target="navTabTodo" href="/sys/user/delete/user_id/' . $item['user_id'] . '" class="btnDel">删除</a>
        <a title="编辑 ' . $item['REAL_NAME'] . '" target="navTab" href="/sys/user/edit/user_id/' . $item['user_id'] . '" class="btnEdit">编辑</a></td></tr>' . "\n";
}
?></tbody>
    </table>
    <div class="panelBar">
        <div class="pages">
            <span>显示</span>
            <select class="combox" name="numPerPage" change="navTabPageBreak" param="numPerPage">
                <option value="20"<?php if ($numPerPage == '20') { ?>selected="selected"<?php } ?>>20</option>
                <option value="50"<?php if ($numPerPage == '50') { ?>selected="selected"<?php } ?>>50</option>
                <option value="100"<?php if ($numPerPage == '100') { ?>selected="selected"<?php } ?>>100</option>
                <option value="200"<?php if ($numPerPage == '200') { ?>selected="selected"<?php } ?>>200</option>
            </select>
            <span>条，共<?= $user_count ?>条</span>
        </div>

        <div class="pagination" targetType="navTab" totalCount="<?= $user_count ?>" numPerPage="<?= $numPerPage ?>" pageNumShown="10" currentPage="<?= $pageNum ?>"></div>

    </div>
</div>