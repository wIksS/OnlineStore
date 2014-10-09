app.controller('CreateProductCtrl', function CreateProductCtrl($scope, $location, productResource) {
    $scope.createProduct = function(product) {
        console.log('in func');
        productResource.create(product)
            .then(function (data) {
                console.log('in promise');
                $location.path('/');
            })
    };
});