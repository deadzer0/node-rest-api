var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating new Schema
var PeopleSchema = new Schema({
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },
   age: {
      type: Number,
      min: 10,
      max: 99
   },
   created: {
      type: Date,
      default: Date.now
   },
});

//create model and export to app.js
module.exports = mongoose.model('People', PeopleSchema);