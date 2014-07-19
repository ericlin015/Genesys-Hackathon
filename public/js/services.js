'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngCookies'])
    .factory('cookieService', function($cookieStore) {
        var CookieService = function() {
            this.checkUser = function(callback) {
                var userID = $cookieStore.get('userID');
                callback(userID);
            };

            this.checkIfUserExist = function(callback) {
                var userID = $cookieStore.get('userID');
                callback(userID);
            }
        };
        return new CookieService();
    })

    .factory('sportsDataService', function() {
        var SportsDataService = function() {

            var sportsList = [{
                "id": 0,
                "name": "Soccer"
            }, {
                "id": 1,
                "name": "Basketball"
            }, {
                "id": 2,
                "name": "Ultimate Frisbee"
            }, {
                "id": 3,
                "name": "Rugby"
            }, {
                "id": 4,
                "name": "American Football"
            }, {
                "id": 5,
                "name": "Volleyball"
            }, {
                "id": 6,
                "name": "Baseball"
            }, {
                "id": 7,
                "name": "Running"
            }, {
                "id": 8,
                "name": "Badminton"
            }, {
                "id": 9,
                "name": "Tennis"
            }];

            this.getSportsList = function() {
                return sportsList;
            };

        };

        return new SportsDataService();
    })
    .factory('userProfileService', function($http, $cookieStore, $location) {
        var UserProfileService = function() {
            var userProfile = {
                "name": "defaultName",
                "postalCode": "defaultPostalCode",
            }

            var userId = null;

            this.setUserProfile = function(newUserProfile) {
                userProfile = newUserProfile;
            };

            this.getUserProfile = function() {
                return userProfile;
            };

            this.setUserId = function(newUserId) {
                userId = newUserId;
            };

            this.userSignIn = function(profileJSON) {
                $http.post('/api/createUser', profileJSON).success(function(data) {
                    console.log(data);
                    $cookieStore.put('userID', data.userId);
                    $location.path('/menu');
                });
            }
        };

        return new UserProfileService();
    })

    .factory('gMapServices', function($http, $location, $timeout, $route) {
    var GMapServices = function() {
        var self = this;

        this.shit = function($scope) {
            alert('votebad[1].append();');
        };

        this.getPlace = function($scope, callback, address, latlng_obj) {

            var geocoder = $scope.geocoder;
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //console.log('GEOCODER GOT A PLACE');
                    $scope.$parent.placeObject = results[0];
                    callback(results);
                } else if (status == 'OVER_QUERY_LIMIT') {
                    alert("You're reloading too quickly for our site to keep up!! \n ｡･ﾟﾟ･(>д<)･ﾟﾟ･｡");
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
    };

    return new GMapServices();
});