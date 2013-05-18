<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class News extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}
	function manage()
	{
		$this->load->model('/office/news_model');
		$post=$this->input->post();
		$data['user_list']=$this->news_model->get_news_list($post);
		$data['user_count']=$this->news_model->get_news_count();
		$data['numPerPage']=isset($post['numPerPage'])? $post['numPerPage'] : 20;
		$data['pageNum']=$post['pageNum'];
		$this->load->view('/office/news/manage/list',$data);
	}
	function view()
	{
		
	}
}
