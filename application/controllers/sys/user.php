<?php
class User extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }
    function index()
    {
        $this->load->model('/sys/user_model');
        $post=$this->input->post();
        $data['user_list']=$this->user_model->get_list($post);
        $data['user_count']=$this->user_model->get_count();
        $data['numPerPage']=isset($post['numPerPage'])? $post['numPerPage'] : 20;
        $data['pageNum']=$post['pageNum'];
        $this->load->view('/sys/user/index',$data);
    }
    function delete()
    {
        if($post=$this->input->post()){
            //批量删除
            print_r($post);
        }else{
            $user_id=$this->uri->segment(5);
            $this->load->model('/sys/user_model');
            $this->user_model->delete($user_id);
        }
    }
    function add()
    {
        
    }
    function edit()
    {
        $user_id=$this->uri->segment(5);
        $this->load->model('/sys/user_model');
        $data['user_info'] = $this->user_model->get_user_info($user_id);
        $this->load->view('/sys/user/edit',$data);
    }
}