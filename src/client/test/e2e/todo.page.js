

'use strict';

var TodoPage = function(){
  browser.get('/#/todo');
};

TodoPage.prototype = Object.create({}, {
  todoList:{get:function(){return element.all(by.repeater('todo in vm.todos'));}}

  ,addButton:{get:function(){return element(by.id('btnAdd'));}}

  ,editModal:{get:function(){return element(by.id('todoEdit'));}}
  ,editModalCloseButton:{get:function(){return $('div.modal-header button.close');}}
  ,editModalCancelButton:{get:function(){return element(by.buttonText('Cancel'));}}
  ,editModalSubmitButton:{get:function(){return element(by.buttonText('Submit'));}}

  ,editModalFormTitle:{get:function(){return element(by.id('editTodoTitle'));}}
  ,editModalFormNotes:{get:function(){return element(by.id('editTodoNotes'));}}
  ,editModalFormDueDate:{get:function(){return element(by.id('editTodoDueDate'));}}

  ,btnDelete:{get:function(){return element(by.id('btnDelete'));}}
  ,btnDeleteYes:{get:function(){return element(by.id('btnDeleteYes'));}}
  ,btnDeleteNo:{get:function(){return element(by.id('btnDeleteNo'));}}

  ,divMainContent:{get:function(){return $('div[ui-view="main-content"]');}}
  // ,divMainContentClick:function(browser){browser.actions().mouseMove(this, {x: -0 y: -0});}
  //,divMainContentClick:function(browser){browser.actions().mouseMove(this, {x:0,y:0}).click().perform();}

});

TodoPage.prototype.divMainContentClick = function(browser){
  browser.actions().mouseMove(this.divMainContent, {x:0,y:0}).click().perform();
};

module.exports = TodoPage;
