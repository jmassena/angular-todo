//
//
// /* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//
// describe('Todo App', function() {
//   'use strict';
//
//   it('/ should redirect to #/home', function() {
//     browser.get('/');
//     //http://localhost:3000/#/home
//     browser.getLocationAbsUrl().then(function(url) {
//       expect(url.split('#')[0]).toBe('/home');
//     });
//   });
// });
//
//
// /* Testing real navbar, not mock navbar */
// describe('Menu Navigation', function(){
//   'use strict';
//
//   it('should have 4 menu items', function(){
//     // start page
//     browser.get('/');
//
//     var count = element.all(by.css('ul.navbar-nav>li')).count();
//     expect(count).toEqual(4);
//   });
//
//   var menuItems = [
//     {linkText:'Home', urlSuffix:'/home'},
//     {linkText:'To Do', urlSuffix:'/todo'}
//   ];
//
//   menuItems.forEach(function(menuItem){
//
//     describe(menuItem.linkText + ' link', function(){
//
//       var link;
//
//       beforeEach(function(){
//         browser.get('/');
//         link = element(by.css('ul.navbar-nav')).element(by.linkText(menuItem.linkText));
//       });
//
//       it('should exist on page', function(){
//
//         expect(link).toBeDefined();
//       });
//
//       it('should redirect to home page when clicked', function(){
//
//         link.click();
//
//         browser.getLocationAbsUrl().then(function(url) {
//           expect(url.split('#')[0]).toBe(menuItem.urlSuffix);
//         });
//       });
//     });
//
//   });
//
// });
