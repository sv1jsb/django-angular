/**
 * Created by andreas on 30/12/2015.
 */
describe('profiles', function () {

    beforeEach(module('django-angular'));

    describe('ProfileController', function () {
        var scope, ctrl, $rootScope, MyPosts, MyProfile;
        var post = mockPost;
        var user = mockUser;
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
        it('posts should be 0', function () {
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
        it('post should be updated', function () {
            post.content = "new content";
            $rootScope.$broadcast('post.updated', post);
            expect(ctrl.posts[0].content).toEqual("new content");
        });
        it('should have posts==1 and profile defined', function () {
            expect(ctrl.posts.length).toEqual(1);
            expect(ctrl.profile).toBeDefined();
        });
        it('post should be deleted', function () {
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
    });

    describe('ProfileController errors', function () {
        var scope, ctrl, $httpBackend, $rootScope, MySnackbar, Mylocation;
        var user = mockUser;
        beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/users/' + user.id +'/')
                .respond(400, '');
            $httpBackend.expectGET('/api/v1/posts/?author_id=' + user.id)
                .respond(400, JSON.stringify({message: 'errors in posts'}));
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            Mylocation = mockLocation;
            MySnackbar = mockSnackbar;
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams,
                                $location: Mylocation, Snackbar: MySnackbar});
        }));
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should display error message', function(){
            $httpBackend.flush();
            expect(MySnackbar.errorMessage[0]).toEqual('That user does not exist.');
            expect(MySnackbar.errorMessage[1]).toEqual('errors in posts');
        });
    });

});