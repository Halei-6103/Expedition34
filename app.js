/*
    SETUP
*/

// Express
const express = require('express');  // We are using the express library for the web server
const app = express();               // We need to instantiate an express object to interact with the server in our code
const PORT = process.env.PORT || 56562;     // Set a port number

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users', async (req, res) => {
try {
    const query1 = 'SELECT * FROM Users; ';
    const [usersRow] = await db.query(query1);
} catch (error) {
    console.error('Error executing queries:', error);
    res.status(500).send(
        'An error occured while executing the database queries'
    );
  }
}
);

// Database 
const db = require('./db-connector');



app.listen(PORT, () => {
  console.log(`Server running on http://classwork.engr.oregonstate.edu:${PORT}`);
});