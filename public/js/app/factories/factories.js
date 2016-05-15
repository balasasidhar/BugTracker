/**
 * Created by SASi on 22-Apr-16.
 */

'use strict';

var apiPrefix = "http://localhost:3000/api";

app.factory('Register', ['$resource', function ($resource) {
    return $resource(apiPrefix + '/user/register');
}]);

app.factory('Login', ['$resource', function ($resource) {
    return $resource(apiPrefix + '/user/login');
}]);

app.factory('Projects', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return (
        $resource(apiPrefix + '/project/:id', {id: '@id'}, {
            query: {
                method: 'GET',
                isArray: true,
                headers: {Authorization: "Bearer " + $rootScope.auth_token}
            },
            get: {
                method: 'GET',
                isArray: false,
                headers: {Authorization: "Bearer " + $rootScope.auth_token}
            },
            save: {
                method: 'POST',
                headers: {Authorization: "Bearer " + $rootScope.auth_token}
            },
            update: {
                method: 'PUT',
                headers: {Authorization: "Bearer " + $rootScope.auth_token}
            },
            delete: {
                method: 'DELETE',
                headers: {Authorization: "Bearer " + $rootScope.auth_token}
            }
        })
    );
}]);