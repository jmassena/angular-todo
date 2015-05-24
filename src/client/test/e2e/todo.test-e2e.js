'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

/* jshint maxcomplexity:10 */
var path = require('path');
var Q = require('q');
var moment = require('moment');
var TodoPage = require('./todo.page.js');
var request = require('superagent');

var usersRootUri = 'localhost:3000/api/users';

var urlHelper = {
  get: function (userId) {
    return path.join(usersRootUri, userId.toString(), 'todos');
  },
  post: function (userId) {
    return path.join(usersRootUri, userId.toString(), 'todos');
  },
  put: function (userId, todoId) {
    return path.join(usersRootUri, userId.toString(), 'todos', todoId.toString());
  },
  delete: function (userId, todoId) {
    return path.join(usersRootUri, userId.toString(), 'todos', todoId.toString());
  }
};

function appGet(userId, done) {

  var deferred = Q.defer();
  request
    .get(urlHelper.get(userId))
    // .set('Accept', 'application/json')
    .end(function (err, res) {
      if(err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(res);
      }
    });
  return deferred.promise;
}

function appDelete(userId, todoId) {
  var deferred = Q.defer();
  request
    .del(urlHelper.delete(userId, todoId))
    // .set('Accept', 'application/json')
    .end(function (err, res) {
      if(err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(res);
      }
    });
  return deferred.promise;
}

function appCreate(userId, todo) {
  var deferred = Q.defer();
  request
    .post(urlHelper.post(userId))
    .send(todo)
    // .set('Accept', 'application/json')
    .set('Content-type', 'application/json')
    .end(function (err, res) {
      if(err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(res);
      }
    });
  return deferred.promise;
}

function addTestItems(todos) {
  return todos.map(function (item) {
    item._id = null;
    return appCreate(item.userId, item);
  });
}

function hasClass(element, cls) {
  return element.getAttribute('class').then(function (classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
}

function cssValue(element, prop) {
  return element.getCssValue(prop).then(function (cssPropValue) {
    return cssPropValue;
  });
}

function dueDateTitleCreate(dt) {
  if(dt == null) {
    return null;
  }

  return 'Due on ' + moment(dt).format('MM/DD/YYYY');
}

function dueMessage(dueDateTime) {
  var dueString;

  if(dueDateTime == null) {
    return null;
  }

  dueDateTime.setHours(0, 0, 0, 0);

  var hours = Math.round((dueDateTime - new Date()) / (1000 * 60 * 60));
  var days = Math.round((dueDateTime - new Date()) / (1000 * 60 * 60 * 24));
  var plural = '';
  if(hours >= 0) {
    if(days > 0) {
      dueString = days + ' day' + (days > 1 ? 's' : '');
    } else {
      dueString = hours + ' hour' + (hours > 1 ? 's' : '');
    }
  } else {
    hours *= -1;
    days *= -1;
    if(days > 0) {
      dueString = days + ' day' + (days > 1 ? 's' : '') + ' overdue';
    } else {
      dueString = hours + ' hour' + (hours > 1 ? 's' : '') + ' overdue';
    }
  }

  return dueString;
}

function formatDateForInput(dt) {
  if(dt == null) {
    return null;
  }

  var ret = moment(dt).format('MMDDYYYY');
  return ret;
}

function createTestTodoObject(title, notes, dueDaysFromNow) {
  var todo = {};
  if(dueDaysFromNow != null) {
    todo.dueDateTime = new Date();
    todo.dueDateTime.setDate(todo.dueDateTime.getDate() + dueDaysFromNow);
    todo.dueDateTime.setHours(0, 0, 0, 0);
  }

  todo.title = title;
  todo.notes = notes;

  return todo;
}

function uiSubmitTestTodo(page, todo) {

  if(!todo) {
    todo = createTestTodoObject('Test New Todo', 'Remember to test me', 1);
  }

  page.addButton.click();
  page.editModalFormTitle = todo.title;
  page.editModalFormNotes = todo.notes;
  page.editModalFormDueDate = formatDateForInput(todo.dueDateTime);
  page.editModalSubmitButton.click();

  return todo;
}

/* Testing todo page functionality */
describe('Todo Page', function () {

  var page;
  var dbItems = [];
  var testUserId = 777;

  // get existing items
  beforeEach(function (done) {
    appGet(testUserId)
      .then(function (res) {
        dbItems = res.body;
        done();
      }, done);
  });
  // delete them
  beforeEach(function (done) {
    if(dbItems == null || dbItems.length === 0) {
      done();
    }
    var promises = dbItems.map(function (item) {
      return appDelete(item.userId, item._id);
    });

    Q.all(promises)
      .then(function () {
        done();
      }, done);
  });
  // verify delete
  beforeEach(function (done) {
    appGet(testUserId)
      .then(function (res) {
        expect(res.body).toBeDefined();
        dbItems = res.body;
        // console.log('Data at after delete: ' + res.body.length);
        expect(res.body.length).toEqual(0);
        done();
      }, function (err) {
        expect(err).not.toBeDefined();
        done();
      });
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

  it('should have no todo items at start', function () {
    expect(page.todoList.count()).toEqual(0);
  });

  it('should show the create popup when clicking "add" button', function () {
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
    page.addButton.click();
    expect(page.editModal.isDisplayed()).toBeTruthy();
  });

  it('should put focus on title field in edit popup', function () {
    page.addButton.click();
    var activeId = browser.driver.switchTo().activeElement().getId();

    expect(page.editModalFormTitle.getId()).toEqual(activeId);
  });

  it('should hide the create popup when clicking "Cancel" button on add popup', function () {
    page.addButton.click();
    page.editModalCancelButton.click();
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should hide the create popup when clicking top-right "Close" icon on add popup', function () {
    page.addButton.click();
    page.editModalCloseButton.click();
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should hide the create popup when clicking outside popup', function () {
    page.addButton.click();
    //browser.actions().mouseMove(page.divMainContent, {x: -0, y: -0}).click().perform();
    page.divMainContentClick(browser);
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should hide the create popup when clicking submit and title is not empty', function () {
    page.addButton.click();
    page.editModalFormTitle.sendKeys('First Todo');
    page.editModalSubmitButton.click();
    expect(page.editModal.isDisplayed()).not.toBeTruthy();
  });

  it('should disable submit button when edit popup has no title value', function () {
    page.addButton.click();
    expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
  });

  it('should enable submit button when edit popup has a title value', function () {
    page.addButton.click();
    expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
    page.editModalFormTitle.sendKeys('h');
    expect(page.editModalSubmitButton.getAttribute('disabled')).not.toBeTruthy();
    page.editModalFormTitle.clear();
    expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
  });

  it('should show red background on title when it has no value and mouse leaves title', function () {
    var redBgColor = 'rgba(255, 200, 200, 1)';
    page.addButton.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).not.toEqual(redBgColor);
    page.editModalFormNotes.click();
    expect(cssValue(page.editModalFormTitle, 'background-color')).toEqual(redBgColor);

  });

  it('should not show red background on title after re-opening popup with invalid title ', function () {
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

  it('should create a new todo item', function () {

    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    var pageTodo = page.todoGetByIndex(0);

    expect(pageTodo.done.isSelected()).toBeFalsy();
    expect(pageTodo.title).toEqual(todo.title);
    expect(pageTodo.notes).toEqual(todo.notes);
    expect(pageTodo.dueDateTime).toMatch(dueMessage(todo.dueDateTime));
    expect(pageTodo.dueDateTitle).toEqual(dueDateTitleCreate(todo.dueDateTime));
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

  it('row edit button should show edit modal', function () {
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.edit.click();
    expect(page.editModal.isDisplayed()).toBeTruthy();
  });

  it('row delete button should show delete modal', function () {
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.delete.click();
    expect(todoRow.deleteModal.isDisplayed()).toBeTruthy();
  });

  it('delete module "no" button should dismiss delete modal', function () {
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.delete.click();
    expect(todoRow.deleteModal.isDisplayed()).toBeTruthy();

    todoRow.deleteNo.click();
    expect(todoRow.deleteModal.isDisplayed()).not.toBeTruthy();
    expect(page.todoList.count()).toEqual(1);
  });

  it('delete module "yes" button should dismiss delete modal and delete the todo item', function () {
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    todoRow.delete.click();
    expect(todoRow.deleteModal.isDisplayed()).toBeTruthy();

    todoRow.deleteYes.click();
    // check for any open confirm popups
    expect(element.all(by.css('.btn-group.delete-confirm.open')).count()).toEqual(0);
    expect(page.todoList.count()).toEqual(0);
  });

  it('should show changes after editing', function () {
    // create test todo
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    // get new todo row and click edit button
    var todoRow = page.todoGetByIndex(0);
    todoRow.edit.click();
    expect(page.editModal.isDisplayed()).toBeTruthy();

    // update fields in edit popup
    var newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() - 2);
    newDueDate.setHours(0, 0, 0, 0);

    // don't  set done:true else due time won't show. We'll test that later
    var todoEdits = {
      title: 'Hello Kitty',
      dueDateTime: newDueDate,
      notes: 'Thanks for testing me'
    };
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

  it('should change done status in edit popup', function () {
    // create test todo
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    // get new todo row and click edit button
    var todoRow = page.todoGetByIndex(0);
    expect(todoRow.done.isSelected()).toBeFalsy();

    todoRow.edit.click();
    expect(page.editModal.isDisplayed()).toBeTruthy();
    expect(page.editModalFormDone.isSelected()).toBeFalsy();

    page.editModalFormDone.click();
    page.editModalSubmitButton.click();

    // get edited todo row
    todoRow = page.todoGetByIndex(0);
    // validate edits are displayed
    expect(todoRow.done.isSelected()).not.toBeFalsy();
  });

  it('should not show due time of done not-overdue todo', function () {
    // create test todo which is due tomorrow
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    // get new todo row and click edit button
    var todoRow = page.todoGetByIndex(0);
    expect(todoRow.done.isSelected()).toBeFalsy();
    expect(todoRow.dueDateTime).not.toEqual('');
    todoRow.done.click();

    todoRow = page.todoGetByIndex(0);
    expect(todoRow.dueDateTime).toEqual('');

  });

  it('should not show due time of done overdue todo', function () {

    var todo = createTestTodoObject('test 1', '', -1);
    todo = uiSubmitTestTodo(page, todo);
    expect(page.todoList.count()).toEqual(1);

    // check that new todo has due text and is overdue
    var todoRow = page.todoGetByIndex(0);
    expect(todoRow.done.isSelected()).toBeFalsy();
    expect(todoRow.dueDateTime).toMatch('overdue');

    // set done: true
    todoRow.done.click();

    // due cell should be blank
    todoRow = page.todoGetByIndex(0);
    expect(todoRow.dueDateTime).toEqual('');
  });

  it('should change done status when checking row checkbox', function () {
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);

    var todoRow = page.todoGetByIndex(0);
    expect(todoRow.done.isSelected()).toBeFalsy();
    todoRow.done.click();
    expect(todoRow.done.isSelected()).not.toBeFalsy();
    todoRow.done.click();
    expect(todoRow.done.isSelected()).toBeFalsy();
  });

  it('should show yellow background for not done, not overdue items with a due date', function () {
    // default todo is underdue (due tomorrow)
    var todo = uiSubmitTestTodo(page);
    expect(page.todoList.count()).toEqual(1);
    expect(hasClass(page.todoList.get(0), 'underdue')).toBeTruthy();

  });

  it('should show red background for not done, overdue items with a due date', function () {

    // one day overdue
    var todo = createTestTodoObject('test 1', '', -1);
    todo = uiSubmitTestTodo(page, todo);
    expect(page.todoList.count()).toEqual(1);
    expect(hasClass(page.todoList.get(0), 'overdue')).toBeTruthy();

  });

  it('should sort items by done asc, dueDateOrderDesc,  createdDateTime desc', function () {

    var todo;
    todo = createTestTodoObject('done,overdue', '', -1);
    todo = uiSubmitTestTodo(page, todo);

    todo = createTestTodoObject('done,underdue', '', 1);
    todo = uiSubmitTestTodo(page, todo);

    todo = createTestTodoObject('notdone,overdue', '', -1);
    todo = uiSubmitTestTodo(page, todo);

    todo = createTestTodoObject('notdone,underdue', '', 1);
    todo = uiSubmitTestTodo(page, todo);

    todo = createTestTodoObject('notdone,notdue', '', null);
    todo = uiSubmitTestTodo(page, todo);

    todo = createTestTodoObject('done,notdue', '', null);
    todo = uiSubmitTestTodo(page, todo);

    // expected start order when none done
    // notdone,overdue
    // done,overdue
    // notdone,underdue
    // done,underdue
    // done,notdue
    // notdone,notdue
    var startOrder = [
      'notdone,overdue', 'done,overdue', 'notdone,underdue', 'done,underdue', 'done,notdue', 'notdone,notdue'
    ];

    startOrder.forEach(function (item, idx) {
      expect(page.todoGetByIndex(idx).title).toEqual(startOrder[idx]);
    });

    page.todoGetByIndex(1).done.click();
    // expected start order when none done
    // notdone,overdue
    // notdone,underdue
    // done,underdue
    // done,notdue
    // notdone,notdue
    // done,overdue

    // was created earliest so goes to  bottom
    expect(page.todoGetByIndex(5).title).toEqual('done,overdue');

    //'done,underdue'
    expect(page.todoGetByIndex(2).title).toEqual('done,underdue');
    page.todoGetByIndex(2).done.click();

    // notdone,overdue
    // notdone,underdue
    // done,notdue
    // notdone,notdue
    // done,overdue
    // done,underdue

    expect(page.todoGetByIndex(4).title).toEqual('done,overdue');
    // due earlier than done,overdue so is in last spot
    expect(page.todoGetByIndex(5).title).toEqual('done,underdue');

    page.todoGetByIndex(2).done.click();

    expect(page.todoGetByIndex(3).title).toEqual('done,overdue');
    expect(page.todoGetByIndex(4).title).toEqual('done,underdue');
    // due earlier than other dones so in last spot
    expect(page.todoGetByIndex(5).title).toEqual('done,notdue');

  });

});
