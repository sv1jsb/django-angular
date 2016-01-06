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
         * @desc Register onmessage listener and return the eventSource object
         */
        var evtSrc = new EventSource("/subscribe");
        evtSrc.onmessage = function(event){
            try {
                var msg = JSON.parse(event.data);
                $timeout(function () {
                    $rootScope.$broadcast(msg.event, msg.data)
                });
            } catch(e){}
        };

        var Sse = {
            evtSrc: evtSrc
        };

        return Sse;
    }
})();