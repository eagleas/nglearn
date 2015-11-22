angular.module('tnTour', ['ngRoute', 'ngResource', 'tn-routing', 'shared'])

  .config(function($locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.headers.common = {
      'X-Parse-Application-Id': 'Pb2jFmiCyCOKDPr0JIQBFYlduDtlPaqJ8A1oFYWz',
      'X-Parse-REST-API-Key': 'uK7LoJdIifGCLMhZJ3BS0YS5FpXwNHwIreKUiPSC'
    }
  })


