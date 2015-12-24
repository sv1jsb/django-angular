/**
 * Created by andreas on 16/12/2015.
 */
(function () {
    'use strict';

    angular
        .module('django-angular.profiles', [
            'django-angular.profiles.controllers',
            'django-angular.profiles.services'
        ]);

    angular
        .module('django-angular.profiles.controllers', []);

    angular
        .module('django-angular.profiles.services', []);
})();