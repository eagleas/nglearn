
describe('ToursController', function(){

  beforeEach(module('tnTour'));

  var $scope = {};
  var Country, Place, Hotel, Tour;
  var $controller;

  beforeEach(inject(function(_$controller_, _$httpBackend_, _Tour_, _Country_, _Place_, _Hotel_){
    Country = _Country_;
    Place = _Place_;
    Hotel = _Hotel_;
    Tour = _Tour_;
    $controller = _$controller_;
  }));

  function makeController(){
    $controller('ToursController', {$scope: $scope});
  };

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
  });

  it('showForm', function(){
    makeController();
    expect($scope.hiddenForm).toBe(true);
    $scope.showForm();
    expect($scope.hiddenForm).toBe(false);
    expect($scope.newTour.title).toBe(null);
  });
  it('showForm', function(){
    makeController();
    $scope.hiddenForm = false;
    $scope.hideForm();
    expect($scope.hiddenForm).toBe(true);
  });

});
