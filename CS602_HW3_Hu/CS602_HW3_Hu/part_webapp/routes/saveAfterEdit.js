'use strict';

const ObjectId = require('mongoose').Types.ObjectId;

const db = require('../dbConn');
const Employee = db.getModel();

// route: edit employee
function saveEmployee(req, res, next) {

  var id = ObjectId(req.params.id);

  Employee.findById(id, function (err, employee) {

    if (err) {
      console.log('Error: ', err);
      return res.render('500');
    }

    if (!employee) {
      return res.render('404');
    }

    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;

    employee.save(function (err) {

      if (err) {
        console.log('Error: ', err);
        return res.render('500');
      }

      res.redirect('/employees');

    });

  });

}

module.exports = saveEmployee;