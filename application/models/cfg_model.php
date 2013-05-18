<?php
class Cfg_Model extends CI_Model {
    function __construct()
    {
        parent::__construct();
    }

    function get_cfg($parent_id)
    {
        $query = $this->db->get_where('cfg',array('parent_id'=>$parent_id));
        return $query->result_array();
    }
    function update_cfg($key, $val)
    {
        if (!empty($key))
        {
            $sql = "UPDATE " . $GLOBALS['ecs']->table('shop_config') . " SET cfg_value='$val' WHERE code='$key'";

            return $GLOBALS['db']->query($sql);
        }

        return true;
    }
}
