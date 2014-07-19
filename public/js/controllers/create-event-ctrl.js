'use strict'

angular.module('myApp.controllers')
    .controller('createEventCtrl', function($scope, $http, sportsDataService) {

        $scope.sportList = sportsDataService.getSportsList();

    });