
var mongoose = require('mongoose');
var Todo = require('./todo.js');

// these todos could be defined inline in the UserEventsSchema
// but it is easier to read this way

var UserEventsSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: '{PATH} is required'
  },
  todos: [Todo.schema]
});

UserEventsSchema.path('todos').validate(function(value) {
  'use strict';

  for(var i = 0; i < value.length; i++){
    if(value[i] == null){
      return false;
    }
  }
  return true;
},'todos elements cannot be null');

/*
  test data for database
  db.todos.insert({"ownerPersonId": "666", todos: [{"title": "Feed Cats", "notes": "and water"}]})

*/

// //  _id: 1,
//   status: null,
//   title: 'Test todo #1',
//   notes: 'Testing first todo item',
//   dueDateTime: tomorrow,
//   ownerPersonId: 666}

module.exports = mongoose.model('UserEvents', UserEventsSchema);
