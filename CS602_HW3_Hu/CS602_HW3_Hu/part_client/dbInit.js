'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbUrl = 'mongodb://127.0.0.1:27017/cs602db';

var db = mongoose.createConnection(dbUrl);

db.on('error', function (err) {
  if (err) throw err;
});

db.once('open', function () {
  console.log('mongodb connected');
});

var EmployeeDb = require('./employeeDb.js');

var Employee = EmployeeDb.getModel(db);

var employee;

// create the 1st employee
employee = new Employee({
  firstName: 'John',
  lastName: 'Smith'
}, true);

employee.save(function (err, employee) {
  if (err) {
    db.close();
    throw err;
  }
  console.log('Employee: (' + employee.firstName + ' ' + employee.lastName + ') created');
});

// create the 2nd employee
employee = new Employee({
  firstName: 'Jane',
  lastName: 'Smith'
}, true);

employee.save(function (err, employee) {
  if (err) {
    db.close();
    throw err;
  }
  console.log('Employee: (' + employee.firstName + ' ' + employee.lastName + ') created');
});

// create the 3rd employee
employee = new Employee({
  firstName: 'John',
  lastName: 'Doe'
}, true);

employee.save(function (err, employee) {
  if (err) {
    db.close();
    throw err;
  }
  console.log('Employee: (' + employee.firstName + ' ' + employee.lastName + ') created');
});

db.close();