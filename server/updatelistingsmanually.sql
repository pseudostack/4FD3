--updating listing pictures example
update gear.listing set pics = "001_front, 001_front_left, 001_front_right, 001_left, 001_rear, 001_rear_right" WHERE listingID = 001
update gear.listing set mainpic = "001_front_left" where listingID = 001

--settings auction end time example
update gear.listing set auctionEnd = "2023-01-29 19:30:00" where listingID = 003 