
angular.module('tnTour').controller('ToursController',
  ['$scope', 'Tour', 'Country', 'Place', function($scope, Tour, Country, Place){

  $scope.tours = Tour.query();
  $scope.countries = Country.query();
  $scope.places = Place.query();

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
    return {title: null, cntry: null, price: null, duration: null, text: null};
  }

  clearForm();

  function getName(array, objectId){
    return array.find(function(e){
      return e.objectId == objectId;
    }).name;
  }

  function extendTour(tour){
    angular.extend(tour.cntry, {
      __type: 'Pointer',
      className: 'Country',
      name: getName($scope.countries,tour.cntry.objectId)
    });
    angular.extend(tour.place, {
      __type: 'Pointer',
      className: 'Place',
      name: getName($scope.places, tour.place.objectId)
    });
  }

  $scope.addTour = function(newTour){
    extendTour(newTour);
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
    extendTour(tour.draft);
    new Tour(tour.draft).$update().then(
      function(){
        angular.copy(tour.draft, tour);
      }
    )
  }

  $scope.cancelEdit = function(tour){
    tour.editMode = false;
  }

}]);
