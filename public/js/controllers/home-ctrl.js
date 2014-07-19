angular.module('myApp.controllers').controller(

    'HomeCtrl',

    function($scope, $location, cookieService) {

        $scope.init = function() {
            cookieService.checkUser(function(data) {
                if (data) {
                    $location.path('/mainPage');
                }
            });
        };

        $scope.signIn = function() {

        };

        $scope.init();

    }
);