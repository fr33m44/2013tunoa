<?php
class Unit_Model extends CI_Model{
    /*
     * 由最上到最下级显示节点
     * 比如：“某某单位->行政部->院长部”
     * @param int $dept_id deparment id
     */
    var $tbl='';
    
    function  __construct() {
        parent::__construct();
        $this->tbl=$this->db->dbprefix('dept');
    }
    /*
     * 得到父节点
     */
    function _get_parent($dept_id)
    {
        $tablename=$this->db->dbprefix("dept");
        $sql="select parent_id from $tablename where dept_id=$dept_id ";
        $parent=$this->db->query($sql)->row();
        return $parent->parent_id;
    }
    /*
     * 显示节点深度，顶级节点深度为1
     */
    function _get_depth($dept_id)
    {
        return count($this->show_class($dept_id));
    }
    /*
     * 显示本节点层次，比如：单位名称->护理部->总护士长
     */
    function show_class($dept_id=0)
    {
        $dept_arr=array();
        do{
            $row = $this->db->query("select dept_id,dept_name,parent_id from ".$this->tbl." where dept_id=".$dept_id)->row();
            $dept_id=$row->parent_id;
            $dept_arr[]=$row->dept_name;
        }while($row->dept_id != '1');
        $dept_arr=array_reverse($dept_arr);
        return $dept_arr;
        /*
        $dept_str='';
        foreach($dept_arr as $key=>$dept)
        {
            $key == count($dept_arr)-1 ? $dept_str.=$dept : $dept_str.=$dept."->";
        }
        return $dept_str;
         *
         */
    }
    /*
     * 部门结构显示在<select>里面
     */
    function dept_line($uplevel='0')
    {
        
        $tablename=$this->db->dbprefix("dept");
        $sql="select * from $tablename where parent_id=$uplevel ";
        $dept_item=$this->db->query($sql);
        $template='';
        foreach($dept_item->result_array() as $row)
        {
            $dept=$this->_get_depth($row['dept_id']);
            $blank='';
            while($dept>2)
            {
                $blank.="┣";
                $dept--;
            }
            if($this->_has_childdept($row['dept_id']))
            {
                $uplevel = $row['dept_id'];
                $this->uri->segment(5)? $url_dept_id=$this->uri->segment(5) : $url_dept_id=1;
                if($row['dept_id'] == $this->_get_parent($url_dept_id))
                    $template.='<option selected="selected" value="'.$row['dept_id'].'" >'.$blank.$row['dept_name'].'</option>';
                else
                    $template.='<option  value="'.$row['dept_id'].'" >'.$blank.$row['dept_name'].'</option>';
                $template.=self::dept_line($uplevel);
            }
            else
            {
                $this->uri->segment(5)? $url_dept_id=$this->uri->segment(5) : $url_dept_id=1;
                if($row['dept_id'] == $this->_get_parent($url_dept_id))
                    $template.='<option selected="selected"  value="'.$row['dept_id'].'" >'.$blank.$row['dept_name'].'</option>';
                else
                    $template.='<option  value="'.$row['dept_id'].'" >'.$blank.$row['dept_name'].'</option>';
            }
        }
        return $template;
    }
    
    /*
     * 判断是否有子部门/职位（是否是父节点）
     */
    function _has_childdept($dept_id)
    {
        $tablename=$this->db->dbprefix("dept");
        $dept_item=$this->db->query("select * from $tablename where parent_id=$dept_id ");
        return ($dept_item->result()) ? true : false;
    }
    /*
     * 显示部门信息
     */
    function dept_info($dept_id)
    {
        return $row = $this->db->query("select * from ".$this->tbl." where dept_id=".$dept_id)->row();
    }
    
}