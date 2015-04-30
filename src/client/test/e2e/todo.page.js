

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

  ,btnDelete: getById('btnDelete')
  ,btnDeleteYes: getById('btnDeleteYes')
  ,btnDeleteNo: getById('btnDeleteNo')

  ,divMainContent: getByCss('div[ui-view="main-content"]')

});


TodoPage.prototype.divMainContentClick = function(browser){
  browser.actions().mouseMove(this.divMainContent, {x:0,y:0}).click().perform();
};


function getSetById(id){
  return {get:function(){return element(by.id(id));}
         ,set:function(val){ element(by.id(id)).sendKeyd(val);}
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
