'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

/* jshint maxcomplexity:10 */
var path = require('path');
//var todoDAL = require('../../../server/data/todo.js');
var Q = require('q');
var mockDataProvider = require('./todo.data.mock.js')();
var moment = require('moment');
var TodoPage = require('./todo.page.js');

var usersRootUri = 'localhost:3000/api/users';

var urlHelper = {
  get: function(userId){
    return path.join(usersRootUri, userId.toString(), 'todos');
  },
  post: function(userId){
    return path.join(usersRootUri, userId.toString(), 'todos');
  },
  put: function(userId, todoId){
    return path.join(usersRootUri, userId.toString(), 'todos', todoId.toString());
  },
  delete: function(userId, todoId){
    return path.join(usersRootUri, userId.toString(), 'todos', todoId.toString());
  }
};


var request = require('superagent');

function appGet(userId, done){

  var deferred = Q.defer();
  request
    .get(urlHelper.get(userId))
    // .set('Accept', 'application/json')
    .end(function(err, res){
      if(err){deferred.reject(new Error(err));}
      else{deferred.resolve(res);}
    });
  return deferred.promise;
}

function appDelete(userId, todoId){
  var deferred = Q.defer();
  request
    .del(urlHelper.delete(userId, todoId))
    // .set('Accept', 'application/json')
    .end(function(err, res){
      if(err){deferred.reject(new Error(err));}
      else{deferred.resolve(res);}
    });
    return deferred.promise;
}

function appCreate(userId, todo){
  var deferred = Q.defer();
  request
    .post(urlHelper.post(userId))
    .send(todo)
    // .set('Accept', 'application/json')
    .set('Content-type', 'application/json')
    .end(function(err, res){
      if(err){deferred.reject(new Error(err));}
      else{deferred.resolve(res);}
    });
    return deferred.promise;
}

function addTestItems(todos){
  return todos.map(function(item){
    item._id = null;
    return appCreate(item.userId, item);
  });
}

var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

var cssValue = function (element, prop) {
    return element.getCssValue(prop).then(function (cssPropValue) {
        return cssPropValue;
    });
};
/* Testing todo page functionality */
describe('Todo Page', function(){

  var testData;
  var page;
  var dbItems = [];

  beforeEach(function(done){
    testData = mockDataProvider.get();
    expect(testData).toBeDefined();
    expect(testData.todoList).toBeDefined();
    expect(testData.todoList.length).toBeGreaterThan(0);
    done();
  });

  // get existing items
  beforeEach(function (done) {
    appGet(testData.userId2)
    .then(function(res){
      dbItems = res.body;
      done();
    },done);
  });
  // delete them
  beforeEach(function (done) {
    if(dbItems == null || dbItems.length === 0){
      done();
    }
    var promises = dbItems.map(function(item){
      return appDelete(item.userId, item._id);
    });

    Q.all(promises)
    .then(function(){
      done();
    },done);
  });
  // verify delete
  beforeEach(function (done) {
    appGet(testData.userId2)
    .then(function(res){
      expect(res.body).toBeDefined();
      dbItems = res.body;
      // console.log('Data at after delete: ' + res.body.length);
      expect(res.body.length).toEqual(0);
      done();
    },function(err){
      expect(err).not.toBeDefined();
      done();
    });
  });
  // add test data items
  beforeEach(function (done) {
    // expect(dbItems.length).toEqual(0);
    // var todo = testData.todoList[4];
    // todo._id = null;
    //
    // var promises = testData.todoList.map(function(item){
    //   item._id = null;
    //   return appCreate(item.userId, item);
    // });
    //
    // Q.all(promises)
    // .then(function(){
    //   done();
    // },done);
    done();
  });

  beforeEach(function () {
    page = new TodoPage();
  });

  // todoList
  // addButton
  // editModal
  // editModalCloseButton
  // editModalCancelButton
  // editModalSubmitButton
  // editModalFormTitle
  // editModalFormNotes
  // editModalFormDueDate

  it('should have no todo items at start', function(){
    expect(page.todoList.count()).toEqual(0);
  });

  it('should show the create popup when clicking "add" button', function(){
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
    page.addButton.click();
    expect(page.editModal.isDisplayed()).toBeTruthy();
  });

  it('should put focus on title field in edit popup', function(){
    page.addButton.click();
    var activeId = browser.driver.switchTo().activeElement().getId();

    expect(page.editModalFormTitle.getId()).toEqual(activeId);
  });

  it('should hide the create popup when clicking "Cancel" button on add popup', function(){
    page.addButton.click();
    page.editModalCancelButton.click();
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should hide the create popup when clicking top-right "Close" icon on add popup', function(){
    page.addButton.click();
    page.editModalCloseButton.click();
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should hide the create popup when clicking outside popup', function(){
    page.addButton.click();
    //browser.actions().mouseMove(page.divMainContent, {x: -0, y: -0}).click().perform();
    page.divMainContentClick(browser);
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should hide the create popup when clicking submit and title is not empty', function(){
    page.addButton.click();
    page.editModalFormTitle.sendKeys('First Todo');
    page.editModalSubmitButton.click();
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should disable submit button when edit popup has no title value', function(){
    page.addButton.click();
    expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
  });

  it('should enable submit button when edit popup has a title value', function(){
    page.addButton.click();
    expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
    page.editModalFormTitle.sendKeys('h');
    expect(page.editModalSubmitButton.getAttribute('disabled')).not.toBeTruthy();
    page.editModalFormTitle.clear();
    expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
  });

  it('should show red background on title when it has no value and mouse leaves title', function(){
    var redBgColor = 'rgba(255, 200, 200, 1)';
    page.addButton.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).not.toEqual(redBgColor);
    page.editModalFormNotes.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).toEqual(redBgColor);

  });

  it('should not show red background on title after re-opening popup with invalid title ', function(){
    var redBgColor = 'rgba(255, 200, 200, 1)';
    page.addButton.click();
    page.editModalFormNotes.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).toEqual(redBgColor);

    // cancel
    page.editModalCancelButton.click();
    page.addButton.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).not.toEqual(redBgColor);
    page.editModalFormNotes.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).toEqual(redBgColor);

    // close
    page.editModalCloseButton.click();
    page.addButton.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).not.toEqual(redBgColor);
    page.editModalFormNotes.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).toEqual(redBgColor);

    // main div (escape modal)
    page.divMainContentClick(browser);
    page.addButton.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).not.toEqual(redBgColor);
  });

  it('should create a new todo item', function(){

    var todo = createTestTodo();
    expect(page.todoList.count()).toEqual(1);

    var pageTodo = page.todoGetByIndex(0);

    expect(pageTodo.done.isSelected()).toBeFalsy();
    expect(pageTodo.title).toEqual(todo.title);
    expect(pageTodo.notes).toEqual(todo.notes);
    expect(pageTodo.dueDateTime).toMatch(dueMessage(todo.dueDateTime));
    expect(pageTodo.dueDateTitle).toEqual(dueDateTitleCreate(todo.dueDateTime));
  });

  function dueDateTitleCreate(dt){
    if(dt == null){return null;}

    return 'Due on ' + moment(dt).format('MM/DD/YYYY');
  }

  function dueMessage(dueDateTime){
    var dueString;

    if(dueDateTime == null){return null;}

    dueDateTime.setHours(0,0,0,0);

    var hours = Math.round((dueDateTime - new Date())/(1000*60*60));
    var days = Math.round((dueDateTime - new Date())/(1000*60*60*24));
    var plural = '';
    if(hours >= 0){
      if(days > 0){
        dueString = days + ' day' + (days>0?'s':'');
      }
      else{
        dueString = hours + ' hour' + (hours>0?'s':'');
      }
    }
    else{
      hours*=-1;
      days*=-1;
      if(days > 0){
        dueString = days + ' day' + (days>0?'s':'') + ' overdue';
      }
      else{
        dueString = hours + ' hour' + (hours>0?'s':'') + ' overdue';
      }
    }
  }

  function formatDateForInput(dt){
    return moment(dt).format('MMDDYYYY');
  }

  function createTestTodo(todo){

    if(!todo){
      // create todo if none supplied
      todo = {};
      todo.dueDateTime = new Date();
      todo.dueDateTime.setDate(todo.dueDateTime.getDate() + 1);
      todo.dueDateTime.setHours(0,0,0,0);
      todo.title = 'Test New Todo';
      todo.notes = 'Remember to test me';
    }

    page.addButton.click();
    page.editModalFormTitle = todo.title;
    page.editModalFormNotes = todo.notes;

    page.editModalFormDueDate = formatDateForInput(todo.dueDateTime);

    page.editModalSubmitButton.click();

    return todo;
  }

  // todoList
  // addButton
  // editModal
  // editModalCloseButton
  // editModalCancelButton
  // editModalSubmitButton
  // editModalFormTitle
  // editModalFormNotes
  // editModalFormDueDate

  // todoGetByIndex
  // row
  // ,done
  // ,title
  // ,notes
  // ,dueDateTime
  // ,edit
  // ,delete
  // ,deleteYes
  // ,deleteNo

  it('row edit button should show edit modal', function(){
    var todo = createTestTodo();
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.edit.click();
    expect(page.editModal.isDisplayed()).toBeTruthy();
  });

  it('row delete button should show delete modal', function(){
    var todo = createTestTodo();
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.delete.click();
    expect(todoRow.deleteModal.isDisplayed()).toBeTruthy();
  });

  it('delete module "no" button should dismiss delete modal', function(){
    var todo = createTestTodo();
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.delete.click();
    expect(todoRow.deleteModal.isDisplayed()).toBeTruthy();

    todoRow.deleteNo.click();
    expect(todoRow.deleteModal.isDisplayed()).not.toBeTruthy();
    expect(page.todoList.count()).toEqual(1);
  });

  it('delete module "yes" button should dismiss delete modal and delete the todo item', function(){
    var todo = createTestTodo();
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.delete.click();
    expect(todoRow.deleteModal.isDisplayed()).toBeTruthy();

    todoRow.deleteYes.click();
    // check for any open confirm popups
    expect(element.all(by.css('.btn-group.delete-confirm.open')).count()).toEqual(0);
    expect(page.todoList.count()).toEqual(0);
  });

  it('should show changes after editing', function(){
    // create test todo
    var todo = createTestTodo();
    expect(page.todoList.count()).toEqual(1);

    // get new todo row and click edit button
    var todoRow = page.todoGetByIndex(0);
    todoRow.edit.click();
    expect(page.editModal.isDisplayed()).toBeTruthy();

    // update fields in edit popup
    var newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() - 2);
    newDueDate.setHours(0,0,0,0);

    // don't  set done:true else due time won't show. We'll test that later
    var todoEdits = {title:'Hello Kitty', dueDateTime: newDueDate, notes: 'Thanks for testing me'};
    page.editModalFormTitle.clear();
    page.editModalFormTitle = todoEdits.title;
    page.editModalFormNotes.clear();
    page.editModalFormNotes = todoEdits.notes;
    page.editModalFormDueDate = formatDateForInput(todoEdits.dueDateTime);

    // submit edited todo
    page.editModalSubmitButton.click();
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
    expect(page.todoList.count()).toEqual(1);

    // get edited todo row
    todoRow = page.todoGetByIndex(0);
    // validate edits are displayed
    expect(todoRow.done.isSelected()).toBeFalsy();
    expect(todoRow.title).toEqual(todoEdits.title);
    expect(todoRow.notes).toEqual(todoEdits.notes);
    expect(todoRow.dueDateTime).toMatch(dueMessage(todoEdits.dueDateTime));
    expect(todoRow.dueDateTitle).toEqual(dueDateTitleCreate(todoEdits.dueDateTime));

  });

  it('should change done status when checking row checkbox', function(){
    var todo = createTestTodo();
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    expect(todoRow.done.isSelected()).toBeFalsy();
    todoRow.done.click();
    expect(todoRow.done.isSelected()).not.toBeFalsy();
  });

  // xit('delete module "yes" button should dismiss delete modal and delete the todo item', function(){
  //   var todo = createTestTodo();
  //   expect(page.todoList.count()).toEqual(1);
  //
  //   var todoRow = page.todoGetByIndex(0);
  //   todoRow.delete.click();
  //   expect(todoRow.deleteModal.isDisplayed()).toBeTruthy();
  // });


});
