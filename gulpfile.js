var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build'], function () {
});

gulp.task('build', function(){
    return gulp.src(['static/javascripts/django-angular.js', 'static/javascripts/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('django-angular.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('staticfiles/js/'))
});
