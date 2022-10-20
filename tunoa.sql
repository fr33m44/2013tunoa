/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : localhost:3306
 Source Schema         : tunoa

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 20/10/2022 09:53:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tun_accessory
-- ----------------------------
DROP TABLE IF EXISTS `tun_accessory`;
CREATE TABLE `tun_accessory`  (
  `accessory_id` int(8) NOT NULL AUTO_INCREMENT,
  `accessory_size` int(10) NULL DEFAULT NULL,
  `accessory_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `accessory_desc` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_date` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`accessory_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_accessory
-- ----------------------------

-- ----------------------------
-- Table structure for tun_cfg
-- ----------------------------
DROP TABLE IF EXISTS `tun_cfg`;
CREATE TABLE `tun_cfg`  (
  `cfg_id` int(5) NOT NULL AUTO_INCREMENT,
  `cfg_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cfg_desc` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `parent_id` int(5) NULL DEFAULT NULL,
  `code` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cfg_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `store_range` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `store_dir` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cfg_value` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `sort_order` int(11) NULL DEFAULT 1,
  PRIMARY KEY (`cfg_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_cfg
-- ----------------------------
INSERT INTO `tun_cfg` VALUES (1, '单位管理', '', 0, 'unit_info', 'group', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (2, '单位管理1', '', 0, 'unit1_info', 'group', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (3, '单位管理2', '', 0, 'unit2_info', 'group', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (4, '单位管理3', '', 0, 'unit3_info', 'group', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (5, '单位管理4', '', 0, 'unit4_info', 'group', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (6, '单位名称', '', 1, 'unit_name', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (7, '电话', '', 1, 'tel_no', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (8, '传真', '', 1, 'fax_no', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (9, '邮编', '', 1, 'post_no', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (10, '地址', '', 1, 'address', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (11, '网站', '', 1, 'website', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (12, '电子邮箱', '', 1, 'email', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (13, '开户行', '', 1, 'bank_name', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (14, '开户号', '', 1, 'bank_no', 'text', '', '', '', 1);
INSERT INTO `tun_cfg` VALUES (15, '单位简介', '', 1, 'intro', 'textarea', '', '', '', 1);

-- ----------------------------
-- Table structure for tun_dept
-- ----------------------------
DROP TABLE IF EXISTS `tun_dept`;
CREATE TABLE `tun_dept`  (
  `dept_id` int(8) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `parent_id` int(8) NULL DEFAULT NULL,
  `position` int(4) NULL DEFAULT NULL,
  `dept_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dept_left` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dept_right` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dept_level` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fax_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dept_addr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dept_sort` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `leader1` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `leader2` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dept_duty` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_org` int(1) NULL DEFAULT NULL,
  `org_admin` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_dept
-- ----------------------------
INSERT INTO `tun_dept` VALUES (1, '单位名称', 0, 0, 'drive', '1', '2', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (2, '院部', 1, 0, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (3, '政治部', 1, 1, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (4, '医务部', 1, 2, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (5, '护理部', 1, 3, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (6, '经济部', 1, 4, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (7, '信息科', 1, 5, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (8, '医学工程科', 1, 6, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (9, '门诊系统', 1, 7, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (10, '内科系统', 1, 8, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (11, '外科系统', 1, 9, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (12, '院长', 2, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (13, '政委', 2, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (14, '副院长', 2, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (15, '秘书', 2, 3, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (16, '主任', 3, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (17, '副主任', 3, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (18, '干事', 3, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (19, '主任', 4, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (20, '副主任', 4, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (21, '助理员', 4, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (22, '训练队', 4, 3, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (23, '队长', 23, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (24, '助理员', 23, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (25, '队员', 23, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (26, '主任', 5, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_dept` VALUES (27, '总护士长', 5, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for tun_mail
-- ----------------------------
DROP TABLE IF EXISTS `tun_mail`;
CREATE TABLE `tun_mail`  (
  `mail_id` int(11) NOT NULL AUTO_INCREMENT,
  `send_time` int(11) NULL DEFAULT NULL,
  `mail_title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mail_content` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`mail_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_mail
-- ----------------------------
INSERT INTO `tun_mail` VALUES (1, 2013, '标题', '内容');
INSERT INTO `tun_mail` VALUES (2, 2013, '标题2', '内容2');
INSERT INTO `tun_mail` VALUES (3, 2010, '标题3', '内容3');
INSERT INTO `tun_mail` VALUES (4, 2010, '标题4', '内容4');
INSERT INTO `tun_mail` VALUES (5, 2013, '标题5', '内容5');
INSERT INTO `tun_mail` VALUES (6, 2013, '标题6', '内容6');
INSERT INTO `tun_mail` VALUES (7, 2013, '标题7', '内容7');

-- ----------------------------
-- Table structure for tun_mail_status
-- ----------------------------
DROP TABLE IF EXISTS `tun_mail_status`;
CREATE TABLE `tun_mail_status`  (
  `msid` int(11) NOT NULL AUTO_INCREMENT,
  `mail_id` int(11) NULL DEFAULT NULL,
  `from_id` int(8) NULL DEFAULT NULL,
  `from_status` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `from_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `to_id` int(11) NULL DEFAULT NULL,
  `to_status` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `to_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`msid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_mail_status
-- ----------------------------
INSERT INTO `tun_mail_status` VALUES (1, 1, 1, 'sent', '管理员', 2, 'unread', '张三');
INSERT INTO `tun_mail_status` VALUES (2, 2, 1, 'sent', '管理员', 2, 'read', '张三');
INSERT INTO `tun_mail_status` VALUES (3, 3, 3, 'sent', '大地撒', 1, 'unread', '管理员');
INSERT INTO `tun_mail_status` VALUES (4, 4, 3, 'sent', '大地撒', 1, 'read', '管理员');
INSERT INTO `tun_mail_status` VALUES (5, 3, 3, 'sent', '大地撒', 2, 'read', '张三');

-- ----------------------------
-- Table structure for tun_menu
-- ----------------------------
DROP TABLE IF EXISTS `tun_menu`;
CREATE TABLE `tun_menu`  (
  `menu_id` int(8) NOT NULL COMMENT '菜单id',
  `menu_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `id_parent` int(8) NOT NULL COMMENT '菜单父id',
  `url` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单url',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_menu
-- ----------------------------
INSERT INTO `tun_menu` VALUES (1, '个人事务', 0, '/my');
INSERT INTO `tun_menu` VALUES (50, '电子邮件', 1, '/email/index');
INSERT INTO `tun_menu` VALUES (100, '短消息', 1, '/msg/');
INSERT INTO `tun_menu` VALUES (150, '手机短信', 1, '/mobmsg/');
INSERT INTO `tun_menu` VALUES (200, '网络传真', 1, '/fax/');
INSERT INTO `tun_menu` VALUES (250, '公告通知', 2, '/office/notice');
INSERT INTO `tun_menu` VALUES (300, '新闻', 1, '/office/news/index');
INSERT INTO `tun_menu` VALUES (350, '投票', 1, '/office/vote/index');
INSERT INTO `tun_menu` VALUES (400, '个人考勤', 1, '');
INSERT INTO `tun_menu` VALUES (450, '日程安排', 1, '');
INSERT INTO `tun_menu` VALUES (500, '工作日志', 1, '/office/note');
INSERT INTO `tun_menu` VALUES (550, '通讯录', 1, '');
INSERT INTO `tun_menu` VALUES (600, '我的网盘', 1, '');
INSERT INTO `tun_menu` VALUES (650, '我的视频会议', 1, '');
INSERT INTO `tun_menu` VALUES (1000, '工作流', 0, '/flow');
INSERT INTO `tun_menu` VALUES (1050, '新建工作', 1000, '/flow/create');
INSERT INTO `tun_menu` VALUES (1100, '我的工作', 1000, '/flow/my');
INSERT INTO `tun_menu` VALUES (1150, '工作查询', 1000, '/flow/search');
INSERT INTO `tun_menu` VALUES (1200, '工作监控', 1000, '/flow/monitor');
INSERT INTO `tun_menu` VALUES (1250, '数据报表', 1000, '/flow/report');
INSERT INTO `tun_menu` VALUES (1300, '超时统计分析', 1000, '/flow/statistic');
INSERT INTO `tun_menu` VALUES (1350, '工作委托', 1000, '/flow/delegate');
INSERT INTO `tun_menu` VALUES (1400, '工作销毁', 1000, '/flow/destroy');
INSERT INTO `tun_menu` VALUES (1450, '流程日志查询', 1000, '/flow/log');
INSERT INTO `tun_menu` VALUES (2000, '行政办公', 0, '/office');
INSERT INTO `tun_menu` VALUES (2050, '公告通知管理', 2000, '/office/notice/manage');
INSERT INTO `tun_menu` VALUES (2100, '公告通知审批', 2000, '/office/notice/approve');
INSERT INTO `tun_menu` VALUES (2150, '新闻管理', 2000, '/office/news/manage/');
INSERT INTO `tun_menu` VALUES (2200, '投票管理', 2000, '/office/vote/manage');
INSERT INTO `tun_menu` VALUES (2250, '日程安排查询', 2000, '/office/agenda/search');
INSERT INTO `tun_menu` VALUES (2300, '工作日志查询', 2000, '/office/note/search');
INSERT INTO `tun_menu` VALUES (2350, '管理简报', 2000, '/office/jianbao/manage');
INSERT INTO `tun_menu` VALUES (2400, '工作计划', 2000, '/office/plan/');
INSERT INTO `tun_menu` VALUES (2401, '工作计划查询', 2400, '/office/plan/search');
INSERT INTO `tun_menu` VALUES (2402, '工作计划管理', 2400, '/office/plan/manage');
INSERT INTO `tun_menu` VALUES (2403, '工作计划类型设置', 2400, '/office/plan/set_category');
INSERT INTO `tun_menu` VALUES (2450, '办公用品管理', 2000, '/office/stationery');
INSERT INTO `tun_menu` VALUES (2451, '办公用品信息查询', 2450, '/office/stationery/index');
INSERT INTO `tun_menu` VALUES (2452, '办公用品信息管理', 2450, '/office/stationery/manage');
INSERT INTO `tun_menu` VALUES (2453, '办公用品登记管理', 2450, '/office/stationery/sign');
INSERT INTO `tun_menu` VALUES (2454, '个人办公用品登记', 2450, '/office/stationery/mysign');
INSERT INTO `tun_menu` VALUES (2455, '办公用品库设置', 2450, '/office/stationery/set');
INSERT INTO `tun_menu` VALUES (2456, '办公用品报表', 2450, '/office/stationery/report');
INSERT INTO `tun_menu` VALUES (2500, '固定资产', 2000, '/office/asset');
INSERT INTO `tun_menu` VALUES (2501, '参数设置', 2500, '/office/asset/set');
INSERT INTO `tun_menu` VALUES (2502, '固定资产管理', 2500, '/office/asset/manage');
INSERT INTO `tun_menu` VALUES (2503, '固定资产查询', 2500, '/office/asset/search');
INSERT INTO `tun_menu` VALUES (2550, '图书管理', 2000, '/office/book');
INSERT INTO `tun_menu` VALUES (2551, '图书录入', 2550, '/office/book/create');
INSERT INTO `tun_menu` VALUES (2552, '图书查询', 2550, '/office/book/search');
INSERT INTO `tun_menu` VALUES (2553, '借还书管理', 2550, '/office/book/manage');
INSERT INTO `tun_menu` VALUES (2554, '设置管理员', 2550, '/office/book/manager');
INSERT INTO `tun_menu` VALUES (2555, '图书类别定义', 2550, '/office/book/category');
INSERT INTO `tun_menu` VALUES (2600, '资源申请与管理', 2000, '/office/resapp');
INSERT INTO `tun_menu` VALUES (2601, '资源申请与管理', 2600, '');
INSERT INTO `tun_menu` VALUES (2602, '周期性资源安排', 2600, '');
INSERT INTO `tun_menu` VALUES (2650, '会议申请与安排', 2000, '/office/meeting');
INSERT INTO `tun_menu` VALUES (2651, '会议申请', 2650, '');
INSERT INTO `tun_menu` VALUES (2652, '会议查询', 2650, '');
INSERT INTO `tun_menu` VALUES (2653, '会议管理', 2650, '');
INSERT INTO `tun_menu` VALUES (2654, '会议室设置', 2650, '');
INSERT INTO `tun_menu` VALUES (2655, '管理员设置', 2650, '');
INSERT INTO `tun_menu` VALUES (2656, '会议纪要', 2650, '');
INSERT INTO `tun_menu` VALUES (2657, '会议室设备管理', 2650, '');
INSERT INTO `tun_menu` VALUES (2700, '车辆申请与安排', 2000, '/office/car');
INSERT INTO `tun_menu` VALUES (2701, '车辆使用申请', 2700, '');
INSERT INTO `tun_menu` VALUES (2702, '车辆使用查询', 2700, '');
INSERT INTO `tun_menu` VALUES (2703, '部门审批管理', 2700, '');
INSERT INTO `tun_menu` VALUES (2704, '车辆维护管理', 2700, '');
INSERT INTO `tun_menu` VALUES (2705, '车辆信息管理', 2700, '');
INSERT INTO `tun_menu` VALUES (2706, '调度人员管理', 2700, '');
INSERT INTO `tun_menu` VALUES (2707, '油耗统计', 2700, '');
INSERT INTO `tun_menu` VALUES (2750, '公共通讯簿', 2000, '/office/contact');
INSERT INTO `tun_menu` VALUES (2800, '组织机构信息', 2000, '/office/org');
INSERT INTO `tun_menu` VALUES (2801, '单位信息查询', 2800, '');
INSERT INTO `tun_menu` VALUES (2802, '部门信息查询', 2800, '');
INSERT INTO `tun_menu` VALUES (2803, '用户信息查询', 2800, '');
INSERT INTO `tun_menu` VALUES (3000, '知识管理', 0, '/kb');
INSERT INTO `tun_menu` VALUES (3050, '公共文件柜', 3000, '');
INSERT INTO `tun_menu` VALUES (3100, '网络硬盘', 3000, '');
INSERT INTO `tun_menu` VALUES (3150, '图片浏览', 3000, '');
INSERT INTO `tun_menu` VALUES (3200, 'OA知道', 3000, '');
INSERT INTO `tun_menu` VALUES (3250, '维基百科', 3000, '');
INSERT INTO `tun_menu` VALUES (4000, '人力资源', 0, '/hrm');
INSERT INTO `tun_menu` VALUES (4050, '人事管理', 4000, '/hrm/manage');
INSERT INTO `tun_menu` VALUES (4051, '人事档案', 4050, '');
INSERT INTO `tun_menu` VALUES (4052, '档案查询', 4050, '');
INSERT INTO `tun_menu` VALUES (4053, '合同管理', 4050, '');
INSERT INTO `tun_menu` VALUES (4054, '奖惩管理', 4050, '');
INSERT INTO `tun_menu` VALUES (4055, '证照管理', 4050, '');
INSERT INTO `tun_menu` VALUES (4056, '学习经验', 4050, '');
INSERT INTO `tun_menu` VALUES (4057, '工作经验', 4050, '');
INSERT INTO `tun_menu` VALUES (4058, '劳动技能', 4050, '');
INSERT INTO `tun_menu` VALUES (4059, '社会关系', 4050, '');
INSERT INTO `tun_menu` VALUES (4060, '人事调动', 4050, '');
INSERT INTO `tun_menu` VALUES (4061, '离职管理', 4050, '');
INSERT INTO `tun_menu` VALUES (4062, '复职管理', 4050, '');
INSERT INTO `tun_menu` VALUES (4063, '职称评定', 4050, '');
INSERT INTO `tun_menu` VALUES (4064, '员工关怀', 4050, '');
INSERT INTO `tun_menu` VALUES (4065, '人事分析', 4050, '');
INSERT INTO `tun_menu` VALUES (4100, '招聘管理', 4000, '/hrm/recruit');
INSERT INTO `tun_menu` VALUES (4101, '招聘需求', 4100, '');
INSERT INTO `tun_menu` VALUES (4102, '招聘计划', 4100, '');
INSERT INTO `tun_menu` VALUES (4103, '招聘计划审批', 4100, '');
INSERT INTO `tun_menu` VALUES (4104, '人才库', 4100, '');
INSERT INTO `tun_menu` VALUES (4105, '招聘筛选', 4100, '');
INSERT INTO `tun_menu` VALUES (4106, '招聘录用', 4100, '');
INSERT INTO `tun_menu` VALUES (4107, '人才分析', 4100, '');
INSERT INTO `tun_menu` VALUES (4150, '培训管理', 4000, '/hrm/training');
INSERT INTO `tun_menu` VALUES (4151, '培训计划', 4150, '');
INSERT INTO `tun_menu` VALUES (4152, '培训计划审批', 4150, '');
INSERT INTO `tun_menu` VALUES (4153, '培训记录', 4150, '');
INSERT INTO `tun_menu` VALUES (4200, '绩效考核', 4000, '/hrm/performance');
INSERT INTO `tun_menu` VALUES (4201, '考核项目设定', 4200, '');
INSERT INTO `tun_menu` VALUES (4202, '考核任务管理', 4200, '');
INSERT INTO `tun_menu` VALUES (4203, '进行考核', 4200, '');
INSERT INTO `tun_menu` VALUES (4250, '薪酬管理', 4000, '/hrm/salary');
INSERT INTO `tun_menu` VALUES (4251, '薪酬项目及保险设置', 4250, '');
INSERT INTO `tun_menu` VALUES (4252, '薪酬基数设置', 4250, '');
INSERT INTO `tun_menu` VALUES (4253, '工资流程管理', 4250, '');
INSERT INTO `tun_menu` VALUES (4254, '财务工资录入', 4250, '');
INSERT INTO `tun_menu` VALUES (4255, '部门工资上报', 4250, '');
INSERT INTO `tun_menu` VALUES (4256, '福利管理', 4250, '');
INSERT INTO `tun_menu` VALUES (4300, '员工自助查询', 4000, '/hrm/self');
INSERT INTO `tun_menu` VALUES (4350, '人力资源设置', 4000, '/hrm/set');
INSERT INTO `tun_menu` VALUES (4351, '考勤设置', 4350, '');
INSERT INTO `tun_menu` VALUES (4352, '人力资源管理员', 4350, '');
INSERT INTO `tun_menu` VALUES (4353, 'HRMS代码设置', 4350, '');
INSERT INTO `tun_menu` VALUES (4400, '在线考试', 4000, '/hrm/exam');
INSERT INTO `tun_menu` VALUES (4401, '题库管理', 4400, '');
INSERT INTO `tun_menu` VALUES (4402, '试题管理', 4400, '');
INSERT INTO `tun_menu` VALUES (4403, '试卷管理', 4400, '');
INSERT INTO `tun_menu` VALUES (4404, '考试信息管理', 4400, '');
INSERT INTO `tun_menu` VALUES (4405, '参加考试', 4400, '');
INSERT INTO `tun_menu` VALUES (5000, '档案管理', 0, '/archive');
INSERT INTO `tun_menu` VALUES (5050, '卷库管理', 5000, '');
INSERT INTO `tun_menu` VALUES (5100, '案卷管理', 5000, '');
INSERT INTO `tun_menu` VALUES (5150, '文件管理', 5000, '');
INSERT INTO `tun_menu` VALUES (5200, '案卷借阅', 5000, '');
INSERT INTO `tun_menu` VALUES (5201, '案卷借阅', 5200, '');
INSERT INTO `tun_menu` VALUES (5202, '案卷审批', 5200, '');
INSERT INTO `tun_menu` VALUES (5250, '档案统计', 5000, '');
INSERT INTO `tun_menu` VALUES (5251, '借阅统计', 5250, '');
INSERT INTO `tun_menu` VALUES (5252, '案卷统计', 5250, '');
INSERT INTO `tun_menu` VALUES (5300, '档案销毁', 5000, '');
INSERT INTO `tun_menu` VALUES (6000, 'CRM', 0, '/crm/');
INSERT INTO `tun_menu` VALUES (6050, '客户管理', 6000, '/crm/relation');
INSERT INTO `tun_menu` VALUES (6051, '客户信息', 6050, '');
INSERT INTO `tun_menu` VALUES (6052, '客户联系人', 6050, '');
INSERT INTO `tun_menu` VALUES (6053, '客户活动', 6050, '');
INSERT INTO `tun_menu` VALUES (6054, '客户关怀', 6050, '');
INSERT INTO `tun_menu` VALUES (6100, '销售管理', 6000, '/crm/sell');
INSERT INTO `tun_menu` VALUES (6101, '销售机会', 6100, '');
INSERT INTO `tun_menu` VALUES (6102, '报价单', 6100, '');
INSERT INTO `tun_menu` VALUES (6103, '解决方案', 6100, '');
INSERT INTO `tun_menu` VALUES (6104, '合同', 6100, '');
INSERT INTO `tun_menu` VALUES (6105, '订单', 6100, '');
INSERT INTO `tun_menu` VALUES (6106, '订单出库', 6100, '');
INSERT INTO `tun_menu` VALUES (6107, '合同收款', 6100, '');
INSERT INTO `tun_menu` VALUES (6150, '产品和仓库管理', 6000, '/crm/repository');
INSERT INTO `tun_menu` VALUES (6151, '产品管理', 6150, '');
INSERT INTO `tun_menu` VALUES (6152, '仓库管理', 6150, '');
INSERT INTO `tun_menu` VALUES (6200, '客户服务', 6000, '/crm/service');
INSERT INTO `tun_menu` VALUES (6201, '客服记录', 6200, '');
INSERT INTO `tun_menu` VALUES (6202, '客户投诉', 6200, '');
INSERT INTO `tun_menu` VALUES (6250, '市场营销', 6000, '/crm/market');
INSERT INTO `tun_menu` VALUES (6251, '市场活动', 6250, '');
INSERT INTO `tun_menu` VALUES (6300, '采购管理', 6000, '/crm/stock');
INSERT INTO `tun_menu` VALUES (6301, '供应商管理', 6300, '');
INSERT INTO `tun_menu` VALUES (6302, '供应商联系人', 6300, '');
INSERT INTO `tun_menu` VALUES (6303, '采购订单', 6300, '');
INSERT INTO `tun_menu` VALUES (6304, '采购入库', 6300, '');
INSERT INTO `tun_menu` VALUES (6305, '采购付款', 6300, '');
INSERT INTO `tun_menu` VALUES (6350, '报表分析与统计', 6000, '/crm/report');
INSERT INTO `tun_menu` VALUES (6400, '系统设置', 6000, '/crm/set');
INSERT INTO `tun_menu` VALUES (6401, '代码设置', 6400, '');
INSERT INTO `tun_menu` VALUES (7000, '项目管理', 0, '/project');
INSERT INTO `tun_menu` VALUES (7050, '我的项目', 7000, '');
INSERT INTO `tun_menu` VALUES (7100, '我的任务', 7000, '');
INSERT INTO `tun_menu` VALUES (7150, '项目审批', 7000, '');
INSERT INTO `tun_menu` VALUES (7200, '项目文档', 7000, '');
INSERT INTO `tun_menu` VALUES (7250, '项目问题', 7000, '');
INSERT INTO `tun_menu` VALUES (7300, '基础数据设置', 7000, '');
INSERT INTO `tun_menu` VALUES (7301, '项目权限设置', 7300, '');
INSERT INTO `tun_menu` VALUES (7302, '项目代码设置', 7300, '');
INSERT INTO `tun_menu` VALUES (7303, '项目模板管理', 7300, '');
INSERT INTO `tun_menu` VALUES (8000, '报表管理', 0, '/report');
INSERT INTO `tun_menu` VALUES (8050, '报表管理', 8000, '/report/manage');
INSERT INTO `tun_menu` VALUES (8100, '模板管理', 8000, '/report/template');
INSERT INTO `tun_menu` VALUES (8101, '设计模板', 8100, '');
INSERT INTO `tun_menu` VALUES (8102, '模板分类', 8100, '');
INSERT INTO `tun_menu` VALUES (8103, '基础代码', 8100, '');
INSERT INTO `tun_menu` VALUES (8104, '自动编号', 8100, '');
INSERT INTO `tun_menu` VALUES (8105, '数据源', 8100, '');
INSERT INTO `tun_menu` VALUES (8106, '系统工具', 8100, '');
INSERT INTO `tun_menu` VALUES (8107, '注册信息', 8100, '');
INSERT INTO `tun_menu` VALUES (9000, '交流园地', 0, '/comm');
INSERT INTO `tun_menu` VALUES (9050, '讨论区', 9000, '/comm/discuss');
INSERT INTO `tun_menu` VALUES (9100, '论坛', 9000, '/comm/bbs');
INSERT INTO `tun_menu` VALUES (9150, '网络会议', 9000, '/comm/meeting');
INSERT INTO `tun_menu` VALUES (9200, '互动会议', 9000, '/comm/interactive');
INSERT INTO `tun_menu` VALUES (9250, '文本聊天室', 9000, '/comm/text');
INSERT INTO `tun_menu` VALUES (9300, '语音聊天室', 9000, '/comm/voice');
INSERT INTO `tun_menu` VALUES (9350, '网络会议管理', 9000, '/comm/meeting/manage');
INSERT INTO `tun_menu` VALUES (9400, '文本聊天室管理', 9000, '/comm/text/manage');
INSERT INTO `tun_menu` VALUES (10000, '公文管理', 0, '/doc');
INSERT INTO `tun_menu` VALUES (10050, '发文管理', 10000, '/doc/post');
INSERT INTO `tun_menu` VALUES (10051, '发文拟稿', 10050, '');
INSERT INTO `tun_menu` VALUES (10052, '发文核稿', 10050, '');
INSERT INTO `tun_menu` VALUES (10053, '套红盖章', 10050, '');
INSERT INTO `tun_menu` VALUES (10054, '发文列表', 10050, '');
INSERT INTO `tun_menu` VALUES (10100, '收文管理', 10000, '/doc/receive');
INSERT INTO `tun_menu` VALUES (10101, '收文登记', 10100, '');
INSERT INTO `tun_menu` VALUES (10102, '领导批阅', 10100, '');
INSERT INTO `tun_menu` VALUES (10103, '收文分发', 10100, '');
INSERT INTO `tun_menu` VALUES (10104, '收文阅读', 10100, '');
INSERT INTO `tun_menu` VALUES (10150, '基础设置', 10000, '/doc/set');
INSERT INTO `tun_menu` VALUES (10151, '参数设置', 10150, '');
INSERT INTO `tun_menu` VALUES (10152, '主题词管理', 10150, '');
INSERT INTO `tun_menu` VALUES (10153, '公文类型设置', 10150, '');
INSERT INTO `tun_menu` VALUES (10154, '收文权限设置', 10150, '');
INSERT INTO `tun_menu` VALUES (11000, '附件程序', 0, '/tool/');
INSERT INTO `tun_menu` VALUES (11050, '实用信息', 11000, '/tool/info');
INSERT INTO `tun_menu` VALUES (11051, '电话区号查询', 11050, '/tool/info/tel');
INSERT INTO `tun_menu` VALUES (11052, '邮政编码查询', 11050, '/tool/info/postcode');
INSERT INTO `tun_menu` VALUES (11053, '列车时刻查询', 11050, '/tool/info/train');
INSERT INTO `tun_menu` VALUES (11054, '公交线路查询', 11050, '/tool/info/bus');
INSERT INTO `tun_menu` VALUES (11055, '法律法规查询', 11050, '/tool/info/law');
INSERT INTO `tun_menu` VALUES (11100, '游戏', 11000, '/tool/game');
INSERT INTO `tun_menu` VALUES (11150, '万年历', 11000, '/tool/calendar');
INSERT INTO `tun_menu` VALUES (11200, '世界时间', 11000, '/tool/time');
INSERT INTO `tun_menu` VALUES (11250, '即时通讯', 11000, '/tool/im');
INSERT INTO `tun_menu` VALUES (12000, '系统管理', 0, '/sys');
INSERT INTO `tun_menu` VALUES (12050, '组织机构设置', 12000, '/sys/');
INSERT INTO `tun_menu` VALUES (12051, '单位管理', 12050, 'index.php?d=sys&c=unit&m=index');
INSERT INTO `tun_menu` VALUES (12052, '部门管理', 12050, 'index.php?d=sys&c=dept&m=index');
INSERT INTO `tun_menu` VALUES (12053, '用户管理', 12050, 'index.php?d=sys&c=user&m=index');
INSERT INTO `tun_menu` VALUES (12054, '角色与权限管理', 12050, 'index.php?d=sys&c=priv&m=index');
INSERT INTO `tun_menu` VALUES (12100, '工作流设置', 12000, 'index.php?d=sys&c=flow&m=index');
INSERT INTO `tun_menu` VALUES (12101, '设计表单', 12100, '/sys/flow/form');
INSERT INTO `tun_menu` VALUES (12102, '设计流程', 12100, '/sys/flow/flow');
INSERT INTO `tun_menu` VALUES (12103, '流程分类', 12100, '/sys/flow/cat');
INSERT INTO `tun_menu` VALUES (12104, '参数设置', 12100, '/sys/flow/param');
INSERT INTO `tun_menu` VALUES (12105, '业务引擎设置', 12100, '/sys/flow/engine');
INSERT INTO `tun_menu` VALUES (12106, '报表设置', 12100, '/sys/flow/report');
INSERT INTO `tun_menu` VALUES (12107, '数据源管理', 12100, '/sys/flow/datasource');
INSERT INTO `tun_menu` VALUES (12150, '行政办公设置', 12000, '/sys/office');
INSERT INTO `tun_menu` VALUES (12151, '公共网址设置', 12150, '/sys/office/url');
INSERT INTO `tun_menu` VALUES (12152, '工作日志设置', 12150, '/sys/office/note');
INSERT INTO `tun_menu` VALUES (12153, '公共通讯簿设置', 12150, '/sys/office/contact');
INSERT INTO `tun_menu` VALUES (12154, '公告通知设置', 12150, '/sys/office/notice');
INSERT INTO `tun_menu` VALUES (12155, '文件套红模板', 12150, '/sys/office/doc');
INSERT INTO `tun_menu` VALUES (12200, '知识管理设置', 12000, '/sys/kb');
INSERT INTO `tun_menu` VALUES (12201, '公共文件柜设置', 12200, '');
INSERT INTO `tun_menu` VALUES (12202, '网络硬盘设置', 12200, '');
INSERT INTO `tun_menu` VALUES (12203, '图片浏览设置', 12200, '');
INSERT INTO `tun_menu` VALUES (12250, '信息交流设置', 12000, '/sys/comm');
INSERT INTO `tun_menu` VALUES (12251, '短信提醒设置', 12250, '/sys/comm/?');
INSERT INTO `tun_menu` VALUES (12252, '手机短信设置', 12250, '/sys/mobmsg');
INSERT INTO `tun_menu` VALUES (12253, '讨论区设置', 12250, '/sys/discuss');
INSERT INTO `tun_menu` VALUES (12254, '词语过滤管理', 12250, '/sys/filter_manage');
INSERT INTO `tun_menu` VALUES (12255, '信息过滤审核', 12250, '/sys/filter_approve');
INSERT INTO `tun_menu` VALUES (12300, '印章管理', 12000, '/sys/yz');
INSERT INTO `tun_menu` VALUES (12350, '定时任务管理', 12000, '/sys/cron');
INSERT INTO `tun_menu` VALUES (12400, '紧急通知设置', 12000, '/sys/notice');
INSERT INTO `tun_menu` VALUES (12450, '界面设置', 12000, '/sys/ui');
INSERT INTO `tun_menu` VALUES (12500, '状态栏设置', 12000, '/sys/statusbar');
INSERT INTO `tun_menu` VALUES (12550, '菜单设置', 12000, '/sys/menu');
INSERT INTO `tun_menu` VALUES (12600, '系统代码设置', 12000, '/sys/code');
INSERT INTO `tun_menu` VALUES (12650, '自定义字段设置', 12000, '/sys/field');

-- ----------------------------
-- Table structure for tun_news
-- ----------------------------
DROP TABLE IF EXISTS `tun_news`;
CREATE TABLE `tun_news`  (
  `news_id` int(8) NOT NULL AUTO_INCREMENT,
  `news_type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `news_title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `news_content` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `post_user_id` int(8) NULL DEFAULT NULL,
  `post_user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `post_time` int(11) NULL DEFAULT NULL,
  `last_modified` int(11) NULL DEFAULT NULL,
  `censor_user_id` int(8) NULL DEFAULT NULL,
  `censor_user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `censor_time` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`news_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_news
-- ----------------------------
INSERT INTO `tun_news` VALUES (1, '院内新闻', '我校首批校级科研创新团队建设咨询会成功召开', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (2, '通知', '开会1', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (3, '通知', '开会2', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (4, '通知', '开会3', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (5, '通知', '开会4', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (6, '通知', '开会5', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (7, '通知', '开会6', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (8, '通知', '开会7', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (9, '通知', '开会8', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (10, '通知', '开会9', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (11, '通知', '开会10', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (12, '通知', '开会11', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (13, '通知', '开会12', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (14, '通知', '开会13', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (15, '通知', '开会14', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (16, '通知', '开会15', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (17, '通知', '开会16', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (18, '通知', '开会17', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (19, '通知', '开会18', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (20, '通知', '开会19', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (21, '通知', '开会20', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (22, '通知', '开会21', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (23, '通知', '开会22', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (24, '通知', '开会23', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (25, '通知', '开会24', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (26, '通知', '开会25', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (27, '通知', '开会26', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (28, '通知', '开会27', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (29, '通知', '开会28', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (30, '通知', '开会29', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (31, '通知', '开会30', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);
INSERT INTO `tun_news` VALUES (32, '通知', '开会31', 'aaa', 1, '小吞', 2147483647, NULL, 2, '张三', 2147483647);

-- ----------------------------
-- Table structure for tun_priv
-- ----------------------------
DROP TABLE IF EXISTS `tun_priv`;
CREATE TABLE `tun_priv`  (
  `priv_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `priv_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限名称',
  `priv_order` int(8) NULL DEFAULT NULL COMMENT '权限顺序',
  `priv_array` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限数组',
  PRIMARY KEY (`priv_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_priv
-- ----------------------------
INSERT INTO `tun_priv` VALUES (1, 'test', 1, NULL);

-- ----------------------------
-- Table structure for tun_user
-- ----------------------------
DROP TABLE IF EXISTS `tun_user`;
CREATE TABLE `tun_user`  (
  `user_id` int(8) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `real_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `login_password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dept_id` int(8) NULL DEFAULT NULL,
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` int(11) NULL DEFAULT NULL,
  `mobile` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qq` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `msn` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tun_user
-- ----------------------------
INSERT INTO `tun_user` VALUES (1, 'admin', '小吞', 'e10adc3949ba59abbe56e057f20f883e', 83, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (2, 'zs', '张三', 'e10adc3949ba59abbe56e057f20f883e', 84, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (3, 'dds', '大地', 'e10adc3949ba59abbe56e057f20f883e', 85, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (4, 'rw', '热舞', 'e10adc3949ba59abbe56e057f20f883e', 86, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (5, 'trw', '他热', 'e10adc3949ba59abbe56e057f20f883e', 87, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (6, 'k', '困', 'e10adc3949ba59abbe56e057f20f883e', 88, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (7, 'my', '木有突', 'e10adc3949ba59abbe56e057f20f883e', 89, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (8, 'nt', '哪天如', 'e10adc3949ba59abbe56e057f20f883e', 92, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (9, 'tr', '突然', 'e10adc3949ba59abbe56e057f20f883e', 93, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (10, 'mw', '名为', 'e10adc3949ba59abbe56e057f20f883e', 94, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (11, 'bs', '不是', 'e10adc3949ba59abbe56e057f20f883e', 95, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (12, 'bt', '不同万', 'e10adc3949ba59abbe56e057f20f883e', 96, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (13, 'grw', '更让', 'e10adc3949ba59abbe56e057f20f883e', 97, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (14, 'ew', 'ew', 'e10adc3949ba59abbe56e057f20f883e', 99, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (15, 'grew', 'grew', 'e10adc3949ba59abbe56e057f20f883e', 102, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (16, 'hh', 'hh', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (17, 'ii', 'ii', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (18, 'jj', 'jj', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (19, 'kk', 'kk', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (20, 'll', 'll', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (21, 'mm', 'mm', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (22, 'nn', 'nn', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (23, 'oo', 'oo', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (24, 'pp', 'pp', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (25, 'qq', 'qq', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tun_user` VALUES (26, 'rr', 'rr', 'e10adc3949ba59abbe56e057f20f883e', 103, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for tun_user_dept
-- ----------------------------
DROP TABLE IF EXISTS `tun_user_dept`;
CREATE TABLE `tun_user_dept`  (
  `user_dept_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) NULL DEFAULT NULL,
  `dept_id` int(8) NULL DEFAULT NULL,
  PRIMARY KEY (`user_dept_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of tun_user_dept
-- ----------------------------
INSERT INTO `tun_user_dept` VALUES (1, 1, 22);
INSERT INTO `tun_user_dept` VALUES (2, 2, 11);
INSERT INTO `tun_user_dept` VALUES (3, 3, 12);
INSERT INTO `tun_user_dept` VALUES (4, 5, 13);
INSERT INTO `tun_user_dept` VALUES (5, 6, 14);
INSERT INTO `tun_user_dept` VALUES (6, 7, 15);
INSERT INTO `tun_user_dept` VALUES (7, 8, 16);
INSERT INTO `tun_user_dept` VALUES (8, 9, 17);
INSERT INTO `tun_user_dept` VALUES (9, 10, 19);
INSERT INTO `tun_user_dept` VALUES (10, 11, 20);
INSERT INTO `tun_user_dept` VALUES (11, 12, 21);

SET FOREIGN_KEY_CHECKS = 1;
