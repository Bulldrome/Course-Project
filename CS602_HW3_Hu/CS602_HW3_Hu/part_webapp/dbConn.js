'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbUrl = 'mongodb://127.0.0.1:27017/cs602db';

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  firstName: String,
  lastName: String
});

var conn = null;
var model = null;

function getModel() {

  if (!conn) {
    console.log('Creating connection and model...');
    conn = mongoose.createConnection(dbUrl);
    model = conn.model('Employee', employeeSchema);
  }

  return model;

}

module.exports = {
  getModel: getModel
};