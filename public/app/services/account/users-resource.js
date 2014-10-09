'use strict'

app.factory('UsersResource', function ($resource) {
    var url = '/api/users/:id';

    var UsersResource = $resource(url, { _id: '@id' }, { update: { method: 'PUT', isArray: false } });
    
    //UsersResource.prototype.isAdmin = function () {
    //    return this.roles && this.roles.indexOf('admin') > -1;
    //};
    
    return UsersResource;
});