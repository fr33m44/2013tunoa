-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 05 月 13 日 12:30
-- 服务器版本: 5.5.8-log
-- PHP 版本: 5.2.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `tunoa`
--

-- --------------------------------------------------------

--
-- 表的结构 `tun_dept`
--

CREATE TABLE IF NOT EXISTS `tun_dept` (
  `dept_id` int(8) DEFAULT NULL,
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
  `org_admin` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tun_dept`
--

INSERT INTO `tun_dept` (`dept_id`, `dept_name`, `parent_id`, `position`, `dept_type`, `dept_left`, `dept_right`, `dept_level`, `tel_no`, `fax_no`, `dept_addr`, `dept_sort`, `manager`, `leader1`, `leader2`, `dept_duty`, `is_org`, `org_admin`) VALUES
(NULL, '单位名称', 0, 0, 'drive', '1', '2', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '院部', 1, 0, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '政治部', 1, 1, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '医务部', 1, 2, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '护理部', 1, 3, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '经济部', 1, 4, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '信息科', 1, 5, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '医学工程科', 1, 6, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '门诊系统', 1, 7, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '内科系统', 1, 8, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '外科系统', 1, 9, 'folder', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '院长', 2, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '政委', 2, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '副院长', 2, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '秘书', 2, 3, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '主任', 3, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '副主任', 3, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '干事', 3, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '主任', 4, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '副主任', 4, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '助理员', 4, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '训练队', 4, 3, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '队长', 23, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '助理员', 23, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '队员', 23, 2, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '主任', 5, 0, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '总护士长', 5, 1, 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
