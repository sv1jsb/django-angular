/**
 * Created by andreas on 16/12/2015.
 *
 * Posts
 * @namespace django-angular.posts.services
 */
(function () {
    'use strict';

    angular
        .module('django-angular.posts.services')
        .factory('Posts', Posts);

    Posts.$inject = ['$http', 'Authentication'];

    /**
     * @namespace Posts
     * @returns {Factory}
     */
    function Posts($http, Authentication) {
        var Posts = {
            all: all,
            create: create,
            get: get,
            update: update,
            delete: deletePost,
            getUserPosts: getUserPosts
        };

        return Posts;

        ////////////////////

        /**
         * @name all
         * @desc Get all Posts
         * @returns {Promise}
         * @memberOf django-angular.posts.services.Posts
         */
        function all() {
            return $http.get('/api/v1/posts/');
        }


        /**
         * @name create
         * @desc Create a new Post
         * @param {string} content The content of the new Post
         * @returns {Promise}
         * @memberOf django-angular.posts.services.Posts
         */
        function create(content) {
            return $http.post('/api/v1/posts/', {
                author: Authentication.getAuthenticatedAccount(),
                content: content
            });
        }

        /**
         * @name get
         * @desc Get a Posts by id
         * @param {int} id of Post
         * @returns {Promise}
         * @memberOf django-angular.posts.services.Posts
         */
        function get(id) {
            return $http.get('/api/v1/posts/' + id + '/');
        }

        /**
         * @name update
         * @desc Update a Posts by id
         * @param {int} id of Post
         * @param {string} content The content of the Post
         * @returns {Promise}
         * @memberOf django-angular.posts.services.Posts
         */
        function update(id, content) {
            return $http.put('/api/v1/posts/' + id + '/', {
                content: content
            });
        }

        /**
         * @name deletePost
         * @desc Delete a Posts by id
         * @param {int} id of Post
         * @returns {Promise}
         * @memberOf django-angular.posts.services.Posts
         */
        function deletePost(id) {
            return $http.delete('/api/v1/posts/' + id + '/');
        }

        /**
         * @name getUserPosts
         * @desc Get the Posts of a given user
         * @param {string} username The username to get Posts for
         * @returns {Promise}
         * @memberOf django-angular.posts.services.Posts
         */
        function getUserPosts(user_id) {
            return $http.get('/api/v1/posts/?author_id=' + user_id);
        }
    }
})();