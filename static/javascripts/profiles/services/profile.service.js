/**
 * Created by andreas on 16/12/2015.
 *
 * Profile
 * @namespace django-angular.profiles.services
 */
(function () {
    'use strict';

    angular
        .module('django-angular.profiles.services')
        .factory('Profile', Profile);

    Profile.$inject = ['$http'];

    /**
     * @namespace Profile
     */
    function Profile($http) {
        /**
         * @name Profile
         * @desc The factory to be returned
         * @memberOf django-angular.profiles.services.Profile
         */
        var Profile = {
            destroy: destroy,
            get: get,
            update: update
        };

        return Profile;

        /////////////////////

        /**
         * @name destroy
         * @desc Destroys the given profile
         * @param {Object} profile The profile to be destroyed
         * @returns {Promise}
         * @memberOf django-angular.profiles.services.Profile
         */
        function destroy(username) {
            return $http.delete('/api/v1/users/' + username + '/');
        }


        /**
         * @name get
         * @desc Gets the profile for user with username `username`
         * @param {string} user_id The username of the user to fetch
         * @returns {Promise}
         * @memberOf django-angular.profiles.services.Profile
         */
        function get(user_id) {
            return $http.get('/api/v1/users/' + user_id + '/');
        }


        /**
         * @name update
         * @desc Update the given profile
         * @param {Object} profile The profile to be updated
         * @returns {Promise}
         * @memberOf django-angular.profiles.services.Profile
         */
        function update(profile) {
            return $http.put('/api/v1/users/' + profile.id + '/', profile);
        }
    }
})();