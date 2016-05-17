/**
 * Created by SASi on 22-Apr-16.
 */

'use strict';

var apiPrefix = "http://bug-tracker.in/api";

app.factory('Register', ['$resource', function ($resource) {
    return $resource(apiPrefix + '/user/register');
}]);

app.factory('Login', ['$resource', function ($resource) {
    return $resource(apiPrefix + '/user/login');
}]);

app.factory('Projects', ['$resource', '$rootScope', function ($resource) {
    return (
        $resource(apiPrefix + '/project/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        })
    );
}]);

app.factory('Reports', ['$resource', '$rootScope', function ($resource) {
    return (
        $resource(apiPrefix + '/reports/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        })
    );
}]);