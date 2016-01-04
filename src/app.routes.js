angular.module('tn-routing', ['ngRoute', 'ngResource'])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: "components/home/list.html",
      controller: 'HomeController'
    })
    .when('/tours/:objectId', {
      templateUrl: 'components/home/tour.html',
      controller: 'TourController'
    })
    .when('/adm/tours', {
      templateUrl: "components/tour/list.html",
      controller: 'ToursController'
    })
    .when('/adm/countries', {
      templateUrl: 'components/country/countries.html',
      controller: 'CountriesController',
    })
    .when('/adm/places', {
      templateUrl: 'components/place/places.html',
      controller: 'PlacesController'
    })
    .when('/adm/hotels', {
      templateUrl: 'components/hotel/hotels.html',
      controller: 'HotelsController'
    })
    .otherwise({
      redirectTo: '/'
    })
  });

