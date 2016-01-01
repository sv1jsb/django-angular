/**
 * Created by andreas on 30/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('EditPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackbar, MyAuthentication, post;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(new mockUser());
            MyPosts = mockPosts();
            spyOn($rootScope, '$broadcast').and.callThrough();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            post = new mockPost();
            ctrl = $controller('EditPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackbar,
                        Authentication: MyAuthentication, postId: post.id});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should have a post to edit', function(){
            expect(ctrl.post).toEqual(post);
        });
        it('should update the post', function(){
            ctrl.post.content = 'new content';
            ctrl.submit();
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
        it('should display error', function(){
            ctrl.post.content = null;
            ctrl.submit();
            expect(scope.error).toBeDefined();
        })
    });
    describe('EditPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackbar, MyAuthentication, post, MyLocation;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            MyAuthentication = mockAuthentication(false);
            MyAuthentication.unauthenticate();
            MyLocation = mockLocation;
            MyPosts = mockPosts();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            post = new mockPost();
            ctrl = $controller('EditPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackbar,
                        Authentication: MyAuthentication, postId: post.id, $location: MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message if user not authenticated', function(){
            expect(MySnackbar.errorMessage).toContain("You are not authorized to view this page.");
        });
    });
    describe('EditPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackbar, MyAuthentication, post, MyLocation;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(new mockUser2());
            MyLocation = mockLocation;
            MyPosts = mockPosts();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            post = new mockPost();
            ctrl = $controller('EditPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackbar,
                        Authentication: MyAuthentication, postId: post.id, $location: MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message if user is not post author', function(){
            expect(MySnackbar.errorMessage).toContain("You are not authorized to view this page.");
        });
    });
    describe('EditPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackbar, MyAuthentication, post;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(new mockUser());
            MyPosts = mockPostsError();
            spyOn($rootScope, '$broadcast').and.callThrough();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            post = new mockPost();
            ctrl = $controller('EditPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackbar,
                        Authentication: MyAuthentication, postId: post.id});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message when it could not get post', function(){
            expect(MySnackbar.errorMessage).toContain("Could not get post");
        });
        it('should display error message when it could not update post', function(){
            ctrl.post = new mockPost();
            ctrl.submit();
            expect(MySnackbar.errorMessage).toContain("Could not update post");
        });
    });
});