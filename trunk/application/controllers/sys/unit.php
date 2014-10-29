<?php
class Unit extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }
    /*
     * 显示单位信息
     */
    function index()
    {
        $this->load->model('cfg_model');
        $data['cfgs']=$this->cfg_model->get_cfg(1); //1是单位管理相关设置
        $this->load->view('sys/unit',$data);
    }
    /*
     * 更新单位信息
     */
    function update()
    {
        sleep(5);
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
                //$sql = "UPDATE " . $tablename . " SET cfg_value = '" . trim($val) . "' WHERE cfg_id =  " . $key . " ";
                $this->db->bind('@tablename', $tablename);
                $this->db->bind('@cfg_value', $cfg_value);
                $this->db->bind('@cfg_id', $cfg_id);
                $this->db->query("UPDATE @tablename SET cfg_value = @cfg_value WHERE cfg_id=@cfg_id", array($tablename, $val, $key));
                /*
                $data = array(
                    'cfg_value' => $val
                );
                $this->db->where('cfg_id', $key);
                $this->db->update($tablename, $data);
                */
            }
        }
        $ret=array(
            'statusCode'=>'200',
            'message'=>'保存成功',
            'navTabId'=>'',
            'callbackType'=>'',
            'forwardUrl'=>''
        );
        echo json_encode($ret);
    }
    /*
     * 组织结构树
     */
    function tree()
    {
        $tablename = $this->db->dbprefix('dept');
        $data['tree_nodes']=$this->db->query('select * from '.$tablename.' order by parent_id asc,dept_id asc')->result_array();
        $this->load->view('sys/tree',$data);
    }
}