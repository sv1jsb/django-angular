/**
 * Created by andreas on 30/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('NewPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackbar;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            spyOn($rootScope, '$broadcast').and.callThrough();
            MyPosts = mockPosts();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            ctrl = $controller('NewPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackbar});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error', function(){
            ctrl.submit();
            expect(scope.error).toBeDefined();
        });
        it('should add a post', function(){
            ctrl.content = 'new content';
            ctrl.submit();
            expect($rootScope.$broadcast).toHaveBeenCalled();
        })
    });
    describe('NewPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackbar;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            spyOn($rootScope, '$broadcast').and.callThrough();
            MyPosts = mockPostsError();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            ctrl = $controller('NewPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackbar});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message when an error occurred while adding new post', function(){
            ctrl.content = 'new content';
            ctrl.submit();
            expect(MySnackbar.errorMessage).toContain('Could not create post');
        })
    })
});