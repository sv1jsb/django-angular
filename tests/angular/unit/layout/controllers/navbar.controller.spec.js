/**
 * Created by andreas on 29/12/2015.
 */
describe('layout', function () {

    beforeEach(module('django-angular'));

    describe('NavbarController', function () {
        var scope, ctrl, $rootScope, $location;
        console.log("NavbarController");
        beforeEach(inject(function(_$rootScope_, $controller, _$location_) {

            $rootScope = _$rootScope_;
            $location = _$location_;
            $location.path('/');
            scope = $rootScope.$new();
            ctrl = $controller('NavbarController', {$scope: scope});
        }));

        it('location should be /', function () {
            expect(ctrl.location).toBe('/');
        });
        it('location should be /login', function () {
            $location.path('/login');
            $rootScope.$broadcast('$routeChangeSuccess');
            expect(ctrl.location).toBe('/login');
        });
    });

    describe('NavbarController http', function () {
        var scope, ctrl, $cookies, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, _$location_, _$cookies_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/api/v1/auth/logout/')
                .respond(201, '');
            scope = $rootScope.$new();
            ctrl = $controller('NavbarController', {$scope: scope});
            $cookies = _$cookies_;
            $cookies.put('authenticatedAccount', JSON.stringify({username: "test", email: "test@test.com"}));
        }));

        it('should log the user out', function(){
            ctrl.logout();
            $httpBackend.flush();
            expect($cookies.getObject('authenticatedAccount')).toBeUndefined();
        });
    });
});