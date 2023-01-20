CREATE DATABASE Gear;

USE Gear;

CREATE TABLE Listing
(
    Seller VARCHAR(400),
    Year VARCHAR(400),
    Make VARCHAR(400),
    Model VARCHAR(400),
    Body VARCHAR(400)
);

INSERT INTO Listing (Seller, Year, Make, Model, Body)
VALUES
    ("Brian445", "2018", "Honda", "Accord", "Sedan"),
    ("Colin29", "2020", "Subaru", "WRX", "Sedan" ),
    ("James489", "2016", "Toyota", "RAV4", "SUV"),
    ("Thunder48", "2019", "Jeep", "Wrangler", "SUV"),
    ("Thomas78", "2020", "Ford", "F-150", "Truck");