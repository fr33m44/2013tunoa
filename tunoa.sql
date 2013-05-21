/*
SQLyog Ultimate v8.61 
MySQL - 5.5.8-log : Database - tunoa
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tunoa` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `tunoa`;

/*Table structure for table `tun_accessory` */

DROP TABLE IF EXISTS `tun_accessory`;

CREATE TABLE `tun_accessory` (
  `accessory_id` int(8) NOT NULL AUTO_INCREMENT,
  `accessory_size` int(10) DEFAULT NULL,
  `accessory_name` varchar(200) DEFAULT NULL,
  `accessory_desc` varchar(200) DEFAULT NULL,
  `create_date` int(11) DEFAULT NULL,
  PRIMARY KEY (`accessory_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tun_accessory` */

/*Table structure for table `tun_cfg` */

DROP TABLE IF EXISTS `tun_cfg`;

CREATE TABLE `tun_cfg` (
  `cfg_id` int(5) NOT NULL AUTO_INCREMENT,
  `cfg_name` varchar(50) DEFAULT NULL,
  `cfg_desc` varchar(200) DEFAULT NULL,
  `parent_id` int(5) DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `cfg_type` varchar(10) DEFAULT NULL,
  `store_range` varchar(255) DEFAULT NULL,
  `store_dir` varchar(255) DEFAULT NULL,
  `cfg_value` text,
  `sort_order` int(11) DEFAULT '1',
  PRIMARY KEY (`cfg_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `tun_cfg` */

insert  into `tun_cfg`(`cfg_id`,`cfg_name`,`cfg_desc`,`parent_id`,`code`,`cfg_type`,`store_range`,`store_dir`,`cfg_value`,`sort_order`) values (1,'单位管理','',0,'unit_info','group','','','',1),(2,'单位管理1','',0,'unit1_info','group','','','',1),(3,'单位管理2','',0,'unit2_info','group','','','',1),(4,'单位管理3','',0,'unit3_info','group','','','',1),(5,'单位管理4','',0,'unit4_info','group','','','',1),(6,'单位名称','',1,'unit_name','text','','','',1),(7,'电话','',1,'tel_no','text','','','',1),(8,'传真','',1,'fax_no','text','','','',1),(9,'邮编','',1,'post_no','text','','','',1),(10,'地址','',1,'address','text','','','',1),(11,'网站','',1,'website','text','','','',1),(12,'电子邮箱','',1,'email','text','','','',1),(13,'开户行','',1,'bank_name','text','','','',1),(14,'开户号','',1,'bank_no','text','','','',1),(15,'单位简介','',1,'intro','textarea','','','',1);

/*Table structure for table `tun_dept` */

DROP TABLE IF EXISTS `tun_dept`;

CREATE TABLE `tun_dept` (
  `dept_id` int(8) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(50) DEFAULT NULL,
  `parent_id` int(8) DEFAULT NULL,
  `position` int(4) DEFAULT NULL,
  `dept_type` varchar(10) DEFAULT NULL,
  `dept_left` varchar(10) DEFAULT NULL,
  `dept_right` varchar(10) DEFAULT NULL,
  `dept_level` varchar(4) DEFAULT NULL,
  `tel_no` varchar(20) DEFAULT NULL,
  `fax_no` varchar(20) DEFAULT NULL,
  `dept_addr` varchar(200) DEFAULT NULL,
  `dept_sort` varchar(200) DEFAULT NULL,
  `manager` varchar(100) DEFAULT NULL,
  `leader1` varchar(100) DEFAULT NULL,
  `leader2` varchar(100) DEFAULT NULL,
  `dept_duty` varchar(1000) DEFAULT NULL,
  `is_org` int(1) DEFAULT NULL,
  `org_admin` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

/*Data for the table `tun_dept` */

insert  into `tun_dept`(`dept_id`,`dept_name`,`parent_id`,`position`,`dept_type`,`dept_left`,`dept_right`,`dept_level`,`tel_no`,`fax_no`,`dept_addr`,`dept_sort`,`manager`,`leader1`,`leader2`,`dept_duty`,`is_org`,`org_admin`) values (1,'单位名称',0,0,'drive','1','2','0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'院部',1,0,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'政治部',1,1,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'医务部',1,2,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'护理部',1,3,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'经济部',1,4,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'信息科',1,5,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'医学工程科',1,6,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'门诊系统',1,7,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'内科系统',1,8,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'外科系统',1,9,'folder',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'院长',2,0,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'政委',2,1,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'副院长',2,2,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'秘书',2,3,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'主任',3,0,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'副主任',3,1,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'干事',3,2,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'主任',4,0,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'副主任',4,1,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'助理员',4,2,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'训练队',4,3,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'队长',23,0,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'助理员',23,1,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'队员',23,2,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'主任',5,0,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'总护士长',5,1,'default',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `tun_mail` */

DROP TABLE IF EXISTS `tun_mail`;

CREATE TABLE `tun_mail` (
  `mail_id` int(11) NOT NULL AUTO_INCREMENT,
  `send_time` int(11) DEFAULT NULL,
  `mail_title` varchar(200) DEFAULT NULL,
  `mail_content` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`mail_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `tun_mail` */

insert  into `tun_mail`(`mail_id`,`send_time`,`mail_title`,`mail_content`) values (1,2013,'标题','内容'),(2,2013,'标题2','内容2'),(3,2010,'标题3','内容3'),(4,2010,'标题4','内容4'),(5,2013,'标题5','内容5'),(6,2013,'标题6','内容6'),(7,2013,'标题7','内容7');

/*Table structure for table `tun_mail_status` */

DROP TABLE IF EXISTS `tun_mail_status`;

CREATE TABLE `tun_mail_status` (
  `msid` int(11) NOT NULL AUTO_INCREMENT,
  `mail_id` int(11) DEFAULT NULL,
  `from_id` int(8) DEFAULT NULL,
  `from_status` varchar(20) DEFAULT NULL,
  `from_name` varchar(20) DEFAULT NULL,
  `to_id` int(11) DEFAULT NULL,
  `to_status` varchar(20) DEFAULT NULL,
  `to_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`msid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `tun_mail_status` */

insert  into `tun_mail_status`(`msid`,`mail_id`,`from_id`,`from_status`,`from_name`,`to_id`,`to_status`,`to_name`) values (1,1,1,'sent','管理员',2,'unread','张三'),(2,2,1,'sent','管理员',2,'read','张三'),(3,3,3,'sent','大地撒',1,'unread','管理员'),(4,4,3,'sent','大地撒',1,'read','管理员'),(5,3,3,'sent','大地撒',2,'read','张三');

/*Table structure for table `tun_menu` */

DROP TABLE IF EXISTS `tun_menu`;

CREATE TABLE `tun_menu` (
  `menu_id` int(8) NOT NULL COMMENT '菜单id',
  `menu_name` varchar(40) NOT NULL COMMENT '菜单名称',
  `id_parent` int(8) NOT NULL COMMENT '菜单父id',
  `url` varchar(300) NOT NULL COMMENT '菜单url',
  PRIMARY KEY (`menu_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tun_menu` */

insert  into `tun_menu`(`menu_id`,`menu_name`,`id_parent`,`url`) values (1,'个人事务',0,'/my'),(50,'电子邮件',1,'/email/index'),(100,'短消息',1,'/msg/'),(150,'手机短信',1,'/mobmsg/'),(200,'网络传真',1,'/fax/'),(250,'公告通知',2,'/office/notice'),(300,'新闻',1,'/office/news/index'),(350,'投票',1,'/office/vote/index'),(400,'个人考勤',1,''),(450,'日程安排',1,''),(500,'工作日志',1,'/office/note'),(550,'通讯录',1,''),(600,'我的网盘',1,''),(650,'我的视频会议',1,''),(1000,'工作流',0,'/flow'),(1050,'新建工作',1000,'/flow/create'),(1100,'我的工作',1000,'/flow/my'),(1150,'工作查询',1000,'/flow/search'),(1200,'工作监控',1000,'/flow/monitor'),(1250,'数据报表',1000,'/flow/report'),(1300,'超时统计分析',1000,'/flow/statistic'),(1350,'工作委托',1000,'/flow/delegate'),(1400,'工作销毁',1000,'/flow/destroy'),(1450,'流程日志查询',1000,'/flow/log'),(2000,'行政办公',0,'/office'),(2050,'公告通知管理',2000,'/office/notice/manage'),(2100,'公告通知审批',2000,'/office/notice/approve'),(2150,'新闻管理',2000,'/office/news/manage/'),(2200,'投票管理',2000,'/office/vote/manage'),(2250,'日程安排查询',2000,'/office/agenda/search'),(2300,'工作日志查询',2000,'/office/note/search'),(2350,'管理简报',2000,'/office/jianbao/manage'),(2400,'工作计划',2000,'/office/plan/'),(2401,'工作计划查询',2400,'/office/plan/search'),(2402,'工作计划管理',2400,'/office/plan/manage'),(2403,'工作计划类型设置',2400,'/office/plan/set_category'),(2450,'办公用品管理',2000,'/office/stationery'),(2451,'办公用品信息查询',2450,'/office/stationery/index'),(2452,'办公用品信息管理',2450,'/office/stationery/manage'),(2453,'办公用品登记管理',2450,'/office/stationery/sign'),(2454,'个人办公用品登记',2450,'/office/stationery/mysign'),(2455,'办公用品库设置',2450,'/office/stationery/set'),(2456,'办公用品报表',2450,'/office/stationery/report'),(2500,'固定资产',2000,'/office/asset'),(2501,'参数设置',2500,'/office/asset/set'),(2502,'固定资产管理',2500,'/office/asset/manage'),(2503,'固定资产查询',2500,'/office/asset/search'),(2550,'图书管理',2000,'/office/book'),(2551,'图书录入',2550,'/office/book/create'),(2552,'图书查询',2550,'/office/book/search'),(2553,'借还书管理',2550,'/office/book/manage'),(2554,'设置管理员',2550,'/office/book/manager'),(2555,'图书类别定义',2550,'/office/book/category'),(2600,'资源申请与管理',2000,'/office/resapp'),(2601,'资源申请与管理',2600,''),(2602,'周期性资源安排',2600,''),(2650,'会议申请与安排',2000,'/office/meeting'),(2651,'会议申请',2650,''),(2652,'会议查询',2650,''),(2653,'会议管理',2650,''),(2654,'会议室设置',2650,''),(2655,'管理员设置',2650,''),(2656,'会议纪要',2650,''),(2657,'会议室设备管理',2650,''),(2700,'车辆申请与安排',2000,'/office/car'),(2701,'车辆使用申请',2700,''),(2702,'车辆使用查询',2700,''),(2703,'部门审批管理',2700,''),(2704,'车辆维护管理',2700,''),(2705,'车辆信息管理',2700,''),(2706,'调度人员管理',2700,''),(2707,'油耗统计',2700,''),(2750,'公共通讯簿',2000,'/office/contact'),(2800,'组织机构信息',2000,'/office/org'),(2801,'单位信息查询',2800,''),(2802,'部门信息查询',2800,''),(2803,'用户信息查询',2800,''),(3000,'知识管理',0,'/kb'),(3050,'公共文件柜',3000,''),(3100,'网络硬盘',3000,''),(3150,'图片浏览',3000,''),(3200,'OA知道',3000,''),(3250,'维基百科',3000,''),(4000,'人力资源',0,'/hrm'),(4050,'人事管理',4000,'/hrm/manage'),(4051,'人事档案',4050,''),(4052,'档案查询',4050,''),(4053,'合同管理',4050,''),(4054,'奖惩管理',4050,''),(4055,'证照管理',4050,''),(4056,'学习经验',4050,''),(4057,'工作经验',4050,''),(4058,'劳动技能',4050,''),(4059,'社会关系',4050,''),(4060,'人事调动',4050,''),(4061,'离职管理',4050,''),(4062,'复职管理',4050,''),(4063,'职称评定',4050,''),(4064,'员工关怀',4050,''),(4065,'人事分析',4050,''),(4100,'招聘管理',4000,'/hrm/recruit'),(4101,'招聘需求',4100,''),(4102,'招聘计划',4100,''),(4103,'招聘计划审批',4100,''),(4104,'人才库',4100,''),(4105,'招聘筛选',4100,''),(4106,'招聘录用',4100,''),(4107,'人才分析',4100,''),(4150,'培训管理',4000,'/hrm/training'),(4151,'培训计划',4150,''),(4152,'培训计划审批',4150,''),(4153,'培训记录',4150,''),(4200,'绩效考核',4000,'/hrm/performance'),(4201,'考核项目设定',4200,''),(4202,'考核任务管理',4200,''),(4203,'进行考核',4200,''),(4250,'薪酬管理',4000,'/hrm/salary'),(4251,'薪酬项目及保险设置',4250,''),(4252,'薪酬基数设置',4250,''),(4253,'工资流程管理',4250,''),(4254,'财务工资录入',4250,''),(4255,'部门工资上报',4250,''),(4256,'福利管理',4250,''),(4300,'员工自助查询',4000,'/hrm/self'),(4350,'人力资源设置',4000,'/hrm/set'),(4351,'考勤设置',4350,''),(4352,'人力资源管理员',4350,''),(4353,'HRMS代码设置',4350,''),(4400,'在线考试',4000,'/hrm/exam'),(4401,'题库管理',4400,''),(4402,'试题管理',4400,''),(4403,'试卷管理',4400,''),(4404,'考试信息管理',4400,''),(4405,'参加考试',4400,''),(5000,'档案管理',0,'/archive'),(5050,'卷库管理',5000,''),(5100,'案卷管理',5000,''),(5150,'文件管理',5000,''),(5200,'案卷借阅',5000,''),(5201,'案卷借阅',5200,''),(5202,'案卷审批',5200,''),(5250,'档案统计',5000,''),(5251,'借阅统计',5250,''),(5252,'案卷统计',5250,''),(5300,'档案销毁',5000,''),(6000,'CRM',0,'/crm/'),(6050,'客户管理',6000,'/crm/relation'),(6051,'客户信息',6050,''),(6052,'客户联系人',6050,''),(6053,'客户活动',6050,''),(6054,'客户关怀',6050,''),(6100,'销售管理',6000,'/crm/sell'),(6101,'销售机会',6100,''),(6102,'报价单',6100,''),(6103,'解决方案',6100,''),(6104,'合同',6100,''),(6105,'订单',6100,''),(6106,'订单出库',6100,''),(6107,'合同收款',6100,''),(6150,'产品和仓库管理',6000,'/crm/repository'),(6151,'产品管理',6150,''),(6152,'仓库管理',6150,''),(6200,'客户服务',6000,'/crm/service'),(6201,'客服记录',6200,''),(6202,'客户投诉',6200,''),(6250,'市场营销',6000,'/crm/market'),(6251,'市场活动',6250,''),(6300,'采购管理',6000,'/crm/stock'),(6301,'供应商管理',6300,''),(6302,'供应商联系人',6300,''),(6303,'采购订单',6300,''),(6304,'采购入库',6300,''),(6305,'采购付款',6300,''),(6350,'报表分析与统计',6000,'/crm/report'),(6400,'系统设置',6000,'/crm/set'),(6401,'代码设置',6400,''),(7000,'项目管理',0,'/project'),(7050,'我的项目',7000,''),(7100,'我的任务',7000,''),(7150,'项目审批',7000,''),(7200,'项目文档',7000,''),(7250,'项目问题',7000,''),(7300,'基础数据设置',7000,''),(7301,'项目权限设置',7300,''),(7302,'项目代码设置',7300,''),(7303,'项目模板管理',7300,''),(8000,'报表管理',0,'/report'),(8050,'报表管理',8000,'/report/manage'),(8100,'模板管理',8000,'/report/template'),(8101,'设计模板',8100,''),(8102,'模板分类',8100,''),(8103,'基础代码',8100,''),(8104,'自动编号',8100,''),(8105,'数据源',8100,''),(8106,'系统工具',8100,''),(8107,'注册信息',8100,''),(9000,'交流园地',0,'/comm'),(9050,'讨论区',9000,'/comm/discuss'),(9100,'论坛',9000,'/comm/bbs'),(9150,'网络会议',9000,'/comm/meeting'),(9200,'互动会议',9000,'/comm/interactive'),(9250,'文本聊天室',9000,'/comm/text'),(9300,'语音聊天室',9000,'/comm/voice'),(9350,'网络会议管理',9000,'/comm/meeting/manage'),(9400,'文本聊天室管理',9000,'/comm/text/manage'),(10000,'公文管理',0,'/doc'),(10050,'发文管理',10000,'/doc/post'),(10051,'发文拟稿',10050,''),(10052,'发文核稿',10050,''),(10053,'套红盖章',10050,''),(10054,'发文列表',10050,''),(10100,'收文管理',10000,'/doc/receive'),(10101,'收文登记',10100,''),(10102,'领导批阅',10100,''),(10103,'收文分发',10100,''),(10104,'收文阅读',10100,''),(10150,'基础设置',10000,'/doc/set'),(10151,'参数设置',10150,''),(10152,'主题词管理',10150,''),(10153,'公文类型设置',10150,''),(10154,'收文权限设置',10150,''),(11000,'附件程序',0,'/tool/'),(11050,'实用信息',11000,'/tool/info'),(11051,'电话区号查询',11050,'/tool/info/tel'),(11052,'邮政编码查询',11050,'/tool/info/postcode'),(11053,'列车时刻查询',11050,'/tool/info/train'),(11054,'公交线路查询',11050,'/tool/info/bus'),(11055,'法律法规查询',11050,'/tool/info/law'),(11100,'游戏',11000,'/tool/game'),(11150,'万年历',11000,'/tool/calendar'),(11200,'世界时间',11000,'/tool/time'),(11250,'即时通讯',11000,'/tool/im'),(12000,'系统管理',0,'/sys'),(12050,'组织机构设置',12000,'/sys/'),(12051,'单位管理',12050,'index.php?d=sys&c=unit&m=index'),(12052,'部门管理',12050,'index.php?d=sys&c=dept&m=index'),(12053,'用户管理',12050,'index.php?d=sys&c=user&m=index'),(12054,'角色与权限管理',12050,'index.php?d=sys&c=priv&m=index'),(12100,'工作流设置',12000,'index.php?d=sys&c=flow&m=index'),(12101,'设计表单',12100,'/sys/flow/form'),(12102,'设计流程',12100,'/sys/flow/flow'),(12103,'流程分类',12100,'/sys/flow/cat'),(12104,'参数设置',12100,'/sys/flow/param'),(12105,'业务引擎设置',12100,'/sys/flow/engine'),(12106,'报表设置',12100,'/sys/flow/report'),(12107,'数据源管理',12100,'/sys/flow/datasource'),(12150,'行政办公设置',12000,'/sys/office'),(12151,'公共网址设置',12150,'/sys/office/url'),(12152,'工作日志设置',12150,'/sys/office/note'),(12153,'公共通讯簿设置',12150,'/sys/office/contact'),(12154,'公告通知设置',12150,'/sys/office/notice'),(12155,'文件套红模板',12150,'/sys/office/doc'),(12200,'知识管理设置',12000,'/sys/kb'),(12201,'公共文件柜设置',12200,''),(12202,'网络硬盘设置',12200,''),(12203,'图片浏览设置',12200,''),(12250,'信息交流设置',12000,'/sys/comm'),(12251,'短信提醒设置',12250,'/sys/comm/?'),(12252,'手机短信设置',12250,'/sys/mobmsg'),(12253,'讨论区设置',12250,'/sys/discuss'),(12254,'词语过滤管理',12250,'/sys/filter_manage'),(12255,'信息过滤审核',12250,'/sys/filter_approve'),(12300,'印章管理',12000,'/sys/yz'),(12350,'定时任务管理',12000,'/sys/cron'),(12400,'紧急通知设置',12000,'/sys/notice'),(12450,'界面设置',12000,'/sys/ui'),(12500,'状态栏设置',12000,'/sys/statusbar'),(12550,'菜单设置',12000,'/sys/menu'),(12600,'系统代码设置',12000,'/sys/code'),(12650,'自定义字段设置',12000,'/sys/field');

/*Table structure for table `tun_news` */

DROP TABLE IF EXISTS `tun_news`;

CREATE TABLE `tun_news` (
  `news_id` int(8) NOT NULL AUTO_INCREMENT,
  `news_type` varchar(100) DEFAULT NULL,
  `news_title` varchar(200) DEFAULT NULL,
  `news_content` varchar(4000) DEFAULT NULL,
  `post_user_id` int(8) DEFAULT NULL,
  `post_user_name` varchar(20) DEFAULT NULL,
  `post_time` int(11) DEFAULT NULL,
  `last_modified` int(11) DEFAULT NULL,
  `censor_user_id` int(8) DEFAULT NULL,
  `censor_user_name` varchar(20) DEFAULT NULL,
  `censor_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`news_id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

/*Data for the table `tun_news` */

insert  into `tun_news`(`news_id`,`news_type`,`news_title`,`news_content`,`post_user_id`,`post_user_name`,`post_time`,`last_modified`,`censor_user_id`,`censor_user_name`,`censor_time`) values (1,'院内新闻','我校首批校级科研创新团队建设咨询会成功召开','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(2,'通知','开会1','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(3,'通知','开会2','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(4,'通知','开会3','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(5,'通知','开会4','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(6,'通知','开会5','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(7,'通知','开会6','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(8,'通知','开会7','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(9,'通知','开会8','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(10,'通知','开会9','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(11,'通知','开会10','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(12,'通知','开会11','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(13,'通知','开会12','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(14,'通知','开会13','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(15,'通知','开会14','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(16,'通知','开会15','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(17,'通知','开会16','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(18,'通知','开会17','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(19,'通知','开会18','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(20,'通知','开会19','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(21,'通知','开会20','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(22,'通知','开会21','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(23,'通知','开会22','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(24,'通知','开会23','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(25,'通知','开会24','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(26,'通知','开会25','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(27,'通知','开会26','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(28,'通知','开会27','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(29,'通知','开会28','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(30,'通知','开会29','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(31,'通知','开会30','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647),(32,'通知','开会31','aaa',1,'小吞',2147483647,NULL,2,'张三',2147483647);

/*Table structure for table `tun_priv` */

DROP TABLE IF EXISTS `tun_priv`;

CREATE TABLE `tun_priv` (
  `priv_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `priv_name` varchar(200) NOT NULL COMMENT '权限名称',
  `priv_order` int(8) DEFAULT NULL COMMENT '权限顺序',
  `priv_array` varchar(2000) DEFAULT NULL COMMENT '权限数组',
  PRIMARY KEY (`priv_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `tun_priv` */

insert  into `tun_priv`(`priv_id`,`priv_name`,`priv_order`,`priv_array`) values (1,'test',1,NULL);

/*Table structure for table `tun_user` */

DROP TABLE IF EXISTS `tun_user`;

CREATE TABLE `tun_user` (
  `user_id` int(8) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(200) NOT NULL,
  `real_name` varchar(20) DEFAULT NULL,
  `login_password` varchar(50) DEFAULT NULL,
  `dept_id` int(8) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `birthday` int(11) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `qq` varchar(100) DEFAULT NULL,
  `msn` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `tun_user` */

insert  into `tun_user`(`user_id`,`login_name`,`real_name`,`login_password`,`dept_id`,`sex`,`birthday`,`mobile`,`email`,`qq`,`msn`) values (1,'admin','小吞','e10adc3949ba59abbe56e057f20f883e',83,NULL,NULL,NULL,NULL,NULL,NULL),(2,'zs','张三','e10adc3949ba59abbe56e057f20f883e',84,NULL,NULL,NULL,NULL,NULL,NULL),(3,'dds','大地','e10adc3949ba59abbe56e057f20f883e',85,NULL,NULL,NULL,NULL,NULL,NULL),(4,'rw','热舞','e10adc3949ba59abbe56e057f20f883e',86,NULL,NULL,NULL,NULL,NULL,NULL),(5,'trw','他热','e10adc3949ba59abbe56e057f20f883e',87,NULL,NULL,NULL,NULL,NULL,NULL),(6,'k','困','e10adc3949ba59abbe56e057f20f883e',88,NULL,NULL,NULL,NULL,NULL,NULL),(7,'my','木有突','e10adc3949ba59abbe56e057f20f883e',89,NULL,NULL,NULL,NULL,NULL,NULL),(8,'nt','哪天如','e10adc3949ba59abbe56e057f20f883e',92,NULL,NULL,NULL,NULL,NULL,NULL),(9,'tr','突然','e10adc3949ba59abbe56e057f20f883e',93,NULL,NULL,NULL,NULL,NULL,NULL),(10,'mw','名为','e10adc3949ba59abbe56e057f20f883e',94,NULL,NULL,NULL,NULL,NULL,NULL),(11,'bs','不是','e10adc3949ba59abbe56e057f20f883e',95,NULL,NULL,NULL,NULL,NULL,NULL),(12,'bt','不同万','e10adc3949ba59abbe56e057f20f883e',96,NULL,NULL,NULL,NULL,NULL,NULL),(13,'grw','更让','e10adc3949ba59abbe56e057f20f883e',97,NULL,NULL,NULL,NULL,NULL,NULL),(14,'ew','ew','e10adc3949ba59abbe56e057f20f883e',99,NULL,NULL,NULL,NULL,NULL,NULL),(15,'grew','grew','e10adc3949ba59abbe56e057f20f883e',102,NULL,NULL,NULL,NULL,NULL,NULL),(16,'hh','hh','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(17,'ii','ii','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(18,'jj','jj','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(19,'kk','kk','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(20,'ll','ll','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(21,'mm','mm','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(22,'nn','nn','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(23,'oo','oo','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(24,'pp','pp','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(25,'qq','qq','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL),(26,'rr','rr','e10adc3949ba59abbe56e057f20f883e',103,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `tun_user_dept` */

DROP TABLE IF EXISTS `tun_user_dept`;

CREATE TABLE `tun_user_dept` (
  `user_dept_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) DEFAULT NULL,
  `dept_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`user_dept_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `tun_user_dept` */

insert  into `tun_user_dept`(`user_dept_id`,`user_id`,`dept_id`) values (1,1,22),(2,2,11),(3,3,12),(4,5,13),(5,6,14),(6,7,15),(7,8,16),(8,9,17),(9,10,19),(10,11,20),(11,12,21);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
