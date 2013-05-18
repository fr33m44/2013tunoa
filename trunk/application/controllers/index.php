<?php
class Index extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }
    function index()
    {
        $this->load->helper('url');
        $this->load->model('navigation_model');
        $data['template']=$this->navigation_model->nav_template();
        $this->load->view('index',$data);
    }
    function desktop()
    {
        $this->load->view('desktop');
    }
}