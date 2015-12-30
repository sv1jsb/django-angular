/**
 * Created by andreas on 30/12/2015.
 */
describe('layout', function () {

    beforeEach(module('django-angular'));

    describe('ProfileController', function () {
        console.log("ProfileController");
        var scope, ctrl, $httpBackend, $rootScope;
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
        beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/users/' + user.id +'/')
                .respond(200, user);
            $httpBackend.expectGET('/api/v1/posts/?author_id=' + user.id)
                .respond(200, [post]);
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams});
        }));
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('posts should be 0', function () {
            $httpBackend.flush();
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
        it('post should be updated', function () {
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
        it('post should be deleted', function () {
            $httpBackend.flush();
            $rootScope.$broadcast('post.deleted', post);
            expect(ctrl.posts.length).toEqual(0);
        });
    });

    describe('ProfileController errors', function () {
        console.log("ProfileController errors");
        var scope, ctrl, $httpBackend, $rootScope, MySnackbar, $location;
        var user = {
            "id": "567b9a2e8871540f417329e4",
            "username": "test",
            "first_name": "Test",
            "last_name": "Account",
            "tagline": "my tag"
        };
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
            $location = {
                path: null,
                url: function(p){this.path = p}
            };
            MySnackbar = {
                errorMessage: [],
                error: function(m){
                    this.errorMessage.push(m)
                }
            };
            ctrl = $controller('ProfileController', {$scope: scope, $routeParams: $routeParams,
                                $location: $location, Snackbar: MySnackbar});
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