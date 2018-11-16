'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require("morgan");

const routes = require('./routes/index.js');

var app = express();

// plug in logger
app.use(morgan('dev'));

// serve static content
app.use(express.static('./public'));

// set view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: 'handlebars',
  helpers: {
    cnt: function (x) {
      return x + 1;
    }
  }
}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// add all routes
app.use('/', routes);

// launch server
var server = app.listen(3000, function () {
  console.log('Server listening at port 3000');
});