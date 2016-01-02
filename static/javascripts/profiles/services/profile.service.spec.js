/**
 * Created by andreas on 31/12/2015.
 */

describe('profiles', function(){

    beforeEach(module('django-angular'));

    describe('ProfileService', function () {
        var Profile, $httpBackend, user;

        beforeEach(inject(function(_Profile_, _$httpBackend_){
            Profile = _Profile_;
            user = new mockUser();
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/users/' + user.id + '/')
                .respond(200, user);
        }));
        it('\'get\' should return a profile', function(){
            Profile.get(user.id).then(function(response){
                expect(response.data).toEqual(user)
            });
            $httpBackend.flush();
        });
    });
    describe('ProfileService', function () {
        var Profile, $httpBackend, user;

        beforeEach(inject(function (_Profile_, _$httpBackend_) {
            Profile = _Profile_;
            user = new mockUser();
            user.tagline = "new tag line";
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPUT('/api/v1/users/'+user.id+'/')
                .respond(200, user);
        }));
        it('\'update\' should update a profile', function () {
            Profile.update(user).then(function (response) {
                expect(response.data.tagline).toEqual(user.tagline);
            });
            $httpBackend.flush();
        })
    });
    describe('ProfileService', function () {
        var Profile, $httpBackend, user;

        beforeEach(inject(function (_Profile_, _$httpBackend_) {
            Profile = _Profile_;
            $httpBackend = _$httpBackend_;
            user = new mockUser();
            $httpBackend.expectDELETE('/api/v1/users/'+user.username+'/')
                .respond(200, '');
        }));
        it('\'delete\' should delete a profile', function () {
            Profile.destroy(user.username).then(function (response) {
                expect(response.status).toEqual(200);
            });
            $httpBackend.flush();
        })
    });
});