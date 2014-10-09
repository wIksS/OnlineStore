app.controller('CreateProductCtrl', function CreateProductCtrl($scope, $location, $http, productResource, formDataObject) {
    $scope.createProduct = function (product, picture) {
        product.picture = picture;
        return $http({
            method: 'POST',
            url: '/create-item',
            headers: {
                'Content-Type': undefined
            },
            data: product,
            transformRequest: formDataObject,
        }).success(function() {
            $location.path('/');
        });
    };
});