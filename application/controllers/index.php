<?php
class Index extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }
    function index()
    {
        //get theme name and style name from Cookie array
        $this->load->helper('cookie');
        $bRet = get_cookie('theme', true);
        $bRet2 = get_cookie('style', true);
        if(!$bRet || !$bRet2)
        {
            set_cookie('theme', 'sky', 60*60*24*365, '', '/');//A year
            set_cookie('style', 'blue', 60*60*24*365, '', '/');//A year
            $data['theme'] = 'sky';
            $data['style'] = 'blue';
        }
        else
        {
            $data['theme'] = get_cookie('theme');
            $data['style'] = get_cookie('style');
        }
        $this->load->view('index', $data);
    }
    function shortcut()
    {
        $this->load->view('shortcut');
    }
    function nav()
    {
        $this->load->helper('url');
        $this->load->model('navigation_model');
        $data['template']=$this->navigation_model->nav_template();
        $this->load->view('nav',$data);
    }
    function desktop()
    {
        $this->load->view('desktop');
    }
}