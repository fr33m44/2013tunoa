<?php
class City extends CI_Model {

    var $title   = '';
    var $content = '';
    var $date    = '';

    function __construct()
    {
        parent::__construct();
    }

    function get_last_ten_entries()
    {
        $query = $this->db->get('city', 10);
        return $query->result();
    }
}
