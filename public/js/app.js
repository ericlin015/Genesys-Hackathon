'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives'
]).
config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/partial1',
        controller: 'Ctrl1'
    }).
    when('/mainPage', {
        templateUrl: 'partials/event-page.html',
        controller: 'EventCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
});