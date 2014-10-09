app.controller('ProfileCtrl', function ($scope, $location, auth, identity, notifier) {
    var currentUser = identity.getCurrentUser();

    $scope.user = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
        billing: currentUser.billing
    };
    
    $scope.update = function (user) {
        auth.update(user).then(function () {
            $scope.user.firstName = user.firstName;
            $scope.user.lastName = user.lastName;
            $scope.user.address = user.address;
            $scope.user.billing = user.billing;
            notifier.success('Profile updated successfully!');
            $location.path('/');
        });
    }
});