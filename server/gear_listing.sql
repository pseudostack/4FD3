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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (1,'2013','AUDI','Q5','Sport Utility Vehicle (SUV)/Multi-Purpose Vehicle (MPV)','0','0','900','2023-08-19 01:11:00','2023-08-19 01:11:00',NULL,'WA1CFCFP0DA091671','Black','Automatic','277000','test','267069cf-ded1-4187-b75b-793cdd259ad6,1125d3ac-87bc-4cb2-9261-29af5c6970fe,a8227f75-d12c-4499-b116-60c283b62a3b,ed22cd55-eac9-4283-ae0d-a891da7e3c30,096c4edf-9b3a-4d54-b32f-d668d6151c84,f593b9fe-e1ba-4c89-a87b-e0ca76bc0198,ea114184-e67b-4a2f-9b2c-3c685d487838,1a96b8bd-baf1-4e88-beda-0fac8fec43e3,1c7a6dba-acb2-47a9-a476-d2991e3fb797,3d14b052-745c-4df5-8572-a9d4e4404bd7,99ccfd2d-e6fc-478a-a7e3-3a5f6b4891ed,76bb4aea-11f5-4122-bf6c-5bace583b4ca,3687a922-9e71-4560-971c-dfde34043631,fa89fced-f598-4b8f-8335-7b8a72191421,8a0555bf-797e-4a7d-8b2e-8127751a3744,ff1a740a-3835-42ce-8ae0-fb07bab44e22');
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

-- Dump completed on 2023-02-24 14:45:22
