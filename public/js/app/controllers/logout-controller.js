/**
 * Created by SASi on 12-May-16.
 */

app.controller('logoutPageController', ['$rootScope', '$cookies', function ($rootScope, $cookies) {
    $rootScope.auth_token = null;
    $cookies.remove('auth_token');
    $cookies.remove('user');
    window.location.href = "/";
}]);