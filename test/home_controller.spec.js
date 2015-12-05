describe('HomeController', function(){

  beforeEach(module('tnTour'));
  var $scope = {};

  beforeEach(inject(function($controller){
    $controller('HomeController', {$scope: $scope})
  }));

  it('test', function(){
    expect($scope.testVar).toBe('passed');
  });
});
