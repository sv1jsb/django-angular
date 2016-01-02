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
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
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
    describe('ProfileSettingsController', function () {
        var scope, ctrl, $rootScope, MyProfile, MyAuthentication, MyLocation;
        var user = new mockUser();
        var MySnackbar = mockSnackbar;

        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(user);
            MyProfile = mockProfileError();
            MySnackbar.errorMessage = [];
            MyLocation = mockLocation;
            ctrl = $controller('ProfileSettingsController', {$scope: scope, $routeParams: $routeParams, Profile: MyProfile,
                                Authentication: MyAuthentication, Snackbar: MySnackbar, $location:MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message on get user profile', function () {
            expect(MySnackbar.errorMessage).toContain('That user does not exist.');
        });
        it('should display error message on update user\'s profile', function(){
            ctrl.profile = user;
            ctrl.update();
            expect(MySnackbar.errorMessage).toContain('Could not update profile');
        });
        it('should display error message on delete user', function(){
            ctrl.profile = user;
            ctrl.destroy();
            expect(MySnackbar.errorMessage).toContain('Could not delete profile');
        })
    });
    describe('ProfileSettingsController', function () {
        var scope, ctrl, $rootScope, MyProfile, MyAuthentication, MyLocation;
        var user = new mockUser();
        var MySnackbar = mockSnackbar;

        beforeEach(inject(function(_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyAuthentication = mockAuthentication(false);
            MyAuthentication.setAuthenticatedAccount(null);
            MyProfile = mockProfileError();
            MySnackbar.errorMessage = [];
            MyLocation = mockLocation;
            ctrl = $controller('ProfileSettingsController', {$scope: scope, $routeParams: $routeParams, Profile: MyProfile,
                                Authentication: MyAuthentication, Snackbar: MySnackbar, $location:MyLocation});
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message when user not authenticated', function () {
            expect(MySnackbar.errorMessage).toContain('You are not authorized to view this page');
        });
    });
    describe('ProfileSettingsController', function () {
        var scope, ctrl, $rootScope, MyProfile, MyAuthentication, MySnackbar, MyLocation;
        var user2 = new mockUser2();
        var user = new mockUser();
        beforeEach(inject(function (_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            var $routeParams = {
                user_id: "+" + user.id
            };
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(user2);
            MyProfile = mockProfile();
            MySnackbar = mockSnackbar;
            MySnackbar.errorMessage = [];
            MyLocation = mockLocation;
            ctrl = $controller('ProfileSettingsController', {
                $scope: scope, $routeParams: $routeParams, Profile: MyProfile,
                Authentication: MyAuthentication, Snackbar: MySnackbar, $location: MyLocation
            });
        }));
        afterEach(function(){
            MySnackbar.errorMessage = [];
        });
        it('should display error message when not user\'s profile' , function () {
            expect(MySnackbar.errorMessage).toContain('Not your profile');
        });
    })
});