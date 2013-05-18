<div class="page">
	<div class="pageContent">
		<form method="post" action="/sys/unit/update" class="pageForm required-validate" onsubmit="return validateCallback(this, navTabAjaxDone);">
			<div class="pageFormContent" id="unitForm" layoutH="56">
                            <fieldset>
                                <legend>单位管理</legend>
				<table>
                                <tr>
					<td class="label">单位名称：</td>
                                        <td><input name="sn" type="text" size="30" /></td>
				</tr>
				<tr>
					<td class="label">电话：</td>
					<td><input name="name" type="text" size="30" /></td>
				</tr>
				<tr>
					<td class="label">传真：</td>
					<td><input name="code"  type="text" size="30" /></td>
				</tr>
				<tr>
					<td class="label">邮编：</td>
					<td><input name="type" type="text" size="30" /></td>
				</tr>
				<tr>
					<td class="label">地址：</td>
					<td><input type="text" size="30" /></td>
				</tr>
				<tr>
					<td class="label">网站：</td>
					<td><input type="text" name="startDate" class="date" size="30" /><a class="inputDateButton" href="javascript:void(0)">选择</a></td>
				</tr>
				<tr>
					<td class="label">电子信箱：</td>
					<td><input type="text" name="endDate" class="date" size="30" /><a class="inputDateButton" href="javascript:void(0)">选择</a></td>
				</tr>
				<tr>
					<td class="label">开户行：</td>
					<td><input type="text" size="30" /><span class="unit">万元</span></td>
				</tr>
				<tr>
					<td class="label">单位简介：</td>
					<td><textarea cols="100" rows="11" class="editor" name="unit_intro">
                                        </textarea>
                                        </td>
				</tr>
                            </table>
                            </fieldset>
			</div>
			<div class="formBar">
				<ul>
					<!--<li><a class="buttonActive" href="javascript:void(0)"><span>保存</span></a></li>-->
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
</div>