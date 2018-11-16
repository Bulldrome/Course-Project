'use strict';

const express = require('express');
const router = express.Router();

// routes
const displayEmployees = require('./displayEmployees');
const addEmployee = require('./addEmployee');
const saveEmployee = require('./saveEmployee');
const editEmployee = require('./editEmployee');
const saveAfterEdit = require('./saveAfterEdit');
const deleteEmployee = require('./deleteEmployee');

// redirect default route
router.get('/', function (req, res, next) {
  res.redirect('/employees');
});

// list all employees
router.get('/employees', displayEmployees);

// show add-employee page
router.get('/employees/add', addEmployee);
// add employee
router.post('/employees/add', saveEmployee);

// show edit-employee page
router.get('/employees/edit/:id', editEmployee);
// edit employee
router.post('/employees/edit/:id', saveAfterEdit);

// delete employee
router.get('/employees/delete/:id', deleteEmployee);

// catch 404
router.use('*', function (req, res, next) {
  res.render('404');
});


module.exports = router;