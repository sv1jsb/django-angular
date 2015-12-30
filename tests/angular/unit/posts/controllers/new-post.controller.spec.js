/**
 * Created by andreas on 30/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('NewPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackBar;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            spyOn($rootScope, '$broadcast').and.callThrough();
            MyPosts = mockPosts();
            MySnackBar = mockSnackbar;
            ctrl = $controller('NewPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackBar});
        }));
        it('should display error', function(){
            ctrl.submit();
            expect(scope.error).toBeDefined();
        });
        it('should add a post', function(){
            ctrl.content = 'new content';
            ctrl.submit();
            expect($rootScope.$broadcast).toHaveBeenCalled();
        })
    })
});