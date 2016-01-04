angular.module('tnTour').controller('BreadcrumbsController', function($scope, $location){

  function breadcrumbs(){
    var m = $location.url().match(/^\/adm\/(.*)/);
    if (m) $scope.crumb = m[1];
  };

  breadcrumbs();

  $scope.$on("$locationChangeSuccess", function(){
    breadcrumbs();
  });
});
