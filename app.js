/*
    SETUP
*/
require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 35521;

const db = require('./db-connector');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

/*
    ROUTES
*/
app.get('/', (req, res) => res.render('index', { reset: req.query.reset }));

app.post('/reset', async (req, res) => {
  try {
    const query = 'CALL sp_reset_schema();';
    await db.query(query);

    res.redirect(req.get('Referer') || '/'); 
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).send("Database reset failed.");
  }
});

app.get('/developers', (req, res) => res.render('developers/index'));
app.get('/developers/browse', async function (req, res) {
  try {
    const query1 = 'CALL sp_browse_developers()';
    const [rows] = await db.query(query1);

    res.render('developers/browse', {
      title: 'Browse Developers',
      developers: rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});
app.post('/developers/browse', async function (req, res) {
  try {
     const getDeveloperID = req.body.developerID;

     const query = 'CALL sp_delete_developer(?)';

     await db.query(query, [getDeveloperID]);
     res.redirect('/developers/browse');

  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});
app.get('/developers/add', (req, res) => {
   res.render('developers/add', {
      title: 'Add Developers'
    });
})
app.post('/developers/add', async function (req, res) {
  const developerName = req.body.developerName;
  const query = 'CALL sp_insert_developer(?);';

  try {
    await db.query(query, [developerName]);
    res.redirect('/developers/browse');

  } catch (error) {
    console.error(error);
    res.status(500).send('Database Error');
  }
});
app.get('/developers/update', async function (req, res){
  try {
    const getDevelopers = 'SELECT * FROM Developers;';
    const [developers] = await db.query(getDevelopers);
    const selectedDeveloperID = req.query.developerID || null;

    res.render('developers/update', {
      developers: developers,
      selectedDeveloperID: selectedDeveloperID
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Database Error');
  }
})

app.post ('/developers/update', async function (req, res) {
  try {
    const getDevID = req.body.chooseDev;
    const getNewDevName = req.body.developerChange;

    const query = 'CALL sp_update_developer(?,?)'

    await db.query(query, [getNewDevName, getDevID]);

    res.redirect('/developers/browse');
  } catch (error) {
    console.error(error);
    res.status(500).send('Database Error');
  }
});

app.get('/games', (req, res) => res.render('games/index'));
app.get('/games/browse', async function (req, res) {
  try {
    const query1 = 'CALL sp_browse_games();';
    const [games] = await db.query(query1);

    res.render('games/browse', {
      title: 'Browse Games',
      games: games
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});
app.post('/games/browse', async function (req, res) {
  try {
     const getGameID = req.body.gameID;

     const query = 'CALL sp_delete_game(?);';

     await db.query(query, [getGameID]);
     res.redirect('/games/browse');
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.get('/games/add', async function (req, res) {
  try {

    const getDevelopers = 'Select * FROM Developers;'
    const [developers] = await db.query(getDevelopers);

    res.render('games/add', {
      title: "Add Games",
      developers: developers
    });
  } catch(error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.post('/games/add', async function (req, res) {
  const developerID = req.body.developers; 
  const price = req.body.gamePrice;
  const title = req.body.gameTitle;
  const description = req.body.gameDescription;

  try {
    const query = 'CALL sp_insert_game(?, ?, ?, ?)';
    await db.query(query, [developerID, title, price, description]);
    return res.redirect('/games/browse');

  } catch (error) {
    console.error(error);
    return res.status(500).send("Database Error");
  }
});


app.get('/games/update', async function (req, res) {
  try {
    const getGame = 'SELECT gameID, title FROM Games;';
    const [games] = await db.query(getGame);
    const selectedGameID = req.query.gameID || null;
    res.render('games/update', {
      games: games,
      selectedGameID: selectedGameID
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.post('/games/update', async function (req,res) {
  const getGameID = req.body.chooseGame;
  const gameTitle = req.body.titleChange;
  const newPrice = req.body.newPrice;
  const newDesc = req.body.newDescription;

  try {
    const query = 'CALL sp_update_game(?, ?, ?, ?);'
    await db.query(query, [gameTitle, newPrice, newDesc, getGameID]);
    res.redirect('/games/browse')
  }catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.get('/users', (req, res) => res.render('users/index'));
app.get('/users/browse', async function (req, res) {
  try {
    const query1 = 'CALL sp_browse_users();';
    const [users] = await db.query(query1);

    res.render('users/browse', {
      title: 'Browse Users',
      users: users
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.post('/users/browse', async function (req, res) {
  try {
     const getUserID = req.body.userID;

     const query = 'CALL sp_delete_user(?);';

     await db.query(query, [getUserID]);
     res.redirect('/users/browse');
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.get('/users/add', (req, res) => res.render('users/add', { title: 'Add User' }));

app.post('/users/add', async function (req, res) {
    try {
    const username = req.body.username;
    const accountType = req.body.accountType;

    const query1 = 'CALL sp_insert_user(?, ?)'
    await db.query(query1, [username, accountType]);

    return res.redirect('/users/browse');
  } catch(error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.get('/users/update', async function (req, res) {
  try {
    const getUsers = 'SELECT userID, username FROM Users;';
    const [users] = await db.query(getUsers);
    const selectedUserID = req.query.userID || null;
    res.render('users/update', {
      users: users,
      selectedUserID: selectedUserID
    });
  } catch(error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.post('/users/update', async function (req, res) {
  const userID = req.body.chooseUser;
  const usernameChange = req.body.usernameChange;
  const accountType = req.body.accountType;

  try {
    const query = 'CALL sp_update_user(?,?,?);';
    await db.query(query, [usernameChange, accountType, userID]);
    res.redirect('/users/browse');
  } catch(error){
    console.error(error);
    res.status(500).send("Database Error");
  }
})
app.get('/users/delete', async function (req, res) {

  const query = 'SELECT userID, username, accountType FROM Users'
  const [getUsers] = await db.query(query);

  return res.render('users/delete', {
    users: getUsers
  });
});

app.post('/users/delete', async function (req, res) {

  try{

    const userID = req.body.deleteUser;
    const query = 'CALL sp_delete_user(?);'

    await db.query(query, [userID]);

  res.redirect('/users/browse');
  } catch(error){
    console.error(error);
    res.status(500).send("Database Error");
  }
});
app.get('/purchases', (req, res) => res.render('purchases/index'));
app.get('/purchases/browse', async function (req, res) {
  try {
    const query1 = 'CALL sp_browse_purchases();';
    const [purchases] = await db.query(query1);

    res.render('purchases/browse', {
      title: 'Browse Purchases',
      purchases: purchases
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.post('/purchases/browse', async function (req, res) {
  try {
     const getPurchaseID = req.body.purchaseID;

     const query = 'CALL sp_delete_purchase(?);';

     await db.query(query, [getPurchaseID]);
     res.redirect('/purchases/browse');
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.get('/purchases/add', async function (req, res) {
  try {

    const getUsers = 'SELECT userID, username FROM Users;';
    const [users] = await db.query(getUsers);

    const getGames = 'SELECT gameID, title, price FROM Games;';
    const [games] = await db.query(getGames);

    res.render('purchases/add', {
      title: "Add a Purchase",
      users: users,
      games: games
    });
  } catch(error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.post('/purchases/add', async function (req,res) {
  const userID = req.body.userID;
  const gameID = req.body.gameID;
  const purchaseDate = req.body.purchaseDate;
  const purchasePrice = req.body.purchasePrice;

  try {
    const query =  'CALL sp_insert_purchase(?, ?, ?, ?);';

    await db.query(query, [userID, gameID, purchaseDate, purchasePrice]);
    res.redirect('/purchases/browse')
  } catch(error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.get('/purchases/update', async function (req, res) {
  try {
    const getPurchases = 'SELECT purchaseID FROM Purchases';
    const getUsers = 'SELECT userID, username FROM Users;';
    const getGames = 'SELECT gameID, title FROM Games;';

    const [purchases] = await db.query(getPurchases);
    const [users] = await db.query(getUsers);
    const [games] = await db.query(getGames);
    const selectedPurchaseID = req.query.purchaseID || null;

    res.render("purchases/update", {
      purchases: purchases,
      users: users,
      games: games,
      selectedPurchaseID: selectedPurchaseID
    })

  } catch(error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
})

app.post('/purchases/update', async function (req, res) {
  const getPurchaseID = req.body.choosePurchase;
  const getUserID = req.body.newUserID;
  const getGameID = req.body.newGameID;

  const getPrice = req.body.newPrice;
  const newPurchaseDate = req.body.newDate;

  try {
    const query = 'CALL sp_update_purchase(?, ?, ?, ?, ?);';

    await db.query(query, [getUserID, getGameID, getPrice, newPurchaseDate, getPurchaseID]);
    res.redirect('/purchases/browse');
  } catch (error){
    console.error(error);
    res.status(500).send("Database Error");
  }
});
app.get('/reviews', (req, res) => res.render('reviews/index'));
app.get('/reviews/browse', async function (req, res) {
  try {
    const query1 = 'CALL sp_browse_reviews();';
    const [reviews] = await db.query(query1);

    res.render('reviews/browse', {
      title: 'Browse Reviews',
      reviews: reviews
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.post('/reviews/browse', async function (req, res) {
  try {
     const getReviewID = req.body.reviewID;

     const query = 'CALL sp_delete_review(?);';

     await db.query(query, [getReviewID]);
     res.redirect('/reviews/browse');
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.get('/reviews/add', async function (req, res) {
  try {
    const getUser = 'SELECT userID, username FROM Users;'
    const getGame = 'SELECT gameID, title FROM Games;'

    const [users] = await db.query(getUser);
    const [games] = await db.query(getGame);

    res.render("reviews/add", {
      title: "Post a Review",
      users: users,
      games: games
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.post('/reviews/add', async function (req, res) {
    const userID = req.body.userID;
    const gameID = req.body.gameID;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const category = req.body.category;
    
    try {
      const query = 'CALL sp_insert_review(?, ?, ?, ?);';

      await db.query(query, [userID, gameID, rating, comment, category]);
      res.redirect('/reviews/browse');
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.get('/reviews/update', async function (req, res) {
  try {
    const getInfo = 'SELECT reviewID, Users.username, Games.title, DATE_FORMAT(Reviews.reviewDate, "%b %d %Y") AS reviewDate, rating FROM Reviews LEFT JOIN Users ON Reviews.userID = Users.userID LEFT JOIN Games ON Reviews.gameID = Games.gameID  ORDER BY Reviews.reviewID DESC;';
    const [info] = await db.query(getInfo);
    const selectedReviewID = req.query.reviewID || null;

    res.render("reviews/update", {
      reviews: info,
      selectedReviewID: selectedReviewID
    });
  } catch (error){
    console.error(error);
    res.status(500).send("Database Error");
  }
});
app.post('/reviews/update', async function (req, res) {
  const reviewID = req.body.chooseReview;
  const newComment = req.body.newComment;
  const newRating = req.body.newRating;
  const newCategory = req.body.newCategory;

  try {
    const query = 'CALL sp_update_review(?,?,?,?)'
    await db.query(query, [newComment, newRating, newCategory, reviewID]);

    res.redirect('/reviews/browse');
  }catch (error){
    console.error(error);
    res.status(500).send("Database Error");
  }
});










/*
    LISTENER
*/
app.listen(PORT, () => {
  console.log('Server running on port %s', PORT);
});
