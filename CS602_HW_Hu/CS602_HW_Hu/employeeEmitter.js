'use strict';

const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

class EmployeeEmitter extends EventEmitter {
  constructor(data) {
    super();
    this.data = data;
  }
}

EmployeeEmitter.prototype.lookupById = function (id) {
  this.emit('lookupById', id);
  return _.findWhere(this.data, {
    id: id
  });
}; 

EmployeeEmitter.prototype.lookupByLastName = function (lastName) {
  this.emit('lookupByLastName', lastName);
  return _.where(this.data, {
    lastName: lastName
  });
};

EmployeeEmitter.prototype.addEmployee = function (firstName, lastName) {
  this.emit('addEmployee', firstName, lastName);

  var ids = _.pluck(this.data, 'id');
  var id = _.max(ids) + 1;

  this.data.push({
    id: id,
    firstName: firstName,
    lastName: lastName,
  });
};

module.exports = {
  EmployeeEmitter: EmployeeEmitter,
};
