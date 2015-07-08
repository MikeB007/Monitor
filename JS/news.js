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
newsAPP.controller("newsCTRL", ['$scope', '$http', function ($scope,$http) {
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


