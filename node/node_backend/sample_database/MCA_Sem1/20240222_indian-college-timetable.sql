-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: indian-college-timetable
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSES`
--

LOCK TABLES `COURSES` WRITE;
/*!40000 ALTER TABLE `COURSES` DISABLE KEYS */;
INSERT INTO `COURSES` VALUES (1,'OS','SFA','Classroom',1,'MCA Sem1',1),(2,'OS-Lab','SFA-Lab','Lab',1,'MCA Sem1',1),(3,'OS-Lab','SFA-Lab','Lab',2,'MCA Sem1',1),(4,'DBMS','KMT','Classroom',1,'MCA SEM1',1),(5,'ABCD','KHT','Canteen',1,'MCA-Sem1',1),(6,'DBMS-Lab','KMT-Lab','Lab',1,'MCA-Sem1',1);
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
INSERT INTO `PLAN_RUNS` VALUES (1,'Plan Run 1','2023-10-19 15:28:24','2023-11-01 18:00:31',NULL,'Completed','{\"score\": {}, \"room_list\": [{\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, {\"id\": 2, \"name\": \"CR-100\", \"type\": \"Classroom\"}, {\"id\": 8, \"name\": \"CL-40\", \"type\": \"Lab\"}, {\"id\": 13, \"name\": \"ABCD\", \"type\": \"Lab\"}, {\"id\": 16, \"name\": \"DEFG\", \"type\": \"Canteen\"}], \"score_str\": \"-6hard/0soft\", \"course_list\": [{\"id\": 3, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"OS-Lab\", \"teacher\": \"SFA-Lab\", \"timeslot\": {\"id\": 3, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 4, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"DBMS\", \"teacher\": \"KMT\", \"timeslot\": {\"id\": 2, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA SEM1\", \"fixed_timeslot\": null}, {\"id\": 5, \"room\": {\"id\": 2, \"name\": \"CR-100\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Canteen\", \"fixed\": 0, \"subject\": \"ABCD\", \"teacher\": \"KHT\", \"timeslot\": {\"id\": 1, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA-Sem1\", \"fixed_timeslot\": null}, {\"id\": 6, \"room\": {\"id\": 2, \"name\": \"CR-100\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"DBMS-Lab\", \"teacher\": \"KMT-Lab\", \"timeslot\": {\"id\": 3, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA-Sem1\", \"fixed_timeslot\": null}, {\"id\": 1000, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 1, \"subject\": \"OS\", \"teacher\": \"SFA\", \"timeslot\": {\"id\": 1, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 1, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"MONDAY\"}}, {\"id\": 2000, \"room\": {\"id\": 2, \"name\": \"CR-100\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 1, \"subject\": \"OS-Lab\", \"teacher\": \"SFA-Lab\", \"timeslot\": {\"id\": 2, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": {\"id\": 2, \"name\": \"CR-100\", \"type\": \"Classroom\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 2, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"TUESDAY\"}}], \"timeslot_list\": [{\"id\": 1, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 2, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 3, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"TUESDAY\"}], \"_optapy_solver_run_id\": [140005445851552, 140005445857792, {\"hex\": \"609d315678b211ee95ecac2b6e9a3080\"}]}'),(3,'Plan Run 2','2023-10-19 19:54:34',NULL,512,'In Progress',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROOMS`
--

LOCK TABLES `ROOMS` WRITE;
/*!40000 ALTER TABLE `ROOMS` DISABLE KEYS */;
INSERT INTO `ROOMS` VALUES (1,'CR-47','Classroom',1),(8,'CL-40','Lab',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIMESLOTS`
--

LOCK TABLES `TIMESLOTS` WRITE;
/*!40000 ALTER TABLE `TIMESLOTS` DISABLE KEYS */;
INSERT INTO `TIMESLOTS` VALUES (1,'MONDAY','09:00:00','10:00:00',1),(2,'TUESDAY','10:00:00','11:00:00',1),(3,'TUESDAY','11:00:00','12:00:00',1);
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

-- Dump completed on 2024-02-22 18:38:34
