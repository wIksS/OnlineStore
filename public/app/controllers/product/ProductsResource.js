/**
 * Created by Виктор on 9.10.2014 г..
 */
app.factory('ProductsResource', function($resource) {
    var ProductsResource = $resource('api/products', {}, {
        'query': {
            method: 'GET', isArray: false
        }
    });

    return ProductsResource;
})