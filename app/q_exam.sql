/*
Navicat MySQL Data Transfer

Source Server         : hdd
Source Server Version : 50617
Source Host           : localhost:3307
Source Database       : lo_examsystem

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-08-04 10:58:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for q_exam
-- ----------------------------
DROP TABLE IF EXISTS `q_exam`;
CREATE TABLE `q_exam` (
  `exam_id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  PRIMARY KEY (`exam_id`,`q_id`),
  KEY `q_id111` (`q_id`),
  CONSTRAINT `exam111` FOREIGN KEY (`exam_id`) REFERENCES `e_exam` (`exam_id`) ON DELETE CASCADE,
  CONSTRAINT `q_id111` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of q_exam
-- ----------------------------
INSERT INTO `q_exam` VALUES ('2', '266');
INSERT INTO `q_exam` VALUES ('3', '267');
INSERT INTO `q_exam` VALUES ('4', '268');
