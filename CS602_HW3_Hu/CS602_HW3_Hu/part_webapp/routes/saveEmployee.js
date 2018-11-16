'use strict';

const db = require('../dbConn');
const Employee = db.getModel();

// route: add employee
function saveEmployee(req, res, next) {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  var employee = new Employee({
    firstName: firstName,
    lastName: lastName
  });

  employee.save(function (err) {

    if (err) {
      console.log('Error: ', err);
      return res.render('500');
    }

    res.redirect('/employees');

  });

}

module.exports = saveEmployee;