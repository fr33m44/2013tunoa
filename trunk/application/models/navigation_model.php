<?php
/*
 * 导航模型
 * 负责左侧导航控制/显示
 */
class Navigation_Model extends CI_Model {

    

    function __construct()
    {
        parent::__construct();
    }
    /*
     * 判断是否有子节点
     */
    private function _has_childnodes($node_id)
    {
        $tablename=$this->db->dbprefix("menu");
        $menu_item=$this->db->query("select * from $tablename where id_parent=$node_id ");
        return ($menu_item->result()) ? true : false;
    }
    function nav_template($uplevel=0)
    {
        $tablename=$this->db->dbprefix("menu");
        $sql="select * from $tablename where id_parent=$uplevel ";
        $menu_item=$this->db->query($sql);
        $template='';
        foreach($menu_item->result_array() as $row)
        {
            if($this->_has_childnodes($row['menu_id']))
            {
                if($row['id_parent'] == '0')
                {
                    $template.=  '<div class="accordionHeader"><h2><span>Folder</span>'.$row['menu_name'].'</h2></div>'."\n";
                    $template.= '<div class="accordionContent"><ul class="tree treeFolder">';
                }
                else
                {
                    $template.= '<li><a href="'.$row['url'].'" target="navTab">'.$row['menu_name'].'</a>'."\n".'<ul>'."\n";
                }
                $uplevel = $row['menu_id'];
                $template.=self::nav_template($uplevel);
                if($row['id_parent'] == '0')
                    $template.= '</div>';
            }
            else
            {
                if($row['menu_name'] == '首页')
                    $template.= '<li><a href="'.$row['url'].'" target="navTab" rel="main">'.$row['menu_name'].'</a></li>';
                else
                    $template.= '<li><a href="'.$row['url'].'" target="navTab" rel="page'.$row['menu_id'].'">'.$row['menu_name'].'</a></li>';

            }
        }
        $template.= "\n</ul>";
        return $template;
    }
}
