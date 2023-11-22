require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const flash = require('connect-flash');
const connectDB = require('./server/config/db');

// Login System
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require("./server/models/Register.js")

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database  
const session = require('express-session');
connectDB();

// MongoDB Session
const MongoDBSession = require('connect-mongodb-session')(session);

// MongoDB Session
const store = new MongoDBSession({
    uri: process.env.MONGODB_URI,
    collection: 'Session'
  })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// RESTFUL API
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/routes'))

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, ()=> {
    console.log(`App listeing on port ${port}`)
});
