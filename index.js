var app = angular.module('tnTour', []);

app.controller('TourController', function($scope){

  $scope.hiddenForm = true;

  $scope.showForm = function(){
    console.log('show');
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    console.log('hide');
    $scope.hiddenForm = true;
  }

  $scope.newTour = {title: null, price: null, text: null};

  $scope.addTour = function(newTour){

  }


});
