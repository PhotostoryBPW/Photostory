const express = require('express');
const parser = require('body-parser');
var cookieParser = require('cookie-parser');
const request = require('request');
const router = require('./router');
const path = require('path');
const axios = require('axios');
const db = require('./DB');
const LocalStrategy = require('passport-local');
const app = express();

//Auth Packages
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var bcrypt = require('bcrypt');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

var options = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'photostory'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'keyboard cat',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);
    db.query('SELECT password FROM login WHERE username = ?', [username], 
      function(err, results, fields) {
        if (err) {done(err)}
          if (results.length  === 0) {
            return done(null, false);
          }
          const hash = results[0].password.toString();
          bcrypt.compare(password, hash, function(err, response) {
          if (response === true) {
            return done(null, username);
          } else {
            return done(null, false);
          }
        });
      }
    )
  }
));

app.listen(3000, function() {
  console.log(`Listening on port 3000`);
});