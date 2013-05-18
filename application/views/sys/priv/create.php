<div class="pageContent">
    <form method="post" action="/sys/priv/create" class="pageForm required-validate" onsubmit="return validateCallback(this)">
        <div class="pageFormContent">

            <p>
                <label>角色名称：</label>
                <input type="text" name="priv_name" size="30" maxlength="20" class="required"/>
                <input type="hidden" name="priv_order" value="1"/>
            </p>
        </div>
        <div class="formBar">
            <ul>
                <li><div class="buttonActive"><div class="buttonContent"><button type="submit">提交</button></div></div></li>
                <li><div class="button"><div class="buttonContent"><button type="button" class="close">取消</button></div></div></li>
            </ul>
        </div>
    </form>
</div>