describe('TourController', function(){
  beforeEach(module('tnTour'));
  beforeEach(module('templates'));

  var $scope = {};
  var Tour;
  var routeParams = { objectId: '1b2d3d4' };

  beforeEach(inject(function($controller, _Tour_){
    Tour = _Tour_;
    spyOn(Tour, 'get');
    $controller('TourController', { $scope: $scope, $routeParams: routeParams });
  }));

  it('call Tour.get method with routeParams', function(){
    expect(Tour.get).toHaveBeenCalledWith(routeParams);
  });

});
