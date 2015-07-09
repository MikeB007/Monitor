//module
"use strict";
var sampleAPP = angular.module("sampleAPP", ['ngRoute', 'ngResource']);


angular.module('job.models', [])
    .service('Job', ['Restangular', function(Restangular) {
        var Job = Restangular.service('jobs');

        Restangular.extendModel('jobs', function(model) {
            model.getResult = function() {
                if (this.status == 'complete') {
                    if (this.passed === null) return "Finished";
                    else if (this.passed === true) return "Pass";
                    else if (this.passed === false) return "Fail";
                }
                else return "Running";
            };

            return model;
        });

        return Job;
    }]);

angular.module('job.controllers', [])
    .controller('jobsController', ['$scope', 'Job', function($scope, Job) {
        var limit = 20;
        $scope.loadJobs = function() {
            Job.getList({ full: true, limit: limit }).then(function(jobs) {
                $scope.jobs = jobs;
                limit += 10;
            });
        };
        $scope.loadJobs();
    }]);





