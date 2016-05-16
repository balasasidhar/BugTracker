/**
 * Created by SASi on 11-May-16.
 */

app.controller('editProjectsPageController', ['$scope', '$rootScope', '$routeParams', 'Projects',
    function ($scope, $rootScope, $routeParams, Projects) {

        var id = $routeParams.id;

        $scope.project = "";
        $scope.title = "";
        $scope.description = "";

        $scope.buttonText = "Update";

        $scope.emails = "";
        $scope.isEmailConfigured = false;

        $scope.isSlackConfigured = false;
        $scope.slackAPIKey = "";
        $scope.slackChannelName = "";

        $("#step-two").removeClass("disabled");
        $("#step-two").addClass("active");
        $("#step-two").attr({'data-target': "#newProject", 'data-slide-to': "1"});


        $("#step-three").removeClass("disabled");
        $("#step-three").addClass("active");
        $("#step-three").attr({'data-target': "#newProject", 'data-slide-to': "2"});

        Projects.get({id: id}, function (response, header) {
            $scope.project = response;
            $scope.title = response.title;
            $scope.description = response.description;

            $scope.emails = response.configuration.emailsConfigured.toString() || null;
            var slackConfiguration = response.configuration.slackConfiguration;

            if ($scope.emails)
                $scope.isEmailConfigured = true;

            if (slackConfiguration) {
                $scope.slackAPIKey = slackConfiguration.api_key || null;
                $scope.slackChannelName = slackConfiguration.channel_name || null;

                if ($scope.slackAPIKey)
                    $scope.isSlackConfigured = true;
            }
        }, function (err) {
            console.error(err.data.error);
        });

        $scope.saveProject = function () {

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

                $('.carousel').carousel('next');

            }, function (err) {
                console.log(err);
            });
        };

        $scope.moveToFinish = function () {
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
        })
    }
]);