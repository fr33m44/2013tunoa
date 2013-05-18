<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author tunpishuang
 */
class Login extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	function index()
	{
            $this->load->helper('captcha');
            $vals = array(
            'img_path' => 'd:\\www\\tunoa\\img\\',
            'img_url' => 'http://tunoa/img/',
            'font_path' => 'c:\windows\fonts\simhei.ttf',
            'expiration' => '7200'
            );
            $captcha = create_captcha($vals);
            $this->session->set_userdata('captcha_word',$captcha['word']);
            $this->load->view('login',$captcha);
        }
        function check()
        {
            if ( $this->session->userdata('captcha_word') == $this->input->post('captcha_word') || strtolower($this->session->userdata('captcha_word')) == $this->input->post('captcha_word')  )
                    echo 1;
            else
                echo 0;
        }
}
?>
