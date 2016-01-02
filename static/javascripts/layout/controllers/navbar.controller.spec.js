/**
 * Created by andreas on 29/12/2015.
 */
describe('layout', function () {

    beforeEach(module('django-angular'));

    describe('NavbarController', function () {
        var scope, ctrl, $rootScope, $location, MyAuthentication, MyLocation;

        beforeEach(inject(function(_$rootScope_, $controller, _$location_) {

            $rootScope = _$rootScope_;
            $location = _$location_;
            scope = $rootScope.$new();
            MyAuthentication = mockAuthentication(true);
            MyLocation = mockLocation;
            ctrl = $controller('NavbarController', {$scope: scope, Authentication: MyAuthentication, $location: MyLocation});
        }));
        it('should logout the user', function(){
            ctrl.logout();
            expect(MyAuthentication.username()).toBeNull();
        });
        it('location should be /login', function () {
            MyLocation.path('/login');
            $rootScope.$broadcast('$routeChangeSuccess');
            expect(ctrl.location).toBe('/login');
        });
    });
});