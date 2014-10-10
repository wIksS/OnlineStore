/**
 * Created by Виктор on 9.10.2014 г..
 */
app.controller('ProductsCtrl', ['$scope', 'ProductsResource', function ProductsCtrl($scope, ProductsResource) {
    $scope.products = ProductsResource();
    //console.log($scope.products)
    //alert(products);
}]);