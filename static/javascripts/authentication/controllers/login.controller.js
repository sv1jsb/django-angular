/**
 * Created by andreas on 16/12/2015.
 */
/**
 * LoginController
 * @namespace django-angular.authentication.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication', 'Material'];

    /**
     * @namespace LoginController
     */
    function LoginController($location, $scope, Authentication, Material) {
        var vm = this;

        vm.login = login;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf django-angular.authentication.controllers.LoginController
         */
        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
            Material.init();
        }

        /**
         * @name login
         * @desc Log the user in
         * @memberOf django-angular.authentication.controllers.LoginController
         */
        function login() {
            if (!(vm.email && vm.password))
                $scope.error = 'All fields are required!';
            else
                Authentication.login(vm.email, vm.password);
        }
    }
})();