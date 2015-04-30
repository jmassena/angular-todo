

'use strict';

var TodoPage = function(){
  browser.get('/#/todo');
};

TodoPage.prototype = Object.create({},{
  todoList:{get:function(){return element.all(by.repeater('todo in vm.todos'));}},
  addButton:{get:function(){return element(by.id('btnAdd'));}},
  editModal:{get:function(){return element(by.id('todoEdit'));}},
  editModalCloseButton:{get:function(){return $('div.modal-header button.close');}},
  editModalCancelButton:{get:function(){return element(by.buttonText('Cancel'));}},
  editModalSubmitButton:{get:function(){return element(by.buttonText('Submit'));}},
  editModalFormTitle:{get:function(){return element(by.id('editTodoTitle'));}},
  editModalFormNotes:{get:function(){return element(by.id('editTodoNotes'));}},
  editModalFormDueDate:{get:function(){return element(by.id('editTodoDueDate'));}}

});


module.exports = TodoPage;
