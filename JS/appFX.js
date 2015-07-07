//module
"use strict";
var FXRateAPP = angular.module("FXRate", ['ngRoute', 'ngResource']);


//SERVICE
FXRateAPP.service('fxService',function(){
    this.rateType = "USDCAD";
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


FXRateAPP.controller("rateController", ['$scope','$resource','fxService', function ($scope, $resource,fxService) {

    $scope.rateType = fxService.rateType;
    $scope.myUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDCAD%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
    $scope.FXAPI  = $resource($scope.myUrl,{callback: "JSON_CALLBACK"},{get: {method: "JSONP"}});
    $scope.fxResults= $scope.FXAPI.get({});
    console.log($scope);
    console.log($scope.fxResults);
}]);


FXRateAPP.controller("resultController", ['$scope','$resource','l2Service', function ($scope, $resource,l2Service) {

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




