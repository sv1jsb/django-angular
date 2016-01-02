/**
 * Created by andreas on 31/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('PostController', function () {
        var ctrl, scope, $rootScope, MyAuthentication, MyPosts, post, MyNgDialog;
        beforeEach(inject(function(_$rootScope_, $controller){
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(new mockUser());
            $rootScope = _$rootScope_;
            $rootScope.auth = MyAuthentication;
            scope = $rootScope.$new();
            post = new mockPost();
            scope.post = post;
            MyPosts = mockPosts();
            MyNgDialog = mockNgDialog();
            spyOn($rootScope, '$broadcast').and.callThrough();
            ctrl = $controller('PostController', {$scope: scope, Authentication: MyAuthentication, Posts: MyPosts, ngDialog: MyNgDialog});
        }));
        it('should delete the post', function(){
            ctrl.deletePost(post.id);
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
        it('should open the ngDialog modal', function(){
            ctrl.modalOpen('someid');
            expect(MyNgDialog.opened).toEqual('someid');

        });
    });
    describe('PostController', function () {
        var ctrl, scope, $rootScope, MyAuthentication, MyPosts, post, MyNgDialog, MySnackbar;
        beforeEach(inject(function(_$rootScope_, $controller){
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(new mockUser());
            $rootScope = _$rootScope_;
            $rootScope.auth = MyAuthentication;
            scope = $rootScope.$new();
            post = new mockPost();
            scope.post = post;
            MyPosts = mockPostsError();
            MyNgDialog = mockNgDialog();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            spyOn($rootScope, '$broadcast').and.callThrough();
            ctrl = $controller('PostController', {$scope: scope, Authentication: MyAuthentication, Posts: MyPosts,
                                                  ngDialog: MyNgDialog, Snackbar: MySnackbar});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message on post delete error', function(){
            ctrl.deletePost(post.id);
            expect(MySnackbar.errorMessage).toContain('Could not delete post');
        });
    });
    describe('PostController', function () {
        var ctrl, scope, $rootScope, MyAuthentication, MyPosts, post, MyNgDialog, MySnackbar, MyLocation;
        beforeEach(inject(function(_$rootScope_, $controller){
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(new mockUser2());
            $rootScope = _$rootScope_;
            $rootScope.auth = MyAuthentication;
            scope = $rootScope.$new();
            post = new mockPost();
            scope.post = post;
            MyPosts = mockPostsError();
            MyNgDialog = mockNgDialog();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            MyLocation = mockLocation;
            spyOn($rootScope, '$broadcast').and.callThrough();
            ctrl = $controller('PostController', {$scope: scope, Authentication: MyAuthentication, Posts: MyPosts,
                                                  ngDialog: MyNgDialog, Snackbar: MySnackbar, $location: MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message when user is not post author', function(){
            ctrl.deletePost(post.id);
            expect(MySnackbar.errorMessage).toContain('You are not authorized to view this page.');
        });
    })
});