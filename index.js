var app = angular.module('tnTour', []);

app.controller('TourController', function($scope){

  $scope.hiddenForm = true;

  $scope.showForm = function(){
    $scope.clearForm();
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    $scope.hiddenForm = true;
  }

  $scope.tours = [
    {
      title: 'Карибы на неделю на двоих',
      price: 54420,
      text: 'Карибы – это настоящий рай с кокосовыми пальмами, роскошными пляжами с белым и желтым песком, великолепными закатами и уникальным подводным миром. Удивительная природа сочетает в себе массивные вулканы, лазурный океан, кофейные плантации и богатый животный мир.'
    },
    {
      title: 'Гурзуф (Крым) на месяц',
      price: 100300,
      text:  'Скалолазание в Крыму — дарит восторг и радость, переполняет эмоциями и пьянит. Вы никогда не забудете свое первое восхождение — это непередаваемое ощущение высоты, адреналин и безграничная свобода собственного тела. Вы непременно захотите испытать это чувство вновь.'
    }
  ]

  $scope.emptyTour = function(){
    return {title: null, price: null, text: null};
  }

  $scope.clearForm = function(){
    $scope.newTour = $scope.emptyTour()
  }

  $scope.clearForm();

  $scope.addTour = function(newTour){
    $scope.tours.push(angular.copy(newTour));
    $scope.hideForm();
    $scope.clearForm();
  }

  $scope.deleteTour = function(tour){
    var index = $scope.tours.indexOf(tour);
    if (index > -1) {
      $scope.tours.splice(index, 1);
    }
  }

  $scope.editTour = function(tour){
    tour.draft = angular.copy(tour);
    tour.editMode = true;
  }

  $scope.saveTour = function(tour){
    angular.copy(tour.draft, tour);
  }

  $scope.cancelEdit = function(tour){
    tour.editMode = false;
  }

});
