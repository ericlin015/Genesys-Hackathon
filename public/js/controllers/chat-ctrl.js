'use strict';

angular.module('myApp.controllers').controller('ChatCtrl',

    function($http, $scope, $location, eventService, mySocket) {

        // mySocket.on('update messages', function (res) {console.log(res);});

        // mySocket.emit('new message', { userName: 'Tyron', message: 'hey', chatId: "e47ef2ee-03c8-423e-98a4-b36cd665962b" });

        $scope.eventData = eventService.getCurrentEvent();

    }
);