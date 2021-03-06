(function() {
  'use strict';
  var LegalMobile = angular.module('LegalMobile');

  LegalMobile.controller('HomeController', function($scope, $timeout, ExampleService) {

       $scope.doRefresh = function() {
         ExampleService.getAll().success(function(data){
           $scope.items=data.results;
           console.log(data.results);

           // close pull to refresh loader
           $scope.$broadcast('scroll.refreshComplete');
         });

       };

       $scope.doRefresh();

    $scope.onItemDelete=function(item){
      ExampleService.delete(item.objectId);
      $scope.items.splice($scope.items.indexOf(item),1);
    };
  });
})();
