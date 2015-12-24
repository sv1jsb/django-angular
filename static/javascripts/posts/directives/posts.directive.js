/**
 * Created by andreas on 16/12/2015.
 */
/**
 * Posts
 * @namespace django-angular.posts.directives
 */
(function () {
    'use strict';

    angular
        .module('django-angular.posts.directives')
        .directive('posts', posts);

    /**
     * @namespace Posts
     */
    function posts() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf django-angular.posts.directives.Posts
         */
        var directive = {
            controller: 'PostsController',
            controllerAs: 'postsCtrl',
            restrict: 'E',
            scope: {
                posts: '='
            },
            templateUrl: '/static/templates/posts/posts.html'
        };

        return directive;
    }
})();