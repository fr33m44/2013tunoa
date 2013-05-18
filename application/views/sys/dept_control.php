<script type="text/javascript">
    $(document).ready(function(){
        $("#treeview2").jstree({
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
    });
</script>
<div id="treeview2">
    <?= $tree_str ?>
</div>