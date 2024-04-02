-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: mca_sem2_timetable
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CONSTRAINTS`
--

DROP TABLE IF EXISTS `CONSTRAINTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CONSTRAINTS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_run_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `external_name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  `weight` int DEFAULT NULL,
  `params` json DEFAULT NULL,
  `enabled` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONSTRAINTS`
--

LOCK TABLES `CONSTRAINTS` WRITE;
/*!40000 ALTER TABLE `CONSTRAINTS` DISABLE KEYS */;
INSERT INTO `CONSTRAINTS` VALUES (9,1,'fixed_slot_conflict',NULL,'A fixed slot course cannot be overridden by a non-fixed course','hard',100,NULL,1),(10,1,'teacher_room_stability',NULL,'A teacher would like to teach a course in the same room','soft',1,NULL,1);
/*!40000 ALTER TABLE `CONSTRAINTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COURSES`
--

DROP TABLE IF EXISTS `COURSES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COURSES` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) NOT NULL,
  `teacher` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `slot` int NOT NULL,
  `student_group` varchar(45) NOT NULL,
  `enabled` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSES`
--

LOCK TABLES `COURSES` WRITE;
/*!40000 ALTER TABLE `COURSES` DISABLE KEYS */;
INSERT INTO `COURSES` VALUES (7,'Placements','Self','Lab',1,'MCA Sem2',1),(8,'Placements','Self','Lab',2,'MCA Sem2',1),(9,'Placements','Self','Lab',3,'MCA Sem2',1),(10,'Placements','Self','Lab',4,'MCA Sem2',1),(11,'MAD','VAJ','Classroom',1,'MCA Sem2',1),(12,'MAD','VAJ','Classroom',2,'MCA Sem2',1),(13,'MAD-Lab','AKL','Lab',1,'MCA Sem2',1),(14,'MAD-Lab','AKL','Lab',2,'MCA Sem2',1),(15,'AJ','VRG','Classroom',1,'MCA Sem2',1),(16,'AJ','VRG','Classroom',2,'MCA Sem2',1),(17,'AJ-Lab','VRG','Lab',1,'MCA Sem2',1),(18,'AJ-Lab','VRG','Lab',2,'MCA Sem2',1),(19,'SE','PMI','Classroom',1,'MCA Sem2',1),(20,'SE','PMI','Classroom',2,'MCA Sem2',1),(21,'SE-Lab','PMI','Lab',1,'MCA Sem2',1),(22,'SE-Lab','PMI','Lab',2,'MCA Sem2',1),(23,'AWT','VTH','Clasroom',1,'MCA Sem2',1),(24,'AWT','VTH','Clasroom',2,'MCA Sem2',1),(25,'AWT-Lab','VTH','Lab',1,'MCA Sem2',1),(26,'AWT-Lab','VTH','Lab',2,'MCA Sem2',1),(27,'DAP','KMA','Classroom',1,'MCA Sem2',1),(28,'DAP','KMA','Classroom',2,'MCA Sem2',1),(29,'DAP-Lab','KMA','Lab',1,'MCA Sem2',1),(30,'DAP-Lab','KMA','Lab',2,'MCA Sem2',1),(31,'AI','PSH','Classroom',1,'MCA Sem2',1),(32,'AI','PSH','Classroom',2,'MCA Sem2',1),(33,'AI-Lab','PSH','Lab',1,'MCA Sem2',1),(34,'AI-Lab','PSH','Lab',2,'MCA Sem2',1),(35,'ADBMS','AVI','Classroom',1,'MCA Sem2',1),(36,'ADBMS','AVI','Classroom',2,'MCA Sem2',1),(37,'ADBMS-Lab','AVI','Lab',1,'MCA Sem2',1),(38,'ADBMS-Lab','AVI','Lab',2,'MCA Sem2',1),(39,'HCI','PKR','Classroom',1,'MCA Sem2',1),(40,'HCI-Lab','PKR','Lab',1,'MCA Sem2',1),(41,'PS','VSC','Classroom',1,'MCA Sem2',1),(42,'PS','VSC','Classroom',2,'MCA Sem2',1),(43,'PS-Lab','MKA','Lab',1,'MCA Sem2',1),(44,'PS-Lab','MKA','Lab',2,'MCA Sem2',1),(45,'TC','UCH','Classroom',1,'MCA Sem2',1),(46,'Break','Chefs','Canteen',1,'MCA Sem2',1);
/*!40000 ALTER TABLE `COURSES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FIXED_SLOTS`
--

DROP TABLE IF EXISTS `FIXED_SLOTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FIXED_SLOTS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `new_course_id` int NOT NULL,
  `room_id` int DEFAULT NULL,
  `timeslot_id` int DEFAULT NULL,
  `enabled` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fixed_slot_id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FIXED_SLOTS`
--

LOCK TABLES `FIXED_SLOTS` WRITE;
/*!40000 ALTER TABLE `FIXED_SLOTS` DISABLE KEYS */;
INSERT INTO `FIXED_SLOTS` VALUES (1,2,50001,1,2,1),(5,4,50002,8,3,NULL);
/*!40000 ALTER TABLE `FIXED_SLOTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `FIXED_SLOTS_VIEW`
--

DROP TABLE IF EXISTS `FIXED_SLOTS_VIEW`;
/*!50001 DROP VIEW IF EXISTS `FIXED_SLOTS_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `FIXED_SLOTS_VIEW` AS SELECT 
 1 AS `id`,
 1 AS `new_course_id`,
 1 AS `room_id`,
 1 AS `room_name`,
 1 AS `course_id`,
 1 AS `subject`,
 1 AS `timeslot_id`,
 1 AS `day_of_week`,
 1 AS `start_time`,
 1 AS `end_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `GENERAL_RUN_PARAMS`
--

DROP TABLE IF EXISTS `GENERAL_RUN_PARAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GENERAL_RUN_PARAMS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_run_id` int NOT NULL,
  `param_name` varchar(45) NOT NULL,
  `param_external_name` varchar(255) DEFAULT NULL,
  `param_value` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GENERAL_RUN_PARAMS`
--

LOCK TABLES `GENERAL_RUN_PARAMS` WRITE;
/*!40000 ALTER TABLE `GENERAL_RUN_PARAMS` DISABLE KEYS */;
INSERT INTO `GENERAL_RUN_PARAMS` VALUES (10,3,'max_hrs_in_day','Maximum hours that a student group can attend courses in a day',30),(11,3,'runtime_in_secs','Runtime limit in seconds for the planner ',100),(12,1,'runtime_in_secs','Runtime limit in seconds for the planner ',30),(13,1,'max_hrs_in_day','Maximum hours that a student group can attend courses in a day',10);
/*!40000 ALTER TABLE `GENERAL_RUN_PARAMS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PLAN_RUNS`
--

DROP TABLE IF EXISTS `PLAN_RUNS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PLAN_RUNS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comments` varchar(255) DEFAULT NULL,
  `start_time` varchar(45) DEFAULT NULL,
  `end_time` varchar(45) DEFAULT NULL,
  `planner_process_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `output` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PLAN_RUNS`
--

LOCK TABLES `PLAN_RUNS` WRITE;
/*!40000 ALTER TABLE `PLAN_RUNS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PLAN_RUNS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROOMS`
--

DROP TABLE IF EXISTS `ROOMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ROOMS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `enabled` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROOMS`
--

LOCK TABLES `ROOMS` WRITE;
/*!40000 ALTER TABLE `ROOMS` DISABLE KEYS */;
INSERT INTO `ROOMS` VALUES (40,'CL-401','Lab',1),(41,'CL-402','Lab',1),(42,'CL-403','Lab',1),(43,'CL-803','Lab',1),(44,'CL-804','Lab',1),(45,'CR-401','Classroom',1),(46,'CR-402','Classroom',1);
/*!40000 ALTER TABLE `ROOMS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIMESLOTS`
--

DROP TABLE IF EXISTS `TIMESLOTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TIMESLOTS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day_of_week` varchar(45) NOT NULL,
  `start_time` varchar(45) NOT NULL,
  `end_time` varchar(45) NOT NULL,
  `enabled` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIMESLOTS`
--

LOCK TABLES `TIMESLOTS` WRITE;
/*!40000 ALTER TABLE `TIMESLOTS` DISABLE KEYS */;
INSERT INTO `TIMESLOTS` VALUES (4,'MONDAY','08:00','09:00',1),(5,'MONDAY','09:00','10:00',1),(6,'MONDAY','10:00','11:00',1),(7,'MONDAY','11:00','12:00',1),(8,'MONDAY','12:00','13:00',1),(9,'MONDAY','13:00','14:00',1),(10,'MONDAY','14:00','15:00',1),(11,'MONDAY','15:00','16:00',1),(12,'MONDAY','16:00','17:00',1),(13,'MONDAY','17:00','18:00',1),(14,'TUESDAY','08:00','09:00',1),(15,'TUESDAY','09:00','10:00',1),(16,'TUESDAY','10:00','11:00',1),(17,'TUESDAY','11:00','12:00',1),(18,'TUESDAY','12:00','13:00',1),(19,'TUESDAY','13:00','14:00',1),(20,'TUESDAY','14:00','15:00',1),(21,'TUESDAY','15:00','16:00',1),(22,'TUESDAY','16:00','17:00',1),(23,'TUESDAY','17:00','18:00',1),(24,'WEDNESDAY','08:00','09:00',1),(25,'WEDNESDAY','09:00','10:00',1),(26,'WEDNESDAY','10:00','11:00',1),(27,'WEDNESDAY','11:00','12:00',1),(28,'WEDNESDAY','12:00','13:00',1),(29,'WEDNESDAY','13:00','14:00',1),(30,'WEDNESDAY','14:00','15:00',1),(31,'WEDNESDAY','15:00','16:00',1),(32,'WEDNESDAY','16:00','17:00',1),(33,'WEDNESDAY','17:00','18:00',1),(34,'THURSDAY','08:00','09:00',1),(35,'THURSDAY','09:00','10:00',1),(36,'THURSDAY','10:00','11:00',1),(37,'THURSDAY','11:00','12:00',1),(38,'THURSDAY','12:00','13:00',1),(39,'THURSDAY','13:00','14:00',1),(40,'THURSDAY','14:00','15:00',1),(41,'THURSDAY','15:00','16:00',1),(42,'THURSDAY','16:00','17:00',1),(43,'THURSDAY','17:00','18:00',1),(44,'FRIDAY','08:00','09:00',1),(45,'FRIDAY','09:00','10:00',1),(46,'FRIDAY','10:00','11:00',1),(47,'FRIDAY','11:00','12:00',1),(48,'FRIDAY','12:00','13:00',1),(49,'FRIDAY','13:00','14:00',1),(50,'FRIDAY','14:00','15:00',1),(51,'FRIDAY','15:00','16:00',1),(52,'FRIDAY','16:00','17:00',1),(53,'FRIDAY','17:00','18:00',1),(54,'SATURDAY','08:00','09:00',1),(55,'SATURDAY','09:00','10:00',1),(56,'SATURDAY','10:00','11:00',1),(57,'SATURDAY','11:00','12:00',1),(58,'SATURDAY','12:00','13:00',1),(59,'SATURDAY','13:00','14:00',1),(60,'SATURDAY','14:00','15:00',1),(61,'SATURDAY','15:00','16:00',1),(62,'SATURDAY','16:00','17:00',1),(63,'SATURDAY','17:00','18:00',1);
/*!40000 ALTER TABLE `TIMESLOTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `FIXED_SLOTS_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `FIXED_SLOTS_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `FIXED_SLOTS_VIEW` AS select `f`.`id` AS `id`,`f`.`new_course_id` AS `new_course_id`,`r`.`id` AS `room_id`,`r`.`name` AS `room_name`,`c`.`id` AS `course_id`,`c`.`subject` AS `subject`,`t`.`id` AS `timeslot_id`,`t`.`day_of_week` AS `day_of_week`,`t`.`start_time` AS `start_time`,`t`.`end_time` AS `end_time` from (((`FIXED_SLOTS` `f` join `ROOMS` `r`) join `TIMESLOTS` `t`) join `COURSES` `c`) where ((`f`.`room_id` = `r`.`id`) and (`f`.`timeslot_id` = `t`.`id`) and (`f`.`course_id` = `c`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-06 18:21:29
