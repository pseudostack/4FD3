CREATE DATABASE  IF NOT EXISTS `gear` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gear`;
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
  `pics` varchar(400) DEFAULT NULL,
  `mainpic` varchar(45) DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `VIN` varchar(45) DEFAULT NULL,
    `color` varchar(45) DEFAULT NULL,
  `transmission` varchar(45) DEFAULT NULL,
  `odometer` varchar(45) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  `pictures` varchar(65535) DEFAULT NULL,
  PRIMARY KEY (`listingID`),
  KEY `userID_idx` (`userID`),
  KEY `listingUserId_idx` (`userID`),
  CONSTRAINT `listingUserId` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (1,'2018','Honda','Accord','Sedan','0','500','540000','2023-01-20 21:29:00','2023-04-01 20:29:00','001_front, 001_front_left, 001_front_right, 001_left, 001_rear, 001_rear_right','001_front_left',NULL,NULL,NULL,NULL),(2,'2020','Subaru','WRX','Sedan','0','500','1000','2023-01-20 21:29:00','2023-02-25 21:29:00','002_front, 002_front_left, 002_front_right, 002_right, 002_rear_left, 002_rear_right','002_front_left',NULL,NULL,NULL,NULL),(3,'2016','Toyota','RAV4','SUV','0','500','5000','2023-01-20 21:29:00','2023-02-25 21:29:00','003_front, 003_front_left, 003_left, 003_rear_right, 002_rear','003_front_left',NULL,NULL,NULL,NULL),(4,'2019','Jeep','Wrangler','SUV','0','500','1000','2023-01-20 21:29:00','2023-02-25 21:29:00',NULL,NULL,NULL,NULL,NULL,NULL),(5,'2020','Ford','F-150','Truck','0','500','1000','2023-01-20 21:29:00','2023-02-04 04:35:00',NULL,NULL,NULL,NULL,NULL,NULL),(6,'2014','Honda','CR-V','SUV','0','500','0','2023-01-20 21:29:00','2023-02-04 21:29:00',NULL,NULL,NULL,NULL,NULL,NULL),(7,'2019','GMC','Sierra','Tricl','0','0','0','2023-01-20 21:29:00','2023-02-04 05:00:00',NULL,NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2023-02-03 23:34:53