/*
    SETUP
*/
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 35571;

const db = require('./db-connector');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

/*
    ROUTES
*/
app.get('/', (req, res) => res.render('index'));

app.get('/developers', (req, res) => res.render('developers/index'));
app.get('/developers/browse', (req, res) => res.render('developers/browse', { title: 'Browse Developers', developers: [] }));
app.get('/developers/add', (req, res) => res.render('developers/add', { title: 'Add Developer' }));
app.get('/developers/update', (req, res) => res.render('developers/update'));
app.get('/developers/delete', (req, res) => res.render('developers/delete'));

app.get('/games', (req, res) => res.render('games/index'));
app.get('/games/browse', (req, res) => res.render('games/browse', { title: 'Browse Games', games: [] }));
app.get('/games/add', (req, res) => res.render('games/add', { title: 'Add Game', developers: [] }));
app.get('/games/update', (req, res) => res.render('games/update'));
app.get('/games/delete', (req, res) => res.render('games/delete'));

app.get('/users', (req, res) => res.render('users/index'));
app.get('/users/browse', (req, res) => res.render('users/browse', { title: 'Browse Users', users: [] }));
app.get('/users/add', (req, res) => res.render('users/add', { title: 'Add User' }));
app.get('/users/update', (req, res) => res.render('users/update'));
app.get('/users/delete', (req, res) => res.render('users/delete'));

app.get('/purchases', (req, res) => res.render('purchases/index'));
app.get('/purchases/browse', (req, res) => res.render('purchases/browse', { title: 'Browse Purchases', purchases: [] }));
app.get('/purchases/add', (req, res) => res.render('purchases/add', { title: 'Add Purchase', users: [], games: [] }));
app.get('/purchases/update', (req, res) => res.render('purchases/update'));
app.get('/purchases/delete', (req, res) => res.render('purchases/delete'));

app.get('/reviews', (req, res) => res.render('reviews/index'));
app.get('/reviews/browse', (req, res) => res.render('reviews/browse', { title: 'Browse Reviews', reviews: [] }));
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
