<div class="pageContent">
    <!--<h2 class="contentTitle">编辑用户信息</h2>-->
    <form method="post" action="ajaxDone.html" class="pageForm required-validate" onsubmit="return validateCallback(this)">
        <div class="tabs" currentIndex="0" eventType="click">
            <div class="tabsHeader">
                <div class="tabsHeaderContent">
                    <ul>
                        <li><a href="javascript:void(0)"><span>基本信息</span></a></li>
                        <li><a href="javascript:void(0)"><span>权限信息</span></a></li>
                        <li><a href="javascript:void(0)"><span>其他选项</span></a></li>
                        <li><a href="javascript:void(0)"><span>自定义选项</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="tabsContent"  layoutH="70">
                <div class="pageFormContent">

                    <p>
                        <label>用户名：</label>
                        <?=$user_info->LOGIN_NAME ?>
                    </p>
                    <p>
                        <label>真实姓名：</label>
                        <input type="text" name="real_name" size="30" maxlength="20" value="<?=$user_info->REAL_NAME ?>" />
                    </p>
                    <p>
                        <label>角色：</label>
                        <input type="text" name="user_priv" size="30" />
                    </p>
                    <p>
                        <label>部门/职位：</label>
                        <input type="password" name="password" size="30"/><a href="/sys/dept/control" target="dialog" mask="true" class="button"><span>选择职位</span></a>
                    </p>
                    <p>
                        <label>用户排序号：</label>
                        <input type="password" name="password" size="30"/>
                    </p>
                </div>
                <div class="pageFormContent">
                    <p>
                        <label>用户排序号：</label>
                        <input type="password" name="password" size="30"/>
                    </p>
                    <p>
                        <label>用户排序号：</label>
                        <input type="password" name="password" size="30"/>
                    </p>
                    <p>
                        <label>用户排序号：</label>
                        <input type="password" name="password" size="30"/>
                    </p>
                    <p>
                        <label>用户排序号：</label>
                        <input type="password" name="password" size="30"/>
                    </p>
                    <p>
                        <label>用户排序号：</label>
                        <input type="password" name="password" size="30"/>
                    </p>
                </div>
                <div class="pageFormContent">
                    
                </div>
            </div>
            <div class="formBar">
                <ul>
                    <li><div class="buttonActive"><div class="buttonContent"><button type="submit">提交</button></div></div></li>
                    <li><div class="button"><div class="buttonContent"><button type="button" class="close">取消</button></div></div></li>
                </ul>
            </div>
        </div>
    </form>
</div>