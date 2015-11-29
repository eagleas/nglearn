// let service _ in module lodash
angular.module('lodash', []).factory('_', function($window){
  return $window._;
});
