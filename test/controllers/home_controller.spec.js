describe('HomeController', function(){

  beforeEach(module('tnTour'));

  var $scope = {};
  var tourApiUrl = 'https://api.parse.com/1/classes/Tour/?include=country,place,hotel';
  var respond_blank = {results: []};
  var $controller;
  var $httpBackend;
  var Country = jasmine.createSpyObj('CountryStub', ['all']);
  var Place = jasmine.createSpyObj('PlaceStub', ['all']);

  beforeEach(inject(function(_$controller_, _$httpBackend_){
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    Country.all.and.returnValue([]);
    Place.all.and.returnValue([]);
    makeController();
  }));

  function makeController(){
    $controller('HomeController', {$scope: $scope, Country: Country, Place: Place});
  };

  it('request to Parse.com', function(){
    expect(Country.all).toHaveBeenCalled();
    expect(Place.all).toHaveBeenCalled();
    $httpBackend.expectGET(tourApiUrl).respond(200);
    expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
  });

  it('set $scope.countries an array the countries', function(){
    var antarctida = {objectId: 'a1b2c3d4', name: 'Antarctida'};
    Country.all.and.returnValue([antarctida]);
    makeController();
    $httpBackend.whenGET(tourApiUrl).respond(200, respond_blank);
    $httpBackend.flush();
    expect($scope.countries.length).toBe(1);
    var localCountry = $scope.countries[0];
    expect(localCountry.objectId).toBe(antarctida.objectId);
    expect(localCountry.name).toBe(antarctida.name);
  });

  it('set $scope.places an array the places', function(){
    var redsquare = {objectId: 'a1b2c3d4', name: 'Red Square'};
    var respond = {results: [redsquare]};
    Place.all.and.returnValue([redsquare]);
    makeController();
    $httpBackend.whenGET(tourApiUrl).respond(200, respond_blank);
    $httpBackend.flush();
    expect($scope.places.length).toBe(1);
    var localPlace = $scope.places[0];
    expect(localPlace.objectId).toBe(redsquare.objectId);
    expect(localPlace.name).toBe(redsquare.name);
  });

  it('set $scope.tours an array the tours', function(){
    var tour = {objectId: 'a1b2c3d4', title: 'Tour', text: 'Description'};
    var respond = {results: [tour]};
    $httpBackend.whenGET(tourApiUrl).respond(200, respond);
    $httpBackend.flush();
    expect($scope.tours.length).toBe(1);
    var localTour = $scope.tours[0];
    expect(localTour.objectId).toBe(tour.objectId);
    expect(localTour.title).toBe(tour.title);
  });

});
