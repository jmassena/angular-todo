'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */


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



  beforeEach(function(done){
    testData = mockDataProvider.get();
    expect(testData).toBeDefined();
    expect(testData.todoList).toBeDefined();
    expect(testData.todoList.length).toBeGreaterThan(0);
    done();
  });


  // get existing items
  var dbItems = [];
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
  // // add test data items
  // beforeEach(function (done) {
  //   expect(dbItems.length).toEqual(0);
  //   var todo = testData.todoList[4];
  //   todo._id = null;
  //
  //   var promises = testData.todoList.map(function(item){
  //     item._id = null;
  //     return appCreate(item.userId, item);
  //   });
  //
  //   Q.all(promises)
  //   .then(function(){
  //     done();
  //   },done);
  //
  // });

  var page;
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

  // todoList
  // addButton
  // editModal
  // editModalCloseButton
  // editModalCancelButton
  // editModalSubmitButton
  // editModalFormTitle
  // editModalFormNotes
  // editModalFormDueDate



  fit('should create a new todo item', function(){

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    var titleText = 'Test New Todo';
    var notesText = 'Remember to test me';
    var dueDate = tomorrow;
    var df = new moment(dueDate).format('MMM DD, YYYY h:mm A'); //MMM DD, YYYY h:mm A

    page.addButton.click();
    page.editModalFormTitle = titleText;
    page.editModalFormNotes = notesText;

    //page.editModalFormDueDate.click();
    // console.log('setting date: ' + dueDate.toISOString());
    // page.editModalFormDueDate = dueDate.toISOString();
    page.editModalFormDueDate = '02/02/2002';
//#todoEdit > div > div > div.modal-body > form > div:nth-child(4) > div > ul > li.collapse.in > div > div.datepicker-days > table > tbody > tr:nth-child(2) > td.day.active.weekend
////*[@id="todoEdit"]/div/div/div[2]/form/div[4]/div/ul/li[1]/div/div[1]/table/tbody/tr[2]/td[1]

    // element.all($('table.datepicker-years tbody span.year')).filter(function(el){
    //   return el.getText() === dueDate.getFullYear().toString();
    // })
    // .first().click();
    //
    // element.all($('table.datepicker-years tbody span.year')).filter(function(el){
    //   return el.getText() === dueDate.getFullYear().toString();
    // })
    // .first().click();

//
    page.editModalSubmitButton.click();
    expect(page.todoList.count()).toEqual(1);

    // // done
    // var el = page.todoList.all(by.model('todo.done'));
    // expect(el.count()).toEqual(1);
    // expect(el.first().isSelected()).toBeFalsy();
    //
    // // title
    // el = page.todoList.all(by.css('td.todo-title'));
    // expect(el.count()).toEqual(1);
    // expect(el.first().getText()).toEqual(titleText);
    //
    // // notes
    // // $$ is just shortcut for .all(by.css('css'))
    // el = page.todoList.first().$$('td').filter(function(item){
    //   return item.getText().then(function(text){
    //     return text === notesText;
    //   });
    // });
    //
    // expect(el.count()).toEqual(1);
    // expect(el.get(0).getText()).toEqual(notesText);
    //
    // // due date
    // el = page.todoList.$$('td.todo-duedate'); // not needed, just dbl checking
    // expect(el.count()).toEqual(1);
    //
    // expect(el.first().getText()).toEqual('due in 23 hours');

    // var df = new moment(dueDate).format('MM/dd/yyyy h:mm a');
    // expect(el.first().getAttribute('title')).toEqual('Due on ' + df);

    // .then(function(items){
    //   expect(items.count()).toEqual(1);
    //   done();
    // },done);


    // var done = page.todoList.all($('input[ng-model="todo.done"]')).get(0).isSelected();
    // console.log('done: ' + JSON.stringify(done));
    // expect(done).toBeTruthy();


  });

  // xit('should show an edited todo item after editing', function(){
  //
  // });
  //
  // xit('should show a confirm popup when clicking the delete icon', function(){
  //
  // });
  //
  // xit('should hide the confirm popup and not submit when deleting and clicking "no" on confirm popup', function(){
  //
  // });
  //
  // xit('should delete a todo item when deleting and clicking "yes" on the confirm popup', function(){
  //
  // });
  //
  // xit('should create a new todo item', function(){
  //
  // });

});

//
// describe('Edit popup (non-modify)', function(){
//   // these tests don't need any setup except new page object
//   var page;
//   beforeEach(function () {
//     page = new TodoPage();
//   });
//
//   // it('should show the create popup when clicking "add" button', function(){
//   //   expect(page.editModal.isDisplayed()).not.toBeTruthy();
//   //   page.addButton.click();
//   //   expect(page.editModal.isDisplayed()).toBeTruthy();
//   // });
//   //
//   // it('should hide the create popup when clicking "Cancel" button on add popup', function(){
//   //   page.addButton.click();
//   //   page.editModalCancelButton.click();
//   //   expect(page.editModal.isDisplayed()).not.toBeTruthy();
//   // });
//   //
//   // it('should hide the create popup when clicking top-right "Close" icon on add popup', function(){
//   //   page.addButton.click();
//   //   page.editModalCloseButton.click();
//   //   expect(page.editModal.isDisplayed()).not.toBeTruthy();
//   // });
//   //
//   // it('should disable submit button when edit popup has no title value', function(){
//   //   page.addButton.click();
//   //   expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
//   // });
//   //
//   // it('should enable submit button when edit popup has a title value', function(){
//   //   page.addButton.click();
//   //   expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
//   //   page.editModalFormTitle.sendKeys('h');
//   //   expect(page.editModalSubmitButton.getAttribute('disabled')).not.toBeTruthy();
//   //   page.editModalFormTitle.clear();
//   //   expect(page.editModalSubmitButton.getAttribute('disabled')).toBeTruthy();
//   // });
//   //
//   // it('should show red background on title when it has no value and mouse leaves title', function(){
//   //   var redBgColor = 'rgba(255, 200, 200, 1)';
//   //   page.addButton.click();
//   //   expect(cssValue(page.editModalFormTitle, 'background-color')).not.toEqual(redBgColor);
//   //   page.editModalFormNotes.click();
//   //   expect(cssValue(page.editModalFormTitle, 'background-color')).toEqual(redBgColor);
//   //
//   // });
//   // // todoList
//   // // addButton
//   // // editModal
//   // // editModalCloseButton
//   // // editModalCancelButton
//   // // editModalSubmitButton
//   // // editModalFormTitle
//   // // editModalFormNotes
//   // // editModalFormDueDate
//
// });
