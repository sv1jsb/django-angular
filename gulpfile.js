var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', ['build'], function () {
});

gulp.task('build', function(){
    return gulp.src(['static/javascripts/django-angular.js', 'static/javascripts/**/*.js', '!static/javascripts/**/*.spec.js'])
        .pipe(concat('django-angular.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('staticfiles/js/'))
});
