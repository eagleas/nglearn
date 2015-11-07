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

