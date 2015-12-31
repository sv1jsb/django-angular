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
        var Authentication, $httpBackend;

        beforeEach(inject(function(_Authentication_, _$httpBackend_){
            Authentication = _Authentication_;
            Authentication.unauthenticate();
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/api/v1/users/')
                .respond(200, '');
            $httpBackend.expectPOST('/api/v1/auth/login/')
                .respond(200, JSON.stringify(mockUser));
        }));
        it('should register and log the user in', function(){
            Authentication.register(mockUser.email, mockUser.username, 'test');
            $httpBackend.flush();
            expect(Authentication.getAuthenticatedAccount().username).toEqual(mockUser.username);
        })
    });
    describe('AuthenticationService login', function () {
        var Authentication, $httpBackend;

        beforeEach(inject(function(_Authentication_, _$httpBackend_){
            Authentication = _Authentication_;
            Authentication.unauthenticate();
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/api/v1/auth/login/')
                .respond(200, JSON.stringify(mockUser));
        }));
        it('should log the user in', function(){
            Authentication.login(mockUser.email, 'test');
            $httpBackend.flush();
            expect(Authentication.getAuthenticatedAccount().username).toEqual(mockUser.username);
        })
    });
    describe('AuthenticationService helpers', function () {
        var Authentication;

        beforeEach(inject(function(_Authentication_){
            Authentication = _Authentication_;
        }));
        it('getAuthenticatedAccount should return user data', function(){
            var u = Authentication.getAuthenticatedAccount();
            expect(u).toEqual(mockUser);
        });
        it('isAuthenticated should return true', function(){
            expect(Authentication.isAuthenticated).toBeTruthy();
        });
        it('username should return user\'s name', function(){
            expect(Authentication.username()).toEqual(mockUser.username);
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