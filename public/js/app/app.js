/**
 * Created by SASi on 18-Apr-16.
 */

var app = angular.module('Opinio', ['ngResource', 'ngRoute', 'ngCookies', 'ngMessages']);

app.run(function ($rootScope, $cookies) {
    $rootScope.name = "";
    $rootScope.email = "";
    $rootScope.mobile = "";
    $rootScope.auth_token = $cookies.get("auth_token");

    if ($rootScope.auth_token) {
        var user = $cookies.getObject("user");
        $rootScope.name = user.name;
        $rootScope.email = user.email;
        $rootScope.mobile = user.mobile;
    }

    $rootScope.showLoginView = function () {
        $("#userLoginModalLabel").find(".flip-container").removeClass('flip');
    };

    $rootScope.showRegisterView = function () {
        $("#userLoginModalLabel").find(".flip-container").addClass('flip');
    };

    $rootScope.toggleLoginView = function () {
        $("#userLoginModalLabel").find(".flip-container").toggleClass('flip');
    };

});

app.config([
    '$resourceProvider', '$routeProvider', '$locationProvider',
    function ($resourceProvider, $routeProvider, $locationProvider) {

        $resourceProvider.defaults.stripTrailingSlashes = false;
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'tmpl/home',
                controller: 'homePageController'
            })
            .when('/dashboard', {
                templateUrl: 'tmpl/dashboard',
                controller: 'aboutPageController'
            })
            .when('/about', {
                templateUrl: 'tmpl/about',
                controller: 'aboutPageController'
            })
            .when('/logout', {
                template: '',
                controller: 'logoutPageController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
