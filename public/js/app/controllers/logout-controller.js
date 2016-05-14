/**
 * Created by SASi on 12-May-16.
 */

app.controller('logoutPageController', ['$rootScope', '$cookies', function ($rootScope, $cookies) {
    $rootScope.isLoggedIn = false;
    $rootScope.authToken = null;
    $cookies.remove('authToken');
    window.location.href = "/";
}]);