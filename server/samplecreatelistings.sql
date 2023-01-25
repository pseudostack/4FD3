CREATE DATABASE IF NOT EXISTS Gear;

USE Gear;

DROP TABLE IF EXISTS Listing;

CREATE TABLE Listing
(
    listingID VARCHAR(400),
    Seller VARCHAR(400),
    Year VARCHAR(400),
    Make VARCHAR(400),
    Model VARCHAR(400),
    Body VARCHAR(400),
    startBid VARCHAR(400),
     floorBid VARCHAR(400),
    currentBid VARCHAR(400),
    auctionStart TIMESTAMP,
	auctionEnd TIMESTAMP
);

INSERT INTO Listing (listingID, Seller, Year, Make, Model, Body, startBid, floorBid, currentBid, auctionStart, auctionEnd)
VALUES
    ("001", "Brian445", "2018", "Honda", "Accord", "Sedan","0","500","1000","2023-01-20 16:29:00","2023-02-25 16:29:00"),
    ("002", "Colin29", "2020", "Subaru", "WRX", "Sedan","0","500","1000","2023-01-20 16:29:00","2023-02-25 16:29:00" ),
    ("003", "James489", "2016", "Toyota", "RAV4", "SUV","0","500","1000","2023-01-20 16:29:00","2023-02-25 16:29:00"),
    ("004", "Thunder48", "2019", "Jeep", "Wrangler", "SUV","0","500","1000","2023-01-20 16:29:00","2023-02-25 16:29:00"),
    ("005", "Thomas78", "2020", "Ford", "F-150", "Truck","0","500","1000","2023-01-20 16:29:00","2023-02-25 16:29:00");