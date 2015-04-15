
var mongoose = require('mongoose');


// these todos could be defined inline in the todoCollectionSchema
// but it is easier to read this way

var TodoSchema = new mongoose.Schema({
    status: {type: String},
    title: {type: String, required: '{PATH} is required'},
    notes: {type: String},
    dueDateTime: {type: Date}
});

var TodoCollectionSchema = new mongoose.Schema({
  ownerPersonId: {type: Number, required: '{PATH} is required'},
  todos: [TodoSchema]
});


// //  _id: 1,
//   status: null,
//   title: 'Test todo #1',
//   notes: 'Testing first todo item',
//   dueDateTime: tomorrow,
//   ownerPersonId: 666}


module.exports = mongoose.model('Todo', TodoCollectionSchema);
