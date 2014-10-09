/**
 * Created by Виктор on 9.10.2014 г..
 */
app.controller('ProductsCtrl'['$scope','ProductsResource',function HomeCtrl($scope,ProductsResource) {
    var products = ProductsResource.query();
    alert(products);
}]);