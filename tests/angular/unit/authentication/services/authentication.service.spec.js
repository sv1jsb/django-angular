/**
 * Created by andreas on 31/12/2015.
 */

describe('authentication', function(){

    beforeEach(module('django-angular'));
    beforeEach(function(){
        module(function($provide){
            $provide.value('Snackbar', mockSnackbar);
            $provide.value('$location', mockLocation);
        })
    });
    describe('AuthenticationService register', function () {
        var Authentication, $httpBackend, user;

        beforeEach(inject(function(_Authentication_, _$httpBackend_){
            Authentication = _Authentication_;
            Authentication.unauthenticate();
            user = new mockUser();
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/api/v1/users/')
                .respond(200, '');
            $httpBackend.expectPOST('/api/v1/auth/login/')
                .respond(200, JSON.stringify(user));
        }));
        it('should register and log the user in', function(){
            Authentication.register(user.email, user.username, 'test');
            $httpBackend.flush();
            expect(Authentication.getAuthenticatedAccount().username).toEqual(user.username);
        })
    });
    describe('AuthenticationService login', function () {
        var Authentication, $httpBackend, user;

        beforeEach(inject(function(_Authentication_, _$httpBackend_){
            Authentication = _Authentication_;
            Authentication.unauthenticate();
            user = new mockUser();
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/api/v1/auth/login/')
                .respond(200, JSON.stringify(user));
        }));
        it('should log the user in', function(){
            Authentication.login(user.email, 'test');
            $httpBackend.flush();
            expect(Authentication.getAuthenticatedAccount().username).toEqual(user.username);
        })
    });
    describe('AuthenticationService helpers', function () {
        var Authentication, user;

        beforeEach(inject(function(_Authentication_){
            Authentication = _Authentication_;
            user = new mockUser();
        }));
        it('getAuthenticatedAccount should return user data', function(){
            var u = Authentication.getAuthenticatedAccount();
            expect(u).toEqual(user);
        });
        it('isAuthenticated should return true', function(){
            expect(Authentication.isAuthenticated).toBeTruthy();
        });
        it('username should return user\'s name', function(){
            expect(Authentication.username()).toEqual(user.username);
        });
    });
    describe('AuthenticationService logout', function () {
        var Authentication, $httpBackend;

        beforeEach(inject(function(_Authentication_, _$httpBackend_){
            Authentication = _Authentication_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/api/v1/auth/logout/')
                .respond(201, '');
        }));
        it('should log the user out', function(){
            Authentication.logout();
            $httpBackend.flush();
            expect(Authentication.getAuthenticatedAccount()).toBeUndefined();
        })
    });
});