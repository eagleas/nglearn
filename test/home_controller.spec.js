describe('HomeController', function(){

  beforeEach(module('tnTour'));
  beforeEach(module('templates'));

  var $scope = {};
  var countryApiUrl = 'https://api.parse.com/1/classes/Country';
  var placeApiUrl = 'https://api.parse.com/1/classes/Place/?include=country';
  var tourApiUrl = 'https://api.parse.com/1/classes/Tour/?include=country,place,hotel';
  var respond_blank = JSON.stringify({results: []});
  var $httpBackend;

  beforeEach(inject(function($controller, _$httpBackend_){
    $controller('HomeController', {$scope: $scope});
    $httpBackend = _$httpBackend_;
  }));

  it('request to Parse.com', function(){
    $httpBackend.expectGET(countryApiUrl).respond(200);
    $httpBackend.expectGET(placeApiUrl).respond(200);
    $httpBackend.expectGET(tourApiUrl).respond(200);
    expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
  });

  it('set $scope.countries an array the countries', function(){
    var antarctida = {objectId: 'a1b2c3d4', name: 'Antarctida'}
    var respond = JSON.stringify({results: [antarctida]})
    $httpBackend.whenGET(countryApiUrl).respond(200, respond);
    $httpBackend.whenGET(placeApiUrl).respond(200, respond_blank);
    $httpBackend.whenGET(tourApiUrl).respond(200, respond_blank);
    $httpBackend.flush();
    expect($scope.countries.length).toBe(1);
    var localCountry = $scope.countries[0];
    expect(localCountry.objectId).toBe(antarctida.objectId);
    expect(localCountry.name).toBe(antarctida.name);
  });

  it('set $scope.places an array the places', function(){
    var redsquare = {objectId: 'a1b2c3d4', name: 'Red Square'}
    var respond = JSON.stringify({results: [redsquare]})
    $httpBackend.whenGET(countryApiUrl).respond(200, respond_blank);
    $httpBackend.whenGET(placeApiUrl).respond(200, respond);
    $httpBackend.whenGET(tourApiUrl).respond(200, respond_blank);
    $httpBackend.flush();
    expect($scope.places.length).toBe(1);
    var localPlace = $scope.places[0];
    expect(localPlace.objectId).toBe(redsquare.objectId);
    expect(localPlace.name).toBe(redsquare.name);
  });

  it('set $scope.tours an array the tours', function(){
    var tour = {objectId: 'a1b2c3d4', title: 'Tour', text: 'Description'}
    var respond = JSON.stringify({results: [tour]})
    $httpBackend.whenGET(countryApiUrl).respond(200, respond_blank);
    $httpBackend.whenGET(placeApiUrl).respond(200, respond_blank);
    $httpBackend.whenGET(tourApiUrl).respond(200, respond);
    $httpBackend.flush();
    expect($scope.tours.length).toBe(1);
    var localTour = $scope.tours[0];
    expect(localTour.objectId).toBe(tour.objectId);
    expect(localTour.title).toBe(tour.title);
  });

});
