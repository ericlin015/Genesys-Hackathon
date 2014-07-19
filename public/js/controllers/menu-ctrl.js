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
            "date": $scope.td,
            "nickname": userProfileService.getUserProfile().name,
            "userId": userProfileService.getUserId(),
            "capacity": null,
            "price": null
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

        $scope.createNewEvent = function() {
            gMapServices.getPlace($scope, function(results, status) {
                $scope.gps = results[0].geometry.location;
                $scope.eventSettings.lat = $scope.gps.k;
                $scope.eventSettings.lon = $scope.gps.B;
                if ($scope.selectedSport.id === 10) {
                    $scope.eventSettings.sport = $scope.customSportName;
                } else {
                    $scope.eventSettings.sport = $scope.selectedSport.name;
                }
                if ($scope.capacity) {
                    $scope.eventSettings.capacity = $scope.capacity;
                }
                if ($scope.price) {
                    $scope.eventSettings.price = $scope.price;
                }



            });
        };
    });