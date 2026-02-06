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
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
);