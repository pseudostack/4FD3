-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gear
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing` (
  `listingID` int NOT NULL AUTO_INCREMENT,
  `Year` varchar(400) DEFAULT NULL,
  `Make` varchar(400) DEFAULT NULL,
  `Model` varchar(400) DEFAULT NULL,
  `Body` varchar(400) DEFAULT NULL,
  `startingBid` varchar(400) DEFAULT NULL,
  `floorBid` varchar(400) DEFAULT NULL,
  `currentBid` varchar(400) DEFAULT NULL,
  `auctionStartTime` timestamp NULL DEFAULT NULL,
  `auctionEndTime` timestamp NULL DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `VIN` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `transmission` varchar(45) DEFAULT NULL,
  `odometer` varchar(45) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  `pictures` mediumtext,
  PRIMARY KEY (`listingID`),
  KEY `userID_idx` (`userID`),
  KEY `listingUserId_idx` (`userID`),
  CONSTRAINT `listingUserId` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (1,'2013','AUDI','Q5','Sport Utility Vehicle (SUV)/Multi-Purpose Vehicle (MPV)','0','0','900','2023-08-19 01:11:00','2023-08-19 01:11:00',NULL,'WA1CFCFP0DA091671','Black','Automatic','277000','test','267069cf-ded1-4187-b75b-793cdd259ad6,1125d3ac-87bc-4cb2-9261-29af5c6970fe,a8227f75-d12c-4499-b116-60c283b62a3b,ed22cd55-eac9-4283-ae0d-a891da7e3c30,096c4edf-9b3a-4d54-b32f-d668d6151c84,f593b9fe-e1ba-4c89-a87b-e0ca76bc0198,ea114184-e67b-4a2f-9b2c-3c685d487838,1a96b8bd-baf1-4e88-beda-0fac8fec43e3,1c7a6dba-acb2-47a9-a476-d2991e3fb797,3d14b052-745c-4df5-8572-a9d4e4404bd7,99ccfd2d-e6fc-478a-a7e3-3a5f6b4891ed,76bb4aea-11f5-4122-bf6c-5bace583b4ca,3687a922-9e71-4560-971c-dfde34043631,fa89fced-f598-4b8f-8335-7b8a72191421,8a0555bf-797e-4a7d-8b2e-8127751a3744,ff1a740a-3835-42ce-8ae0-fb07bab44e22'),(2,'2012','AUDI','A7','Sedan/Saloon','500','500','600','2014-08-19 01:11:00','2014-08-19 01:11:00',NULL,'WAU2GCFC8CN126229','test','auto','200000','test','272881c4-9b25-42c1-9966-cef83c9c212a,c5c65f9c-9c02-4a95-a7f4-34ef910bc343,769364b5-507d-45c5-a891-7f64ca26f269,84b5189a-54d4-462a-96c5-6560bfc72acd,9baf5b32-7921-41d7-8dd6-85a199aba0ce,533508c9-2e6d-4b26-a222-549c8a81ce05,d619edbc-dcbe-440a-a92d-ef8c067c72d4,8541784d-6435-401b-a715-8254caf3a5d7,4c5151b6-995a-48d0-8f78-352170a664aa,6fd53993-7d98-4d0f-876b-dcbc373d3dca,776d4e37-6206-487d-a27e-cf2c9e3b620c,9e232cd0-655e-4a5b-be22-f6442fa8c350,298d05d3-3ccd-4bbc-bee3-8a4af539eb28'),(3,'2015','JEEP','Cherokee','Sport Utility Vehicle (SUV)/Multi-Purpose Vehicle (MPV)','500','500',NULL,'2026-08-19 20:15:00','2026-08-19 20:15:00',NULL,'1C4PJLAB9FW753271','white','automatic','145000','test','b2e8bcda-75b5-4fcc-a9e3-629a048eb6ed,2e0a264f-275d-4f7e-ac60-60c5f4ec6ad2,2e458957-5925-4d73-9c20-e92087667540,8f5bd8aa-889b-4793-b744-53f4520574aa,fa20c35a-5183-459e-be7a-b0dde41686fa,b14229b5-1adf-43b3-aed2-36c847d1291e,2a1b6108-08b0-4c0c-b489-9c798667164b,c3d274e2-4773-4c94-9603-dc08f8070221,83f3a540-ec05-43cc-98c6-97f273615d0e,65fdb7a3-0be3-4de9-8cf7-b537d1833b2a,33c5ba1c-5366-43e7-a149-9c1bdef25d3f,11f6c0c5-148b-405f-8358-425c306a0496,bbddfcd6-a63f-4986-9401-28e40de22fe4,12d8e98b-c3e7-44b0-81b3-d372ccc3c7c4,cb0f4ea6-9d40-45e7-8c8b-7578afc2ddf6,30ede968-969d-4b9f-8496-c5a32e287036,b1c52a0c-b890-4335-8ba3-60a4e61775b9');
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-25 20:15:37
