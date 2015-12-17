
angular.module('tnTour').controller('ToursController', function($scope, apiDataHelper, Tour, Country, Place, Hotel){

  $scope.countries = Country.query();
  $scope.places = Place.query();
  $scope.hotels = Hotel.query();
  $scope.tours = Tour.query();

  $scope.hiddenForm = true;

  function clearForm(){
    $scope.newTour = emptyTour()
  }

  $scope.showForm = function(){
    clearForm();
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    $scope.hiddenForm = true;
  }

  function emptyTour(){
    return {title: null, country: null, price: null, duration: null, text: null};
  }

  function addPointers(tour){
    angular.extend(tour.country,
      apiDataHelper.createPointer('Country', $scope.countries, tour.country.objectId));
    angular.extend(tour.place,
      apiDataHelper.createPointer('Place', $scope.places, tour.place.objectId));
    angular.extend(tour.hotel,
      apiDataHelper.createPointer('Hotel', $scope.hotels, tour.hotel.objectId));
  }

  $scope.addTour = function(newTour){
    addPointers(newTour);
    new Tour(newTour).$save().then(
      function(tour){
        var tourFromServer = angular.extend(tour, newTour);
        $scope.tours.push(tourFromServer);
        $scope.hideForm();
        newTour = emptyTour();
      }
    );
  }

  $scope.deleteTour = function(tour){
    new Tour(tour).$delete().then(
      function(){
        var index = $scope.tours.indexOf(tour);
        if (index > -1) {
          $scope.tours.splice(index, 1);
        }
      }
    );
  }

  $scope.editTour = function(tour){
    tour.draft = angular.copy(tour);
    tour.editMode = true;
  }

  $scope.saveTour = function(tour){
    addPointers(tour.draft);
    new Tour(tour.draft).$update().then(
      function(){
        angular.copy(tour.draft, tour);
      }
    )
  }

  $scope.cancelEdit = function(tour){
    tour.editMode = false;
  }

});
