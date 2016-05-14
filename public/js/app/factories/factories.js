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
