/*
    SETUP
*/
require('dotenv').config();

const express = require('express');
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
app.get('/', (req, res) => res.render('index'));


app.get('/developers', (req, res) => res.render('developers/index'));
app.get('/developers/browse', async function (req, res) {
  try {
    const query1 = 'SELECT Developers.developerName, GROUP_CONCAT( DISTINCT Games.title SEPARATOR ", ") AS titles, ROUND(AVG(Reviews.rating), 1) AS avgR FROM Developers LEFT JOIN Games ON Developers.developerID = Games.developerID LEFT JOIN Reviews ON Games.gameID = Reviews.gameID GROUP BY Developers.developerID;';
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
app.get('/developers/add', (req, res) => {
   res.render('developers/add', {
      title: 'Add Developers'
    });
})
app.post('/developers/add', async function (req, res) {
  const developerName = req.body.developerName;
  const query = 'INSERT INTO Developers (developerName) VALUES (?)';

  try {
    await db.query(query, [developerName]);
    res.redirect('/developers/browse');

  } catch (error) {
    console.error(error);
    res.status(500).send('Database Error');
  }
});
app.get('/developers/update', (req, res) => res.render('developers/update'));

app.get('/developers/delete', async function (req, res) {
  try {
  const getNames = 'SELECT Developers.developerID, Developers.developerName FROM Developers;'
  const [developerNames] = await db.query(getNames)


  res.render('developers/delete', {
    developers: developerNames
  });
  } catch (error) {
    console.error(error);
    res.status(500).send('Database Error');
  }
});
app.post('/developers/delete', async function (req, res) {
  const developerName = req.body.developerName;
  const query = 'DELETE FROM Developers WHERE developerID=?';

  try {
    await db.query(query, [developerName]);
    res.redirect('/developers/browse');
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Error");
  }
});

app.get('/games', (req, res) => res.render('games/index'));
app.get('/games/browse', async function (req, res) {
  try {
    const query1 = 'SELECT Games.title, Games.price, ROUND(AVG(Reviews.rating),2) AS rating, Games.description, Developers.developerName FROM Games LEFT JOIN Reviews ON Games.gameID=Reviews.gameID LEFT JOIN Developers ON Games.developerID=Developers.developerID GROUP BY Games.title, Games.price, Games.description, Developers.developerName;';
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
app.get('/games/add', (req, res) => res.render('games/add', { title: 'Add Game', developers: [] }));
app.get('/games/update', (req, res) => res.render('games/update'));
app.get('/games/delete', (req, res) => res.render('games/delete'));

app.get('/users', (req, res) => res.render('users/index'));
app.get('/users/browse', async function (req, res) {
  try {
    const query1 = 'SELECT * FROM Users;';
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
app.get('/users/add', (req, res) => res.render('users/add', { title: 'Add User' }));
app.get('/users/update', (req, res) => res.render('users/update'));
app.get('/users/delete', (req, res) => res.render('users/delete'));

app.get('/purchases', (req, res) => res.render('purchases/index'));
app.get('/purchases/browse', async function (req, res) {
  try {
    const query1 = 'SELECT Users.username, Games.title, DATE_FORMAT(Purchases.purchaseDate, "%m/%d/%Y %h:%i %p") AS purchaseDate, Purchases.purchasePrice FROM Purchases LEFT JOIN Games ON Purchases.gameID = Games.gameID INNER JOIN Users ON Purchases.userID = Users.userID;';
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
app.get('/purchases/add', (req, res) => res.render('purchases/add', { title: 'Add Purchase', users: [], games: [] }));
app.get('/purchases/update', (req, res) => res.render('purchases/update'));
app.get('/purchases/delete', (req, res) => res.render('purchases/delete'));

app.get('/reviews', (req, res) => res.render('reviews/index'));
app.get('/reviews/browse', async function (req, res) {
  try {
    const query1 = 'SELECT Users.username, Games.title, Reviews.comment, Reviews.rating, Reviews.category, DATE_FORMAT(Reviews.reviewDate, "%b %d %Y") AS reviewDate FROM Reviews LEFT JOIN Users ON Users.userID = Reviews.userID LEFT JOIN Games ON Games.gameID = Reviews.gameID ORDER BY reviewDate ASC;';
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
app.get('/reviews/add', (req, res) => res.render('reviews/add', { title: 'Add Review', users: [], games: [] }));
app.get('/reviews/update', (req, res) => res.render('reviews/update'));
app.get('/reviews/delete', (req, res) => res.render('reviews/delete'));

app.post('/developers/add', (req, res) => res.redirect('/developers'));
app.post('/games/add', (req, res) => res.redirect('/games'));
app.post('/users/add', (req, res) => res.redirect('/users'));
app.post('/purchases/add', (req, res) => res.redirect('/purchases'));
app.post('/reviews/add', (req, res) => res.redirect('/reviews'));

/*
    LISTENER
*/
app.listen(PORT, () => {
  console.log('Server running on port %s', PORT);
});
