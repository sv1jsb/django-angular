(function () {
    'use strict';
    angular
        .module('django-angular', [
            'django-angular.routes',
            'django-angular.authentication',
            'django-angular.config',
            'django-angular.layout',
            'django-angular.posts',
            'django-angular.utils',
            'django-angular.profiles'
        ]);

    angular
        .module('django-angular.config', []);

    angular
        .module('django-angular.routes', ['ngRoute']);

    angular
        .module('django-angular')
        .run(run);

    run.$inject = ['$http', '$rootScope', 'Authentication'];

    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults
     */
    function run($http, $rootScope, Authentication) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        // Assign AUthentication to rootScope so that is available in all templates
        $rootScope.auth = Authentication;
    }

})();

