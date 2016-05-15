/**
 * Created by SASi on 11-May-16.
 */

app.controller('myProjectsPageController', ['$scope', '$rootScope', '$routeParams', 'Projects',
    function ($scope, $rootScope, $routeParams, Projects) {

        $scope.projectsList = [];
        $scope.getAllProjects = function () {
            Projects.query(function (respose, headers) {
                $scope.projectsList = respose;
            }, function (err) {
                console.log(err);
            });
        }();

        $scope.editProject = function (project) {
            console.log(project.title);
        };

        $scope.deleteProject = function (project) {

            var index = $scope.projectsList.indexOf(project);

            Projects.delete({id: project._id}, function (respose, headers) {
                $scope.projectsList.splice(index, 1);
            }, function (err) {
                console.log(err);
            });
        };
    }
]);