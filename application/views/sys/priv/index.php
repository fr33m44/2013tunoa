<form id="pagerForm" method="get" action="/sys/user/index">
    <input type="hidden" name="pageNum" value="1" />
    <input type="hidden" name="numPerPage" value="<?= $numPerPage ?>" />
    <input type="hidden" name="orderField" value="post_time" />
    <input type="hidden" name="orderSort" value="desc" />
</form>

<div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li><a class="add" href="/sys/priv/create" rel="page_priv_create" target="navTab"><span>添加角色</span></a></li>
            <li><a class="delete" href="ajaxDone.html?uid={sid_user}" target="navTabTodo" title="确定要删除吗?"><span>删除</span></a></li>
            <li><a class="edit" href="demo_page4.html?uid={sid_user}" target="navTab"><span>修改</span></a></li>
            <li class="line">line</li>
        </ul>
    </div>
    <table class="table" width="100%" layouth="138">
        <thead>
            <tr>
                <th><input type="checkbox" group="user_id" class="checkboxCtrl"></th>
                <th orderField="priv_id">角色序列号</th>
                <th orderField="priv_name">角色名称</th>
                <th orderField="priv_user_count">用户数</th>
                <th orderField="priv_forbiduser_count">禁止登陆用户数</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody><?php
foreach ($priv_list as $item) {
    
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