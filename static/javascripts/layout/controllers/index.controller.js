/**
 * Created by andreas on 16/12/2015.
 *
 * IndexController
 * @namespace django-angular.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('django-angular.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar', 'Material', 'Sse'];

    /**
     * @namespace IndexController
     */
    function IndexController($scope, Authentication, Posts, Snackbar, Material, Sse) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.posts = [];

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf django-angular.layout.controllers.IndexController
         */
        function activate() {
            Posts.all()
                .then(postsSuccessFn, postsErrorFn)
                .finally(Material.init());

            $scope.$on('post.created', function (event, data) {
                var found = false;
                for (var i = 0; i < vm.posts.length; i++) {
                    if (vm.posts[i].id == data.id) {
                        found = true;
                        break
                    }
                }
                if(!found) vm.posts.unshift(data);
            });

            $scope.$on('post.created.error', function () {
                vm.posts.shift();
            });

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
             * @name postsSuccessFn
             * @desc Update posts array on view
             */
            function postsSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }

            /**
             * @name postsErrorFn
             * @desc Show snackbar with error
             */
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }
    }
})();