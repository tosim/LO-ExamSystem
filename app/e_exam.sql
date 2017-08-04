/*
Navicat MySQL Data Transfer

Source Server         : hdd
Source Server Version : 50617
Source Host           : localhost:3307
Source Database       : lo_examsystem

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-08-04 10:58:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for e_exam
-- ----------------------------
DROP TABLE IF EXISTS `e_exam`;
CREATE TABLE `e_exam` (
  `exam_id` int(11) NOT NULL AUTO_INCREMENT,
  `e_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `start_time` int(20) NOT NULL,
  `last_time` int(20) NOT NULL,
  PRIMARY KEY (`exam_id`,`e_id`,`p_id`),
  KEY `e_id111` (`e_id`),
  KEY `p_id111` (`p_id`),
  CONSTRAINT `e_id111` FOREIGN KEY (`e_id`) REFERENCES `enterprise` (`e_id`) ON DELETE CASCADE,
  CONSTRAINT `p_id111` FOREIGN KEY (`p_id`) REFERENCES `profession` (`p_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of e_exam
-- ----------------------------
INSERT INTO `e_exam` VALUES ('1', '2', '1', '123', '456');
INSERT INTO `e_exam` VALUES ('2', '2', '1', '123', '456');
INSERT INTO `e_exam` VALUES ('3', '2', '1', '123', '456');
INSERT INTO `e_exam` VALUES ('4', '2', '1', '123', '456');
