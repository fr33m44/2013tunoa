<?php

/*
 * @descption   部门管理 2011.04.07
 * @author      tunpishuang
 */

class Dept extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('json_tree_model');
        $args = array(
            'table' => $this->db->dbprefix('dept'),
            'fields' => array(
                "id" => "dept_id",
                "parent_id" => "parent_id",
                "position" => "position",
                "left" => "DEPT_LEFT",
                "right" => "DEPT_RIGHT",
                "level" => "DEPT_LEVEL"
            ),
            'add_fields' => array(
                "title" => "dept_name",
                "type" => "dept_type"
            )
        );
        $this->json_tree_model->initialize($args);
    }

    function index()
    {
        $this->load->model('dept_model');
        $data['tree_str'] = $this->dept_model->dept_tree();
        $this->load->view('sys/dept', $data);
    }

    function edit()
    {
        $dept_id = $this->uri->segment(4);
        if (!$dept_id)
            $dept_id = 1;
        $this->load->model('dept_model');
        $dept_info = $this->dept_model->dept_info($dept_id);
        //$this->load->view('sys/dept_edit',$data);
        echo json_encode($dept_info);
    }

    function update()
    {
        $post = $this->input->post();
        $dept_id = $this->uri->segment(4);
        $this->db->where('dept_id', $post['dept_id']);
        $this->db->update('dept', $post);
        $ret = array(
            'statusCode' => '200',
            'message' => '保存成功',
            'navTabId' => '',
            'callbackType' => '',
            'forwardUrl' => ''
        );
        echo json_encode($ret);
    }

    function create()
    {
        //input
        $data = $this->input->post();
        echo $this->json_tree_model->create_node($data);
    }
    function remove()
    {
        $data= $this->input->post();
        echo $this->json_tree_model->remove_node($data);
    }
    function move()
    {
        $data=$this->input->post();
        echo $this->json_tree_model->move_node($data);
    }
    /*
     * 部门控件
     */
    function control()
    {
        $this->load->model('dept_model');
        $data['tree_str'] = $this->dept_model->read_cache();
        $this->load->view('sys/dept_control',$data);
    }

}