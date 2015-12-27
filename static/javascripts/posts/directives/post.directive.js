/**
 * Created by andreas on 16/12/2015.
 *
 * Post
 * @namespace django-angular.posts.directives
 */
(function () {
    'use strict';

    angular
        .module('django-angular.posts.directives')
        .directive('post', post);

    /**
     * @namespace Post
     */
    function post() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf django-angular.posts.directives.Post
         */
        var directive = {
            controller: 'PostController',
            controllerAs: 'postCtrl',
            restrict: 'E',
            scope: {
                post: '='
            },
            templateUrl: '/static/templates/posts/post.html'
        };

        return directive;
    }
})();