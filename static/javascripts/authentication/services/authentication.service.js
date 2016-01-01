/**
 * Authentication
 * @namespace django-angular.authentication.services
 */
(function () {
    'use strict';

    angular
        .module('django-angular.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', 'Snackbar', '$location'];

    /**
     * @namespace Authentication
     * @returns {Factory}
     */
    function Authentication($cookies, $http, Snackbar, $location) {
        /**
         * @name Authentication
         * @desc The Factory to be returned
         */
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            register: register,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate,
            username: getUsername
        };

        return Authentication;

        ////////////////////
        function getUsername(){
            var user = getAuthenticatedAccount();
            if(user) return user.username;
            else return null;
        }
        /**
         * @name register
         * @desc Try to register a new user
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @param {string} username The username entered by the user
         * @returns {Promise}
         * @memberOf django-angular.authentication.services.Authentication
         */
        function register(email, password, username) {
            return $http.post('/api/v1/users/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn, registerErrorFn);

            /**
             * @name registerSuccessFn
             * @desc Log the new user in
             */
            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(email, password);
            }

            /**
             * @name registerErrorFn
             * @desc Displays snackbar with error message
             */
            function registerErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }

        /**
         * @name login
         * @desc Try to log in with email `email` and password `password`
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @returns {Promise}
         * @memberOf django-angular.authentication.services.Authentication
         */
        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email, password: password
            }).then(loginSuccessFn, loginErrorFn);

            /**
             * @name loginSuccessFn
             * @desc Set the authenticated account and redirect to index
             */
            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);
                $location.url('/');
                Snackbar.show('Welcome ' + data.data.username);
            }

            /**
             * @name loginErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function loginErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }

        /**
         * @name logout
         * @desc Try to log the user out
         * @returns {Promise}
         * @memberOf django-angular.authentication.services.Authentication
         */
        function logout() {
            return $http.post('/api/v1/auth/logout/')
                .then(logoutSuccessFn, logoutErrorFn);

            /**
             * @name logoutSuccessFn
             * @desc Unauthenticate and redirect to index with page reload
             */
            function logoutSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();
                $location.url('/');
                Snackbar.show('Goodbye');
            }

            /**
             * @name logoutErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function logoutErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }

        /**
         * @name getAuthenticatedAccount
         * @desc Return the currently authenticated account
         * @returns {object|undefined} Account if authenticated, else `undefined`
         * @memberOf django-angular.authentication.services.Authentication
         */
        function getAuthenticatedAccount() {
            if (!$cookies.get('authenticatedAccount')) {
                return;
            }

            return JSON.parse($cookies.get('authenticatedAccount'));
        }

        /**
         * @name isAuthenticated
         * @desc Check if the current user is authenticated
         * @returns {boolean} True is user is authenticated, else false.
         * @memberOf django-angular.authentication.services.Authentication
         */
        function isAuthenticated() {
            return !!$cookies.get('authenticatedAccount');
        }

        /**
         * @name setAuthenticatedAccount
         * @desc Stringify the account object and store it in a cookie
         * @param {Object} user The account object to be stored
         * @returns {undefined}
         * @memberOf django-angular.authentication.services.Authentication
         */
        function setAuthenticatedAccount(account) {
            $cookies.put('authenticatedAccount', JSON.stringify(account));
        }

        /**
         * @name unauthenticate
         * @desc Delete the cookie where the user object is stored
         * @returns {undefined}
         * @memberOf django-angular.authentication.services.Authentication
         */
        function unauthenticate() {
            delete $cookies.remove('authenticatedAccount');
        }
    }
})();
