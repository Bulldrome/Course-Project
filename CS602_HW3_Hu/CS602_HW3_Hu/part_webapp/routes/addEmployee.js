'use strict';

// route: show add-employee page
function addEmployee(req, res, next) {
  res.render(
    'addEmployeeView', {
      title: 'Add an Employee'
    }
  );
}

module.exports = addEmployee;