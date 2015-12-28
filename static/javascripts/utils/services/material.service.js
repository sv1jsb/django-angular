/**
 * Created by andreas on 26/12/2015.
 *
 * Material
 * @namespace django-angular.utils.services
 */
(function ($) {
    'use strict';

    angular
        .module('django-angular.utils.services')
        .factory('Material', Material);

    Material.$inject = ['$timeout'];
    /**
     * @namespace Material
     */
    function Material($timeout) {
        /**
         * @name Material
         * @desc The factory to be returned
         */
        var Material = {
            init: init,
            ripples: ripples
        };

        return Material;

        //////////////////////

        /**
         * @name init
         * @desc calls material.init with a time delay after last digest cycle
         * @memberOf django-angular.utils.services.Material
         */
        function init() {
            $timeout(function(){
                $.material.init();
            }, 200, false)
        }


        /**
         * @name ripples
         * @desc call material.ripples with a time delay after last digest cycle
         * @param {string} elem Optional element to apply ripples on
         * @memberOf django-angular.utils.services.Material
         */
        function ripples(elem) {
            $timeout(function(){
                $.material.ripples(elem);
            }, 200, false)
        }
    }
})($);