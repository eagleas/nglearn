
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

  $scope.addTour = function(newTour){
    var country_name = $scope.countries.find(function(e){
      return e.objectId == newTour.cntry.objectId;
    }).name;
    newTour.cntry = angular.extend(newTour.cntry, {__type: 'Pointer', className: 'Country', name: country_name})
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
    console.log(tour.draft.cntry.objectId);
  }

  $scope.saveTour = function(tour){
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
