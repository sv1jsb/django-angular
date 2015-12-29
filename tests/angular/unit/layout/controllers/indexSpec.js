/**
 * Created by andreas on 29/12/2015.
 */
describe('layout', function () {

    beforeEach(module('django-angular'));

    describe('IndexController', function () {
        var scope, ctrl, $httpBackend, $cookies, $rootScope;
        var post = {
                    "id": "56812300887154364a163385",
                    "author": {
                        "id": "567b9a2e8871540f417329e4",
                        "username": "test",
                        "first_name": "Test",
                        "last_name": "Account",
                        "tagline": "my tag"
                    },
                    "content": "new from test",
                    "created_at": "2015-12-28T11:54:40.008000",
                    "updated_at": null
                };
        beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller, _$cookies_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/posts/')
                .respond([post]);
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            ctrl = $controller('IndexController', {$scope: scope});
            $cookies = _$cookies_;
            $cookies.put('authenticatedAccount', {username: "test", email: "test@test.com"});
        }));

        it('should have one post from http', function () {
            expect(ctrl.posts.length).toEqual(0);
            $httpBackend.flush();
            expect(ctrl.posts.length).toEqual(1);
            $rootScope.$broadcast('post.created', post);
            expect(ctrl.posts.length).toEqual(2);
        });
        it('should have one post from broadcast', function () {
            expect(ctrl.posts.length).toEqual(0);
            $rootScope.$broadcast('post.created', post);
            expect(ctrl.posts.length).toEqual(1);
        });
        it('should have no post from broadcast error', function () {
            expect(ctrl.posts.length).toEqual(0);
            $rootScope.$broadcast('post.created', post);
            expect(ctrl.posts.length).toEqual(1);
            $rootScope.$broadcast('post.created.error');
            expect(ctrl.posts.length).toEqual(0);
        });
        it('should update post', function () {
            expect(ctrl.posts.length).toEqual(0);
            $httpBackend.flush();
            expect(ctrl.posts.length).toEqual(1);
            post.content = "update from test";
            $rootScope.$broadcast('post.updated', post);
            expect(ctrl.posts[0].content).toBe("update from test");
        });
        it('should delete post', function () {
            expect(ctrl.posts.length).toEqual(0);
            $httpBackend.flush();
            expect(ctrl.posts.length).toEqual(1);
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
        it('should be auth', function () {
            expect(ctrl.isAuthenticated).toBe(true);
        })
    });
});