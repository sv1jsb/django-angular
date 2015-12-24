/**
 * Created by andreas on 16/12/2015.
 */
(function () {
    'use strict';

    angular
        .module('django-angular.posts', [
            'django-angular.posts.controllers',
            'django-angular.posts.directives',
            'django-angular.posts.services'
        ]);

    angular
        .module('django-angular.posts.controllers', []);

    angular
        .module('django-angular.posts.directives', ['ngDialog']);

    angular
        .module('django-angular.posts.services', []);
})();