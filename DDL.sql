CREATE TABLE Developers (
    developerID int AUTO_INCREMENT NOT NULL,
    developerName varchar(100) NOT NULL,

    PRIMARY KEY (developerID),
    UNIQUE (developerName)
);

CREATE TABLE Users (
    userID int AUTO_INCREMENT NOT NULL,
    username varchar(100) NOT NULL,
    accountType varchar(15) NOT NULL,

    PRIMARY KEY (userID),
    UNIQUE (username)
);

CREATE TABLE Games (
    gameID int AUTO_INCREMENT NOT NULL,
    developerID int NOT NULL,
    price decimal(8,2) NOT NULL,
    title varchar(150) NOT NULL,
    description varchar(1000) NOT NULL,

    PRIMARY KEY (gameID),
    FOREIGN KEY (developerID) REFERENCES Developers(developerID),
    UNIQUE (title)
);

CREATE TABLE Purchases (
    purchaseID int AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    gameID int NOT NULL,
    purchaseDate datetime NOT NULL,
    purchasePrice decimal(8,2) NOT NULL,

    PRIMARY KEY (purchaseID),
    UNIQUE(userID, gameID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
);

CREATE TABLE Reviews (
    reviewID int AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    gameID int NOT NULL,
    rating int NOT NULL,
    comment varchar(300) NULL,
    category varchar(20) NULL,

    PRIMARY KEY (reviewID),
    UNIQUE(userID, gameID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (gameID) REFERENCES Games(gameID),
    CHECK (rating >= 1 AND rating <= 5) -- rating must be between 1 and 5
);


-- ----------------------------
-- Sample Data
-- ----------------------------

INSERT INTO Users (username, accountType) VALUES
('jade', 'customer'),
('ian',  'customer'),
('Jack', 'customer'),
('guest_user', 'customer'), -- zero purchases & zero reviews
('alex', 'customer');       -- purchases but no reviews

INSERT INTO Developers (developerName) VALUES
('PNW Game Studios'),
('Waterfall Interactive'),
('Cascade Pixel Works');

-- Used AI to generate game names and descriptions
INSERT INTO Games (developerID, title, price, description) VALUES
(1, 'Star Farm Tactics', 19.99, 'Farming + combat hybrid'),
(1, 'Neon Runner',       9.99,  'Fast-paced arcade runner'),
(2, 'Cozy Caves',        14.99, 'Relaxing exploration game'),
(3, 'Dungeon Drift',     24.99, 'Roguelike dungeon crawler');

-- ----------------------------
-- Purchases (M:N Users <-> Games)
-- ----------------------------
INSERT INTO Purchases (userID, gameID, purchaseDate, purchasePrice) VALUES
(1, 1, '2026-01-10 10:15:00', 19.99),  -- jade buys Star Farm
(1, 2, '2026-01-11 14:30:00',  9.99),  -- jade buys Neon Runner
(1, 4, '2026-01-18 19:05:00', 24.99),  -- jade buys Dungeon Drift

(2, 1, '2026-01-12 09:00:00', 19.99),  -- ian buys Star Farm
(2, 3, '2026-01-20 12:45:00', 14.99),  -- ian buys Cozy Caves

(3, 3, '2026-01-15 16:10:00', 14.99),  -- Jack buys Cozy Caves
(3, 1, '2026-01-22 08:20:00', 19.99),  -- Jack buys Star Farm

(5, 2, '2026-01-25 21:00:00',  9.99);  -- alex buys Neon Runner (no reviews)

-- ----------------------------
-- Reviews (1:M Users -> Reviews, 1:M Games -> Reviews)
-- ----------------------------
INSERT INTO Reviews (userID, gameID, rating, comment, category) VALUES
(1, 1, 5, 'Loved the combat system!', 'gameplay'),
(1, 2, 3, NULL, 'performance'),
(1, 4, 4, 'Challenging but fun.', 'difficulty'),

(2, 1, 4, 'Great, but needs balancing.', 'balance'),
(2, 3, 5, 'Super relaxing experience.', 'atmosphere'),

(3, 3, 2, 'Too repetitive for me.', 'gameplay'),
(3, 1, 4, 'Solid mechanics overall.', 'mechanics');
