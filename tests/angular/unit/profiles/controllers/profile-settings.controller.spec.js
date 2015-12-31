/**
 * Created by andreas on 30/12/2015.
 */
describe('profiles', function () {

    beforeEach(module('django-angular'));

    describe('ProfileSettingsController', function () {
        var scope, ctrl, $rootScope, MyProfile, MyAuthentication, MySnackbar, MyLocation;
        var user = new mockUser();
        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(user);
            MyProfile = mockProfile();
            MySnackbar = mockSnackbar;
            MyLocation = mockLocation;
            ctrl = $controller('ProfileSettingsController', {$scope: scope, $routeParams: $routeParams, Profile: MyProfile,
                                Authentication: MyAuthentication, Snackbar: MySnackbar, $location:MyLocation});
        }));
        it('should have a profile', function () {
            expect(ctrl.profile).toEqual(user);
        });
        it('should display error if email is null', function(){
            ctrl.profile.email = '';
            ctrl.update();
            expect(scope.error).toBeDefined();
        });
        it('should display error if username is null', function(){
            ctrl.profile.email = 'test@test.com';
            ctrl.profile.username = '';
            ctrl.update();
            expect(scope.error).toBeDefined();
        });
        it('should update the profile', function(){
            ctrl.profile.email = 'test@test.com';
            ctrl.profile.username = 'test';
            ctrl.profile.tagline = 'updated tag line';
            ctrl.update();
            expect(MyAuthentication.getAuthenticatedAccount().tagline).toEqual('updated tag line');
        });
        it('should delete the user', function(){
            ctrl.destroy();
            expect(MyAuthentication.getAuthenticatedAccount()).toBeNull();
        })
    });
});