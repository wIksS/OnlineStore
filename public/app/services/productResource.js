app.factory('productResource', function($resource, $q, $http) {
    function makeRequest(url, data) {
        data = data || {};
        var deferred = $q.defer();

        $http.post(url, data).success(function(response) {
            if (response.success) {
                deferred.resolve(response);
            }
            else {
                deferred.resolve(false);
            }
        });

        return deferred.promise;
    }

    function getRequest(url) {
        var deferred = $q.defer();

        $http.get(url).success(function(response) {
            if (response.success) {
                deferred.resolve(response);
            }
            else {
                deferred.resolve(false);
            }
        });

        return deferred.promise;
    }
    
    return {
        create: function(product) {
            return makeRequest('/create-item', {
                name: product.name,
                description: product.description,
                colors: product.colors,
                quantity:product.quantity,
                price:product.price
            });
        }
    }
});