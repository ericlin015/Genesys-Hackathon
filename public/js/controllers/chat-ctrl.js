'use strict';

angular.module('myApp.controllers').controller('ChatCtrl',

    function($http, $scope, $location, eventService) {
        $scope.eventData = eventService.getCurrentEvent();

    }
);