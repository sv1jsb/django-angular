/**
 * Created by andreas on 16/12/2015.
 *
 * ProfileSettingsController
 * @namespace django-angular.profiles.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.profiles.controllers')
        .controller('ProfileSettingsController', ProfileSettingsController);

    ProfileSettingsController.$inject = [
        '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar', '$scope', 'Material'
    ];

    /**
     * @namespace ProfileSettingsController
     */
    function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar, $scope, Material) {
        var vm = this;

        vm.destroy = destroy;
        vm.update = update;

        activate();


        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated.
         * @memberOf django-angular.profiles.controllers.ProfileSettingsController
         */
        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();
            var user_id = $routeParams.user_id.substr(1);

            // Redirect if not logged in
            if (authenticatedAccount) {
                // Redirect if logged in, but not the owner of this profile.
                if (authenticatedAccount.id !== user_id) {
                    $location.url('/');
                    Snackbar.error('You are not authorized to view this page.');
                }
            } else {
                $location.url('/');
                Snackbar.error('You are not authorized to view this page.');
            }

            Profile.get(user_id)
                .then(profileSuccessFn, profileErrorFn)
                .finally(Material.init());

            /**
             * @name profileSuccessFn
             * @desc Update `profile` for view
             */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }

            /**
             * @name profileErrorFn
             * @desc Redirect to index
             */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('That user does not exist.');
            }
        }

        /**
         * @name destroy
         * @desc Destroy this user's profile
         * @memberOf django-angular.profiles.controllers.ProfileSettingsController
         */
        function destroy() {
            Profile.destroy(vm.profile.id).then(profileSuccessFn, profileErrorFn);

            /**
             * @name profileSuccessFn
             * @desc Redirect to index and display success snackbar
             */
            function profileSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();
                $location.location = '/';

                Snackbar.show('Your account has been deleted.');
            }

            /**
             * @name profileErrorFn
             * @desc Display error snackbar
             */
            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }

        /**
         * @name update
         * @desc Update this user's profile
         * @memberOf django-angular.profiles.controllers.ProfileSettingsController
         */
        function update() {
            if(!(vm.profile.email && vm.profile.username))
                $scope.error = 'Email and Username are required!';
            else
                Profile.update(vm.profile).then(profileSuccessFn, profileErrorFn);

            /**
             * @name profileSuccessFn
             * @desc Show success snackbar
             */
            function profileSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);
                Snackbar.show('Your profile has been updated.');
            }

            /**
             * @name profileErrorFn
             * @desc Show error snackbar
             */
            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }
    }
})();
