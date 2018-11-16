'use strict';

const colors = require('colors');
const employee = require('./employeeEmitter');

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

var emitter = new employee.EmployeeEmitter(data);

emitter.on('lookupById', function (id) {
  console.log(('Event lookupById raised! ' + id).blue);
});

emitter.on('lookupByLastName', function (lastName) {
  console.log(('Event lookupByLastName raised! ' + lastName).blue);
});

emitter.on('addEmployee', function (firstName, lastName) {
  console.log(('Event addEmployee raised! ' + firstName + ',' + lastName).blue);
});

console.log();

console.log('lookup by last name (Smith)'.red);
console.log(emitter.lookupByLastName('Smith'));
console.log();

console.log('Adding employee William Smith'.red);
emitter.addEmployee('William', 'Smith');
console.log();

console.log('lookup by last name (Smith)'.red);
console.log(emitter.lookupByLastName('Smith'));
console.log();

console.log('lookup by id (2)'.red);
console.log(emitter.lookupById(2));
console.log();
