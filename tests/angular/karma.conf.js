/**
 * Created by andreas on 29/12/2015.
 */
module.exports = function (config) {
    config.set({
        basePath: '../../',
        files: [
            'static/bower_components/jquery/dist/jquery.js',
            'static/bower_components/underscore/underscore.js',
            'static/bower_components/bootstrap-material-design/dist/js/material.js',
            'static/bower_components/bootstrap-material-design/dist/js/ripples.js',
            'static/bower_components/angular/angular.js',
            'static/bower_components/angular-route/angular-route.js',
            'static/bower_components/angular-cookies/angular-cookies.js',
            'static/bower_components/angular-mocks/angular-mocks.js',
            'static/bower_components/ngDialog/js/ngDialog.js',
            'static/templates/**/*.html',
            'static/lib/snackbarjs/snackbar.min.js',
            'tests/angular/lib/mocks.js',
            'static/javascripts/django-angular.js',
            'static/javascripts/authentication/authentication.module.js',
            'static/javascripts/layout/layout.module.js',
            'static/javascripts/posts/posts.module.js',
            'static/javascripts/profiles/profiles.module.js',
            'static/javascripts/utils/utils.module.js',
            'static/javascripts/**/*.js'

        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-coverage'
        ],
        preprocessors: {
            'static/templates/**/*.html': ['ng-html2js'],
            'static/javascripts/**/!(*spec).js': ['coverage']
        },
        ngHtml2JsPreprocessor: {
            prependPrefix: "/"
        },
        coverageReporter: {
            dir: 'coverage',
            subdir: 'angular'
        },
        reporters: ['spec', 'coverage'],
        singleRun: true
    });
};
