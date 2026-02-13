-- Variables are denoted using @varName

/* ----------------------------
   DEVELOPERS
---------------------------- */

-- Browse Developers
SELECT developerID, developerName
FROM Developers;

-- Add Developer
INSERT INTO Developers (developerName)
VALUES (@developerNameInput);

-- Update Developer
UPDATE Developers
SET developerName = @developerNameInput
WHERE developerID = @developerIDInput;

-- Delete Developer
DELETE FROM Developers
WHERE developerID = @developerIDInput;


/* ----------------------------
   USERS
---------------------------- */

-- Browse Users
SELECT userID, username, accountType
FROM Users;

-- Add User
INSERT INTO Users (username, accountType)
VALUES (@usernameInput, @accountTypeInput);

-- Update User
UPDATE Users
SET username = @usernameInput,
    accountType = @accountTypeInput
WHERE userID = @userIDInput;

-- Delete User
DELETE FROM Users
WHERE userID = @userIDInput;


/* ----------------------------
   GAMES
---------------------------- */

-- Browse Games (with developer name)
SELECT g.gameID, g.developerID, d.developerName, g.price, g.title, g.description
FROM Games g
JOIN Developers d ON g.developerID = d.developerID;

-- Add Game
INSERT INTO Games (developerID, price, title, description)
VALUES (@developerIDInput, @priceInput, @titleInput, @descriptionInput);

-- Update Game
UPDATE Games
SET developerID = @developerIDInput,
    price = @priceInput,
    title = @titleInput,
    description = @descriptionInput
WHERE gameID = @gameIDInput;

-- Delete Game
DELETE FROM Games
WHERE gameID = @gameIDInput;


/* ----------------------------
   PURCHASES
---------------------------- */

-- Browse Purchases (with usernames + game titles)
SELECT p.purchaseID, p.userID, u.username, p.gameID, g.title,
       p.purchaseDate, p.purchasePrice
FROM Purchases p
JOIN Users u ON p.userID = u.userID
JOIN Games g ON p.gameID = g.gameID;

-- Add Purchase
INSERT INTO Purchases (userID, gameID, purchaseDate, purchasePrice)
VALUES (@userIDInput, @gameIDInput, @purchaseDateInput, @purchasePriceInput);

-- Update Purchase
UPDATE Purchases
SET userID = @userIDInput,
    gameID = @gameIDInput,
    purchaseDate = @purchaseDateInput,
    purchasePrice = @purchasePriceInput
WHERE purchaseID = @purchaseIDInput;

-- Delete Purchase
DELETE FROM Purchases
WHERE purchaseID = @purchaseIDInput;


/* ----------------------------
   REVIEWS
---------------------------- */

-- Browse Reviews (with usernames + game titles)
SELECT r.reviewID, r.userID, u.username, r.gameID, g.title,
       r.rating, r.comment, r.category
FROM Reviews r
JOIN Users u ON r.userID = u.userID
JOIN Games g ON r.gameID = g.gameID;

-- Add Review
INSERT INTO Reviews (userID, gameID, rating, comment, category)
VALUES (@userIDInput, @gameIDInput, @ratingInput, @commentInput, @categoryInput);

-- Update Review
UPDATE Reviews
SET rating = @ratingInput,
    comment = @commentInput,
    category = @categoryInput
WHERE reviewID = @reviewIDInput;

-- Delete Review
DELETE FROM Reviews
WHERE reviewID = @reviewIDInput;