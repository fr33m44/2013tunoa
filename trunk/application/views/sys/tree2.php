<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>tree</title>
        <script type="text/javascript" src="/js/MzTreeView12.js"></script>
        <script type="text/javascript">
        tree = new MzTreeView("tree");
        tree.setURL="#tree-block";
        tree.setIconPath('/img/tree/');
        tree.N["-1_0"]="T:某某医院";
        <?php
        foreach ($tree_nodes as $node)
        {
            echo 'tree.N["'.$node['parent_id'].'_'.$node['dept_id'].'"]="T:'.$node['dept_name'].'";'."\n";
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