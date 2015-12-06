describe('TourController', function(){
  beforeEach(module('tnTour'));
  beforeEach(module('templates'));

  var $scope = {};
  var tourApiUrl = 'https://api.parse.com/1/classes/Tour/1ab2c3d4?include=country,place,hotel';
  var $httpBackend;
  var $routeParams = { objectId: '1b2d3d4' };

  beforeEach(inject(function($controller, $routeParams, _$httpBackend_){
    $controller('TourController', { $scope: $scope, $routeParams: $routeParams });
    $httpBackend = _$httpBackend_;
  }));

  it('request to Parse.com', function(){
    $httpBackend.expectGET(tourApiUrl);
    expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
  });
});
