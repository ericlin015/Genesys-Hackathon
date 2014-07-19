'use strict';

angular.module('myApp.controllers').controller(

    'MenuCtrl',

    function($scope, $location, cookieService, gMapServices, userProfileService, sportsDataService) {

        $scope.isCreate = true;
        $scope.opened = false;
        $scope.sportList = sportsDataService.getSportsList();
        $scope.selectedSport = {};
        $scope.td = new Date();
        $scope.eventSettings = {
            "date": $scope.td
        };

        $scope.selectMenu = function(bool) {
            $scope.isCreate = (bool == 'true') ? true : false;
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.checkIfUserExist = function() {
            cookieService.checkIfUserExist(function(data) {
                if (!data) {
                    $location.path('/home');
                }
            });
        };

        $scope.loadUserMeetup = function() {
            userProfileService.loadUserMeetup(function(data) {

            });
        };

        $scope.loadUserMeetup();
    }
);