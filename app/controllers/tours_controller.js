
angular.module('tnTour').controller('ToursController', ['$scope', 'Tour', 'Country', function($scope, Tour, Country){

  $scope.tours = Tour.query();
  $scope.countries = Country.query();

  $scope.hiddenForm = true;

  $scope.clearForm = function(){
    $scope.newTour = $scope.emptyTour()
  }

  $scope.showForm = function(){
    $scope.clearForm();
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    $scope.hiddenForm = true;
  }

  $scope.emptyTour = function(){
    return {title: null, country: null, price: null, duration: null, text: null};
  }

  $scope.clearForm();

  $scope.addTour = function(newTour){
    newTour.slug = url_slug(newTour.title);
    $scope.tours.push(angular.copy(newTour));
    $scope.hideForm();
    $scope.clearForm();
    store();
  }

  $scope.deleteTour = function(tour){
    var index = $scope.tours.indexOf(tour);
    if (index > -1) {
      $scope.tours.splice(index, 1);
    }
    store();
  }

  $scope.editTour = function(tour){
    tour.draft = angular.copy(tour);
    tour.editMode = true;
  }

  $scope.saveTour = function(tour){
    tour.draft.slug = url_slug(tour.draft.title);
    angular.copy(tour.draft, tour);
    store();
  }

  $scope.cancelEdit = function(tour){
    tour.editMode = false;
  }

}]);
