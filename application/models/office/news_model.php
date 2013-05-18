<?php
class News_Model extends CI_Model {

    var $title   = '';
    var $content = '';
    var $date    = '';
    var $tablename = 'news';

    function __construct()
    {
        parent::__construct();
    }
    function get_news_list($post)
    {
        $post['pageNum'] = isset($post['pageNum']) ? $post['pageNum'] : '1';
        $post['numPerPage'] = isset($post['numPerPage']) ? $post['numPerPage'] : '20';
        $post['orderField'] = isset($post['orderField']) ? $post['orderField'] : 'post_time';
        $post['orderSort'] = isset($post['orderSort']) && ( $post['orderSort'] == 'asc' || $post['orderSort'] == 'desc') ? $post['orderSort'] : 'desc';
        $offset = ($post['pageNum']-1)*$post['numPerPage']+1;
        $limit = $post['numPerPage'];
        return $this->db->get($this->tablename,$limit,$offset)->result_array();
    }
    function get_news_count()
    {
        return $this->db->get($this->tablename)->num_rows();
    }
}
