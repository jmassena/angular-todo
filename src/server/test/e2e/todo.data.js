'use strict';

var dateUtils = require('../../common/dateUtils.js');

function get(){
  var todoData = {};

  todoData.userId1 = 666;
  todoData.userId2 = 777;

  todoData.today = new Date();
  todoData.tomorrow = dateUtils.addDays(todoData.today, 1);
  todoData.yesterday = dateUtils.addDays(todoData.today, -1);

  todoData.todoList = [
    {userId: todoData.userId1, title: 'test #1', notes: 'notes test #1', dueDateTime: todoData.tomorrow},
    {userId: todoData.userId1, title: 'test #2', notes: 'notes test #2', dueDateTime: todoData.tomorrow},

    {userId: todoData.userId2, title: 'test #1', notes: 'notes test #1', dueDateTime: todoData.tomorrow},
    {userId: todoData.userId2, title: 'test #2', notes: 'notes test #2', dueDateTime: todoData.tomorrow},
    {userId: todoData.userId2, title: 'test #3', notes: 'notes test #3', dueDateTime: todoData.tomorrow}
  ];

  todoData.getTodos = function(userId){
    return this.todoList.filter(function(val){
      return val.userId === userId;
    });
  };

  return todoData;
}

module.exports = get;
