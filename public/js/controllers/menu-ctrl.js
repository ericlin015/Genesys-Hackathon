'use strict';

angular.module('myApp.controllers').controller(

    'MenuCtrl',

    function($http, $scope, $location, cookieService, gMapServices, userProfileService, sportsDataService, eventService) {

        $scope.isCreate = true;
        $scope.opened = false;
        $scope.sportList = sportsDataService.getSportsList();
        $scope.subscribedList = [];
        $scope.topTenList = [];
        $scope.selectedSport = {};
        $scope.td = new Date();
        $scope.startTime = new Date().setHours(13, 0);
        $scope.endTime = new Date().setHours(16, 0);
        $scope.userId = userProfileService.getUserId();
        $scope.nickname = userProfileService.getUserProfile().name;
        $scope.eventSettings = {
            "capacity": null,
            "price": null
        };

        $scope.errors = {
            "subject": false,
            "sport": false,
            "gps": false,
            "date": false,
            "userId": false
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

        var validateForm = function() {
            if ($scope.selectedSport.id === 10 && !$scope.customSportName) {
                $scope.errors.sport = true;
            } else if (!$scope.selectedSport.name) {
                $scope.errors.sport = true;
            }
            if (!$scope.subject) {
                $scope.errors.subject = true;
            }
            if (!$scope.date) {
                $scope.errors.date = true;
            }
            if (!$scope.userId) {
                $scope.errors.userId = true;
            }
        };

        var errorsExist = function() {
            var errorsExist = false;
            angular.forEach($scope.errors, function(error) {
                if (error) {
                    errorsExist = true;
                }
            });

            return errorsExist;
        }

        $scope.createNewEvent = function() {

            if (!$scope.eventSettings.address) {
                $scope.errors.gps = true;
            } else {
                $scope.errors.gps = false;
                $scope.geocoder = new google.maps.Geocoder();

                gMapServices.getPlace($scope, function(results, status) {
                    $scope.gps = results[0].geometry.location;
                    $scope.eventSettings.lat = $scope.gps.k;
                    $scope.eventSettings.lon = $scope.gps.B;

                    validateForm();

                    if (!errorsExist()) {
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

                            $scope.joinRoom(data);

                        }).
                        error(function(data, status, headers, config) {
                            console.log("failure");
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });
                    } else {
                        console.log("validation failed");
                    }
                }, $scope.eventSettings.address);
            }
        };

        $scope.joinRoom = function(eventData) {
            eventService.setCurrentEvent(eventData);
            $location.path('/chat');
        }

        $scope.loadUserMeetup = function() {
            userProfileService.loadUserMeetup(function(data) {
                $scope.subscribedList = data;
            });
        };

        $scope.joinRoom = function() {
            //TODO
        };

        $scope.updateNearest = function() {
            userProfileService.updateNearest(parseInt($scope.closestNumber), function(data) {
                data.forEach(function(t) {
                    t.startDate = new Date(t.startDate);
                });
                $scope.topTenList = data;
            });
        };

        $scope.checkIfUserExist();
        $scope.updateNearest();

    }
);