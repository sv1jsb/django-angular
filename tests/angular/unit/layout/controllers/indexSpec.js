/**
 * Created by andreas on 29/12/2015.
 */
describe('layout controllers', function () {

    beforeEach(module('django-angular'));

    describe('IndexController normal operation', function () {
        var scope, ctrl, $httpBackend;
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/posts/')
                .respond([{
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
                }]);
            scope = $rootScope.$new();
            ctrl = $controller('IndexController', {$scope: scope});
        }));

        it('should have one post', function () {
            expect(ctrl.posts).toEqual([]);
            $httpBackend.flush();
            expect(ctrl.posts).toEqual([{
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
                }]);
        });
        it('should be unauth', function () {
            expect(ctrl.isAuthenticated).toBe(false);
        })
    });
});