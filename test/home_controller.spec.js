describe('HomeController', function(){

  beforeEach(module('tnTour'));
  beforeEach(module('templates'));

  var $scope = {};
  var countryApiUrl = 'https://api.parse.com/1/classes/Country';
  var placeApiUrl = 'https://api.parse.com/1/classes/Place/?include=country';
  var tourApiUrl = 'https://api.parse.com/1/classes/Tour/?include=country,place,hotel';
  var httpBackend = null;

  beforeEach(inject(function($controller, $httpBackend){
    $controller('HomeController', {$scope: $scope});
    httpBackend = $httpBackend;
  }));

  it('request to Parse.com', function(){
    httpBackend.expectGET(countryApiUrl).respond(200);
    httpBackend.expectGET(placeApiUrl).respond(200);
    httpBackend.expectGET(tourApiUrl).respond(200);
    expect(httpBackend.verifyNoOutstandingExpectation).not.toThrow();
  });

});
