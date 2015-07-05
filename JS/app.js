//module
"use strict";
var stocks = angular.module("StockMonitor", ['ngRoute', 'ngResource']);

//ROUTES
stocks.config(function ($routeProvider) {

    $routeProvider

   .when('/', {
        templateUrl: 'html/home.htm',
        controller: 'homeController'
        })

  .when('/result', {
        templateUrl: 'html/result.htm',
        controller: 'resultController'
        });
    //console.log($routeProvider)
});

//SERVICE
stocks.service('l2Service',function(){
    this.ticker = "TD.TO";
});
//CONTROLLERS

stocks.controller("homeController", ['$scope', 'l2Service', function ($scope,l2Service) {
    $scope.ticker =l2Service.ticker;
    $scope.$watch('ticker',function(){
    l2Service.ticker = $scope.ticker;
    //console.log($scope);
    })
}]);

stocks.controller("resultController", ['$scope','$resource','l2Service', function ($scope, $resource,l2Service) {
    
    $scope.ticker = l2Service.ticker;
    $scope.myUrl = 'https://chartapi.finance.yahoo.com/instrument/3.0/' + $scope.ticker + '/chartdata;type=quote;ys=2015;yz=2/json';
    //console.log('targetting:' +  $scope.myUrl);
    $scope.l2API  = $resource($scope.myUrl,{callback: "JSON_CALLBACK"},{get: {method: "JSONP"}});
    $scope.l2results= $scope.l2API.get({});
    console.log($scope.l2results);
    $scope.parseDate= pDate;
    console.log($scope);
}]);

    
  var pDate =function(dt){
    var st =  '20130511';
        console.log(dt);
          st= dt.toString;
      console.log(st);
      var pattern = /(\d{4})(\d{2})(\d{2})/;
    var fdt = new Date(dt.replace(pattern, '$1-$2-$3'));
    console.log(fdt);
    return fdt;
}
    


//SERVICES

//DIRECTIVES




