
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
      spyOn(Country, 'all');
      spyOn(Place, 'query');
      spyOn(Hotel, 'query');
      spyOn(Tour, 'query');
      makeController();
      expect(Country.all).toHaveBeenCalled();
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
      expect(tour.editMode).not.toBeDefined();
    });

    it('saveTour call to Parse.com', function(){
      var tour = makeTour();
      spyOn(apiDataHelper, 'createPointer');
      $httpBackend.whenGET(countryApiUrl).respond(200);
      $httpBackend.whenGET(placeApiUrl).respond(200);
      $httpBackend.whenGET(hotelApiUrl).respond(200);
      $httpBackend.whenGET(tourApiUrl).respond(200);
      $httpBackend.expectPUT(tourApiUrl).respond(200, tour);
      $scope.editTour(tour);
      $scope.saveTour(tour);
      expect(apiDataHelper.createPointer).toHaveBeenCalled();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('saveTour update selected tour attribute', function(){
      var tour = makeTour();
      var blank = { results: [] };
      $httpBackend.whenGET(countryApiUrl).respond(200, blank);
      $httpBackend.whenGET(placeApiUrl).respond(200, blank);
      $httpBackend.whenGET(hotelApiUrl).respond(200, blank);
      $httpBackend.whenGET(tourApiUrl).respond(200, blank);
      var new_title = 'Aaaa';
      $httpBackend.whenPUT(tourApiUrl).respond(200, {objectId: 'abc', title: new_title});
      spyOn(apiDataHelper, 'createPointer');
      makeController();
      $scope.editTour(tour);
      tour.draft.title = new_title;
      $scope.saveTour(tour);
      $httpBackend.flush();
      expect(tour.title).toBe(new_title);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });


    it('addTour call to Parse.com', function(){
      var tour = makeTour();
      spyOn(apiDataHelper, 'createPointer');
      $httpBackend.whenGET(countryApiUrl).respond(200);
      $httpBackend.whenGET(placeApiUrl).respond(200);
      $httpBackend.whenGET(hotelApiUrl).respond(200);
      $httpBackend.whenGET(tourApiUrl).respond(200);
      $httpBackend.expectPOST(tourApiUrl).respond(201, tour);
      $scope.addTour(tour);
      expect(apiDataHelper.createPointer).toHaveBeenCalled();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('addTour add extended tour into array', function(){
      var tour = makeTour();
      spyOn(apiDataHelper, 'createPointer');
      var blank = { results: [] };
      $httpBackend.whenGET(countryApiUrl).respond(200, blank);
      $httpBackend.whenGET(placeApiUrl).respond(200, blank);
      $httpBackend.whenGET(hotelApiUrl).respond(200, blank);
      $httpBackend.whenGET(tourApiUrl).respond(200, blank);
      var objId = 'a1';
      $httpBackend.whenPOST(tourApiUrl).respond(201, {objectId: objId});
      expect($scope.tours.length).toBe(0);
      $scope.addTour(tour);
      $httpBackend.flush();
      expect($scope.tours.length).toBe(1);
      expect($scope.tours[0].objectId).toBe(objId);
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

    it('deleteTour remove tour from array', function(){
      var tour = makeTour();
      var blank = { results: [] };
      $httpBackend.whenGET(countryApiUrl).respond(200, blank);
      $httpBackend.whenGET(placeApiUrl).respond(200, blank);
      $httpBackend.whenGET(hotelApiUrl).respond(200, blank);
      $httpBackend.whenGET(tourApiUrl).respond(200, blank);
      $httpBackend.whenDELETE(tourApiUrl).respond(200);
      $scope.tours = [tour, {title: 'one'}];
      $scope.deleteTour(tour);
      $httpBackend.flush();
      expect($scope.tours.length).toBe(1);
      expect($scope.tours[0].title).toBe('one');
    });

  });
});
