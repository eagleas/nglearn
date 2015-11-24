angular.module('tnTour')
  .provider('Tour', function(){

    this.$get = ['$resource', function($resource){
      var Tour = $resource(
        'https://api.parse.com/1/classes/Tour/:objectId?include=country,place,hotel',
        { objectId: '@objectId' },
        {
          query: { isArray: true, transformResponse: parseResult },
          update: { method: 'PUT' }
        }
      )

      function parseResult(response){
        data = angular.fromJson(response);
        return data.results;
      }

      return Tour;
    }];

  });
