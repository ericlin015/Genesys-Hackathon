'use strict'

angular.module('myApp.controllers')
    .controller('CreateEventCtrl', function($scope, $http, sportsDataService) {

        $scope.sportList = sportsDataService.getSportsList();
        $scope.selectedSport = {};
        $scope.eventSettings = {

        };
    });