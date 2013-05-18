<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>tree</title>
        <script type="text/javascript" src="/js/MzTreeView12.js"></script>
        <script type="text/javascript">
        function dept_edit(dept_id)
        {
            //document.getElementById("dept_edit").contentWindow.location="/sys/dept/edit/dept_id/"+dept_id;
            parent.frames['dept_edit'].location="/sys/dept/edit/dept_id/"+dept_id;
        }
        tree = new MzTreeView("tree");
        tree.setURL="#tree-block";
        tree.setIconPath('/img/tree/');
        <?php
        foreach ($tree_nodes as $node)
        {
            echo 'tree.N["'.$node['parent_id'].'_'.$node['dept_id'].'"]="T:'.$node['dept_name'].';C:dept_edit('.$node['dept_id'].')";'."\n";
        }
        ?>
        </script>
    </head>
    <body>
        <div id="tree-block">

        </div>
        <script type="text/javascript">
        document.getElementById("tree-block").innerHTML=tree.toString();
        </script>
    </body>
</html>