/**
 * Created by andreas on 30/12/2015.
 */
describe('layout', function () {
    var $window;
    beforeEach(module('django-angular'));
    beforeEach( module( function($provide) {

        $window = {
            // now, $window.location.path will update that empty object
            location: {},
            // we keep the reference to window.document
            document: window.document
        };

        // We register our new $window instead of the old
        $provide.constant( '$window' , $window );
    }));
    describe('ProfileController', function () {
        console.log("ProfileController");
        var scope, ctrl, $httpBackend, $cookies, $rootScope, $location;
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
        var user = {
            "id": "567b9a2e8871540f417329e4",
            "username": "test",
            "first_name": "Test",
            "last_name": "Account",
            "tagline": "my tag"
        };
        beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller, _$cookies_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/users/' + user.id +'/')
                .respond(200, user);
            $httpBackend.expectGET('/api/v1/posts/?author_id=' + user.id)
                .respond(200, [post]);
            $rootScope = _$rootScope_;
            $window.location.path = '/profile/+' + user.id;
            $cookies = _$cookies_;
            $cookies.put('authenticatedAccount', JSON.stringify({username: "test", email: "test@test.com"}));
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams});
        }));
        it('posts should be 0', function () {
            $httpBackend.flush();
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toBe(0);
        });
        it('posts should be 0', function () {
            $httpBackend.flush();
            post.content = "new content";
            $rootScope.$broadcast('post.updated', post);
            expect(ctrl.posts[0].content).toEqual("new content");
        });
        it('should have posts==1 and profile defined', function () {
            $httpBackend.flush();
            expect(ctrl.posts.length).toEqual(1);
            expect(ctrl.profile).toBeDefined();
        });
    });
});