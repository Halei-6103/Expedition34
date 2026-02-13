/*
    SETUP
*/

// Express
const express = require('express');  // We are using the express library for the web server
const app = express();               // We need to instantiate an express object to interact with the server in our code
const PORT = process.env.PORT || 65571;     // Set a port number

app.set('view engine', 'ejs');
app.use(express.static(public));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users', async (req, res) => {
try {
    const query1 = await db.query('SELECT * FROM Users ')
}
})

// Database 
const db = require('./db-connector');



app.listen(PORT, () => {
  console.log(`Server running on http://classwork.engr.oregonstate.edu:${PORT}`);
});