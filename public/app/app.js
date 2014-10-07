'use strict';

var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/partials/home',
        controller: 'HomeCtrl'
    })
    .when('/login', {
        templateUrl: '/partials/login',
        controller: 'LoginCtrl'
    })
    .when('/register', {
        templateUrl: '/partials/register',
        controller: 'RegisterCtrl'
    })
    .when('/profile', {
        templateUrl: '/partials/profile',
        controller: 'ProfileCtrl'
    })
    .when('/users', {
        templateUrl: '/partials/users-list',
        controller: 'UserListCtrl'
    });
})
.value('toastr', toastr);

//app.controller('HomeCtrl',
//    function HomeCtrl($scope) {
//        $scope.greet = 'Hi from Angular!';
//});

//app.controller('LoginCtrl',
//    function HomeCtrl($scope) {
//    //$scope.greet = 'Hi from Angular!';
//});