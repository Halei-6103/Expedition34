DROP PROCEDURE IF EXISTS sp_delete_purchase;
DROP PROCEDURE IF EXISTS sp_delete_developer;
DROP PROCEDURE IF EXISTS sp_delete_user;
DROP PROCEDURE IF EXISTS sp_delete_review;
DROP PROCEDURE IF EXISTS sp_delete_game;
DROP PROCEDURE IF EXISTS sp_browse_developers;
DROP PROCEDURE IF EXISTS sp_browse_games;
DROP PROCEDURE IF EXISTS sp_browse_users;
DROP PROCEDURE IF EXISTS sp_browse_purchases;
DROP PROCEDURE IF EXISTS sp_browse_reviews;
DROP PROCEDURE IF EXISTS sp_insert_developer;
DROP PROCEDURE IF EXISTS sp_insert_game;
DROP PROCEDURE IF EXISTS sp_insert_user;
DROP PROCEDURE IF EXISTS sp_insert_purchase;
DROP PROCEDURE IF EXISTS sp_insert_review;
DROP PROCEDURE IF EXISTS sp_update_developer;
DROP PROCEDURE IF EXISTS sp_update_game;
DROP PROCEDURE IF EXISTS sp_update_user;
DROP PROCEDURE IF EXISTS sp_update_purchase;
DROP PROCEDURE IF EXISTS sp_update_review;
DELIMITER //

-- =========================================
--           DELETE PROCEDURES 
-- =========================================
CREATE PROCEDURE sp_delete_purchase(IN iPurchaseID INT)
BEGIN 
DELETE FROM Purchases WHERE purchaseID= iPurchaseID;
END //

CREATE PROCEDURE sp_delete_developer(IN iDevID INT)
BEGIN 
DELETE FROM Developers WHERE developerID = iDevID;
END //

CREATE PROCEDURE sp_delete_user(IN iUserID INT)
BEGIN
DELETE FROM Users WHERE userID = iUserID;
END //

CREATE PROCEDURE sp_delete_review(IN iReviewID INT)
BEGIN
DELETE FROM Reviews WHERE reviewID = iReviewID;
END //

CREATE PROCEDURE sp_delete_game(IN iGameID INT)
BEGIN
DELETE FROM Games WHERE gameID = iGameID;
END //

-- =========================================
--           SELECT PROCEDURES 
-- =========================================

CREATE PROCEDURE sp_browse_developers()
BEGIN 
SELECT Developers.developerID, Developers.developerName, GROUP_CONCAT( DISTINCT Games.title SEPARATOR ", ") AS titles, ROUND(AVG(Reviews.rating), 1) AS avgR 
    FROM Developers 
    LEFT JOIN Games ON Developers.developerID = Games.developerID 
    LEFT JOIN Reviews ON Games.gameID = Reviews.gameID 
    GROUP BY Developers.developerID;
END //

CREATE PROCEDURE sp_browse_games()
BEGIN 
SELECT Games.gameID, Games.title, Games.price, ROUND(AVG(Reviews.rating),2) AS rating, Games.description, Developers.developerName 
FROM Games 
    LEFT JOIN Reviews ON Games.gameID=Reviews.gameID 
    LEFT JOIN Developers ON Games.developerID=Developers.developerID 
    GROUP BY Games.gameID, Games.price, Games.description, Developers.developerName;
END //

CREATE PROCEDURE sp_browse_users()
BEGIN
SELECT * FROM Users;
END //


CREATE PROCEDURE sp_browse_purchases()
BEGIN 
SELECT Purchases.purchaseID, Users.username, Games.title, DATE_FORMAT(Purchases.purchaseDate, "%m/%d/%Y %h:%i %p") AS purchaseDate, Purchases.purchasePrice 
FROM Purchases 
    LEFT JOIN Games ON Purchases.gameID = Games.gameID 
    INNER JOIN Users ON Purchases.userID = Users.userID;
END //

CREATE PROCEDURE sp_browse_reviews()
BEGIN 
SELECT Users.username, Games.title, Reviews.comment, Reviews.rating, Reviews.category, DATE_FORMAT(Reviews.reviewDate, "%b %d %Y") AS reviewDate, Reviews.reviewID 
FROM Reviews 
    LEFT JOIN Users ON Users.userID = Reviews.userID 
    LEFT JOIN Games ON Games.gameID = Reviews.gameID 
ORDER BY Reviews.reviewID DESC;
END //


-- =========================================
--           INSERT PROCEDURES 
-- =========================================
CREATE PROCEDURE sp_insert_developer(IN iDeveloperName varchar(100))
BEGIN 
INSERT INTO Developers (developerName) VALUES (iDeveloperName);
END //

CREATE PROCEDURE sp_insert_game(IN iDevID INT, IN iTitle VARCHAR(100), IN iPrice DECIMAL(10,2), IN iDesc text)
BEGIN 
INSERT INTO Games (developerID, title, price, description) 
       VALUES (iDevID, iTitle, iPrice, iDesc);
END //

CREATE PROCEDURE sp_insert_user(IN iUsername varchar(100), IN iAccountType varchar(100))
BEGIN
INSERT INTO Users (username, accountType) VALUES (iUsername, iAccountType);
END //

CREATE PROCEDURE sp_insert_purchase(IN iUserID INT, IN iGameID INT, IN inPurchaseDate DATETIME, IN inPurchasePrice DECIMAL(10,2))
BEGIN 
INSERT INTO Purchases (userID, gameID, purchaseDate, purchasePrice) 
       VALUES (iUserID, iGameID, inPurchaseDate, inPurchasePrice);
END //

CREATE PROCEDURE sp_insert_review(IN iUserID INT, IN iGameID INT, IN iRating INT, IN iComment varchar(300), IN iCategory varchar(50))
BEGIN 
INSERT INTO Reviews (userID, gameID, rating, comment, category, reviewDate) 
       VALUES (iUserID, iGameID, iRating, iComment, iCategory, CURDATE() );
END //


-- =========================================
--           UPDATE PROCEDURES 
-- =========================================

CREATE PROCEDURE sp_update_developer(IN iDeveloperName varchar(100), IN iDeveloperID INT)
BEGIN 
UPDATE Developers SET developerName=iDeveloperName WHERE developerID=iDeveloperID;
END //

CREATE PROCEDURE sp_update_game(IN iTitle varchar(50), IN iPrice decimal(10,2), IN iDesc text, IN iGameID INT)
BEGIN
UPDATE Games SET title=iTitle, price=iPrice, description=iDesc WHERE gameID=iGameID;
END //

CREATE PROCEDURE sp_update_user(IN iUsername VARCHAR(100), IN iAccountType VARCHAR(100), IN iUserID INT)
BEGIN 
UPDATE Users SET Users.username=iUsername, Users.accountType=iAccountType WHERE userID=iUserID;
END //

CREATE PROCEDURE sp_update_purchase(IN iUserID INT, IN iGameID INT, IN iPurchasePrice DECIMAL(10,2), IN iPurchaseDate DATETIME, IN iPurchaseID INT)
BEGIN 
UPDATE Purchases SET userID=iUserID, gameID=iGameID, purchasePrice=iPurchasePrice, purchaseDate=iPurchaseDate WHERE purchaseID=iPurchaseID;
END //

CREATE PROCEDURE sp_update_review(IN iComment VARCHAR(300), IN iRating INT, IN iCategory VARCHAR(50), IN iReviewID INT)
BEGIN 
UPDATE Reviews SET comment=iComment, rating=iRating, category=iCategory WHERE reviewID=iReviewID;
END //


DELIMITER ;
