

'use strict';

var TodoPage = function(){
  browser.get('/#/todo');
};

TodoPage.prototype = Object.create({}, {

  todoList:{get:function(){return element.all(by.repeater('todo in vm.todos'));}}

  ,addButton: getById('btnAdd')
  ,editModal: getById('todoEdit')

  ,editModalCloseButton: getByCss('div.modal-header button.close')
  ,editModalCancelButton: getByButtonText('Cancel')
  ,editModalSubmitButton: getByButtonText('Submit')

  ,editModalFormTitle: getSetById('editTodoTitle')
  ,editModalFormNotes: getSetById('editTodoNotes')
  ,editModalFormDueDate: getSetById('editTodoDueDate')
  ,editModalFormDone: getSetById('editTodoDone')

  ,btnDelete: getById('btnDelete')
  ,btnDeleteYes: getById('btnDeleteYes')
  ,btnDeleteNo: getById('btnDeleteNo')

  ,divMainContent: getByCss('div[ui-view="main-content"]')


});


TodoPage.prototype.todoGetByIndex = function(idx){
  return new TodoCells(this, idx);
};

TodoPage.prototype.divMainContentClick = function(browser){
  browser.actions().mouseMove(this.divMainContent, {x:0,y:0}).click().perform();
};


function TodoCells(p, i){
  this.parent = p;
  this.idx = i;
}

TodoCells.prototype = Object.create({}, {

  row: {get: function(){return this.parent.todoList.get(this.idx);}}
  ,done: {get:function(){return this.row.all(by.model('todo.done')).first().isSelected();}}
  ,title: {get:function(){return this.row.all(by.css('.todo-title')).first().getText();}}
  ,notes: {get:function(){return this.row.all(by.css('.todo-notes')).first().getText();}}
  ,dueDateTime: {get:function(){return this.row.all(by.css('.todo-duedate')).first().getText();}}
  ,dueDateTitle: {get:function(){return this.row.all(by.css('.todo-duedate'))
                  .first().getAttribute('title');}}
  ,edit: {get:function(){return this.row.all(by.css('a.action-edit')).first();}}
  ,delete: {get:function(){return this.row.all(by.css('a.action-delete')).first();}}
  ,deleteYes: {get:function(){return this.row.all(by.css('button.action-delete-yes')).first();}}
  ,deleteNo: {get:function(){return this.row.all(by.css('button.action-delete-no')).first();}}
  ,deleteModal: {get:function(){return this.row.all(by.css('ul.delete-modal')).first();}}
});


function getSetById(id){
  return {get:function(){return element(by.id(id));}
         ,set:function(val){ element(by.id(id)).sendKeys(val);}
  };
}

function getById(id){
  return {get:function(){return element(by.id(id));}};
}

function getByCss(css){
  return {get:function(){return $(css);}};
}

function getByButtonText(text){
  return {get:function(){return element(by.buttonText(text));}};
}



module.exports = TodoPage;
