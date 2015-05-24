var mockNavDataService = (function () {
  'use strict';

  return {
    get: get
  };

  // this 'get' represents a factory method on the global mockNavDat object
  // this 'get' mocks the navDataFatory factory function
  function get() {
    var data = {};
    data.getMenu = getMenu;

    return data;

    function getMenu() {
        return {
          brand: {
            text: 'My Demo',
            sref: 'home'
          },
          tabs: [{
                type: 'static',
                text: 'Home',
                sref: 'home',
                paths: ['/home']
              }, {
                type: 'static',
                text: 'To Do',
                sref: 'todo',
                paths: ['/todo']
              }, {
                type: 'static',
                text: 'About',
                sref: 'about',
                paths: ['/about']
              },

              {
                type: 'dropdown',
                text: 'Tech',
                items: [{
                  type: 'header',
                  text: 'Main'
                }, {
                  type: 'link',
                  text: 'Bootstrap'
                }, {
                  type: 'link',
                  text: 'AngularJS'
                }, {
                  type: 'link',
                  text: 'NodeJS'
                }, {
                  type: 'link',
                  text: 'Mongo'
                }, {
                  type: 'divider'
                }, {
                  type: 'header',
                  text: 'Misc'
                }, {
                  type: 'link',
                  text: 'Jasmine'
                }, {
                  type: 'link',
                  text: 'Mocha'
                }, {
                  type: 'link',
                  text: 'Karma'
                }, {
                  type: 'link',
                  text: 'Protractor'
                }, {
                  type: 'link',
                  text: 'Gulp'
                }]
              }, {
                type: 'dropdown',
                text: 'Animals',
                items: [{
                  type: 'header',
                  text: 'Large'
                }, {
                  type: 'link',
                  text: 'Cow'
                }, {
                  type: 'link',
                  text: 'Llama'
                }, {
                  type: 'divider'
                }, {
                  type: 'header',
                  text: 'Small'
                }, {
                  type: 'link',
                  text: 'Chicken'
                }, {
                  type: 'link',
                  text: 'Cat'
                }]
              }

            ] // end tabs
        }; // end json
      } // end getMenu

  }

}());
