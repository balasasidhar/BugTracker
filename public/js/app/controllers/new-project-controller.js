/**
 * Created by SASi on 11-May-16.
 */

app.controller('newProjectsPageController', ['$scope', '$rootScope', '$routeParams', 'Projects',
    function ($scope, $rootScope, $routeParams, Projects) {

        $scope.project = "";
        $scope.title = "";
        $scope.description = "";

        $scope.isNew = true;
        $scope.buttonText = "Create";

        $scope.emails = "";
        $scope.isEmailConfigured = false;

        $scope.isSlackConfigured = false;
        $scope.slackAPIKey = "";
        $scope.slackChannelName = "";

        $scope.saveProject = function () {

            if ($scope.isNew) {
                Projects.save({title: $scope.title, description: $scope.description}, function (respose, headers) {
                    $scope.project = respose;

                    $("#step-two").removeClass("disabled");
                    $("#step-two").addClass("active");
                    $("#step-two").attr({'data-target': "#newProject", 'data-slide-to': "1"});

                    $('.carousel').carousel('next');

                    $scope.isNew = false;
                    $scope.buttonText = "Update";

                }, function (err) {
                    console.log(err);
                });
            } else {
                Projects.update({
                    title: $scope.title,
                    description: $scope.description,
                    id: $scope.project._id,
                    emailsConfigured: $scope.emails,
                    slackAPIKey: $scope.slackAPIKey,
                    slackChannelName: $scope.slackChannelName
                }, function (respose, headers) {
                    $scope.project.title = $scope.title;
                    $scope.project.description = $scope.description;

                    $("#step-two").removeClass("disabled");
                    $("#step-two").addClass("active");
                    $("#step-two").attr({'data-target': "#newProject", 'data-slide-to': "1"});

                    $('.carousel').carousel('next');

                }, function (err) {
                    console.log(err);
                });
            }
        };

        $scope.moveToFinish = function () {
            $("#step-three").removeClass("disabled");
            $("#step-three").addClass("active");
            $("#step-three").attr({'data-target': "#newProject", 'data-slide-to': "2"});

            $('.carousel').carousel('next');
        };

        $scope.showEmailConfig = function () {
            if ($scope.isEmailConfigured)
                $("#emailModal").modal();
            else {
                $scope.emails = "";
            }
        };

        $scope.showSlackConfig = function () {
            if ($scope.isSlackConfigured)
                $("#slackModal").modal();
            else {
                $scope.slackAPIKey = "";
                $scope.slackChannelName = "";
            }
        };

        $("#trello").click(function () {
            console.log(sasi);
        });
    }
]);