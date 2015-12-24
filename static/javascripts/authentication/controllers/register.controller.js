/**
 * Register controller
 * @namespace django-angular.authentication.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($location, $scope, Authentication) {
        var vm = this;

        vm.register = register;
        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf django-angular.authentication.controllers.RegisterController
         */
        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }

        /**
         * @name register
         * @desc Register a new user
         * @memberOf django-angular.authentication.controllers.RegisterController
         */
        function register() {
            if(!(vm.email && vm.password && vm.username))
                $scope.error = 'All fields are required!';
            else
                Authentication.register(vm.email, vm.password, vm.username);
        }
    }
})();
