'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/home',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl',
    function HomeCtrl($scope) {
        $scope.greet = 'Hi from Angular!';
    });