'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .factory('cookieService', function() {
        var CookieService = function() {
            this.checkUser = function(callback) {
                // var userID = $cookieStore.get('userID');
                // callback(userID);
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
    .factory('userProfileService', function() {
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

            this.userSignIn = function() {

            }
        };

        return new UserProfileService();
    });