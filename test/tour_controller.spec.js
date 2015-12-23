describe('TourController', function(){
  beforeEach(module('tnTour'));

  var $scope = {};
  var Tour;
  var routeParams = { objectId: '1b2d3d4' };
  var $controller;

  beforeEach(inject(function(_$controller_, _Tour_){
    Tour = _Tour_;
    $controller = _$controller_;
  }));

  function makeController() {
    $controller('TourController', { $scope: $scope, $routeParams: routeParams });
  }

  it('call Tour.get method with routeParams', function(){
    spyOn(Tour, 'get');
    makeController();
    expect(Tour.get).toHaveBeenCalledWith(routeParams);
  });

});
