'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// Define the Employee Schema
var employeeSchema = new Schema({
  firstName: String,
  lastName: String
});

module.exports = {
  getModel: function getModel(conn) {
    return conn.model('Employee', employeeSchema);
  }
};

