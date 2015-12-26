/**
 * Created by andreas on 16/12/2015.
 */
/**
 * NewPostController
 * @namespace django-angular.posts.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.posts.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts', 'Material'];

    /**
     * @namespace NewPostController
     */
    function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts, Material) {
        var vm = this;

        vm.submit = submit;
        vm.content = null;

        /**
         * @name submit
         * @desc Create a new Post
         * @memberOf django-angular.posts.controllers.NewPostController
         */
        function submit() {
            if(vm.content) {
                $scope.closeThisDialog();
                Posts.create(vm.content).then(createPostSuccessFn, createPostErrorFn);
            } else {
                $scope.error = 'Post without content? No can do!';
            }
            /**
             * @name createPostSuccessFn
             * @desc Show snackbar with success message
             */
            function createPostSuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('post.created', data.data);
                Snackbar.show('Success! Post created.');
            }

            /**
             * @name createPostErrorFn
             * @desc Propogate error event and show snackbar with error message
             */
            function createPostErrorFn(data, status, headers, config) {
                $rootScope.$broadcast('post.created.error');
                Snackbar.error(data.data.message);
            }
        }
    }
})();