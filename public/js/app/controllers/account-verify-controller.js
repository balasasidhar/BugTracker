/**
 * Created by SASi on 11-May-16.
 */

app.controller('verifyPageController', ['$scope', '$routeParams', 'Verify', function ($scope, $routeParams, Verify) {
    var token = $routeParams.token;

    $scope.userHint = "Please wait your account is verifying...";

    Verify.save({token: token}, function (res) {
        console.log(res);
        $scope.userHint = "Yay!!! Your account was successfully verified";
    }, function (err) {
        console.log(err);
        $scope.userHint = "Oops!!!" + err.data.err;
    });
}]);