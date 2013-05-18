<?php
class Unit extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }
    /*
     * ��ʾ��λ��Ϣ
     */
    function index()
    {
        $this->load->model('cfg_model');
        $data['cfgs']=$this->cfg_model->get_cfg(1); //1�ǵ�λ�����������
        $this->load->view('sys/unit',$data);
    }
    /*
     * ���µ�λ��Ϣ
     */
    function update()
    {
        $arr = array();
        $post=$this->input->post();
        $tablename = $this->db->dbprefix('cfg');
        $sql = 'SELECT cfg_id,cfg_value FROM '.$tablename;
        $query= $this->db->query($sql);
        $result=$query->result_array();
        foreach ($result as $row)
        {
            $arr[$row['cfg_id']] = $row['cfg_value'];
        }
        foreach ($post['value'] AS $key => $val)
        {
            if($arr[$key] != $val)
            {
                $sql = "UPDATE " . $tablename . " SET cfg_value = '" . trim($val) . "' WHERE cfg_id =  " . $key . " ";
                $this->db->query($sql);
            }
        }
        $ret=array(
            'statusCode'=>'200',
            'message'=>'����ɹ�',
            'navTabId'=>'',
            'callbackType'=>'',
            'forwardUrl'=>''
        );
        echo json_encode($ret);
    }
    /*
     * ��֯�ṹ��
     */
    function tree()
    {
        $tablename = $this->db->dbprefix('dept');
        $data['tree_nodes']=$this->db->query('select * from '.$tablename.' order by parent_id asc,dept_id asc')->result_array();
        $this->load->view('sys/tree',$data);
    }
}