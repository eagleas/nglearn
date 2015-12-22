
describe('ToursController', function(){

  beforeEach(module('tnTour'));

  var $scope = {};
  var Country, Place, Hotel, Tour;
  var $controller, $httpBackend, apiDataHelper;
  var countryApiUrl = 'https://api.parse.com/1/classes/Country';
  var placeApiUrl = 'https://api.parse.com/1/classes/Place/?include=country';
  var hotelApiUrl = 'https://api.parse.com/1/classes/Hotel';
  var tourApiUrl = 'https://api.parse.com/1/classes/Tour/?include=country,place,hotel';

  beforeEach(inject(function(_$controller_, _$httpBackend_, _apiDataHelper_,
    _Tour_, _Country_, _Place_, _Hotel_){
    Country = _Country_;
    Place = _Place_;
    Hotel = _Hotel_;
    Tour = _Tour_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    apiDataHelper = _apiDataHelper_;
  }));

  function makeController(){
    $controller('ToursController', {$scope: $scope});
  };

  function makeTour(){
    return {
      title: 'A tour',
      country: { objectId: 'a' },
      place: { objectId: 'a' },
      hotel: { objectId: 'a' },
    };
  };

  describe('initialize', function(){
    it('calls query on related services', function(){
      spyOn(Country, 'query');
      spyOn(Place, 'query');
      spyOn(Hotel, 'query');
      spyOn(Tour, 'query');
      makeController();
      expect(Country.query).toHaveBeenCalled();
      expect(Place.query).toHaveBeenCalled();
      expect(Hotel.query).toHaveBeenCalled();
      expect(Tour.query).toHaveBeenCalled();
    })
  });

  describe('controller functions', function(){

    beforeEach(function(){
      makeController();
    });

    it('showForm', function(){
      expect($scope.hiddenForm).toBe(true);
      $scope.showForm();
      expect($scope.hiddenForm).toBe(false);
      expect($scope.newTour.title).toBe(null);
    });

    it('hideForm', function(){
      $scope.hiddenForm = false;
      $scope.hideForm();
      expect($scope.hiddenForm).toBe(true);
    });

    it('editTour', function(){
      var tour_template = makeTour();
      var tour = angular.copy(tour_template);
      $scope.editTour(tour);
      expect(tour.draft).toEqual(tour_template);
      expect(tour.editMode).toBe(true);
    });

    it('cancelEdit', function(){
      var tour = makeTour();
      tour.editMode = true;
      $scope.cancelEdit(tour);
      expect(tour.editMode).toBe(undefined);
    });

    it('saveTour call to Parse.com', function(){
      var tour = makeTour();
      spyOn(apiDataHelper, 'createPointer');
      $httpBackend.whenGET(countryApiUrl).respond(200);
      $httpBackend.whenGET(placeApiUrl).respond(200);
      $httpBackend.whenGET(hotelApiUrl).respond(200);
      $httpBackend.whenGET(tourApiUrl).respond(200);
      $httpBackend.expectPUT(tourApiUrl).respond(200, JSON.stringify(tour));
      $scope.editTour(tour);
      $scope.saveTour(tour);
      expect(apiDataHelper.createPointer).toHaveBeenCalled();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('addTour call to Parse.com', function(){
      var tour = makeTour();
      spyOn(apiDataHelper, 'createPointer');
      $httpBackend.whenGET(countryApiUrl).respond(200);
      $httpBackend.whenGET(placeApiUrl).respond(200);
      $httpBackend.whenGET(hotelApiUrl).respond(200);
      $httpBackend.whenGET(tourApiUrl).respond(200);
      $httpBackend.expectPOST(tourApiUrl).respond(201, JSON.stringify(tour));
      $scope.addTour(tour);
      expect(apiDataHelper.createPointer).toHaveBeenCalled();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('deleteTour call to Parse.com', function(){
      var tour = makeTour();
      $httpBackend.whenGET(countryApiUrl).respond(200);
      $httpBackend.whenGET(placeApiUrl).respond(200);
      $httpBackend.whenGET(hotelApiUrl).respond(200);
      $httpBackend.whenGET(tourApiUrl).respond(200);
      $httpBackend.expectDELETE(tourApiUrl).respond(200);
      $scope.deleteTour(tour);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });
});
