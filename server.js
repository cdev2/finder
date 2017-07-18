const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const port = 8080;
const db = 'mongodb://localhost/search-app';

const users = require('./routes/user');
const website = require('./routes/website');

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'super duper secret',
  saveUninitialized: true,
  resave: true
}));

require('./config/passport')();

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/website', website);

app.listen(port, function() {
  console.log('app listening on port ' + port);
});