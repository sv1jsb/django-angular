/**
 * Created by andreas on 29/12/2015.
 */
describe('authentication', function () {
    var user = mockUser;
    var cookie = cookieAuthName;
    beforeEach(module('django-angular'));

    describe('LoginController', function () {
        var scope, ctrl, $cookies, Authentication;
        beforeEach(inject(function($rootScope, $controller, _$cookies_) {
            $cookies = _$cookies_;
            $cookies.remove(cookie);
            scope = $rootScope.$new();
            Authentication = mockAuthentication(false);
            ctrl = $controller('LoginController', {$scope: scope, Authentication: Authentication});
        }));

        it('should have error set', function(){
            ctrl.login();
            expect(scope.error).toBeDefined();
            expect($cookies.get(cookie)).toBeUndefined();
        });
        it('should have login the user', function(){
            ctrl.email = "test@test.com";
            ctrl.password = "test";
            ctrl.login();
            expect(Authentication.username()).toEqual(user.username);
        });

    });
});