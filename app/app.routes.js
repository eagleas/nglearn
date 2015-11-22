angular.module('tn-routing', ['ngRoute', 'ngResource'])
  .config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
    .when('/', {
      templateUrl: "app/components/tour/index.html",
      controller: 'ToursController',
    })
    .when('/tours/:objectId', {
      templateUrl: 'app/components/tour/tour.html',
      controller: 'TourController'
    })
    .when('/adm/tours', {
      templateUrl: "app/components/tour/index.html",
      controller: 'ToursController',
      admFlag: true,
    })
    .when('/adm/countries', {
      templateUrl: 'app/components/country/countries.html',
      controller: 'CountriesController',
      admFlag: true
    })
    .when('/adm/places', {
      templateUrl: 'app/components/place/places.html',
      controller: 'PlacesController',
      admFlag: true
    })
    .when('/adm/hotels', {
      templateUrl: 'app/components/hotel/hotels.html',
      controller: 'HotelsController',
      admFlag: true
    })
    .otherwise({
      redirectTo: '/'
    })
  })

  .run(function($rootScope, $route, $location){
    $rootScope.$on("$locationChangeSuccess", function(){
      var path = $location.path();
      var route = $route.routes[path];
      if (route && route.admFlag) {
        $rootScope.admFlag = true;
      } else {
        $rootScope.admFlag = false;
      }
    });
  });
