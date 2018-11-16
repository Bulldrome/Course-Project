'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const employee = require('./employeeModule.js');

var app = express();

app.use(express.static('./public'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/id/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var x = employee.lookupById(id);

  if (req.accepts('text/html')) {

    res.render('employee', {
      id: id,
      data: x
    });

  } else if (req.accepts('application/json')) {

    res.json(x);

  } else if (req.accepts('application/xml')) {

    var data = '<?xml version="1.0"?>\n';

    data += '<employee id="' + x['id'] + '">\n';
    data += '  <firstName>' + x['firstName'] + '</firstName>\n';
    data += '  <lastName>' + x['lastName'] + '</lastName>\n';
    data += '</employee>\n';

    res.send(data);

  } else {

    res.send(400);

  }
});

app.get('/lastName/:name', function (req, res) {
  var lastName = req.params.name;
  var xs = employee.lookupByLastName(lastName);

  if (req.accepts('text/html')) {

    res.render('employeeList', {
      lastName: lastName,
      data: xs
    });

  } else if (req.accepts('application/json')) {

    res.json(xs);

  } else if (req.accepts('application/xml')) {

    var data = '<?xml version="1.0"?>\n';

    data += '<employees>\n';
    for (var i = 0; i < xs.length; ++i) {
      var x = xs[i];
      data += '  <employee id="' + x['id'] + '">\n';
      data += '    <firstName>' + x['firstName'] + '</firstName>\n';
      data += '    <lastName>' + x['lastName'] + '</lastName>\n';
      data += '  </employee>\n';
    }
    data += '</employees>\n';

    res.send(data);

  } else {

    res.send(400);

  }
});

app.get('/addEmployee', function (req, res) {
  res.render('newEmployee');
});

app.post('/addEmployee', function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  employee.addEmployee(firstName, lastName);

  res.redirect('lastName/' + lastName);
});

var server = app.listen(3000, function () {
  console.log('Server listening at port 3000');
});
