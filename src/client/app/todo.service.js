(function () {
    'use strict';

    angular
        .module('app')
        .factory('todoService', todoService);



    todoService.$inject = ['$http', '$q', '$log'];
    function todoService($http, $q, $log) {

      var todos;
      var deferred;
      var initialized;

      var api = {
        getTodos: getTodos,
        createTodo: createTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo,
        //initialLoad: initialLoad,
        todos: todos
      };

      return api;

      function requiredParamCheck(paramName, paramValue){
        if(!paramValue){
          throw paramName + ' is required';
        }
      }

      // function initialLoad(){
      //   if(!initialized){
      //     getTodos(userId);
      //   }
      // }

      function getTodos(userId) {
        requiredParamCheck('userId', userId);

        deferred = $q.defer();
        $http.get('/api/users/' + userId + '/todos')
          .success(function(d){
            deferred.resolve({data:d});
            api.todos = d;
            //$log.info('got data: ' + JSON.stringify(d));
          })
          .error(function(msg, code){
            deferred.reject(msg);
            $log.error(msg, code);
          });

          return deferred.promise;
      }

      function createTodo(userId, todo) {
        requiredParamCheck('userId', userId);
        requiredParamCheck('todo', todo);

        deferred = $q.defer();
        $http.post('/api/users/' + userId + '/todos', todo)
          .success(function(d){
            deferred.resolve({data:d});
            //api.data.todos.push(d.data);
          })
          .error(function(msg, code){
            deferred.reject(msg);
            $log.error(msg, code);
          });

          return deferred.promise;
      }

      function updateTodo(userId, todo) {
        requiredParamCheck('userId', userId);
        requiredParamCheck('todo', todo);
        requiredParamCheck('todo._id', todo._id);

        deferred = $q.defer();
        $http.put('/api/users/' + userId + '/todos/' + todo._id, todo)
        .success(function(d){
          deferred.resolve({data:d});
          //api.data = d;
        })
        .error(function(msg, code){
          deferred.reject(msg);
          $log.error(msg, code);
        });

        return deferred.promise;
      }

      function deleteTodo(userId, todoId) {
        requiredParamCheck('userId', userId);
        requiredParamCheck('todoId', todoId);

        deferred = $q.defer();
        $http.delete('/api/users/' + userId + '/todos/' + todoId)
        .success(function(d){
          deferred.resolve({data:d});
          //api.data = d;
        })
        .error(function(msg, code){
          deferred.reject(msg);
          $log.error(msg, code);
        });

        return deferred.promise;
      }
    }
}());
