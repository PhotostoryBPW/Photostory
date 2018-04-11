const express = require('express');
const parser = require('body-parser');
const request = require('request');
const router = require('./router');
const path = require('path');
const app = express();
const DB = require('./DB');
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.listen(3000, function() {
  console.log(`Listening on port 3000`);
});