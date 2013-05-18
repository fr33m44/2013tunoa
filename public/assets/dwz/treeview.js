(function($){
    $.extend($.fn, {
        treeview:function()
        {
            $("#treeview").jstree({
                "core":{
                    "initially_open":["dept_1"],
                    "animation":0
                },
                "types" : {
                    "valid_children" : [ "drive" ],
                    "types" : {
                        "default" : {
                            "valid_children" : "none",
                            "icon" : {
                                "image" : "/img/tree/file.gif"
                            }
                        },
                        "folder" : {
                            "valid_children" : [ "default", "folder" ],
                            "icon" : {
                                "image" : "/img/tree/folder.gif"
                            }
                        },
                        "drive" : {
                            "valid_children" : [ "default", "folder" ],
                            "icon" : {
                                "image" : "/img/tree/root.gif"
                            },
                            "start_drag" : false,
                            "move_node" : false,
                            "delete_node" : false,
                            "remove" : false
                        }
                    }
                },
                "plugins" : [ "themes", "html_data", "crrm", "dnd" , "types" , "ui" , "contextmenu"]
            })
            .delegate("a","click",function(e){
                var node_id= $.jstree._focused().get_selected().attr("id").replace("dept_","");
                $("#dept_id").val(node_id);
                $.ajax({
                    type	:"GET",
                    url		:"/sys/dept/edit/"+node_id,
                    dataType:"json",
                    success	:function(data){
                        $("#dept_name").val(data.DEPT_NAME);
                        $("#tel_no").val(data.TEL_NO);
                        $("#fax_no").val(data.FAX_NO);
                        $("#dept_addr").val(data.DEPT_ADDR);
                    }
                });
            })
            .bind("create.jstree", function (e, data) {
			$.post(
				"/sys/dept/create",
				{
					"DEPT_ID" : data.rslt.parent.attr("id").replace("dept_",""),
					"POSITION" : data.rslt.position,
					"DEPT_NAME" : data.rslt.name,
					"DEPT_TYPE" : data.rslt.obj.attr("rel")
				},
				function (r) {
                                        eval("var r="+r);
					if(r.status) {
						$(data.rslt.obj).attr("id", "dept_" + r.id);
                                                $("#treeview").jstree('refresh',-1);
					}
					else {
						$.jstree.rollback(data.rlbk);
					}
				}
			);
		})
                .bind("remove.jstree", function (e, data) {
			data.rslt.obj.each(function () {
				$.ajax({
					async : false,
					type: 'POST',
					url: "/sys/dept/remove",
					data : {
						"id" : this.id.replace("dept_","")
					},
					success : function (r) {
                                                eval("var r="+r);
						if(!r.status) {
							data.inst.refresh();
						}
					}
				});
			});
		})
                .bind("move_node.jstree", function (e, data) {
			data.rslt.o.each(function (i) {
				$.ajax({
					async : false,
					type: 'POST',
					url: "/sys/dept/move",
					data : {
						"id" : $(this).attr("id").replace("dept_",""),
						"ref" : data.rslt.np.attr("id").replace("dept_",""),
						"position" : data.rslt.cp + i,
						"title" : data.rslt.name,
						"copy" : data.rslt.cy ? 1 : 0
					},
					success : function (r) {
                                                eval("var r="+r);
						if(!r.status) {
							$.jstree.rollback(data.rlbk);
						}
						else {
							$(data.rslt.oc).attr("id", "dept_" + r.id);
							if(data.rslt.cy && $(data.rslt.oc).children("UL").length) {
								data.inst.refresh(data.inst._get_parent(data.rslt.oc));
							}
						}
						//$("#analyze").click();
					}
				});
			});
		})
                ;
        }
    });
})(jQuery);
