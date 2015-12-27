/**
 * Created by andreas on 16/12/2015.
 *
 * NavbarController
 * @namespace django-angular.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication', '$location'];

    /**
     * @namespace NavbarController
     */
    function NavbarController($route, Authentication, $location) {
        var vm = this;
        $route.$on('$routeChangeSuccess', function(e, current, previous){
            vm.location = $location.path();
        });
        vm.logout = logout;
        vm.location = $location.path();

        /**
         * @name logout
         * @desc Log the user out
         * @memberOf django-angular.layout.controllers.NavbarController
         */
        function logout() {
            Authentication.logout();
        }
    }
})();