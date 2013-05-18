<script type="text/javascript">
$(function () {
	$("#toolbar li").click(function () {
		switch(this.id) {
			case "add_default":
			case "add_folder":
				$("#treeview").jstree("create", null, "last", { "attr" : { "rel" : this.id.toString().replace("add_", "") } });
				break;
			case "search":
				$("#treeview").jstree("search", document.getElementById("text").value);
				break;
			case "text": break;
			default:
				$("#treeview").jstree(this.id);
				break;
		}
	});
});
</script>
<div class="pageContent" layoutH="0">
    <div id="content-box">
        <div class="border">
            <form class="form-validate" id="dept_form" name="dept_form" method="post" action="/sys/dept/update" onsubmit="return validateCallback(this, navTabAjaxDone);">
                <div class="padding">

                    <div id="toolbar-box">
                        <div class="t">
                            <div class="t">
                                <div class="t"></div>
                            </div>
                        </div>
                        <div class="m">
                            <div id="toolbar" class="toolbar-list">
                                <ul>
                                    <li id="add_folder" class="buttonXXX">
                                        <a class="toolbar" href="#">
                                            <span class="icon-32-new">
                                            </span>
                                            新建部门
                                        </a>
                                    </li>
                                    <li id="add_default" class="buttonXXX">
                                        <a class="toolbar" href="#">
                                            <span class="icon-32-new">
                                            </span>
                                            新建职位
                                        </a>
                                    </li>
                                    <li id="remove" class="buttonXXX">
                                        <a class="toolbar" href="#">
                                            <span class="icon-32-delete">
                                            </span>
                                            删除
                                        </a>
                                    </li>
                                    <li id="toolbar-save" class="buttonXXX">
                                        <a class="toolbar" onclick="$('#dept_form').submit();">
                                            <span class="icon-32-save">
                                            </span>
                                            保存
                                        </a>
                                    </li>
                                    <li id="toolbar-cancel" class="buttonXXX">
                                        <a class="toolbar" onclick="navTab.closeCurrentTab()" href="#">
                                            <span class="icon-32-cancel">
                                            </span>
                                            关闭
                                        </a>
                                    </li>

                                </ul>
                                <div class="clr"></div>
                            </div>
                            <div class="pagetitle icon-48-groups"><h2>部门/职位管理</h2></div>
                            <div class="clr"></div>
                        </div>
                        <div class="b">
                            <div class="b">
                                <div class="b"></div>
                            </div>
                        </div>
                    </div>
                    <div class="clr"></div>

                    <div id="element-box">
                        <div class="t">
                            <div class="t">
                                <div class="t"></div>
                            </div>
                        </div>
                        <div class="m">

                            <div class="width-60 fltlft">
                                <fieldset class="adminform">
                                    <legend>部门/职位信息</legend>
                                    <ul class="adminformlist">
                                        <li>
                                            <label for="dept_name" >部门名称：</label>
                                            <input type="hidden" id="dept_id" name="dept_id" />
                                            <input type="text" size="30" class="inputbox" id="dept_name" name="dept_name">
                                        </li>
                                        <li>
                                            <label for="tel_no" >电话：</label>
                                            <input type="text" size="30" class="inputbox" id="tel_no" name="tel_no">
                                        </li>
                                        <li>
                                            <label for="fax_no" >传真：</label>
                                            <input type="text" size="30" class="inputbox" id="fax_no" name="fax_no">
                                        </li>
                                        <li>
                                            <label for="dept_addr" >部门地址：</label>
                                            <input type="text" size="30" class="inputbox" id="dept_addr" name="dept_addr">
                                        </li>
                                    </ul>
                                </fieldset>

                            </div>

                            <div class="width-40 fltrt">
                                <div class="pane-sliders" id="sliders">
                                    <div style="display:none;"><div></div></div>
                                    <div class="panelj"><h3 id="settings" class="title pane-toggler-down"><a href="javascript:void(0);"><span>组织结构树</span></a></h3>
                                        <div class="pane-slider content pane-down" style="padding-top: 0px; border-top: medium none; padding-bottom: 0px; border-bottom: medium none; overflow: hidden; height: auto;">
                                            <fieldset class="panelform">
                                                <div id="treeview">
                                                    <?= $tree_str ?>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="clr"></div>
                        </div>
                        <div class="b">
                            <div class="b">
                                <div class="b"></div>
                            </div>
                        </div>
                    </div>
                    <noscript>
			Warning! JavaScript must be enabled for proper operation of the Administrator backend.		</noscript>
                    <div class="clr"></div>
                </div>
            </form>
            <div class="clr"></div>
        </div>
    </div>
</div>