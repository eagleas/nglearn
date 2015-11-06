angular.module('tnTour', ['ngRoute', 'ngResource'])

  .config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
    .when('/', {
      templateUrl: "app/views/list.html",
      controller: 'ToursController',
    })
    .when('/tours/:objectId', {
      templateUrl: 'app/views/tour.html',
      controller: 'TourController'
    })
    .when('/adm/tours', {
      templateUrl: "app/views/list.html",
      controller: 'ToursController',
      admFlag: true,
    })
    .when('/adm/countries', {
      templateUrl: 'app/views/countries.html',
      controller: 'CountriesController',
      admFlag: true
    })
    .otherwise({
      redirectTo: '/'
    })

    $locationProvider.html5Mode(true);

    $httpProvider.defaults.headers.common = {
      'X-Parse-Application-Id': 'Pb2jFmiCyCOKDPr0JIQBFYlduDtlPaqJ8A1oFYWz',
      'X-Parse-REST-API-Key': 'uK7LoJdIifGCLMhZJ3BS0YS5FpXwNHwIreKUiPSC'
    }
  })
  .run(function($rootScope, $route, $location){
    var route = $route.routes[$location.$$path];
    if (route && route.admFlag) {
      $rootScope.admFlag = true;
    }
  });

  var allTours;

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
