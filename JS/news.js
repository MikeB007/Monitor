//module
"use strict";
var newsAPP = angular.module("newsAPP", ['ngRoute', 'ngResource']);

newsAPP.service('newsService',function(){
    this.location = "CBC";
});

newsAPP.controller("newsCtrl", ['$scope', '$http', function ($scope,$http) {
       $http.get("http://www.cnbc.com/franchise/20991458?callback=breakingNews&mode=breaking_news")
  .success(function(response) {$scope.news = response;});
}]);

//not working yet
/*newsAPP.controller("newsCTRL", ['$scope', '$http', function ($scope,$http) {
    console.log('new controller starting 0');
    var url = "http://www.batstrading.com/json/bzx/book/td";
    var myRequest = new XMLHttpRequest();
    console.log('new controller starting 1');
    myRequest.onload=function(response){
        var buff = myRequest.response;
        console.log('new controller starting');
        console.log(buff);
    }
    myRequest.open('get',url,true);
    myRequest.responseType= "json";
    myRequest.send();
}]);
*/

newsAPP.controller("newsCTRLJSONP", ['$scope','$resource', function ($scope, $resource) {
    $scope.newsUrl = 'http://www.cnbc.com/franchise/20991458?&mode=breaking_news';
    $scope.newsAPI  = $resource($scope.newsUrl,{callback: "JSON_CALLBACK"},{get: {method: "JSONP"}});
    $scope.news= $scope.newsAPI.get({});
    console.log('after the call News');
    $scope.newsLink = 'http://www.cnbc.com';
    $scope.receivedDate= '';
}]);

function breakingNEWSS(msg){
    alert (msg);
}

function pDate(dt){
    var pattern = /(\d{4})(\d{2})(\d{2})/;
    var fdt = new Date(dt.replace(pattern, '$3'));
    console.log(fdt);
    return fdt;
}