/*
 Navicat Premium Data Transfer

 Source Server         : remote-pi
 Source Server Type    : MySQL
 Source Server Version : 50556
 Source Host           : localhost:3306
 Source Schema         : db_babylife

 Target Server Type    : MySQL
 Target Server Version : 50556
 File Encoding         : 65001

 Date: 25/12/2019 10:31:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_image
-- ----------------------------
DROP TABLE IF EXISTS `admin_image`;
CREATE TABLE `admin_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  `photo_time` datetime DEFAULT NULL COMMENT '拍照时间，目前无用，取不到',
  `status` int(11) DEFAULT NULL COMMENT '是否展示，1展示，0不展示',
  `place` varchar(255) DEFAULT NULL COMMENT '地点',
  `note` varchar(255) DEFAULT NULL COMMENT '备注',
  `image` varchar(255) DEFAULT NULL COMMENT '图片链接',
  `image_thumb` varchar(255) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL COMMENT '图片ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=740 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for admin_upload_image
-- ----------------------------
DROP TABLE IF EXISTS `admin_upload_image`;
CREATE TABLE `admin_upload_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `path_thumb` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=715 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_expiration_time` datetime DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `login_ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
