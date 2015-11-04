angular.module('tnTour')
  .provider('Tour', function(){

    this.$get = ['$resource', function($resource){
      var Country = $resource(
        'https://api.parse.com/1/classes/Tour/:objectId',
        { objectId: '@objectId'},
        {
          query: { isArray: true, transformResponse: parseResult },
          update: { method: 'PUT' }
        }
      )

      function parseResult(response){
        data = angular.fromJson(response);
        return data.results;
      }

      return Country;
    }];

  });
