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
    .when('/products', {
        templateUrl: '/products',
        controller: 'ProductsCtrl'
    })
    .when('/admin', {
        templateUrl: '/admin',
        controller: 'AdminCtrl'
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
        .when('/create-item', {
        templateUrl: '/create-item',
        controller: 'CreateProductCtrl'
        })
        .when('/product-details', {
            templateUrl: '/partials/product-details',
            //controller: 'ProductDetailsCtrl'
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