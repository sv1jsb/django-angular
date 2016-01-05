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
         * @desc Register event listeners for the three main event types and return the eventSource object
         */
        var evtSrc = new EventSource("/subscribe");
        evtSrc.addEventListener('post.created', function(event){
            $timeout(function(){$rootScope.$broadcast('post.created', angular.fromJson(event.data))});
        });
        evtSrc.addEventListener('post.updated', function(event){
            $timeout(function(){$rootScope.$broadcast('post.updated', angular.fromJson(event.data))});
        });
        evtSrc.addEventListener('post.deleted', function(event){
            $timeout(function(){$rootScope.$broadcast('post.deleted', angular.fromJson(event.data))});
        });

        var Sse = {
            evtSrc: evtSrc
        };

        return Sse;
    }
})();