/**
 * Created by andreas on 16/12/2015.
 */
/**
 * PostController
 * @namespace django-angular.posts.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.posts.controllers')
        .controller('PostController', PostController);

    PostController.$inject = ['$scope', 'Authentication', 'ngDialog', 'Posts', '$rootScope', 'Snackbar'];

    /**
     * @namespace PostController
     */
    function PostController($scope, Authentication, ngDialog, Posts, $rootScope, Snackbar) {
        var vm = this;
        vm.auth_user = Authentication.getAuthenticatedAccount();
        vm.modalOpen = modalOpen;
        vm.deletePost = deletePost;

        /**
         * @name modalOpen
         * @desc Opens modal for updating the Post with Id id
         * @param {int} id The Id of Post
         * @memberOf django-angular.posts.controllers.PostController
         */
        function modalOpen(id) {
            ngDialog.open({
                template: '/static/templates/posts/edit-post.html',
                controller: 'EditPostController',
                controllerAs: 'editPostCtrl',
                resolve: {
                    postId: function postIdFactory() {
                        return id;
                    }
                }
            });
        }

        /**
         * @name deletePost
         * @desc Deletes Post by id
         * @param {int} id The Id of Post
         * @memberOf django-angular.posts.controllers.PostController
         */
        function deletePost(id) {
            // Check owner of Post
            if($scope.post.author.username != vm.auth_user.username) {
                $location.url('/');
                Snackbar.error('You are not authorized to view this page.');
            };
            Posts.delete(id).then(deletePostSuccessFn, deletePostErrorFn);
            /**
             * @name deletePostSuccessFn
             * @desc Show snackbar with success message
             */
            function deletePostSuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('post.deleted', {
                    id: id
                });
                Snackbar.show('Success! Post deleted.');
            }

            /**
             * @name deletePostErrorFn
             * @desc Propogate error event and show snackbar with error message
             */
            function deletePostErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }
    }
})();