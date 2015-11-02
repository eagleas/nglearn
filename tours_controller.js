
angular.module('tnTour').controller('ToursController', function($scope){

  $scope.tours = allTours;
  $scope.countries = allCountries;

  $scope.store = function(){
    localStorage.tours = JSON.stringify($scope.tours);
  }

  $scope.hiddenForm = true;

  $scope.showForm = function(){
    $scope.clearForm();
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    $scope.hiddenForm = true;
  }

  $scope.emptyTour = function(){
    return {title: null, price: null, text: null};
  }

  $scope.clearForm = function(){
    $scope.newTour = $scope.emptyTour()
  }

  $scope.clearForm();

  $scope.addTour = function(newTour){
    newTour.slug = url_slug(newTour.title);
    $scope.tours.push(angular.copy(newTour));
    $scope.hideForm();
    $scope.clearForm();
    $scope.store();
  }

  $scope.deleteTour = function(tour){
    var index = $scope.tours.indexOf(tour);
    if (index > -1) {
      $scope.tours.splice(index, 1);
    }
    $scope.store();
  }

  $scope.editTour = function(tour){
    tour.draft = angular.copy(tour);
    tour.editMode = true;
  }

  $scope.saveTour = function(tour){
    tour.draft.slug = url_slug(tour.draft.title);
    angular.copy(tour.draft, tour);
    $scope.store();
  }

  $scope.cancelEdit = function(tour){
    tour.editMode = false;
  }

});
