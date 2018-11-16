'use strict';

const employee = require('./employeeModule');
const colors = require('colors');

console.log();

console.log('Lookup by last name (Smith)'.red);
console.log(employee.lookupByLastName('Smith'));
console.log();

console.log('Adding employee William Smith'.red);
employee.addEmployee('William', 'Smith');
console.log();

console.log('lookup by last name (Smith)'.red);
console.log(employee.lookupByLastName('Smith'));
console.log();

console.log('lookup by id (2)'.red);
var x = employee.lookupById(2);
console.log(x);
console.log();

console.log('Changing first name...'.red);
x['firstName'] = 'Mary';
console.log();

console.log('lookup by id (2)'.red);
console.log(employee.lookupById(2));
console.log();

console.log('lookup by last name (Smith)'.red);
console.log(employee.lookupByLastName('Smith'));
console.log();
