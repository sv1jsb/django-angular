/**
 * Created by andreas on 29/12/2015.
 */
describe('authentication', function () {
    var user = {username:"test", email:"test@test.com"};

    beforeEach(module('django-angular'));

    describe('LoginController', function () {
        var scope, ctrl, $httpBackend, $cookies, $location;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, _$cookies_, _$location_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/api/v1/auth/login/')
                .respond(200, JSON.stringify(user));
            scope = $rootScope.$new();
            ctrl = $controller('LoginController', {$scope: scope});
            $cookies = _$cookies_;
            $location = _$location_;
        }));

        it('should have error set', function(){
            ctrl.login();
            expect(scope.error).toBeDefined();
            expect($cookies.get('authenticatedAccount')).toBeUndefined();
        });
        it('should have login the user', function(){
            ctrl.email = "test@test.com";
            ctrl.password = "test";
            ctrl.login();
            $httpBackend.flush();
            expect($cookies.getObject('authenticatedAccount')).toEqual(user);
            expect($location.path()).toBe('/');
        });
    });
});