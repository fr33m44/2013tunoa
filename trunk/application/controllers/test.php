<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of blog
 *
 * @author Administrator
 */
class Test extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	function index()
	{
            $query1 = $this->db->query("SELECT * FROM tun_mail");
            $result1 = $query1->result(); // Returns Value of table 1
            print_r($result1);
            $query1->free_result();
        }
        
}
?>
