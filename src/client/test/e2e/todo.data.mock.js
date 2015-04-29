'use strict';

/*jshint maxlen:150 */
module.exports = function(){

  return{
    get:get
  };

  function addDays(date, days){

    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }


  function get(){
    var todoData = {};

    todoData.userId1 = 666;
    todoData.userId2 = 777;

    todoData.today = new Date();
    todoData.tomorrow = addDays(todoData.today, 1);
    todoData.yesterday = addDays(todoData.today, -1);

    todoData.todoList = [
      {done: false, _id: 1, userId: todoData.userId1, title: 'test #1', notes: 'notes test #1', dueDateTime: todoData.tomorrow},
      {done: true, _id: 2, userId: todoData.userId1, title: 'test #2', notes: 'notes test #2', dueDateTime: todoData.yesterday},

      {done: true, _id: 3, userId: todoData.userId2, title: 'test #1', notes: 'notes test #1', dueDateTime: todoData.yesterday},
      {done: false, _id: 4, userId: todoData.userId2, title: 'test #2', notes: 'notes test #2', dueDateTime: todoData.yesterday},
      {done: true, _id: 5, userId: todoData.userId2, title: 'test #3', notes: 'notes test #3', dueDateTime: todoData.tomorrow},
      {done: false, _id: 6, userId: todoData.userId2, title: 'test #4', notes: 'notes test #4', dueDateTime: todoData.tomorrow},
      {done: true, _id: 7, userId: todoData.userId2, title: 'test #5', notes: 'notes test #5'}
    ];

    return todoData;
  }
};
