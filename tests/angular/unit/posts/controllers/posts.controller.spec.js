/**
 * Created by andreas on 31/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('PostsController', function () {
        var ctrl, scope, $rootScope;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.posts = [];
            spyOn(scope, '$watchCollection').and.callThrough();
            ctrl = $controller('PostsController', {$scope: scope});
        }));
        it('should have 0 columns', function(){
            expect(ctrl.columns.length).toEqual(0);
        });
        it('should call watchCollection and have 1 column', function($timeout){
            scope.posts.push(new mockPost());
            expect(scope.$watchCollection).toHaveBeenCalled();
            $timeout(function(){expect(ctrl.columns.length).toEqual(1)});
        });
    })
});