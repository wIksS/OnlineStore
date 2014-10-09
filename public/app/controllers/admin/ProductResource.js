/**
 * Created by Виктор on 10.10.2014 г..
 */
app.factory('ProductResource', function($resource) {
    var ProductsResource = $resource('/products/:id', {id:'@id'});

    return ProductsResource;
})