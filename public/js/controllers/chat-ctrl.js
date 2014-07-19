'use strict';

angular.module('myApp.controllers').controller('ChatCtrl',

    function($http, $scope, $location, eventService, mySocket) {

        // $scope.eventData = eventService.getCurrentEvent();
        $scope.eventData = eventService.getCurrentEvent();
        $scope.messages = [];

        $scope.sendMessage = function() {
            if ($scope.myMsg) {
                $scope.messages.push('[You] ' + $scope.myMsg);
                $scope.myMsg = '';
            }
        };


        mySocket.on($scope.eventData.chatId, function(res) {
        	console.log(res);
            var temp = res.split(':');
            $scope.messages.push('[' + temp[0] + '] ' + temp[1]);
        });


        //mySocket.emit('new message', { userName: 'Tyron', message: 'hey', chatId: $scope.eventData.chatId });


    }
);