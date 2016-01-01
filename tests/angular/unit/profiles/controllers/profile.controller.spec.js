/**
 * Created by andreas on 30/12/2015.
 */
describe('profiles', function () {

    beforeEach(module('django-angular'));

    describe('ProfileController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyProfile;
        var post = new mockPost();
        var user = new mockUser();
        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyPosts = mockPosts();
            MyProfile = mockProfile();
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams, Posts: MyPosts, Profile: MyProfile});
        }));
        it('should have 0 posts', function () {
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
        it('should update post', function () {
            post.content = "new content";
            $rootScope.$broadcast('post.updated', post);
            expect(ctrl.posts[0].content).toEqual("new content");
        });
        it('should have posts==1 and profile defined', function () {
            expect(ctrl.posts.length).toEqual(1);
            expect(ctrl.profile).toBeDefined();
        });
        it('should delete post', function () {
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
    });
    describe('ProfileController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyProfile, MySnackbar, MyLocation;
        var user = new mockUser();
        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyPosts = mockPosts();
            MyProfile = mockProfileError();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            MyLocation = mockLocation;
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams, Posts: MyPosts, Profile: MyProfile,
                                                     Snackbar: MySnackbar, $location: MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message on profile get error', function () {
            expect(MySnackbar.errorMessage).toContain('Could not get profile');
        });
    });
    describe('ProfileController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyProfile, MySnackbar, MyLocation, post;
        var user = new mockUser();
        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyPosts = mockPosts();
            MyPosts.create("second post").then(function(data){
                post = data.data;
            });
            MyProfile = mockProfile();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            MyLocation = mockLocation;
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams, Posts: MyPosts, Profile: MyProfile,
                                                     Snackbar: MySnackbar, $location: MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should delete the second post', function () {
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(1);
            expect(ctrl.posts[0].content).toEqual('new from test');
        });
    });
    describe('ProfileController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyProfile, MySnackbar, MyLocation;
        var user = new mockUser();
        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyPosts = mockPostsError();
            MyProfile = mockProfile();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            MyLocation = mockLocation;
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams, Posts: MyPosts, Profile: MyProfile,
                                                     Snackbar: MySnackbar, $location: MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message on posts get error', function () {
            expect(MySnackbar.errorMessage).toContain('Could not get user\'s posts');
        });
    })
});