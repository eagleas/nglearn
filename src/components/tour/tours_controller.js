
angular.module('tnTour').controller('ToursController', function($scope, $q, _, apiDataHelper, Tour, Country, Place, Hotel){

  $scope.countries = Country.all();
  $scope.places = Place.all();
  $scope.hotels = Hotel.all();
  $scope.tours = Tour.all();

  $scope.hiddenForm = true;

  Tour.registerObserverCallback(function(){
    $scope.tours = Tour.all();
    $scope.$$phase || $scope.$digest();
  });

  $q.all([$scope.tours.$promise, $scope.countries.$promise, $scope.hotels.$promise]).then(function(){
    angular.forEach($scope.tours, function(tour){
      angular.extend(tour.country, _.find($scope.countries, 'objectId', tour.country.objectId));
      angular.extend(tour.place, _.find($scope.places, 'objectId', tour.place.objectId));
      angular.extend(tour.hotel, _.find($scope.hotels, 'objectId', tour.hotel.objectId));
    });
  });

  $scope.showForm = function(){
    $scope.newTour = {};
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    $scope.hiddenForm = true;
  }

  $scope.addTour = function(newTour){
    Tour.add(newTour);
    $scope.hideForm();
    $scope.newTour = {};
  }

  $scope.deleteTour = function(tour){
    Tour.remove(tour);
  }

  $scope.editTour = function(tour){
    var draft = angular.copy(tour);
    tour.draft = draft;
    tour.editMode = true;
  }

  $scope.saveTour = function(tour){
    Tour.store(tour);
  }

  $scope.cancelEdit = function(tour){
    delete tour.editMode;
  }

});
