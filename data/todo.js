
var mongoose = require('mongoose');


// these todos could be defined inline in the UserEventsSchema
// but it is easier to read this way

var TodoSchema = new mongoose.Schema({
    status: {
      type: String
    },
    title: {
      type: String,
      required: '{PATH} is required'
    },
    notes: {
      type: String
    },
    dueDateTime: {
      type: Date
    },
    createdDateTime: {
      type: Date,
      default: Date.now,
      required: '{PATH} is required'
    }
});


module.exports = mongoose.model('Todo', TodoSchema);
