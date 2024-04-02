-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: indian-college-timetable
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.23.04.1

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
  `plan_run_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `external_name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  `weight` int DEFAULT NULL,
  `params` json DEFAULT NULL,
  `enabled` int NOT NULL,
  PRIMARY KEY (`plan_run_id`,`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONSTRAINTS`
--

LOCK TABLES `CONSTRAINTS` WRITE;
/*!40000 ALTER TABLE `CONSTRAINTS` DISABLE KEYS */;
INSERT INTO `CONSTRAINTS` VALUES (1,'room_conflict',NULL,NULL,'hard',100,'{\"max_hrs_in_day\": 5}',1),(1,'student_group_conflict',NULL,NULL,'hard',1,'{}',1),(3,'xyz_conflict',NULL,NULL,'hard',10,NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSES`
--

LOCK TABLES `COURSES` WRITE;
/*!40000 ALTER TABLE `COURSES` DISABLE KEYS */;
INSERT INTO `COURSES` VALUES (1,'OS','SFA','Classroom',1,'MCA Sem1',1),(2,'OS-Lab','SFA-Lab','Lab',1,'MCA Sem1',1),(3,'OS-Lab','SFA-Lab','Lab',2,'MCA Sem1',1),(4,'DBMS','KMT','Classroom',1,'MCA SEM1',1);
/*!40000 ALTER TABLE `COURSES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FIXED_SLOTS`
--

DROP TABLE IF EXISTS `FIXED_SLOTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FIXED_SLOTS` (
  `course_id` int NOT NULL,
  `new_course_id` int NOT NULL,
  `room_id` int DEFAULT NULL,
  `timeslot_id` int DEFAULT NULL,
  `enabled` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FIXED_SLOTS`
--

LOCK TABLES `FIXED_SLOTS` WRITE;
/*!40000 ALTER TABLE `FIXED_SLOTS` DISABLE KEYS */;
INSERT INTO `FIXED_SLOTS` VALUES (1,1000,1,1,1),(2,2000,2,2,1);
/*!40000 ALTER TABLE `FIXED_SLOTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GENERAL_RUN_PARAMS`
--

DROP TABLE IF EXISTS `GENERAL_RUN_PARAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GENERAL_RUN_PARAMS` (
  `plan_run_id` int NOT NULL,
  `param_name` varchar(45) NOT NULL,
  `param_external_name` varchar(255) DEFAULT NULL,
  `param_value` int DEFAULT NULL,
  PRIMARY KEY (`plan_run_id`,`param_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GENERAL_RUN_PARAMS`
--

LOCK TABLES `GENERAL_RUN_PARAMS` WRITE;
/*!40000 ALTER TABLE `GENERAL_RUN_PARAMS` DISABLE KEYS */;
INSERT INTO `GENERAL_RUN_PARAMS` VALUES (1,'max_hrs_in_day','Maximum hours that a student group can attend courses in a day',5),(1,'runtime_in_secs','Runtime limit in seconds for the planner',30);
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
INSERT INTO `PLAN_RUNS` VALUES (1,'2023-10-19 15:28:24','2023-10:19 15:33:15',NULL,'Completed','{\"score\": {}, \"room_list\": [{\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, {\"id\": 3, \"name\": \"CL-17\", \"type\": \"Lab\"}, {\"id\": 4, \"name\": \"CL-19\", \"type\": \"Lab\"}, {\"id\": 5, \"name\": \"CL-21\", \"type\": \"Lab\"}, {\"id\": 6, \"name\": \"CL-13\", \"type\": \"Lab\"}, {\"id\": 7, \"name\": \"CL-5\", \"type\": \"Lab\"}, {\"id\": 8, \"name\": \"CL-6\", \"type\": \"Lab\"}, {\"id\": 9, \"name\": \"CR-48\", \"type\": \"Classroom\"}, {\"id\": 10, \"name\": \"CR-49\", \"type\": \"Classroom\"}, {\"id\": 11, \"name\": \"CR-50\", \"type\": \"Classroom\"}, {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}], \"score_str\": \"-64hard/0soft\", \"course_list\": [{\"id\": 1, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"OS\", \"teacher\": \"SFA\", \"timeslot\": {\"id\": 2, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 2, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"OS-Lab\", \"teacher\": \"SFA-Lab\", \"timeslot\": {\"id\": 3, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 200, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"OS-Lab\", \"teacher\": \"SFA-Lab\", \"timeslot\": {\"id\": 4, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 3, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"DBMS\", \"teacher\": \"KMT\", \"timeslot\": {\"id\": 5, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 4, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"DBMS-Lab\", \"teacher\": \"KMT-Lab\", \"timeslot\": {\"id\": 8, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 400, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"DBMS-Lab\", \"teacher\": \"KMT-Lab\", \"timeslot\": {\"id\": 9, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 5, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"CN\", \"teacher\": \"ISA\", \"timeslot\": {\"id\": 10, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 6, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"CN-Lab\", \"teacher\": \"ISA-Lab\", \"timeslot\": {\"id\": 11, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 600, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"CN-Lab\", \"teacher\": \"ISA-Lab\", \"timeslot\": {\"id\": 16, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"WEDNESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 7, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"DSA\", \"teacher\": \"PSH\", \"timeslot\": {\"id\": 17, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"WEDNESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 8, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"DSA-Lab\", \"teacher\": \"PSH-Lab\", \"timeslot\": {\"id\": 18, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"WEDNESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 800, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"DSA-Lab\", \"teacher\": \"PSH-Lab\", \"timeslot\": {\"id\": 19, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"WEDNESDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 9, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"JP\", \"teacher\": \"HM\", \"timeslot\": {\"id\": 23, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"THURSDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 900, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 2, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"JP\", \"teacher\": \"HM\", \"timeslot\": {\"id\": 24, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"THURSDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 901, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 3, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"JP\", \"teacher\": \"HM\", \"timeslot\": {\"id\": 25, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"THURSDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 10, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"JP-Lab\", \"teacher\": \"HM-Lab\", \"timeslot\": {\"id\": 26, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"THURSDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 1000, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"JP-Lab\", \"teacher\": \"HM-Lab\", \"timeslot\": {\"id\": 29, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"FRIDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 11, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"WT\", \"teacher\": \"ASI\", \"timeslot\": {\"id\": 30, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"FRIDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 12, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"WT-Lab\", \"teacher\": \"ASI-Lab\", \"timeslot\": {\"id\": 31, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"FRIDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 1200, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"WT-Lab\", \"teacher\": \"ASI-Lab\", \"timeslot\": {\"id\": 32, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"FRIDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 13, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"EC\", \"teacher\": \"SSI\", \"timeslot\": {\"id\": 36, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"SATURDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 14, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 1, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"DT\", \"teacher\": \"MST\", \"timeslot\": {\"id\": 37, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"SATURDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 1400, \"room\": {\"id\": 1, \"name\": \"CR-47\", \"type\": \"Classroom\"}, \"slot\": 2, \"type\": \"Classroom\", \"fixed\": 0, \"subject\": \"DT\", \"teacher\": \"MST\", \"timeslot\": {\"id\": 38, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"SATURDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 15, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 1, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"DT-Lab\", \"teacher\": \"MST\", \"timeslot\": {\"id\": 39, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"SATURDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 1500, \"room\": {\"id\": 2, \"name\": \"CL-9\", \"type\": \"Lab\"}, \"slot\": 2, \"type\": \"Lab\", \"fixed\": 0, \"subject\": \"DT-Lab\", \"teacher\": \"MST\", \"timeslot\": {\"id\": 2, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": null, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": null}, {\"id\": 50001, \"room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"slot\": 1, \"type\": \"Canteen\", \"fixed\": 1, \"subject\": \"Lunch Break\", \"teacher\": \"Chefs\", \"timeslot\": {\"id\": 50001, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"MONDAY\"}, \"fixed_room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 50001, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"MONDAY\"}}, {\"id\": 50002, \"room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"slot\": 1, \"type\": \"Canteen\", \"fixed\": 1, \"subject\": \"Lunch Break\", \"teacher\": \"Chefs\", \"timeslot\": {\"id\": 50002, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"TUESDAY\"}, \"fixed_room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 50002, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"TUESDAY\"}}, {\"id\": 50003, \"room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"slot\": 1, \"type\": \"Canteen\", \"fixed\": 1, \"subject\": \"Lunch Break\", \"teacher\": \"Chefs\", \"timeslot\": {\"id\": 50003, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"WEDNESDAY\"}, \"fixed_room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 50003, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"WEDNESDAY\"}}, {\"id\": 50004, \"room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"slot\": 1, \"type\": \"Canteen\", \"fixed\": 1, \"subject\": \"Lunch Break\", \"teacher\": \"Chefs\", \"timeslot\": {\"id\": 50004, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"THURSDAY\"}, \"fixed_room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 50004, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"THURSDAY\"}}, {\"id\": 50005, \"room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"slot\": 1, \"type\": \"Canteen\", \"fixed\": 1, \"subject\": \"Lunch Break\", \"teacher\": \"Chefs\", \"timeslot\": {\"id\": 50005, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"FRIDAY\"}, \"fixed_room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 50005, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"FRIDAY\"}}, {\"id\": 50006, \"room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"slot\": 1, \"type\": \"Canteen\", \"fixed\": 1, \"subject\": \"Lunch Break\", \"teacher\": \"Chefs\", \"timeslot\": {\"id\": 50006, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"SATURDAY\"}, \"fixed_room\": {\"id\": 50000, \"name\": \"Canteen\", \"type\": \"Canteen\"}, \"student_group\": \"MCA Sem1\", \"fixed_timeslot\": {\"id\": 50006, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"SATURDAY\"}}], \"timeslot_list\": [{\"id\": 2, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 3, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 4, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 50001, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 5, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 6, \"end_time\": \"16:00:00\", \"start_time\": \"15:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 7, \"end_time\": \"17:00:00\", \"start_time\": \"16:00:00\", \"day_of_week\": \"MONDAY\"}, {\"id\": 8, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 9, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 10, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 11, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 50002, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 12, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 13, \"end_time\": \"16:00:00\", \"start_time\": \"15:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 14, \"end_time\": \"17:00:00\", \"start_time\": \"16:00:00\", \"day_of_week\": \"TUESDAY\"}, {\"id\": 16, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"WEDNESDAY\"}, {\"id\": 17, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"WEDNESDAY\"}, {\"id\": 18, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"WEDNESDAY\"}, {\"id\": 50003, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"WEDNESDAY\"}, {\"id\": 19, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"WEDNESDAY\"}, {\"id\": 20, \"end_time\": \"16:00:00\", \"start_time\": \"15:00:00\", \"day_of_week\": \"WEDNESDAY\"}, {\"id\": 21, \"end_time\": \"17:00:00\", \"start_time\": \"16:00:00\", \"day_of_week\": \"WEDNESDAY\"}, {\"id\": 23, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"THURSDAY\"}, {\"id\": 24, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"THURSDAY\"}, {\"id\": 25, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"THURSDAY\"}, {\"id\": 50004, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"THURSDAY\"}, {\"id\": 26, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"THURSDAY\"}, {\"id\": 27, \"end_time\": \"16:00:00\", \"start_time\": \"15:00:00\", \"day_of_week\": \"THURSDAY\"}, {\"id\": 28, \"end_time\": \"17:00:00\", \"start_time\": \"16:00:00\", \"day_of_week\": \"THURSDAY\"}, {\"id\": 29, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"FRIDAY\"}, {\"id\": 30, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"FRIDAY\"}, {\"id\": 31, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"FRIDAY\"}, {\"id\": 32, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"FRIDAY\"}, {\"id\": 50005, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"FRIDAY\"}, {\"id\": 33, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"FRIDAY\"}, {\"id\": 36, \"end_time\": \"10:00:00\", \"start_time\": \"09:00:00\", \"day_of_week\": \"SATURDAY\"}, {\"id\": 37, \"end_time\": \"11:00:00\", \"start_time\": \"10:00:00\", \"day_of_week\": \"SATURDAY\"}, {\"id\": 38, \"end_time\": \"12:00:00\", \"start_time\": \"11:00:00\", \"day_of_week\": \"SATURDAY\"}, {\"id\": 39, \"end_time\": \"13:00:00\", \"start_time\": \"12:00:00\", \"day_of_week\": \"SATURDAY\"}, {\"id\": 50006, \"end_time\": \"14:00:00\", \"start_time\": \"13:00:00\", \"day_of_week\": \"SATURDAY\"}, {\"id\": 40, \"end_time\": \"15:00:00\", \"start_time\": \"14:00:00\", \"day_of_week\": \"SATURDAY\"}], \"_optapy_solver_run_id\": [139920816005808, 139920815800016, {\"hex\": \"332c3bc46e6a11ee95ecac2b6e9a3080\"}]}'),(3,'2023-10-19 19:54:34',NULL,512,'In Progress',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROOMS`
--

LOCK TABLES `ROOMS` WRITE;
/*!40000 ALTER TABLE `ROOMS` DISABLE KEYS */;
INSERT INTO `ROOMS` VALUES (1,'CR-47','Classroom',1),(2,'CL-9','Lab',1);
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-19 20:46:23
