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
         * @desc calls material.init after last digest cucle
         * @memberOf django-angular.utils.services.Material
         */
        function init() {
            $timeout(function(){
                $.material.init();
            }, false)
        }


        /**
         * @name ripples
         * @desc call material.ripples after last digest cycle
         * @param {string} elem Optional element to apply ripples on
         * @memberOf django-angular.utils.services.Material
         */
        function ripples(elem) {
            $timeout(function(){
                $.material.ripples(elem);
            }, false)
        }
    }
})($);