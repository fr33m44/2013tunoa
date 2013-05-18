<?php
class Login extends CI_Model {

    var $username   = '';
    var $pasword  = '';
    var $remember    = false;

    function __construct()
    {
        parent::__construct();
    }

    function check()
    {
        //echo $this->db->dbprefix('employee');
        //$query = $this->db->get('employee', 10);
        //return $query->result();
    }
}
