
var mongoose = require('mongoose');


// these todos could be defined inline in the UserEventsSchema
// but it is easier to read this way

var TodoSchema = new mongoose.Schema({
    userId: {
      type: Number,
      index: {unique: false},
      required: '{PATH} is required'
    },
    status: {
      type: String,
      enum: ['not-started', 'started', 'completed'],
      default: 'not-started'
    },
    title: {
      type: String,
      required: '{PATH} is required',
      min: 3,
      max: 50
    },
    notes: {
      type: String,
      max: 250
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
