'use strict';

angular.module('myApp.controllers').controller(

    'MenuCtrl',

    function($http, $scope, $location, cookieService, gMapServices, userProfileService, sportsDataService, eventService) {

        $scope.isCreate = true;
        $scope.opened = false;
        $scope.sportList = sportsDataService.getSportsList();
        $scope.subscribedList = [];
        $scope.selectedSport = {};
        $scope.td = new Date();
        $scope.eventSettings = {
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
                console.log(data);
                if (!data) {
                    $location.path('/home');
                } else {
                    $scope.loadUserMeetup();
                }
            });
        };

        $scope.createNewEvent = function() {
            $scope.geocoder = new google.maps.Geocoder();

            gMapServices.getPlace($scope, function(results, status) {
                $scope.gps = results[0].geometry.location;
                $scope.eventSettings.lat = $scope.gps.k;
                $scope.eventSettings.lon = $scope.gps.B;
                //TEMP USER ID
                $scope.eventSettings.userId = 2;

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
                $scope.eventSettings.startDate = $scope.date.setHours($scope.startTime.getHours(), $scope.startTime.getMinutes());
                $scope.eventSettings.endDate = $scope.date.setHours($scope.endTime.getHours(), $scope.endTime.getMinutes());

                $http.post('/api/createEvent', $scope.eventSettings).success(function(data, status, headers, config) {
                    console.log("success");

                    eventService.setCurrentEvent(data);
                    $location.path('/chat');

                }).
                error(function(data, status, headers, config) {
                    console.log("failure");
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            }, $scope.eventSettings.address);
        };

        $scope.loadUserMeetup = function() {
            userProfileService.loadUserMeetup(function(data) {
                $scope.subscribedList = data;
                console.log($scope.subscribedList);
                console.log($scope);
            });
        };

        $scope.updateNearest = function() {
            userProfileService.updateNearest(parseInt($scope.closestNumber), function(data) {
                console.log(data);
            });
        };

        $scope.checkIfUserExist();

    }
);