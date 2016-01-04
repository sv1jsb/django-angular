/**
 * Created by andreas on 4/1/2016.
 */
(function () {
    'use strict';

    angular
        .module('django-angular.utils.services')
        .factory('Sse', Sse);

    Sse.$inject = ['$rootScope', '$timeout'];
    /**
     * @namespace Sse
     */
    function Sse($rootScope, $timeout) {
        /**
         * @name Sse
         * @desc The factory to be returned
         */
        var evtSrc = new EventSource("/subscribe");
        var Sse = {
            addOnPostCreated: onPostCreated
        };

        return Sse;

        //////////////////////

        /**
         * @name onPostCreated
         * @desc sets an event listener n the specified type of received event
         * @memberOf django-angular.utils.services.Sse
         */
        function onPostCreated() {
            evtSrc.addEventListener('post.created', function(event){
                $timeout(function(){$rootScope.$broadcast('post.created', angular.fromJson(event.data));});
            }, false);
        }
    }
})();