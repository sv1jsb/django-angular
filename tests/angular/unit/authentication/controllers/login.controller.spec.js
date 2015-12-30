/**
 * Created by andreas on 29/12/2015.
 */
describe('authentication', function () {
    var user = {username:"test", email:"test@test.com"};
    var cookie = 'authenticatedAccount'
    beforeEach(module('django-angular'));

    describe('LoginController', function () {
        var scope, ctrl, $cookies, $location;
        console.log("LoginController");
        beforeEach(inject(function($rootScope, $controller, _$cookies_, _$location_) {
            $cookies = _$cookies_;
            $cookies.remove(cookie);
            $location = _$location_;
            scope = $rootScope.$new();
            var Authentication = {
                isAuthenticated: function(){return false},
                login: function(email, password){
                    $cookies.put(cookie, JSON.stringify(user));
                }
            };
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
            expect($cookies.getObject(cookie)).toEqual(user);
        });

    });
});