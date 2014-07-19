'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'ui.bootstrap'
]).
config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
    }).
    when('/mainPage', {
        templateUrl: 'partials/event-page',
        controller: 'EventCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
});