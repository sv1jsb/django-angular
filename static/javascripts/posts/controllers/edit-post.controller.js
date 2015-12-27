/**
 * Created by andreas on 16/12/2015.
 *
 * EditPostController
 * @namespace django-angular.posts.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.posts.controllers')
        .controller('EditPostController', EditPostController);

    EditPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts', 'postId'];

    /**
     * @namespace EditPostController
     */
    function EditPostController($rootScope, $scope, Authentication, Snackbar, Posts, postId) {
        var vm = this;
        vm.submit = submit;
        var authenticatedAccount = Authentication.getAuthenticatedAccount();
        // Redirect if not logged in
        if (!authenticatedAccount) {
            $location.url('/');
            Snackbar.error('You are not authorized to view this page.');
        }
        vm.post = null;

        activate();
        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf django-angular.posts.controllers.EditPostController
         */
        function activate() {
            Posts.get(postId).then(postSuccessFn, postErrorFn);

            /**
             * @name postSuccessFn
             * @desc Get post by id success
             */
            function postSuccessFn(data, status, headers, config) {
                // Redirect if logged in, but not the owner of this profile.
                if (authenticatedAccount.username !== data.data.author.username) {
                    $location.url('/');
                    Snackbar.error('You are not authorized to view this page.');
                }
                vm.post = data.data;
            }

            /**
             * @name postErrorFn
             * @desc Get post by id error
             */
            function postErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.error);
            }
        }

        /**
         * @name submit
         * @desc Update a Post
         * @memberOf django-angular.posts.controllers.EditPostController
         */
        function submit() {
            if(vm.post.content) {
                $scope.closeThisDialog();
                Posts.update(postId, vm.post.content).then(updatePostSuccessFn, updatePostErrorFn);
            } else {
                $scope.error = 'Post without content? No can do!';
            }

            /**
             * @name updatePostSuccessFn
             * @desc Show snackbar with success message
             */
            function updatePostSuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('post.updated', {
                    id: vm.post.id,
                    content: vm.post.content
                });
                Snackbar.show('Success! Post updated.');
            }

            /**
             * @name updatePostErrorFn
             * @desc Propogate error event and show snackbar with error message
             */
            function updatePostErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }
    }
})();