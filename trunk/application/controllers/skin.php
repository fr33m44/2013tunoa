<?php
/**
 *
 * @author  tunpishuang
 * @name    skin Controller
 */
class Skin extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	function index()
	{
        $this->load->view('dialog/skin_list');
    }
    function change()
    {
        $this->load->helper('cookie');
        $get = $this->input->get(null, true);
        if(isset($get['skin_name']) && isset($get['style_name']))
        {
            set_cookie('theme', $get['skin_name'], 60*60*24*365, '', '/');//A year
            set_cookie('style', $get['style_name'], 60*60*24*365, '', '/');//A year
            $this->load->view('dialog/skin_change');
        }
    }
}
?>
