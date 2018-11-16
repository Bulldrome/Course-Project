'use strict';

const net = require('net');
const employee = require('./employeeModule');
const colors = require('colors');

var server = net.createServer(function(socket) {

  console.log('Client connection...'.red);

  socket.on('data', function(data) {

    data = data.toString();

    console.log(('...Received ' + data).blue);

    var items = data.split(' ');
    var res = '';
    
    if (items.length == 2 && items[0] == 'lookupByLastName') {
      res = JSON.stringify(employee.lookupByLastName(items[1]));
    } else if (items.length == 3 && items[0] == 'addEmployee') {
      res = JSON.stringify(employee.addEmployee(items[1], items[2]));
    } else if (items.length == 2 && items[0] == 'lookupById') {
      res = JSON.stringify(employee.lookupById(parseInt(items[1])));
    } else {
      res = 'Invalid request';
    }

    socket.write(res);
  });

  socket.on('end', function() {
    console.log('Client disconnected...'.red);
  });

});

server.listen(3000, function () {
  console.log('Listening for connections');
});
