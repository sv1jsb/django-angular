/**
 * Created by andreas on 29/12/2015.
 */
describe('layout', function () {

    beforeEach(module('django-angular'));

    describe('IndexController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyAuthentication;
        var post = new mockPost();
        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            MyPosts = mockPosts();
            MyAuthentication = mockAuthentication(true);
            ctrl = $controller('IndexController', {$scope: scope, Posts: MyPosts, Authentication: MyAuthentication});
        }));

        it('should have created one post', function () {
            $rootScope.$broadcast('post.created', post);
            expect(ctrl.posts.length).toEqual(1);
        });
        it('should have no post from broadcast error', function () {
            expect(ctrl.posts.length).toEqual(1);
            $rootScope.$broadcast('post.created.error');
            expect(ctrl.posts.length).toEqual(0);
        });
        it('should update post', function () {
            post.content = "update from test";
            $rootScope.$broadcast('post.updated', post);
            expect(ctrl.posts[0].content).toBe("update from test");
        });
        it('should delete post', function () {
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
        it('user should be authenticated', function () {
            expect(ctrl.isAuthenticated).toBe(true);
        });
    });
    describe('IndexController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyAuthentication, MySnackbar;

        beforeEach(inject(function( _$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            MyPosts = mockPostsError();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            MyAuthentication = mockAuthentication(true);
            ctrl = $controller('IndexController', {$scope: scope, Posts: MyPosts, Authentication: MyAuthentication, Snackbar: MySnackbar});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should have displayed error message when it could not get posts', function () {
            expect(MySnackbar.errorMessage).toContain('Could not retrieve posts');
        });
    });
    describe('IndexController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyAuthentication, post;
        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            MyPosts = mockPosts();
            MyPosts.create("second post").then(function(data){
                post = data.data;
            });
            MyAuthentication = mockAuthentication(true);
            ctrl = $controller('IndexController', {$scope: scope, Posts: MyPosts, Authentication: MyAuthentication});
        }));
        it('should have deleted the second post', function () {
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(1);
            expect(ctrl.posts[0].content).toEqual("new from test");
        });
    });
});