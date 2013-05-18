<?php

class User_Model extends CI_Model
{

    var $tablename = '';

    function __construct()
    {
        parent::__construct();
        $this->tablename = 'user';
    }

    function get_list($post)
    {
        $post['pageNum'] = isset($post['pageNum']) ? $post['pageNum'] : '1';
        $post['numPerPage'] = isset($post['numPerPage']) ? $post['numPerPage'] : '20';
        $post['orderField'] = isset($post['orderField']) ? $post['orderField'] : '';
        $post['orderSort'] = isset($post['orderSort']) && ( $post['orderSort'] == 'asc' || $post['orderSort'] == 'desc') ? $post['orderSort'] : 'desc';

        $offset = ($post['pageNum'] - 1) * $post['numPerPage'] + 1;
        $limit = $post['numPerPage'];
        $user_list = $this->db->get($this->tablename, $limit, $offset)->result_array();
        //return $user_list;
        foreach ($user_list as $k => $user) {
            $user_list[$k]['position'] = $this->get_position($user['user_id']);
            $user_list[$k]['parent_dept_name'] = $this->get_dept($user['user_id']);
        }
        return $user_list;
    }

    function get_count()
    {
        return $this->db->get($this->tablename)->num_rows();
    }

    function delete($user_id)
    {
        $this->db->delete($this->tablename, 'user_id=' . $user_id);
        $ret = array(
            'statusCode' => '200',
            'message' => '删除成功',
            'navTabId' => '',
            'callbackType' => '',
            'forwardurl' => ''
        );
        echo json_encode($ret);
    }

    function add()
    {
        
    }

    /*
     * get the position of the specified user
     */

    function get_position($user_id)
    {
        return $this->_get_dept_name($user_id, 1);
    }

    function get_dept($user_id)
    {
        return $this->_get_dept_name($user_id, 2);
    }

    /*
     * @author tunpishuang
     * @param int $level
     * @return string $dept_name
     */

    function _get_dept_name($user_id, $level)
    {
        $query = $this->db->get_where('user', array('user_id' => $user_id));
        while ($level > 0) {
            if (is_string($query->row('parent_id'))) {
                $query = $this->db->get_where('dept', array('dept_id' => $query->row('parent_id')));
            } else {
                $query = $this->db->get_where('dept', array('dept_id' => $query->row('dept_id')));
            }
            $level--;
        }
        return $query->row('dept_name');
    }
    function get_user_info($user_id)
    {
        $query = $this->db->get_where('user', array('user_id' => $user_id));
        return $query->row();
    }
    function save_user($user_id)
    {
        //update or insert?
        
    }

}
