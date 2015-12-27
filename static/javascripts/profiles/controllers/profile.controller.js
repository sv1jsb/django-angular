/**
 * Created by andreas on 16/12/2015.
 *
 * ProfileController
 * @namespace django-angular.profiles.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.profiles.controllers')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];

    /**
     * @namespace ProfileController
     */
    function ProfileController($scope, $location, $routeParams, Posts, Profile, Snackbar) {
        var vm = this;

        vm.profile = undefined;
        vm.posts = [];

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf django-angular.profiles.controllers.ProfileController
         */
        function activate() {
            var user_id = $routeParams.user_id.substr(1);

            Profile.get(user_id).then(profileSuccessFn, profileErrorFn);
            Posts.getUserPosts(user_id).then(postsSuccessFn, postsErrorFn);
            $scope.$on('post.updated', function (event, data) {
                for (var i = 0; i < vm.posts.length; i++) {
                    if (vm.posts[i].id == data.id) {
                        vm.posts[i].content = data.content;
                        break;
                    }
                }
            });

            $scope.$on('post.deleted', function (event, data) {
                var idx = null;
                for (var i = 0; i < vm.posts.length; i++) {
                    if (vm.posts[i].id == data.id) {
                        idx = i;
                        break;
                    }
                }
                if(idx > 0) vm.posts.splice(idx, 1);
                if(idx == 0) vm.posts.shift();
            });
            /**
             * @name profileSuccessProfile
             * @desc Update `profile` on viewmodel
             */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }


            /**
             * @name profileErrorFn
             * @desc Redirect to index and show error Snackbar
             */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('That user does not exist.');
            }


            /**
             * @name postsSucessFn
             * @desc Update `posts` on viewmodel
             */
            function postsSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }


            /**
             * @name postsErrorFn
             * @desc Show error snackbar
             */
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }
    }
})();