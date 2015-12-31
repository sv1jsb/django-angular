/**
 * Created by andreas on 29/12/2015.
 */
describe('authentication', function () {
    var user = new mockUser();
    var cookie = cookieAuthName;
    beforeEach(module('django-angular'));

    describe('RegisterController', function () {
        var scope, ctrl, MyAuthentication;
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            MyAuthentication = mockAuthentication(true);
            ctrl = $controller('RegisterController', {$scope: scope, Authentication: MyAuthentication});
        }));

        it('should have error set', function(){
            ctrl.register();
            expect(scope.error).toBeDefined();
            expect(MyAuthentication.username()).toBeNull();
        });
        it('should have register the user', function(){
            ctrl.email = "test@test.com";
            ctrl.username = "test";
            ctrl.password = "test";
            ctrl.register();
            expect(MyAuthentication.username()).toEqual(user.username);
        });

    });
});