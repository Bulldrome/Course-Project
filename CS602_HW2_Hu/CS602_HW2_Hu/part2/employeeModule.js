'use strict';

const _ = require('underscore');

var data = [{
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Doe',
  },
];

function lookupById(id) {
  return _.findWhere(data, {
    id: id
  });
}

function lookupByLastName(lastName) {
  return _.where(data, {
    lastName: lastName
  });
}

function addEmployee(firstName, lastName) {
  var ids = _.pluck(data, 'id');
  var id = _.max(ids) + 1;

  data.push({
    id: id,
    firstName: firstName,
    lastName: lastName,
  });
}

module.exports = {
  lookupById: lookupById,
  lookupByLastName: lookupByLastName,
  addEmployee: addEmployee,
};
