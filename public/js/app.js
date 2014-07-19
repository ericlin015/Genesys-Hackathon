'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'myApp.services',
    'myApp.controllers',
    'myApp.directives',
    'ui.bootstrap',
    'ui.multiselect'
]).
config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
    }).
    when('/menu', {
        templateUrl: 'partials/menu',
        controller: 'MenuCtrl'
    }).
    when('/events', {
        templateUrl: 'partials/events-page',
        controller: 'EventCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
});