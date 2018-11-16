'use strict';

const net = require('net');
const readline = require('readline');
const colors = require('colors');

var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Enter Command: ');

var client = net.connect(3000, function () {

  console.log('Connected to server');

  rl.prompt();

  rl.on('line', function (line) {
    line = line.trim();
    client.write(line);
  });

  rl.on('close', function () {
    process.exit(0);
  });
  
});

client.on('data', function (data) {

  console.log('...Received'.blue);

  data = data.toString();

  console.log(data.blue);

  if (data == 'Invalid request') {
    client.destroy();
    console.log('Client disconnected...');
    rl.close();
  } else {
    rl.prompt();
  }

});

client.on('end', function () {
  console.log('Client disconnected...');
});
