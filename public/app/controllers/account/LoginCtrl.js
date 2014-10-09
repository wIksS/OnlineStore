'use strict'

app.controller('LoginCtrl',
    function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;
    
    $scope.login = function (user) {
        auth.login(user).then(function (success) {
            if (success) {
                $scope.user = identity.currentUser();
                notifier.success('Successful login!');
            }
            else {
                notifier.error('Not valid input!');
            }
        });
    };
    
    $scope.logout = function () {
        auth.logout().then(function () {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            
            $location.path('/');
        });
    }

    $scope.loggedIn = function () {
        if (identity.isAuthenticated()) {
            return true;
        } else {
            return false;
        }
    }

    $scope.isAdmin = function () {
        if (identity.isAdmin()) {
            return true;
        } else {
            return false;
        }
    }
});