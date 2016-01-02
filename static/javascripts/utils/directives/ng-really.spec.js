/**
 * Created by andreas on 2/1/2016.
 */
describe('utils', function(){

    beforeEach(module('django-angular'));

    describe('NgReallyDirective', function () {
        var $compile, $rootScope, scope, element;

        beforeEach(function(){
            module(function($provide){
                $provide.value('$window', mockWindow);
            })
        });
        beforeEach(inject(function(_$rootScope_, _$compile_){
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            scope = $rootScope.$new();
            scope.deletePost = function(postId){
                scope.deletedPost = postId;
            };
            element = angular.element('<button ng-really-message="Are you sure?" ng-really-click="deletePost(\'someid\')">Delete</button>');
            $compile(element)(scope);
            scope.$digest();

        }));
        it('should display confirm dialog', function(){
            element.click();
            expect(scope.deletedPost).toEqual('someid');
        });

    });
});
