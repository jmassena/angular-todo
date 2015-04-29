

'use strict';

var TodoPage = function(){
  browser.get('/#/todo');
};

TodoPage.prototype = Object.create({},{
  todoList:{get:function(){return element.all(by.repeater('todo in vm.todos'));}},
  addButton:{get:function(){return $('button[ng-click="vm.editMode=\'create\'"]');}},
  editModal:{get:function(){return element(by.id('todoEdit'));}},
  editModalCloseButton:{get:function(){return $('div.modal-header button.close');}},
  editModalCancelButton:{get:function(){return element(by.buttonText('Cancel'));}}

});


module.exports = TodoPage;
