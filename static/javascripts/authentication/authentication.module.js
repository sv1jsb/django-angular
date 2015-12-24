(function () {
    'use strict';

    angular
        .module('django-angular.authentication', [
            'django-angular.authentication.controllers',
            'django-angular.authentication.services'
        ]);

    angular
        .module('django-angular.authentication.controllers', []);

    angular
        .module('django-angular.authentication.services', ['ngCookies']);
})();

