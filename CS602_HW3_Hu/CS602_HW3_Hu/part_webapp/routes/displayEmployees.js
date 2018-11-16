'use strict';

const db = require('../dbConn');
const Employee = db.getModel();

// route: list all employees
function displayEmployee(req, res, next) {

  Employee.find({}, function (err, employees) {

    if (err) {
      console.log('Error: ', err);
      return res.render('500');
    }

    var data = employees.map(function (employee) {
      return {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName
      };
    });

    res.render('displayEmployeesView', {
      title: 'List of Employees',
      data: data
    });

  });

}

module.exports = displayEmployee;