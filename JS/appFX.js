//module
"use strict";
var FXRateAPP = angular.module("FXRate", ['ngRoute', 'ngResource']);


//SERVICE
FXRateAPP.service('fxService',function(){
    this.rateType = "USDCAD";
});

FXRateAPP.service('newsService',function(){
    this.location = "CBC";
});


FXRateAPP.service('l2Service',function(){
    this.ticker = "TD.TO";
});

//CONTROLLERS

FXRateAPP.controller("rateControllerold", ['$scope', 'fxService', function ($scope,fxService) {
    $scope.rateType =fxService.rateType;
    $scope.$watch('rateType',function(){
        getFXRate.rateType = $scope.rateType;
    //console.log($scope);
    })
}]);


FXRateAPP.controller("rateCtrl", ['$scope', '$http', function ($scope,$http) {
       $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDCAD%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
  .success(function(response) {$scope.rates = response;});
}]);


FXRateAPP.controller("newsCtrl", ['$scope', '$http', function ($scope,$http) {
       $http.get("http://www.cnbc.com/franchise/20991458?callback=breakingNews&mode=breaking_news")
  .success(function(response) {$scope.news = response;});
}]);


FXRateAPP.controller("l2Ctrl", ['$scope', '$http', function ($scope,$http) {
       $http.get("http://www.batstrading.com/json/bzx/book/td")
  .success(function(response) {$scope.l2 = response;})
  .error(function(response) {$scope.l2 =  'error';  });
}]);


FXRateAPP.controller("new", ['$scope', '$http', function ($scope,$http) {
    var myRequest = new XMLHttpRequest();

}]);




FXRateAPP.controller("l2Ctrlold", ['$scope', '$http', function ($scope,$http) {
    //"https://api.getevents.co/event?&lat=41.904196&lng=12.465974";  
    var url = "http://www.batstrading.com/json/bzx/book/td";
                  $http({
                method: 'JSONP',
                url: url
            }).
                $scope.l2 = status;
            }).
            error(function(status) {
               $scope.l2 = 'error';
            });
    
    }]);



FXRateAPP.controller("newsControllerRESORCE", ['$scope','$resource','newsService', function ($scope, $resource,newsService) {
    $scope.myUrl = 'hhttp://www.cnbc.com/franchise/20991458?callback=breakingNews&mode=breaking_news';
    $scope.news  = $resource($scope.myUrl,{callback: "JSON_CALLBACK"},{post: {method: "JSONP"}});
    $scope.newsResults= $scope.FXAPI.post({});
    console.log('showing News:');
    console.log( $scope.newsResults);

}]);


FXRateAPP.controller("newsControllerRESORCE", ['$scope','$resource', function ($scope, $resource) {
    $scope.myUrl = 'http://www.w3schools.com/angular/customers.php';
    $scope.newsAPI  = $resource($scope.myUrl,{callback: "JSON_CALLBACK"},{post: {method: "JSONP"}}); 
    $scope.names= $scope.newsAPI.post({});
    console.log('showing News:'); 

}]);




FXRateAPP.controller('newsControllerHTTP', function($scope, $http) {
    $http.get('http://www.w3schools.com/angular/customers.php')
        .success(function(response) {$scope.names = response;
                                     console.log($scope.names);
                                    });
    
});



FXRateAPP.controller("rateController", ['$scope','$resource','fxService', function ($scope, $resource,fxService) {
    $scope.rateType = fxService.rateType;
    $scope.myUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDCAD%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys?';
    $scope.FXAPI  = $resource($scope.myUrl,{callback: "JSON_CALLBACK"},{post: {method: "JSONP"}});
    $scope.fxResults= $scope.FXAPI.post({});
    console.log('showing fx:');
    console.log( $scope.fxResults);

}]);


FXRateAPP.controller("resultController", ['$scope','$resource','l2Service', function ($scope, $resource,l2Service) {

    $scope.ticker = l2Service.ticker;
    $scope.myUrl = 'https://chartapi.finance.yahoo.com/instrument/3.0/' + $scope.ticker + '/chartdata;type=quote;ys=2015;yz=2/json';
    //console.log('targetting:' +  $scope.myUrl);
    $scope.l2API  = $resource($scope.myUrl,{callback: "JSON_CALLBACK"},{post: {method: "JSONP"}});
    $scope.l2results= $scope.l2API.post({});
    console.log('showing results2:');
    console.log($scope.l2results);
    //$scope.parseDate= pDate;
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




