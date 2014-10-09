app.directive('searchItems',
    function searchItems() {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/search-items',
        replace: false,
        scope: {
            search: '='
        }
    }
});