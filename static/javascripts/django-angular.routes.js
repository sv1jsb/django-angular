(function () {
    'use strict';

    angular
        .module('django-angular.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    /**
     * @name config
     * @desc Define valid application routes
     */
    function config($routeProvider) {
        $routeProvider.when('/register', {
                controller: 'RegisterController',
                controllerAs: 'registerCtrl',
                templateUrl: '/static/templates/authentication/register.html'
            })
            .when('/login', {
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                templateUrl: '/static/templates/authentication/login.html'
            })
            .when('/', {
                controller: 'IndexController',
                controllerAs: 'indexCtrl',
                templateUrl: '/static/templates/layout/index.html'
            })
            .when('/+:user_id', {
                controller: 'ProfileController',
                controllerAs: 'profileCtrl',
                templateUrl: '/static/templates/profiles/profile.html'
            })
            .when('/+:user_id/settings', {
                controller: 'ProfileSettingsController',
                controllerAs: 'profileSettingsCtrl',
                templateUrl: '/static/templates/profiles/settings.html'
            })
            .otherwise('/');
    }
})();

