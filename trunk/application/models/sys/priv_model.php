<?php

class Priv_Model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
        $this->tablename = 'priv';
    }
    function get_list($post)
    {
        $post['pageNum'] = isset($post['pageNum']) ? $post['pageNum'] : '1';
        $post['numPerPage'] = isset($post['numPerPage']) ? $post['numPerPage'] : '20';
        $post['orderField'] = isset($post['orderField']) ? $post['orderField'] : '';
        $post['orderSort'] = isset($post['orderSort']) && ( $post['orderSort'] == 'asc' || $post['orderSort'] == 'desc') ? $post['orderSort'] : 'desc';

        $offset = ($post['pageNum'] - 1) * $post['numPerPage'] + 1;
        $limit = $post['numPerPage'];
        $priv_list = $this->db->get($this->tablename, $limit, $offset)->result_array();
        return $priv_list;
    }
    function get_count()
    {
        return $this->db->get($this->tablename)->num_rows();
    }
    function create($data)
    {
        if(trim($data['priv_name'] == ''))
        {
            
        }
        $this->db->insert($this->tablename,$data);
    }
    function delete($priv_id)
    {
        
    }

}