angular.module('tnTour', ['ngRoute'])

  .config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
      templateUrl: "list.html",
      controller: 'ToursController',
    })
    .when('/tours/:slug', {
      templateUrl: 'tour.html',
      controller: 'TourController'
    })
    .when('/adm/tours', {
      templateUrl: "list.html",
      controller: 'ToursController',
      admFlag: true,
    })
    .when('/adm/countries', {
      templateUrl: 'countries.html',
      controller: 'CountriesController',
      admFlag: true
    })
    .otherwise({
      redirectTo: '/'
    })

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $route, $location){
    var route = $route.routes[$location.$$path];
    if (route && route.admFlag) {
      $rootScope.admFlag = true;
    }
  });

  var allTours;
  var allCountries;

  if(typeof(localStorage.countries) != 'undefined') {
    allCountries = JSON.parse(localStorage.countries);
  } else {
    // initial default countries
    allCountries = [ 'Куба', 'Украина', 'Россия' ]
  }


  if(typeof(localStorage.tours) != 'undefined') {
    allTours = JSON.parse(localStorage.tours);
  } else {
    // initial default tours for example
    allTours = [
      {
        slug: 'kariby',
        country: 'Куба',
        title: 'Карибы на неделю на двоих!',
        price: 54420,
        text: 'Карибы – это настоящий рай с кокосовыми пальмами, роскошными пляжами с белым и желтым песком, великолепными закатами и уникальным подводным миром. Удивительная природа сочетает в себе массивные вулканы, лазурный океан, кофейные плантации и богатый животный мир.'
      },
      {
        slug: 'gurzuf-krimea',
        country: 'Украина',
        title: 'Гурзуф (Крым) на месяц',
        price: 100300,
        text:  'Скалолазание в Крыму — дарит восторг и радость, переполняет эмоциями и пьянит. Вы никогда не забудете свое первое восхождение — это непередаваемое ощущение высоты, адреналин и безграничная свобода собственного тела. Вы непременно захотите испытать это чувство вновь.'
      }
    ]
  }
