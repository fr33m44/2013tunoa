<form id="pagerForm" method="get" action="/office/news/manage/list">
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
                <th>发布人</th>
                <th>类型</th>
                <th>发布范围</th>
                <th>标题</th>
                <th>发布时间</th>
                <th>点击数</th>
                <th>评论数</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody><?php
foreach ($news_list as $item) {
    echo '<tr><td>' . $item['POST_EMPNAME'] . '</td><td>' . $item['NEWS_TYPE'] . '</td><td>' . '范围' . '</td><td>' . $item['NEWS_TITLE'] . '</td><td>' . $item['POST_TIME'] . '</td><td>' . '10' . '</td><td>' . '10' . '</td><td>' . '通过' . '</td><td>' . '编辑' . '</td></tr>' . "\n";
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
            <span>条，共<?= $news_count ?>条</span>
        </div>

        <div class="pagination" targetType="navTab" totalCount="<?= $news_count ?>" numPerPage="<?= $numPerPage ?>" pageNumShown="10" currentPage="<?= $pageNum ?>"></div>

    </div>
</div>