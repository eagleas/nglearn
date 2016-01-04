
describe('ToursController', function(){

  beforeEach(module('tnTour'));

  var $scope = {};
  var Hotel, Tour;
  var $controller, $httpBackend, apiDataHelper;
  var tourApiUrl = 'https://api.parse.com/1/classes/Tour/?include=country,place,hotel';
  var Country = jasmine.createSpyObj('CountryStub', ['all']);
  var Place = jasmine.createSpyObj('PlaceStub', ['all']);
  var Hotel = jasmine.createSpyObj('HotelStub', ['all']);
  var Tour = jasmine.createSpyObj('TourStub', ['all', 'add', 'remove', 'store', 'registerObserverCallback']);

  beforeEach(inject(function(_$controller_, _$httpBackend_, _apiDataHelper_){
    Country.all.and.returnValue([]);
    Place.all.and.returnValue([]);
    Hotel.all.and.returnValue([]);
    Tour.all.and.returnValue([]);
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    apiDataHelper = _apiDataHelper_;
    makeController();
  }));

  function makeController(){
    $controller('ToursController', {$scope: $scope,
      Country: Country, Place: Place, Hotel: Hotel, Tour: Tour});
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
      makeController();
      expect(Country.all).toHaveBeenCalled();
      expect(Place.all).toHaveBeenCalled();
      expect(Hotel.all).toHaveBeenCalled();
      expect(Tour.all).toHaveBeenCalled();
    })
  });

  describe('controller functions', function(){

    it('showForm', function(){
      expect($scope.hiddenForm).toBe(true);
      $scope.showForm();
      expect($scope.hiddenForm).toBe(false);
      expect($scope.newTour.title).not.toBeDefined();
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

    it('addTour call Tour.add', function(){
      var tour = makeTour();
      $scope.addTour(tour);
      expect(Tour.add).toHaveBeenCalled();
      expect($scope.hiddenForm).toBe(true);
      expect($scope.newTour).toEqual({});
    });

    it('deleteTour call Tour.remove', function(){
      var tour = makeTour();
      Tour.all.and.returnValue([tour]);
      makeController();
      expect($scope.tours.length).toBe(1);
      $scope.deleteTour(tour);
      expect(Tour.remove).toHaveBeenCalled();
    });

    it('saveTour call Tour.store', function(){
      var tour = makeTour();
      $scope.editTour(tour);
      $scope.saveTour(tour);
      expect(Tour.store).toHaveBeenCalled();
    });

  });
});
