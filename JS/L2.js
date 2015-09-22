//module
"use strict";
var L2App = angular.module("L2App", ['ngRoute', 'ngResource']);

L2App.controller("l2CTRLHTTP", ['$scope', '$http', function ($scope,$http) {
       $http.get("http://www.batstrading.com/json/bzx/book/td?")
           .success(function(response) {$scope.l2 = response;});
}]);

L2App.controller("l2CTRLJSONP", ['$scope','$resource', function ($scope, $resource) {
    $scope.l2Url = 'http://localhost:8080/json/bzx/book/td';
    $scope.l2API  = $resource($scope.l2Url);
    $scope.l2="2";
    $scope.l3= $scope.l2API.get({});
    console.log('after the call L2');
    console.log($scope);
}]);

L2App.controller("l2CTRLJSONP2", ['$scope', '$http', function ($scope,$http) {
    $http.jsonp("http://www.batstrading.com/json/bzx/book/td")
        .success(function(data,status,headers,config) {$scope.l2 = data;console.log(data.found)})
        .error(function(data,status,headers,config) {$scope.error = true;});

}]);


L2App.controller('l2CTRLXML', ['$scope', function ($scope) {
    var rulesrequest = new XMLHttpRequest();
    rulesrequest.onreadystatechange = function () {
        $scope.$apply(function () {
            if (rulesrequest.readyState == 4 && rulesrequest.status == 200) {
                $scope.l2 = JSON.parse(rulesrequest.responseText);
            }
        });
    }
    rulesrequest.open("GET", "http://www.batstrading.com/json/bzx/book/td", true);
    rulesrequest.send();
}]);