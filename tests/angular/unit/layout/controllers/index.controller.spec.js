/**
 * Created by andreas on 29/12/2015.
 */
describe('layout', function () {

    beforeEach(module('django-angular'));

    describe('IndexController', function () {
        var scope, ctrl, $httpBackend, $rootScope, MyPosts, MyAuthentication;
        var post = new mockPost();
        beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/posts/')
                .respond([post]);
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            MyPosts = mockPosts();
            MyAuthentication = mockAuthentication(true);
            ctrl = $controller('IndexController', {$scope: scope, Posts: MyPosts, Authentication: MyAuthentication});
        }));

        it('should have created one post', function () {
            $rootScope.$broadcast('post.created', post);
            expect(ctrl.posts.length).toEqual(2);
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
        it('should be auth', function () {
            expect(ctrl.isAuthenticated).toBe(true);
        });
    });
});