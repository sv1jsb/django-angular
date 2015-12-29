/**
 * Created by andreas on 29/12/2015.
 */
module.exports = function (config) {
    config.set({

        basePath: '../../',

        files: [
            'static/bower_components/angular/angular.js',
            'static/bower_components/angular-route/angular-route.js',
            'static/bower_components/angular-cookies/angular-cookies.js',
            'static/bower_components/angular-mocks/angular-mocks.js',
            'static/bower_components/jquery/dist/jquery.js',
            'static/bower_components/underscore/underscore.js',
            'static/bower_components/ngDialog/js/ngDialog.js',
            'static/lib/snackbarjs/snackbar.min.js',
            'staticfiles/js/django-angular.min.js',
            'tests/angular/unit/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};