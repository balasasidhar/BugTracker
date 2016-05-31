/**
 * Created by SASi on 22-Apr-16.
 */

app.controller('loginController', ['$scope', '$rootScope', '$cookies', 'Register', 'Login',
    function ($scope, $rootScope, $cookies, Register, Login) {

        $scope.email = '';
        $scope.password = '';
        $scope.name = '';
        $scope.password = '';
        $scope.confirmPassword = '';
        $scope.isMakingAjaxCall = false;
        $scope.register_error = null;
        $scope.login_error = null;

        $scope.login = function () {
            $scope.isMakingAjaxCall = true;
            $scope.login_error = null;
            var data, response;
            console.log('making login request');

            data = {email: $scope.email, password: $scope.password};

            response = Login.save(data,
                function (response, headers) {
                    var jwt = response.auth_token;
                    $rootScope.auth_token = jwt;
                    $cookies.put('auth_token', jwt);
                    $cookies.putObject("user", {name: response.name, email: response.email, mobile: response.mobile});
                    $scope.isMakingAjaxCall = false;
                    $('#userLoginModalLabel').modal('toggle');
                    window.location.href = "/dashboard";
                }, function (error) {
                    $scope.login_error = error.data.err;
                    $scope.isMakingAjaxCall = false;
                });
        };


        $scope.register = function () {
            $scope.register_error = null;
            $scope.isMakingAjaxCall = true;
            var data, response;
            console.log('making register request');

            if ($scope.password !== $scope.confirmPassword) {
                $scope.register_error = "Password & Confirm Password must be same.";
                $scope.isMakingAjaxCall = false;
                return;
            }

            data = {
                email: $scope.email,
                password: $scope.password,
                confirmPassword: $scope.confirmPassword,
                mobile: $scope.mobile,
                name: $scope.name
            };


            response = Register.save(data,
                function (response, headers) {
                    var message = response.message;
                    console.log(message);

                    var jwt = response.auth_token;
                    $rootScope.auth_token = jwt;
                    $cookies.put('auth_token', jwt);
                    $cookies.putObject("user", {name: response.name, email: response.email, mobile: response.mobile});
                    
                    $scope.isMakingAjaxCall = false;
                    $('#userLoginModalLabel').modal('toggle');
                    window.location.href = "/dashboard";
                }, function (error) {
                    console.log(error);
                    $scope.register_error = error.data.err;
                    $scope.isMakingAjaxCall = false;
                });

        };

    }]);
