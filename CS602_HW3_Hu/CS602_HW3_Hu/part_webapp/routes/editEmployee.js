'use strict';

const ObjectId = require('mongoose').Types.ObjectId;

const db = require('../dbConn');
const Employee = db.getModel();

// route: show edit-employee page
function editEmployee(req, res, next) {

  var id = ObjectId(req.params.id);

  Employee.findById(id, function (err, employee) {

    if (err) {
      console.log('Error: ', err);
      return res.render('500');
    }

    if (!employee) {
      return res.render('404');
    }

    res.render('editEmployeeView', {
      title: 'Edit an Employee',
      data: {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName
      }
    });

  });

}

module.exports = editEmployee;