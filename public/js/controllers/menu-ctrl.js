'use strict';

angular.module('myApp.controllers').controller(

    'MenuCtrl',

    function($scope, $location, cookieService, gMapServices, userProfileService, sportsDataService) {

        $scope.isCreate = true;
        $scope.sportList = sportsDataService.getSportsList();
        $scope.selectedSport = {};
        $scope.eventSettings = {};

        $scope.selectMenu = function(bool) {
            $scope.isCreate = (bool == 'true') ? true: false;
        };

        $scope.checkIfUserExist = function() {
            cookieService.checkIfUserExist(function(data) {
                if (!data) {
                    $location.path('/home');
                }
            });
        };

    }
);