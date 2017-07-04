-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: lo_examsystem
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `lo_examsystem`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lo_examsystem` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `lo_examsystem`;

--
-- Table structure for table `examhistory`
--

DROP TABLE IF EXISTS `examhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examhistory` (
  `h_id` int(11) NOT NULL AUTO_INCREMENT,
  `h_date` date DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  `h_grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`h_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `examhistory_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examhistory`
--

LOCK TABLES `examhistory` WRITE;
/*!40000 ALTER TABLE `examhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `examhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `h_que`
--

DROP TABLE IF EXISTS `h_que`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `h_que` (
  `h_id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  `hq_answer` text,
  PRIMARY KEY (`h_id`,`q_id`),
  KEY `q_id` (`q_id`),
  CONSTRAINT `h_que_ibfk_1` FOREIGN KEY (`h_id`) REFERENCES `examhistory` (`h_id`),
  CONSTRAINT `h_que_ibfk_2` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `h_que`
--

LOCK TABLES `h_que` WRITE;
/*!40000 ALTER TABLE `h_que` DISABLE KEYS */;
/*!40000 ALTER TABLE `h_que` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_tag`
--

DROP TABLE IF EXISTS `pro_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pro_tag` (
  `p_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `pt_rate` int(11) DEFAULT NULL,
  PRIMARY KEY (`p_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `pro_tag_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `profession` (`p_id`),
  CONSTRAINT `pro_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_tag`
--

LOCK TABLES `pro_tag` WRITE;
/*!40000 ALTER TABLE `pro_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `pro_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profession`
--

DROP TABLE IF EXISTS `profession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profession` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(20) NOT NULL,
  PRIMARY KEY (`p_id`),
  UNIQUE KEY `p_name` (`p_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profession`
--

LOCK TABLES `profession` WRITE;
/*!40000 ALTER TABLE `profession` DISABLE KEYS */;
/*!40000 ALTER TABLE `profession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `que_tag`
--

DROP TABLE IF EXISTS `que_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `que_tag` (
  `q_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`q_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `que_tag_ibfk_1` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`),
  CONSTRAINT `que_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `que_tag`
--

LOCK TABLES `que_tag` WRITE;
/*!40000 ALTER TABLE `que_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `que_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quecollection`
--

DROP TABLE IF EXISTS `quecollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quecollection` (
  `u_id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  PRIMARY KEY (`u_id`,`q_id`),
  KEY `q_id` (`q_id`),
  CONSTRAINT `quecollection_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `quecollection_ibfk_2` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quecollection`
--

LOCK TABLES `quecollection` WRITE;
/*!40000 ALTER TABLE `quecollection` DISABLE KEYS */;
/*!40000 ALTER TABLE `quecollection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quecomment`
--

DROP TABLE IF EXISTS `quecomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quecomment` (
  `u_id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  `qc_date` date DEFAULT NULL,
  `qc_content` text,
  `qc_zan` int(11) DEFAULT NULL,
  PRIMARY KEY (`u_id`,`q_id`),
  KEY `q_id` (`q_id`),
  CONSTRAINT `quecomment_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `quecomment_ibfk_2` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quecomment`
--

LOCK TABLES `quecomment` WRITE;
/*!40000 ALTER TABLE `quecomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `quecomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `q_id` int(11) NOT NULL AUTO_INCREMENT,
  `q_type` int(11) DEFAULT NULL,
  `q_content` text,
  `q_answer` text,
  `q_analysis` text,
  `q_right` int(11) DEFAULT NULL,
  `q_wrong` int(11) DEFAULT NULL,
  PRIMARY KEY (`q_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(20) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testpaper`
--

DROP TABLE IF EXISTS `testpaper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testpaper` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_id` int(11) DEFAULT NULL,
  `t_difficulty` int(11) DEFAULT NULL,
  `t_ochoose_num` int(11) DEFAULT NULL,
  `t_mchoose_num` int(11) DEFAULT NULL,
  `t_judge_num` int(11) DEFAULT NULL,
  `t_fill_num` int(11) DEFAULT NULL,
  `t_squestion_num` int(11) DEFAULT NULL,
  `t_code_num` int(11) DEFAULT NULL,
  `t_ochoose_score` int(11) DEFAULT NULL,
  `t_mchoose_score` int(11) DEFAULT NULL,
  `t_judge_score` int(11) DEFAULT NULL,
  `t_fill_score` int(11) DEFAULT NULL,
  `t_squestion_score` int(11) DEFAULT NULL,
  `t_code_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `p_id` (`p_id`),
  CONSTRAINT `testpaper_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `profession` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testpaper`
--

LOCK TABLES `testpaper` WRITE;
/*!40000 ALTER TABLE `testpaper` DISABLE KEYS */;
/*!40000 ALTER TABLE `testpaper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_que`
--

DROP TABLE IF EXISTS `u_que`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u_que` (
  `u_id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  `uq_answer` text,
  `uq_understand` text,
  PRIMARY KEY (`u_id`,`q_id`),
  KEY `q_id` (`q_id`),
  CONSTRAINT `u_que_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `u_que_ibfk_2` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_que`
--

LOCK TABLES `u_que` WRITE;
/*!40000 ALTER TABLE `u_que` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_que` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(16) NOT NULL,
  `u_email` varchar(25) NOT NULL,
  `u_pass` varchar(16) NOT NULL,
  `p_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_email` (`u_email`),
  KEY `p_id` (`p_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `profession` (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-03 19:52:19
