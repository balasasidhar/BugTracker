/**
 * Created by SASi on 11-May-16.
 */

app.controller('projectReportsPageController', ['$scope', '$rootScope', '$routeParams', 'Reports',
    function ($scope, $rootScope, $routeParams, Reports) {

        var id = $routeParams.id;

        $scope.reports = "";

        Reports.query({id: id}, function (response, header) {
            $scope.reports = response;
        }, function (err) {
            console.error(err.data.error);
        });
    }
]);