'use strict'

app.controller('RegisterCtrl', function ($scope, $location, auth, notifier) {
    $scope.signup = function (user) {
        auth.signup(user).then(function (success) {
            notifier.success('Registration successful!');
            $location.path('/');
        })
    }
});