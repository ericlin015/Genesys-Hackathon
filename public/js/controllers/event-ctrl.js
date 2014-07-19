'use strict'

angular.module('myApp.controllers')
    .controller('EventCtrl', function($scope, $http, userProfileService) {
        $scope.userProfile = userProfileService.getUserProfile();
    });