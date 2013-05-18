<?php

class Priv extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
    }

    function index()
    {
        $this->load->model('/sys/priv_model');
        $post = $this->input->post();
        $data['priv_list'] = $this->priv_model->get_list($post);
        $data['user_count'] = $this->priv_model->get_count();
        $data['numPerPage'] = isset($post['numPerPage']) ? $post['numPerPage'] : 20;
        $data['pageNum'] = $post['pageNum'];
        $this->load->view('/sys/priv/index', $data);
    }

    function create()
    {
        if ($this->input->post() != null) {//insert data
            $this->load->model('/sys/priv_model');
            $post = $this->input->post();
            $this->priv_model->create($post);
            $ret = array(
                'statusCode' => '200',
                'message' => '创建角色成功',
                'navTabId' => 'page_priv_create',
                'callbackType' => 'forward',
                'forwardUrl' => '/sys/priv/create'
            );
            echo json_encode($ret);
        } else {
            $this->load->view('/sys/priv/create');
        }
    }

}