angular.module('tn-routing', ['ngRoute', 'ngResource'])
  .config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
    .when('/', {
      templateUrl: "components/home/list.html",
      controller: 'HomeController',
    })
    .when('/tours/:objectId', {
      templateUrl: 'components/home/tour.html',
      controller: 'TourController'
    })
    .when('/adm/tours', {
      templateUrl: "components/tour/list.html",
      controller: 'ToursController',
      admFlag: true,
    })
    .when('/adm/countries', {
      templateUrl: 'components/country/countries.html',
      controller: 'CountriesController',
      admFlag: true
    })
    .when('/adm/places', {
      templateUrl: 'components/place/places.html',
      controller: 'PlacesController',
      admFlag: true
    })
    .when('/adm/hotels', {
      templateUrl: 'components/hotel/hotels.html',
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
