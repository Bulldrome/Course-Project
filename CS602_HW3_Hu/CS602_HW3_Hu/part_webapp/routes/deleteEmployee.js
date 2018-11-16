'use strict';

const ObjectId = require('mongoose').Types.ObjectId;

const db = require('../dbConn');
const Employee = db.getModel();

// route: delete employee
function deleteEmployee(req, res, next) {

  var id = ObjectId(req.params.id);

  Employee.findById(id, function (err, employee) {

    if (err) {
      console.log('Error: ', err);
      return res.render('500');
    }

    if (!employee) {
      return res.render('404');
    }

    employee.remove(function (err) {

      if (err) {
        console.log('Error: ', err);
        return res.render('500');
      }

      res.redirect('/employees');
    });

  });

}

module.exports = deleteEmployee;