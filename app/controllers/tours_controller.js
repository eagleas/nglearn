
angular.module('tnTour').controller('ToursController', ['$scope', 'Tour', 'Country', function($scope, Tour, Country){

  $scope.tours = Tour.query();
  $scope.countries = Country.query();

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

  function getCountryName(objectId){
    return $scope.countries.find(function(e){
      return e.objectId == objectId;
    }).name;
  }

  $scope.addTour = function(newTour){
    angular.extend(newTour.cntry, {
      __type: 'Pointer',
      className: 'Country',
      name: getCountryName(newTour.cntry.objectId)
    })
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
    angular.extend(tour.draft.cntry, {
      __type: 'Pointer',
      className: 'Country',
      name: getCountryName(tour.draft.cntry.objectId)
    })
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
