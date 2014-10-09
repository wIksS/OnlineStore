'use strict';

var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource'])
.value('toastr', toastr);

app.config(function ($routeProvider) {
    
    var routeUserChecks = {
        adminRole: {
            authenticate: function (auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function (auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
    .when('/', {
        templateUrl: '/partials/home',
        controller: 'HomeCtrl'
    })
<<<<<<< HEAD
    .when('/products', {
        templateUrl: '/products',
=======
	.when('/products', {
        templateUrl: '/partials/products',
>>>>>>> 29380c1e7d5fa7d5457e7a744482bcbfb48f595c
        controller: 'ProductsCtrl'
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
        controller: 'ProfileCtrl',
        resolve: routeUserChecks.authenticated
    })
    .when('/users', {
        templateUrl: '/partials/users-list',
        controller: 'UserListCtrl',
        resolve: routeUserChecks.adminRole
    })
    .otherwise({ redirectTo: '/' });
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});